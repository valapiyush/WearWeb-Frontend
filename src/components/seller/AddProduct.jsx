import  { useEffect, useState } from "react";
import "../../assets/styles/Addproduct.css";
import { useForm } from "react-hook-form";
import axios from "axios";

export const AddProduct = () => {
  const [categories, setCategories] = useState([]); 
  const [subcategories, setSubcategories] = useState([]); 

  // Initialize useForm with validation rules
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get("/categories"); 
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories when a category is selected
  const getSubcategoriesByCategoryId = async (category_id) => {
    try {
      if (!category_id) return;
      const res = await axios.get(`/subcategory/getsubcategoriesbycategory/${category_id}`);
      setSubcategories(res.data.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle category selection change
  const handleCategoryChange = (event) => {
    const category_id = event.target.value;
    getSubcategoriesByCategoryId(category_id);
  };

  // Handle form submission
  const submitHandler = async (data) => {
    try {
      const userId = localStorage.getItem("id");
      data.user_id = userId;

      const res = await axios.post("/products/products", data);
      console.log("Product added successfully:", res.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit(submitHandler)}> 
        {/* Product Name */}
        <input
          type="text"
          {...register("product_name", { required: "Product name is required" })}
          className="product-name"
          placeholder="Product Name"
        />
        {errors.product_name && <p className="error">{errors.product_name.message}</p>}

        {/* Category Dropdown */}
        <select
          className="category_id"
          {...register("category_id", { required: "Category is required" })}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories?.map((categoryItem) => (
            <option key={categoryItem._id} value={categoryItem._id}>
              {categoryItem.category_name}
            </option>
          ))}
        </select>
        {errors.category_id && <p className="error">{errors.category_id.message}</p>}

        {/* Subcategory Dropdown */}
        <select
          className="subcategory_id"
          {...register("subcategory_id", { required: "Subcategory is required" })}
          disabled={subcategories.length === 0}
        >
          <option value="">Select Subcategory</option>
          {subcategories?.map((subcategoryItem) => (
            <option key={subcategoryItem._id} value={subcategoryItem._id}>
              {subcategoryItem.sub_category_name}
            </option>
          ))}
        </select>
        {errors.sub_category_id && <p className="error">{errors.subcategory_id.message}</p>}

        {/* Base Price */}
        <input
          type="number"
          {...register("base_price", { required: "Base price is required", min: 1 })}
          className="base_price"
          placeholder="Base Price"
        />
        {errors.base_price && <p className="error">{errors.base_price.message}</p>}

        {/* Offer Price */}
        <input
          type="number"
          {...register("offer_price", { required: "Offer price is required", min: 1 })}
          className="offer_price"
          placeholder="Offer Price"
        />
        {errors.offer_price && <p className="error">{errors.offer_price.message}</p>}

        {/* Offer Percentage */}
        <input
          type="number"
          {...register("offer_percentage", { required: "Offer percentage is required", min: 0, max: 100 })}
          className="offer_percentage"
          placeholder="Offer Percentage"
        />
        {errors.offer_percentage && <p className="error">{errors.offer_percentage.message}</p>}

        {/* Product Detail */}
        <input
          type="text"
          {...register("description", { required: "Product detail is required" })}
          className="description"
          placeholder="Type description here ..."
        />
        {errors.description && <p className="error">{errors.description.message}</p>}

        {/* Product Image URL */}
        <input
          type="url"
          {...register("product_image_urls", { required: "Image URL is required"})}
          className="product_image_urls"
          placeholder="Product Image URL"
        />
        {errors.product_image_urls && <p className="error">{errors.product_image_urls.message}</p>}

        {/* Quantity */}
        <input
          type="number"
          {...register("quantity", { required: "Quantity is required", min: 1 })}
          className="quantity"
          placeholder="Quantity"
        />
        {errors.quantity && <p className="error">{errors.quantity.message}</p>}

        {/* Submit Button */}
        <button type="submit" className="add-product">Add Product</button>
      </form>
    </div>
  );
};
