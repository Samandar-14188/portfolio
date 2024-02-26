import React, { useState, useEffect } from 'react';
import './index.css';
import Slider from '../Slider';
import { ClipLoader } from 'react-spinners'; 

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://strapi-store-server.onrender.com/api/products?featured=true');
        const result = await response.json();
        setFeaturedProducts(result.data);
        setLoading(false);  
        console.log(result.data);
      } catch (error) {
        console.error(error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className='hero-container'>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color="#123abc" loading={loading} size={100} />  
        </div>
      ) : (
        <>
          <div className="hero-container-info">
            <div className="text-container">
              <h1 className='title'>We are changing the way people shop</h1>
              <p className='paragraf'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
              </p>
              <button className='btn'>OUR PRODUCTS</button>
            </div>
            <div className='slider-container'>
              <Slider></Slider>
            </div>
          </div>
          <div className="Card-container">
            <h1 className='card-title'>Featured Products</h1>
            <div className='card-wrapper'>
              {Array.isArray(featuredProducts) && featuredProducts.map((product, index) => {
                let price = product.attributes.price.toString();
                price = price.slice(0, -2) + '.' + price.slice(-2);
                price = parseFloat(price);
                return (
                  <div className="card" key={index}>
                    <img src={product.attributes.image} alt={product.attributes.name} />
                    <h3>{product.attributes.title}</h3>
                    <p>{'$' + price}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
