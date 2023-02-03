import React from "react";

const Cart = ({ cart, updateQuantity, removeFromCart, moveToWishlist }) => {
  

  return (
    <>
      <h2>Cart</h2>
      {cart.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>
            Quantity:{" "}
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => updateQuantity(product.id, e.target.value)}
            />
          </p>
          <p>Price: {product.price * product.quantity}</p>
          <button onClick={() => removeFromCart(product.id)}>
            Remove from Cart
          </button>
          <button onClick={() => moveToWishlist(product.id)}>
            Move to Wishlist
          </button>
        </div>
      ))}
    </>
  );
};

export default Cart;
