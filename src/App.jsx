import { useEffect, useState } from "react";

export default function App() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3333/products`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, []);

  console.log(products);

  return (
    <>
      <div className="container-sm mt-5"></div>
      <div className="text-center mt-5 ">
        <label className="px-5" htmlFor="name">
          Trova quello che cerchi --->
        </label>
        <input
          type="text"
          value="name"
          onChange={() => {}}
          placeholder="cerca "
        />
      </div>

      <div className="row g-2">
        {products.map((product) => {
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
        })}
      </div>
    </>
  );
}
