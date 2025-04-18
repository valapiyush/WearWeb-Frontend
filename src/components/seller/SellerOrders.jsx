import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import '../../assets/styles/SellerOrders.css';

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function SellerOrders() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [updatedStatus, setUpdatedStatus] = React.useState('');

  const handleEditClick = (row) => {
    setSelectedOrder(row);
    setUpdatedStatus(row.status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (event) => {
    setUpdatedStatus(event.target.value);
  };

  const handleSave = async () => {
    try {
      const [orderId] = selectedOrder.id.split('-');
      const response = await axios.put(`/orders/${orderId}`, { status: updatedStatus });
        console.log(response)
      const updatedRows = rows.map((row) =>
        row.id === selectedOrder.id ? { ...row, status: updatedStatus } : row
      );
      setRows(updatedRows);
      handleClose();
    } catch (error) {
      console.error('Error updating order status:', error.response || error.message || error);
    }
  };

  React.useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const sellerId = localStorage.getItem('id');
        const response = await axios.get('/orders');
        const allOrders = response.data.data;

        const filteredRows = allOrders.flatMap((order) => {
          return order.products
            .filter((product) => {
              const userId =
                product.product_id?.user_id?._id || product.product_id?.user_id || '';
              return userId === sellerId;
            })
            .map((product, index) => ({
              id: order._id + '-' + index,
              product: product.product_id?.product_name || 'Unknown',
              quantity: product.quantity,
              total: product.quantity * product.product_id?.offer_price || 0,
              customer: order.user_id?.username || 'N/A',
              status: order.status,
              date: new Date(order.createdAt).toLocaleDateString(),
            }));
        });

        setRows(filteredRows);
      } catch (err) {
        console.error('Error fetching seller orders:', err.response || err.message || err);
        setRows([]);
      }
    };

    fetchSellerOrders();
  }, []);

  return (
    <Box sx={{ width: '100%', backgroundColor: '#171821' }}>
      <h2 style={{ color: 'white', padding: '16px' }}>Your Orders</h2>
      
      {/* Table Layout */}
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Order ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Product Name</TableCell>
              <TableCell sx={{ color: 'white' }} align="center">Quantity</TableCell>
              <TableCell sx={{ color: 'white' }}>Total Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Customer</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Ordered On</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ color: 'white' }}>{row.id}</TableCell>
                <TableCell sx={{ color: 'white' }}>{row.product}</TableCell>
                <TableCell sx={{ color: 'white' }} align="center">{row.quantity}</TableCell>
                <TableCell sx={{ color: 'white' }}>₹{row.total}</TableCell>
                <TableCell sx={{ color: 'white' }}>{row.customer}</TableCell>
                <TableCell sx={{ color: 'white' }}>
                  <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
                </TableCell>
                <TableCell sx={{ color: 'white' }}>{row.date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEditClick(row)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Editing Order Status */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Order Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select value={updatedStatus} label="Status" onChange={handleStatusChange}>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
