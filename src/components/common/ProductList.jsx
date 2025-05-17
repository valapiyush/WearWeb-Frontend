import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
// import FilterSidebar from './FilterSidebar';
import '../../assets/styles/productList.css';
import axios from 'axios';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const filterParam = searchParams.get('filter') || '';
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: Infinity, minRating: 0 });

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products/products');
        setProducts(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Apply search and filter from URL
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        typeof product.product_name === 'string' &&
        product.product_name.toLowerCase().includes(searchQuery)
      );
    }

    // URL filter param logic
    if (filterParam === 'discount50') {
      filtered = filtered.filter(product => product.offer_percentage >= 50);
    } else if (filterParam === 'limited-offer') {
      filtered = filtered.filter(product => product.offer_percentage >= 30);
    } else if (filterParam === 'new-arrivals') {
      filtered = filtered.filter(product => {
        const addedDate = new Date(product.createdAt); // Ensure product.createdAt exists
        const today = new Date();
        const diffInDays = (today - addedDate) / (1000 * 60 * 60 * 24);
        return diffInDays <= 30;
      });
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filterParam, products]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="product-list-container">
      {/* <FilterSidebar onFilterChange={handleFilterChange} /> */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found for {searchQuery || filterParam}</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
