import React from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProducts } from "../utils/helpers";

export const ProductContext = React.createContext();

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  const getProducts = () => {
    setLoading(true);
    axios(`${url}/products`).then((response) => {
      // const featured = featuredProducts(response.data);
      const featured = featuredProducts(flattenProducts(response.data));
      const products = flattenProducts(response.data);

      setProducts(products);
      // setProducts(response.data);
      setFeatured(featured);
      setLoading(false);
    });
  };

  React.useEffect(getProducts, []);

  return (
    <ProductContext.Provider value={{ products, loading, featured }}>
      {children}
    </ProductContext.Provider>
  );
}
