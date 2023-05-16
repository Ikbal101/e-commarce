import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'


const Oders = () => {
    const savedCart = useLoaderData()
    const[cart,setCart]=useState(savedCart)

    const handleRemoveFromCart = id =>{
        // console.log(id);
        const remain = cart.filter(pd =>pd._id !== id)
        setCart(remain);
        removeFromDb(id)
    }

        const handleClearCart =()=>{
            setCart([])
            deleteShoppingCart()
        }
    return (
        <div className='shop-container'>
            <div className="review-container">
                {
                    cart.map(product => <ReviewItem 
                    key={product._id}
                    product={product}
                    handleRemoveFromCart={handleRemoveFromCart}
                    />)
                }
            </div>
            <div className='cart-container'>
                <Cart handleClearCart={handleClearCart} cart={cart}>
                    <Link className='link' to="/checkout">
                       <button className='btn-check'> Proceed Checkout</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Oders;