import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

// Define initial state
const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;

      // Check if the product is already in the cart
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product.product_id === newItem.product.product_id
      );

      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update the quantity
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity = newItem.quantity;
        console.log(state);
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        console.log(state);
        // If the product is not in the cart, add it as a new item
        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.productId !== action.payload.productId
        ),
      };
    default:
      return state;
  }
};

// Create a CartProvider component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart data from AsyncStorage on initial load
  useEffect(() => {
    async function loadCartData() {
      try {
        const cartData = await AsyncStorage.getItem("cart");
        if (cartData) {
          dispatch({ type: "LOAD_CART", payload: JSON.parse(cartData) });
        }
      } catch (error) {
        console.error("Error loading cart data:", error);
      }
    }

    loadCartData();
  }, []);

  // Save cart data to AsyncStorage whenever it changes
  useEffect(() => {
    async function saveCartData() {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(state.cart));
      } catch (error) {
        console.error("Error saving cart data:", error);
      }
    }

    saveCartData();
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to access the cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
