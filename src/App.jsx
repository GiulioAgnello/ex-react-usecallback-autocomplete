// Funzione di Debounce
const debounce = (callback, delay) => {
  let timeout;
  return (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [products, setProduct] = useState([]);
  const [query, setQuery] = useState("");

  const fetchProduct = async (query) => {
    try {
      const res = await fetch(
        `http://localhost:3333/products?search=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setProduct(data);
      console.log("api");
    } catch (error) {
      console.error(error);
    }
  };

  const debounceFetchproduct = useCallback(debounce(fetchProduct, 500), []);

  useEffect(() => {
    debounceFetchproduct(query), [query];
  });

  return (
    <>
      <div className="container-sm mt-5"></div>
      <div className="text-center mt-5 ">
        <label className="px-5" htmlFor="name">
          Trova quello che cerchi
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="cerca "
        />
      </div>

      <div className="row g-2">
        {query
          ? products.map((product) => {
              const {
                id,
                image,
                color,
                brand,
                connectivity,
                description,
                name,
                price,
                rating,
                wireless,
              } = product;
              return (
                <div key={id} className="col-4">
                  <div className="card">
                    <img src={image} className="card-img-top" alt={brand} />
                    <div className="card-body">
                      <h5 className="card-title">{brand}</h5>
                      <hr />
                      <small>Color : {color}</small>
                      <hr />
                      <small>connectivity: {connectivity}</small>
                      <p>description: {description}</p>
                      <hr />
                      <p>name: {name}</p>
                      <hr />
                      <p>price: {price}</p>
                      <hr />
                      <p>rating: {rating}</p>
                      <hr />
                      <p>wireless: {wireless}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
