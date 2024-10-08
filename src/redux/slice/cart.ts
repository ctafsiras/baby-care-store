import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { Product } from "@prisma/client";
import { toast } from "@/hooks/use-toast";

// Define a type for the slice state
interface Cart {
  items: CartItem[];
}
interface CartItem extends Product {
  quantity: number;
}

// Define the initial state using that type
const initialState: Cart = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        toast({
          title: `1 Quantity ${action.payload.name} added to cart`,
          description: `${action.payload.name} : ${action.payload.description}`,
        });
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        toast({
          title: `${action.payload.name} added to cart`,
          description: `${action.payload.name} : ${action.payload.description}`,
        });
      }
    },
    addToCartWithQuantity: (
      state,
      action: PayloadAction<Product & { quantity?: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }

      toast({
        title: `${action.payload.quantity} Quantity ${action.payload.name} added to cart`,
        description: `${action.payload.name} : ${action.payload.description}`,
      });
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          toast({
            title: `1 Quantity ${action.payload.name} decreased from cart`,
            description: `${action.payload.name} : ${action.payload.description}`,
          });
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
          toast({
            title: `${action.payload.name} removed from cart`,
            description: `${action.payload.name} : ${action.payload.description}`,
          });
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      toast({
        title: "Cart cleared",
      });
    },
    deleteItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      toast({
        title: `Item removed from cart successfully`,
      });
    },
  },
});

export const {
  addToCart,
  addToCartWithQuantity,
  removeFromCart,
  clearCart,
  deleteItemFromCart,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart.items;

export const selectTotalItems = (state: RootState) => state.cart.items.length;

export default cartSlice.reducer;
