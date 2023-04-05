import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


const Shop = () => {
    const[products,setProducts]=useState([]);
    const[cart,setCart]=useState([]);
   
    useEffect(()=>{
        fetch('products.json')
        .then(res=> res.json())
        .then(data=>setProducts(data))
    },[])
    useEffect(()=>{
        // console.log('products' ,products);
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id
        for(const id in storedCart){
            // console.log(id);
            // step 2: get the product by using id
            const addedProduct=products.find(product=>product.id===id);
            // step 3: get quantity of the product
            if(addedProduct){

                const quantity = storedCart[id];
                addedProduct.quantity=quantity
                // step:4  swt the added product to the saved cart
                savedCart.push(addedProduct)
                console.log(addedProduct); 
            }

        } 
        // step 5 : set the cart
        setCart(savedCart) 
    } , [products])

    const handleAddToCArt =(product) =>{
        // console.log(product);
        //if product doesn't exist in the cart ,then  set quantity=1;
        // if exist update the quantity by 1
         let newCart = [...cart,product];
         newCart=[];
        const exist=cart.find(pd=>pd.id===1)
        if(!exist){
            product.quantity=1;
             newCart = [...cart ,product];
        }
        else{
            exist.quantity = exist.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exist];
        }
        setCart(newCart);
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                    handleAddToCArt={handleAddToCArt}
                    key={product.id}
                    product={product}    
                    ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;