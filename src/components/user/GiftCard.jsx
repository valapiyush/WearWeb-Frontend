import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';

const GiftCard = () => {
  const [giftCards, setGiftCards] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch Gift Cards from the backend
  useEffect(() => {
    const fetchGiftCards = async () => {
      try {
        // Replace with the actual API endpoint for your gift cards data
        const user_id = localStorage.getItem('id');
        const response = await axios.get('/giftcards/get');  
        console.log(response.data.data);
        setGiftCards(response.data.data);
      } catch (error) {
        console.error('Error fetching gift cards:', error);
        setSnackbarMessage('Failed to load gift cards.');
        setOpenSnackbar(true);
      }
    };

    fetchGiftCards();
  }, []);

  // Redeem Gift Card
  const redeemGiftCard = async (code) => {
    try {
      const response = await axios.post('/giftcards/redeem', {
        code, user_id: localStorage.getItem('id')
      });
      console.log(response.data)

      // Update the gift card status locally to reflect redemption
      const updatedCards = giftCards.map((card) =>
        card.code === code ? { ...card, redeemed: true } : card
      );
      setGiftCards(updatedCards);
      setSnackbarMessage('Gift Card Redeemed Successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error redeeming gift card:', error);
      setSnackbarMessage('Error redeeming Gift Card.');
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navbar/>
      <Typography variant="h4" gutterBottom>
        Your Gift Cards
      </Typography>

      {/* Display Gift Cards */}
      <Grid container spacing={3}>
        {giftCards?.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No Gift Cards Available
          </Typography>
        ) : (
          giftCards?.map((card) => (
            <Grid item xs={12} md={4} key={card._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Gift Card Code: {card.code}</Typography>
                  <Typography variant="body1">Amount: ₹{card.amount}</Typography>
                  <Typography variant="body1">
                    Expiry Date: {new Date(card.expiry_date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {card.redeemed ? 'Redeemed' : 'Active'}
                  </Typography>
                  {!card.redeemed && (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => redeemGiftCard(card.code)}
                      style={{ marginTop: '10px' }}
                    >
                      Redeem
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default GiftCard;
