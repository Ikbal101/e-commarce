import React from 'react';
import './Review.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({product,handleRemoveFromCart}) => {
    console.log(product);
    const{img,name,shipping,_id,price,quantity}=product
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className="review-detail">
                <p className='product-title'>{name}</p>
                <p>Price:<span className='orange-text'>${price}</span></p>
                <p>Order Quantity:<span className='orange-text'>{quantity}</span></p>
            </div>
            <button onClick={()=>handleRemoveFromCart(_id)} className='btn-dlt'><FontAwesomeIcon icon={faTrash} /></button>
        </div>
    );
};

export default ReviewItem;