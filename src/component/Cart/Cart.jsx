import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {

    //for in loop used to see index num
    let total = 0;
    for(const product of cart ){
        console.log(product);
        total=total+product.price;
    }
// option3: const Cart = (props) => {

    // option 1:  const cart = props.cart
    // option 2: const{cart}=props;
    return (
        <div className='cart-bg'>
             <h3><u>Order Summary</u></h3>
                <p>Selected items:{cart.length}</p>
                <p>Total Price:{total}</p>
                <p>Total Shipping Charge:</p>
                <p>TAx:$</p>
                <h4>Grand Total:</h4>
        </div>
    );
};

export default Cart;