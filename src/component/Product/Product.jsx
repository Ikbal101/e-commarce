import React from 'react';
import './Product.css';

const Product = (props) => {
    const{id,category,name,price,img,shipping,quantity,rating,seller}=props.product;
    const handleAddToCArt=props.handleAddToCArt;

   console.log(props);

    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className="product-info">
                <h6 className='product-name'>{name}</h6>
                <p>Price:{price}</p>
            
                <p><small>Seller:{seller}</small></p>
                <p><small>Rating:{rating} stars</small></p>
            </div>
            <button onClick={()=>handleAddToCArt(props.product)} className='btn-cart'>
                Add to cart
                </button>
        </div>
    );
};

export default Product;