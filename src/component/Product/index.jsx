import React, { useState, useEffect } from 'react';
import './index.css';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { ClipLoader } from 'react-spinners';  

export default function Products() {
  const data = {
    value: 'RESET',
  };

  const [searchInput, setSearchInput] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sliderValue, setSliderValue] = useState(100000);
  const [freeShipping, setFreeShipping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedSort, setSelectedSort] = useState('a-z');
  const [loading, setLoading] = useState(true);  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://strapi-store-server.onrender.com/api/products');
        const result = await response.json();
        setFeaturedProducts(result.data);
        setFilteredProducts(result.data);
        setLoading(false);  
        console.log(result.data);
      } catch (error) {
        console.error(error);
        setLoading(false);  
      }
    };

    fetchData();
  }, []);

  const handleSliderChange = (event, value) => {
    setSliderValue(value);
  };

  const handleCheckboxChange = () => {
    setFreeShipping(!freeShipping);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchButtonClick = () => {
    const filtered = featuredProducts.filter(
      (product) =>
        (selectedCategory === 'all' || product.attributes.category === selectedCategory) &&
        (selectedCompany === 'all' || product.attributes.company === selectedCompany) &&
        (product.attributes.title.toLowerCase().includes(searchInput.toLowerCase())) &&
        parseFloat(product.attributes.price) <= sliderValue &&
        (!freeShipping || (freeShipping && product.attributes.shipping === true))
    );

    setFilteredProducts(filtered);
  };

  const handleResetButtonClick = () => {
    setFilteredProducts(featuredProducts);
    setSliderValue(100000);
    setFreeShipping(false);
    setSelectedCategory('all');
    setSelectedCompany('all');
    setSelectedSort('a-z');
    setSearchInput('');
  };

  return (
    <div>
      <div className="filter-container">
        <div className="search-wrapper">
          <div className='input-wrapper'>
            <label>Search Product</label><br />
            <input
              type="text"
              className='input-text Search-Product'
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className='select-wrapper'>
            <div className="select-container">
              <label>Select Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="all">all</option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </div>

            <div className="select-container">
              <label>Select Compony</label>
              <select className='selectCompony' onChange={(e) => setSelectedCompany(e.target.value)}>
                <option value="all">all</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestaed">Homestaed</option>
              </select>
            </div>
            <div className="select-container">
              <label>Sort By</label>
              <select>
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
                <option value="hign">hign</option>
                <option value="low">low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="search-wrapper">
          <div className="checkbox-wrapper">
            <label>Select Price</label>
            <Slider
              value={sliderValue}
              defaultValue={100000}
              min={0}
              max={100000}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={handleSliderChange}
            />
          </div>
          <div className="checkbox-wrapper">
            <label>Free Shipping</label>
            <Checkbox checked={freeShipping} onChange={handleCheckboxChange} />
          </div>
          <button className='btn-product' onClick={handleSearchButtonClick} >SEARCH</button>
          <button className='btn-product' onClick={handleResetButtonClick} >RESET</button>
        </div>
      </div>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color="#123abc" loading={loading} size={15} />
        </div>
      ) : (
        <div className="card-wrapper card-wrapper-product">
          {Array.isArray(filteredProducts) &&
            filteredProducts.map((product, index) => {
              let price = product.attributes.price.toString();
              price = price.slice(0, -2) + '.' + price.slice(-2);
              price = parseFloat(price);
              return (
                <div className="card card-product" key={index}>
                  <img src={product.attributes.image} alt={product.attributes.name} />
                  <h3>{product.attributes.title}</h3>
                  <p>{'$' + price}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
