import React from "react";
import ProductList from "./ProductList";
import { ProductContext } from "../../context/products";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleDoubleUp,
} from "react-icons/fa";

export default function PageProducts() {
  const { sorted, page, changePage } = React.useContext(ProductContext);

  if (sorted[page]) {
    return (
      <>
        <ProductList products={sorted[page]} />
        {sorted.length > 1 && (
          <article className="pagination-buttons">
            {/* prev */}
            {page > 0 && (
              <button
                className="prev-page-btn"
                onClick={() => changePage(page - 1)}
              >
                <FaAngleDoubleUp />
              </button>
            )}

            {sorted.map((_, index) => {
              return (
                <button
                  onClick={() => changePage(index)}
                  key={index}
                  className={`page-btn ${page === index && `page-btn-current`}`}
                >
                  {index + 1}
                </button>
              );
            })}
            {/* next */}
            {page < sorted.length - 1 && (
              <button
                className="next-page-btn"
                onClick={() => changePage(page + 1)}
              >
                <FaAngleDoubleRight />
              </button>
            )}
          </article>
        )}
      </>
    );
  } else {
    return (
      <h3 className="search-errors">
        {" "}
        unfortunately your search query did not return any products
      </h3>
    );
  }
}
