import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Grid,Typography} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Cart from "./CartPage";
import { useHistory } from "react-router-dom";


const dummyData = [
  { id: 1, name: "Product 1", price: 10, quantity: 1 },
  { id: 2, name: "Product 2", price: 20, quantity: 1 },
  { id: 3, name: "Product 3", price: 30, quantity: 1 },
  { id: 4, name: "Product 4", price: 50, quantity: 1 },
];

const ShoppingCart = () => {

  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [total, setTotal] = useState(0);
  
  const [showcart, setShowcart] = useState(false);
  const [flag, setFlag] = useState(true);

  const handleShowCart=()=>
  {
    setShowcart(!showcart);
  }

  

  const addToCart = (product) => {
    const exists = cart.find((p) => p.id === product.id);
    if (exists) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, product]);
    }
    calTotal();
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((p) => p.id !== id);
    setCart(updatedCart);
    calTotal();
  };

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((p) => (p.id === id ? { ...p, quantity } : p));
    setCart(updatedCart);
  };

  const addToWishlist = (product) => {
    const exists = wishlist.find((p) => p.id === product.id);
    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((p) => p.id !== id);
    setWishlist(updatedWishlist);
  };

  const moveToWishlist = (id) => {
    const product = cart.find((p) => p.id === id);
    removeFromCart(id);
    addToWishlist(product);
  };

  const moveToCart = (id) => {
    const product = wishlist.find((p) => p.id === id);
    removeFromWishlist(id);
    addToCart(product);
  };

  const calTotal = () => {
    let s = 0;

    for (let i = 0; i < cart.length; i++) {
      s = s + cart[i].quantity * cart[i].price;
    }

    setTotal(s);
  };


  useEffect(() => {
    calTotal();
  }, [cart]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CART
            </Typography>  
           
            <Button color="inherit" onClick={() => handleShowCart()}>
              Show my Cart
              </Button>
            

            <Button color="inherit" >
              <Badge color="secondary" badgeContent={wishlist.length}>
                <FavoriteBorderIcon fontSize="large" />{" "}
              </Badge>
            </Button>

            <Button color="inherit">

              {" "}
              <Badge color="secondary" badgeContent={cart.length}>
                <ShoppingCartIcon fontSize="large" />{" "}
              </Badge>
            </Button>
            <Typography variant="h6" component="div">
              Rs {total}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <h2>Products</h2>
      <Grid container mb={2} >
        <Grid item className="product-grid" xs={12} md={9}>
        <Grid container spacing={1} >
      {dummyData.map((product) => (
        <Grid item xs={6} md={3} key={product._id}>
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>

          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={() => addToCart(product)}
          >
            <AddShoppingCartIcon fontSize="large" />
          </IconButton>

          <Button onClick={() => addToWishlist(product)} variant="contained">
            <FavoriteIcon />
          </Button>
        </div>
        </Grid>
      ))}</Grid>

        </Grid>
        <Grid item xs={12} md={3}>
        <h2>Wishlist</h2>
        {wishlist.length > 0?(wishlist.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <button onClick={() => removeFromWishlist(product.id)}>
            Remove from Wishlist
          </button>
          <button onClick={() => moveToCart(product.id)}>Move to Cart</button>
        </div>
       ))):"Wishlist Empty"}
        

        {showcart?( <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        moveToWishlist={moveToWishlist}
      />):""}

          </Grid>
        </Grid>


{/* <Route path="/cart" render={(props) => (
       <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        moveToWishlist={moveToWishlist}
      />
      )} /> */}

     

     
    </div>
  );
};

export default ShoppingCart;
