import React, { useState } from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProducts, paginate } from "../utils/helpers";

export const ProductContext = React.createContext();

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  // extra state values
  const [sorted, setSorted] = useState([]);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    shipping: false,
    price: "all",
  });

  const getProducts = () => {
    setLoading(true);
    axios(`${url}/products`).then((response) => {
      // const featured = featuredProducts(response.data);
      const featured = featuredProducts(flattenProducts(response.data));
      const products = flattenProducts(response.data);

      setSorted(paginate(products));
      setProducts(products);
      // setProducts(response.data);
      setFeatured(featured);
      setLoading(false);
    });
  };
  React.useEffect(getProducts, []);

  const changePage = (index) => {
    setPage(index);
  };

  const updateFilters = (e) => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;
    let filterValue;

    if (type === "checkbox") {
      filterValue = e.target.checked;
    } else if (type === "radio") {
      value === "all" ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }

    setFilters({ ...filters, [filter]: filterValue });
  };

  React.useEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);

    const { search, category, shipping, price } = filters;

    if (category !== "all") {
      newProducts = newProducts.filter((item) => item.category === category);
    }
    if (shipping !== false) {
      newProducts = newProducts.filter(
        (item) => item.free_shipping === shipping
      );
    }
    if (search !== "") {
      newProducts = newProducts.filter((item) => {
        let title = item.title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }
    if (price !== "all") {
      newProducts = newProducts.filter((item) => {
        if (price === 0) {
          return item.price < 300;
        } else if (price === 300) {
          return item.price > 300 && item.price < 650;
        } else {
          return item.price > 650;
        }
      });
    }

    setPage(0);
    setSorted(paginate(newProducts));
  }, [filters, products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
