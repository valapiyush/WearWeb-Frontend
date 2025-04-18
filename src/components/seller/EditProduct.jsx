/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "../../assets/styles/addnewproduct.css";

export const EditProduct = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [initialData, setInitialData] = useState(null);
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch product by ID
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/products/${id}`);
      const product = res.data.data;
      setInitialData(product);

      // Pre-fill form
      for (let key in product) {
        if (key !== "image") setValue(key, product[key]);
      }

      await getSubcategoriesByCategoryId(product.category_id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get("/category/get");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getSubcategoriesByCategoryId = async (category_id) => {
    try {
      if (!category_id) return;
      const res = await axios.get(`/subcategory/getsubcategoriesbycategory/${category_id}`);
      setSubcategories(res.data.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleCategoryChange = async (event) => {
    const category_id = event.target.value;
    await getSubcategoriesByCategoryId(category_id);
  };

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();
      for (let key in data) {
        if (key === "image" && data.image[0]) {
          formData.append("image", data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const res = await axios.put(`/products/update/${id}`, formData);
      toast.success("Product updated successfully", { autoClose: 1000 });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
    fetchProduct();
  }, []);
  useEffect(() => {
    if (initialData) {
      for (let key in initialData) {
        if (key !== "image") {
          setValue(key, initialData[key]);
        }
      }
  
      if (initialData.category_id) {
        getSubcategoriesByCategoryId(initialData.category_id);
      }
    }
  }, [initialData, setValue]);

  return (
    <div className="product-details-form">
      <ToastContainer />
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" {...register("product_name", { required: true })} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea {...register("description", { required: true })} />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select {...register("category_id", { required: true })} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.category_name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Sub Category</label>
          <select {...register("sub_category_id", { required: true })}>
            <option value="">Select Subcategory</option>
            {subcategories.map((s) => (
              <option key={s._id} value={s._id}>{s.sub_category_name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Brand Name</label>
          <input type="text" {...register("brand_name")} />
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>Base Price</label>
            <input type="number" {...register("base_price", { required: true })} />
          </div>
          <div className="form-group half-width">
            <label>Offer Price</label>
            <input type="number" {...register("offer_price", { required: true })} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>Offer Percentage</label>
            <input type="number" {...register("offer_percentage", { required: true })} />
          </div>
          <div className="form-group half-width">
            <label>Quantity</label>
            <input type="number" {...register("quantity", { required: true })} />
          </div>
        </div>

        <div className="form-group">
          <label>Image (upload new to update)</label>
          <input type="file" {...register("image")} />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
        <button className = "btn btn-primary" onClick={() => navigate("/seller/viewmyproducts")} style={{marginTop: "10px"}}>
  Back
</button>

      </form>
    </div>
  );
};
