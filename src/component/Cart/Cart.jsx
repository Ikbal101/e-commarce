import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {

        // console.log(cart);
    //for in loop used to see index num
    let totalPrice = 0;
    let totalShipping=0;
    let tax= 0;
    let grandTotal=0;
    let quantity=0;
    for(const product of cart ){
        // console.log(product);
        // if(product.quantity ===0){
        //     product.quantity =1
        // }
         product.quantity = product.quantity || 1
        totalPrice= totalPrice + product.price * product.quantity;
        totalShipping=totalShipping+product.shipping;
        quantity=quantity+product.quantity
    }
    tax = totalPrice*7/100;
    grandTotal = totalPrice+totalShipping+tax;
// option3: const Cart = (props) => {

    // option 1:  const cart = props.cart
    // option 2: const{cart}=props;
    return (
        <div className='cart-bg'>
             <h3><u>Order Summary</u></h3>
                <p>Selected items:{quantity}</p>
                <p>Total Price:${totalPrice}</p>
                <p>Total Shipping Charge:${totalShipping}</p>
                <p>Tax:${tax.toFixed(2)}</p>
                <h4>Grand Total:${grandTotal.toFixed(2)}</h4>
        </div>
    );
};

export default Cart;