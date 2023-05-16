import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';




const Shop = () => {
    const[products,setProducts]=useState([]);
    const[cart,setCart]=useState([]);
    const [currentPage,setCurrentPage] = useState(0);
    const[itemsPerPage,setItemsPerPage] = useState(10);
    const{totalProducts} = useLoaderData();
    console.log(totalProducts);


    // const itemsPerPage = 10;//TODO:make it dynamic
    const totalPages= Math.ceil(totalProducts/itemsPerPage);
    
    // Create an array to store the page numbers
    // const pageNumbers = [];

    // for (let i = 1; i <= totalPages; i++) {
    //   pageNumbers.push(i);
    // }

    const pageNumbers = [...Array(totalPages).keys()]
    const options = [5,10,20];
   

    /*
    1.determine the total number of items..done
    2.decide on the number of items per page
    3.Done:calculate the number of pages
    done. determine the current page
    */
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:4000/products?page=${currentPage}&limit=${itemsPerPage}`);

            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage]);

    useEffect(()=>{
        // console.log('products' ,products);
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id
        for(const id in storedCart){
            // console.log(id);
            // step 2: get the product by using id
            const addedProduct=products.find(product=>product._id===id);
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
        const exist=cart.find(pd=>pd._id===1)
        if(!exist){
            product.quantity=1;
             newCart = [...cart ,product];
        }
        else{
            exist.quantity = exist.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exist];
        }
        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart =() =>{
        setCart([])
        deleteShoppingCart()
    }

    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1)
    }
    return (
      <>
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                    handleAddToCArt={handleAddToCArt}
                    key={product._id}
                    product={product}    
                    ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart handleClearCart={handleClearCart} cart={cart}>

               <div><Link className='link' to="/orders">
                <button className='btn-check'>Review order</button>
                </Link></div>
               </Cart>
            </div>
        </div>
                
                {/* for pagination  */}

                <div className="pagination">
                    <p>Current Page:{currentPage}</p>
                    {
                       pageNumbers.map(number => <button className={currentPage === number ? 'selected' : '' } key={number} onClick={()=>setCurrentPage(number)}>{number}</button>)
                    }
                    <select
                        value={itemsPerPage}
                        onChange={handleSelectChange}>

                        {
                            options.map(option=>(
                                <option key={option} value={option}>{option}</option>
                            ))
                        }
                    </select>
                </div>
        </>
    );
};

export default Shop;