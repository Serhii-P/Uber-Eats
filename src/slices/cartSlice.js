import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
     cartItems: localStorage.getItem("cartItems") ?
                JSON.parse(localStorage.getItem("cartItems")) : 
                [],
     cartTotalQuantity: 0,
     cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
        const itemIndex = state.cartItems.findIndex(item => 
             item.uuid === action.payload.uuid);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`increased ${state.cartItems[itemIndex].title} quantity`, {
                    position: 'bottom-left'
                })
            } else {
                state.cartItems.push(action.payload);
                toast.success(`${action.payload.title} added to cart`, {
                    position: 'bottom-left'
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
           const nextCartItems = state.cartItems.filter(cartItem => 
                cartItem.uuid !== action.payload.uuid);

            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            toast.error(`${action.payload.title} removed from cart`, {
                position: 'bottom-left'
            })
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => 
                item.uuid === action.payload.uuid);

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info(`Decreased ${action.payload.title} cart quantity`, {
                    position: 'bottom-left'
                })
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(cartItem => 
                    cartItem.uuid !== action.payload.uuid);
    
                state.cartItems = nextCartItems;
    
                toast.error(`${action.payload.title} removed from cart`, {
                    position: 'bottom-left'
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            toast.error(`Cart cleared`, {
                position: 'bottom-left'
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotals: (state, action) => {
           let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem) => {
                
                const {price, cartQuantity, extraprice} = cartItem;

                const itemTotal =  extraprice ? (price * cartQuantity + extraprice * cartQuantity )
                : (price * cartQuantity)

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            },
            {total: 0,
            quantity: 0});

            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
})

export const {addToCart, removeFromCart, decreaseCart, clearCart, getTotals} = cartSlice.actions;
export default cartSlice;