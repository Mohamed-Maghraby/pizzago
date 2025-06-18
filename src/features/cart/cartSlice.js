import { createSlice } from "@reduxjs/toolkit";

/**
 * Now it's the time to deal with state as an array of object which is frustrating 
 * Notice that in redux it allows us to mutate object and arrays so we don't need to create a deep copy of the array using [...]
 * we can just mutate, which make it easier
 */
const cartInit = {
    //array of cart objects, every object represents a cart 
    cart: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState: cartInit,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
            state.cart.map((e)=>{
                console.log(e);
            })
        },
        deleteItem(state, action) {
            // const item = state.cart.find((item) => item.pizzaId === action.payload);
            // console.log(item.quantity);
            // console.log(state.cart);
            // if (item.quantity > 1) {
            //     item.quantity--;
            //     return;
            // }
            state.cart = state.cart.filter((c) => c.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        clearCart(state, action) {
            state.cart = [];
        },
    }
})

console.log(cartSlice.actions.addItem());

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

/**
 * Selectors
 * We lifted the implementation of this fn from the useSelector in the 
 * cartOverview Component to her so we can use it elsewhere. This what's called
 * Redux Selector which selects a state and may run some operations over it, make it reusable,
 * then we use them in the useSelector hook in any component
 *
 * Those Selectors may cause performance issue in larger apps, so 'Reselect' lib 
 * can be used to enhance it 
*/
export const getCart = state => state.cart.cart;
export const getTotalCartQuantity = (state)=>state.cart.cart.reduce((sum, item)=>sum + item.quantity, 0);
export const getTotalCartPrice = (state)=>state.cart.cart.reduce((sum, item)=>sum + item.totalPrice, 0);
export const getCurrentQuantityById = (id) => (state) => state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0; 