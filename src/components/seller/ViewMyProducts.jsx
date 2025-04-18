import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

export const ViewMyProducts = () => {
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Fetching Products
  const getAllMyProducts = async () => {
    const res = await axios.get("/products/user/" + localStorage.getItem("id"));
    setProducts(res.data.data);
  };

  useEffect(() => {
    getAllMyProducts();
  }, []);

  const handleMenuOpen = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  const handleEdit = () => {
    console.log("Edit product", selectedProductId);
    handleMenuClose();
    navigate(`/edit-product/${selectedProductId}`);
    // Navigate to edit page or open modal
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/products/products/${selectedProductId}`);
      getAllMyProducts(); // Refresh list
    } catch (err) {
      console.error(err);
    }
    handleMenuClose();
  };

  const renderProductCard = (product) => (
    <Card
      sx={{
        width: "100%",
        p: 2,
        borderRadius: "20px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <img
          src={product.product_image_urls?.[0] || "image.jpg"}
          alt={product.product_name}
          width={100}
          height={150}
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
        <IconButton
          size="small"
          onClick={(e) => handleMenuOpen(e, product._id)}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Typography variant="h6" fontWeight="bold">
        {product.product_name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Brand: {product.brand_name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Category: {product.category_id.category_name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Sub Category: {product.sub_category_id.sub_category_name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Description: {product.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Quantity: {product.quantity}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Base Price: ₹{product.base_price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Offer: {product.offer_percentage}% → ₹{product.offer_price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Created At: {new Date(product.createdAt).toLocaleDateString()}
      </Typography>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 2, width: "70vw" }}>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={product._id}
            sx={{ mt: index < 4 ? "60px" : 0 }}
          >
            {renderProductCard(product)}
          </Grid>
        ))}
      </Grid>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default ViewMyProducts;
