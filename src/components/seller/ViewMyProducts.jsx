import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Card, Typography, Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Function to Render Product Card
const renderProductCard = (product) => {
  return (
    <Card
      sx={{
        width: "100%",
    height: "auto",
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
    }
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
        <IconButton size="small">
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
};


export const ViewMyProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetching Products from API
  const getAllMyProducts = async () => {
    const res = await axios.get("/products/user/" + localStorage.getItem("id"));
    console.log(res.data.data);
    setProducts(res.data.data);
  };

  useEffect(() => {
    getAllMyProducts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 2, width:"70vw" }}>
      <Grid container spacing={2} justifyContent="center">
      {products.map((product, index) => (
  <Grid
    item
    xs={12}
    sm={6}
    md={4}
    lg={3}
    key={product._id}
    sx={{
      mt: index < 4 ? "60px" : 0, // Only first row (first 4 items)
    }}
  >
    {renderProductCard(product)}
  </Grid>
))}
      </Grid>
    </Box>
  );
};

export default ViewMyProducts;
