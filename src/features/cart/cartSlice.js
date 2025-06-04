import { createSlice } from "@reduxjs/toolkit";

// const cartInit = {
//     pizzaId: 0,
//     name: '',
//     quantity: 0,
//     unitPrice: 0,
//     totalPrice: 0,

// }


/**
 * Now it's the time to deal with state as an array of object which is frustrating 
 * Notice that in redux it allows us to mutate object and arrays so we don't need to create a deep copy of the array using [...]
 * we can just mutate, which make it easier
 */
const cartInit = {
    //array of cart objects, evert object represents a cart 
    cart: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInit,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter((c) => c.pizzaId !== action.payload);

        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            item.quantity++;
            item.quantity = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            item.quantity--;
            item.quantity = item.quantity * item.unitPrice;
        },
        clearCart(state, action) {
            state.cart = [];
        },
    }
})

console.log(cartSlice.actions.addItem());
export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer