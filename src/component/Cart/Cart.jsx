import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {

        // console.log(cart);
    //for in loop used to see index num
    let totalPrice = 0;
    let totalShipping=0;
    let tax= 0;
    let grandTotal=0;
    for(const ikbal of cart ){
        // console.log(ikbal);
        totalPrice=totalPrice+ikbal.price;
        totalShipping=totalShipping+ikbal.shipping;
        tax = totalPrice*(7/100);
        grandTotal = totalPrice+totalShipping+tax;
    }
// option3: const Cart = (props) => {

    // option 1:  const cart = props.cart
    // option 2: const{cart}=props;
    return (
        <div className='cart-bg'>
             <h3><u>Order Summary</u></h3>
                <p>Selected items:{cart.length}</p>
                <p>Total Price:${totalPrice}</p>
                <p>Total Shipping Charge:${totalShipping}</p>
                <p>Tax:${tax.toFixed(2)}</p>
                <h4>Grand Total:${grandTotal.toFixed(2)}</h4>
        </div>
    );
};

export default Cart;