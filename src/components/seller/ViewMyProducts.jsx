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
        width: "100%", // Responsive width
        height: 260,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <img src={product.product_image_urls} alt="Product" width={100} height={100} />
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>{product.product_name}</Typography>
      <Typography variant="body2" color="textSecondary">{product.category_id}</Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>{product.price}</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>{product.summary}</Typography>
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
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            {renderProductCard(product)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewMyProducts;
