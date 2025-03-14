/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";

import "../../assets/styles/addnewproduct.css";
import axios from "axios";
import { useForm } from "react-hook-form";

export const AddNewProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    category_id: "",
    sub_category_id: "",
    brand_name: "",
    base_price: "",
    offer_price: "",
    offer_percentage: "",
    quantity: "",
    image: null,
  });
  
  

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

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
      const res = await axios.get(
        `/subcategory/getsubcategoriesbycategory/${category_id}`
      );
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
      console.log(userId);
       const formData = new FormData();
       formData.append("product_name", data.product_name);
       formData.append("description", data.description);
       formData.append("category_id", data.category_id);
       formData.append("sub_category_id", data.sub_category_id);
       formData.append("brand_name", data.brand_name);
       formData.append("base_price", data.base_price);
       formData.append("offer_price", data.offer_price);
       formData.append("offer_percentage", data.offer_percentage);
       formData.append("quantity", data.quantity);
       formData.append("user_id", userId);
       formData.append("image", data.image[0]);

      console.log(FormData);
      const res = await axios.post("/products/addproduct", formData);
      console.log("Product added successfully:", res.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  return (
    <div className="product-details-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="product_name"
            {...register("product_name", {
              required: "Product name is required",
            })}
            placeholder="Type name here"
            // onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Type Description here"
            // onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            //   className="category_id"
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
          {errors.category_id && (
            <p className="error">{errors.category_id.message}</p>
          )}
        </div>
        <div className="form-group">
          <label>Sub Category</label>
          <select
            //   className="subcategory_id"
            {...register("sub_category_id", {
              required: "Subcategory is required",
            })}
            disabled={subcategories.length === 1}
          >
            <option value="">Select Subcategory</option>
            {subcategories?.map((subcategoryItem) => (
              <option key={subcategoryItem._id} value={subcategoryItem._id}>
                {subcategoryItem.sub_category_name}
              </option>
            ))}
          </select>
          {errors.sub_category_id && (
            <p className="error">{errors.sub_category_id.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Brand Name</label>
          <input
            type="text"
            name="brand_name"
            {...register("brand_name")}
            placeholder="Type brand name here"
            // onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>Base Price</label>
            <input
              type="number"
              name="base_price"
              {...register("base_price", {
                required: "Base price is required",
              })}
              placeholder="₹1000"
              // onChange={handleInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label>Offer Price</label>
            <input
              type="number"
              name="offer_price"
              {...register("offer_price", {
                required: "Offer Price is required",
              })}
              placeholder="₹450"
              // onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label>Offer Percentage</label>
            <input
              type="number"
              name="offer_percentage"
              {...register("offer_percentage",{required: "Offer percentage is required"
              })}
              placeholder="50%"
              // onChange={handleInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label>Stock Quantity</label>
            <input
              type="number"
              name="quantity"
              {...register("quantity")}
              placeholder="1258"
              // onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <h2 className="info">Product URLs</h2>

          <div className="gallery-container">
            {/* URL Input Section */}
            <div className="url-input-area">
              <input
                type="file"
                multiple
                {...register("image")}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    image: Array.from(e.target.files),
                  }))
                }
              />
             
            </div>

            
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};
