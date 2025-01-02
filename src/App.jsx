import React, { useState } from "react";
import './App.css'

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState(''); 
  const [sortOption, setSortOption] = useState('popular');

  const products =
        [
        {
          name: "Худи",
          description: "Худи оверсайз с начёсом",
          imageUrl: '/images/img1.webp',
          color: "Красный",
          price: 89,
          rating: 4.6,
        },
        {
          name: "Зип худи",
          description: "Зип худи оверсайз с начёсом на молнии",
          imageUrl: '/images/img2.webp',
          color: "Чёрный",
          price: 76,
          rating: 4.8,
        },
        {
          name: "Свитер",
          description: "Свитер вязаный оверсайз с горлом объемный",
          imageUrl: '/images/img3.jpg',
          color: "Голубой",
          price: 95,
          rating: 4.3,
        },
        {
          name: "Свитер",
          description: "Свитер леопардовый оверсайз трикотажный",
          imageUrl: '/images/img4.avif',
          color: "Белый",
          price: 82,
          rating: 4.9,
        },
        {
          name: "Лонгслив",
          description: "Лонгслив оверсайз хлопок трикотажный",
          imageUrl: '/images/img5.webp',
          color: "Розовый",
          price: 56,
          rating: 5.0,
        },
        {
          name: "Лонгслив",
          description: "Лонгслив с длинным рукавом из полупрозрачной ткани хлопок",
          imageUrl: '/images/img6.avif',
          color: "Красный",
          price: 42,
          rating: 4.6,
        },
        {
          name: "Лонгслив",
          description: "Лонгслив оверсайз с принтом",
          imageUrl: '/images/img7.jpg',
          color: "Белый",
          price: 43,
          rating: 4.4,
        },
        {
          name: "Лонгслив",
          description: "Лонгслив прозрачный",
          imageUrl: '/images/img8.webp',
          color: "Бежевый",
          price: 38,
          rating: 4.8,
        },
        {
          name: "Свитшот",
          description: "Свитшот оверсайз на молнии",
          imageUrl: '/images/img9.webp',
          color: "Голубой",
          price: 54,
          rating: 4.1,
        },
        {
          name: "Свитшот",
          description: "Свитшот оверсайз ",
          imageUrl: '/images/img10.webp',
          color: "Коричневый",
          price: 75,
          rating: 4.8,
        },
        {
          name: "Свитшот",
          description: "Свитшот оверсайз с начесом и вышивкой",
          imageUrl: '/images/img11.webp',
          color: "Зелёный",
          price: 47,
          rating: 4.5,
        },
        {
          name: "Кардиган",
          description: "Кардиган удлиненный вязаный на пуговицах оверсайз",
          imageUrl: '/images/img12.webp',
          color: "Белый",
          price: 96,
          rating: 4.7,
        },
      ];
    
      const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
      };
      const handleColorChange = (color) => {
        setSelectedColors((prevSelectedColors) => {
          if (prevSelectedColors.includes(color)) {
            return prevSelectedColors.filter(c => c !== color);
          } else {
            return [...prevSelectedColors, color];
          }
        });
      };
      const handlePriceChange = (event) => {
        const { name, value } = event.target;
        if (name === "minPrice") {
          setMinPrice(value);
        } else if (name === "maxPrice") {
          setMaxPrice(value);
        }
      };
      const handleSortChange = (option) => {
        setSortOption(option);
      };
      

      const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchValue.toLowerCase());
        const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
        const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
        const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);
        
        return matchesSearch && matchesColor && matchesMinPrice && matchesMaxPrice;
      });
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === 'cheap') {
          return a.price - b.price;
        } else if (sortOption === 'expensive') {
          return b.price - a.price;
        } else {
          return b.rating - a.rating;
        }
      });
    
    const colors = ['Красный', 'Белый', 'Чёрный', 'Зелёный', 'Голубой', 'Бежевый', 'Коричневый'];

    return (
      <div className="app-container">
        <div className="filter-container">
          <input
            type="text"
            placeholder="Поиск"
            value={searchValue}
            onChange={handleSearchChange}
            style={{ marginBottom: '20px', padding: '10px', width: '900px' }}
          />
          <div className="sort-options">
            <button
              className={sortOption === 'popular' ? 'active' : ''}
              onClick={() => handleSortChange('popular')}
              style={{ backgroundColor: sortOption === 'popular' ? 'lightgray' : 'initial' }}
            >
              Популярные
            </button>
            <button
              className={sortOption === 'cheap' ? 'active' : ''}
              onClick={() => handleSortChange('cheap')}
              style={{ backgroundColor: sortOption === 'cheap' ? 'lightgray' : 'initial' }}
            >
              Сначала дешевые
            </button>
            <button
              className={sortOption === 'expensive' ? 'active' : ''}
              onClick={() => handleSortChange('expensive')}
              style={{ backgroundColor: sortOption === 'expensive' ? 'lightgray' : 'initial' }}
            >
              Сначала дорогие
            </button>
          </div>
            <div className="color-filter"> 
              <h4 style={{ margin: '0', textAlign: 'center' }}>По цвету</h4>
              <div className="color-options">
                {colors.map(color => (
                  <div key={color} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                    type="checkbox"
                    id={color}
                    name={color}
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    />
                <label htmlFor={color} style={{ marginLeft: '8px' }}>{color}</label>
            </div>
          ))}
        </div>
        </div>
        <div className="price-filter">
          <h4>По цене</h4>
          <div className="price-inputs">
          <input
            type="text"
            name="minPrice"
            placeholder="От"
            value={minPrice}
            onChange={handlePriceChange}
            style={{ width: '100px', marginRight: '10px' }}
          />
          <input
            type="text"
            name="maxPrice"
            placeholder="До"
            value={maxPrice}
            onChange={handlePriceChange}
            style={{ width: '100px' }}
          />
          </div>
          </div>
          <div className="product-count">
          <h4>Всего продуктов: {sortedProducts.length}</h4>
        </div>
          </div>
        <div className="product-container">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product, index) => (
            <Product key={index} product={product} />
          ))
        ) : (
          <p>По вашим критериям ничего не найдено</p>
        )}
        </div>
      </div>
    );
  };


  const Product = ({ product }) => {
    return (
      <div className="product_card" >
        <img src={product.imageUrl} alt={product.name} className="product_image"  />
        <h3>{product.name}</h3>
        <p className="product_description">{product.description}</p>
        <div className="product_details">
            <p>Цвет: {product.color}</p>
            <p>Цена: {product.price} byn</p>
            <p>Рейтинг: {product.rating.toFixed(1)}</p>
        </div>
      </div>
    );
  };

export default App
