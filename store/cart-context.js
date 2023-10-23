import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext({
  ids: [],
  addToCart: (id) => {},
  removeFromCart: (id) => {},
});
