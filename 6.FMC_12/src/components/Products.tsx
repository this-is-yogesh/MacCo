import { useEffect, useState } from "react";
import React from "react";
import "./Products.css"

function products() {
  interface Product {
    image: string;
    id: string;
  }
  const [products, setProducts] = useState<Product[]>([]);
  function getProducts() {
    fetch("https://fakestoreapi.com/products?limit=10&sort=desc")
      .then(r => {
        return r.json();
      })
      .then((d: Product[]) => setProducts(d));
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    // <div className="main-box">
    <div className="image-line">
      <div className="left-arrow">←</div>
      {products.map(p => {
        return (
          <span key={p.id} className="image-box">
            <img src={p.image} alt="image" width={200} height={200} />
          </span>
        );
      })}
      <div className="right-arrow">→</div>
    </div>
  );
}

export default products;
