import React, { useEffect, useState,useContext } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import RelatedProduct from './RelatedProduct';
import AppContext from '../../context/AppContext';

const ProductDetail = () => {

    const {addToCart}=useContext(AppContext);
    const [product, setProduct] = useState();
    const { id } = useParams();

    const navigate=useNavigate();
    // console.log(id);
    const url = "http://localhost:4000/api";

    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/${id}`, {
                headers: {
                    "Content-Type": "Application/json",
                },
                withCredentials: true,
            });
            console.log(api.data.product);
            setProduct(api.data.product);

        };
        fetchProduct();
    }, [id]);
    return (
        <div >
            
            <div className=" flex gap-16 max-w-6xl  p-6 mx-auto flex-wrap lg:flex-nowrap">

                <div className="md:w-[30%] w-full flex justify-center items-center">
                     <img src={product?.imgsrc} className="w-[40%] max-h-80 md:w-[50%] lg:w-full" alt="" />
                </div>
                <div className="md:w-[70%] w-full flex flex-col gap-5" >
                    
                        <h1 className="text-xl font-[600] text-slate-700">
                            {product?.title}
                        </h1>
                   
                        <h1 className="text-slate-700">
                            {product?.description}
                        </h1>
                      <h1 className="font-bold text-[#16a34a] text-lg">₹ {product?.price}</h1>
                        <div className="flex justify-end items-center gap-3 w-full mt-5">
                                {/* <button onClick={()=>navigate('/shipping')}
                                    className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
                                        text-[12px] p-1 px-3 uppercase 
                                        hover:bg-gray-700
                                        hover:text-white transition duration-300 ease-in"
                                >
                                    Buy Now
                                </button> */}
                                <button onClick={()=>addToCart(product._id,product.title,product.price,1,product.imgsrc)}
                                    className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
                                        text-[12px] p-1 px-3 uppercase 
                                        hover:bg-gray-700
                                        hover:text-white transition duration-300 ease-in"
                                >
                                    Add to Cart
                                </button> 
                        </div>
                </div>

            </div>

            <RelatedProduct category={product?.category}/>
        </div>
    ) 
}

export default ProductDetail