import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import '../../assets/styles/productList.css';
import axios from 'axios';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: Infinity, minRating: 0 });

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products/products');
        console.log(res.data.data);
        setProducts(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter logic
  useEffect(() => {
    const filtered = products.filter(product =>
      typeof product.product_name === 'string' &&
      product.product_name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);
  

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="product-list-container">
      {/* <FilterSidebar onFilterChange={handleFilterChange} /> */}
      <div className="product-grid" style={{ display: 'flex', justifyContent:"center" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found for {searchQuery}</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
