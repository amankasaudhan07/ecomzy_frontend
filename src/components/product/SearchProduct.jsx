import React ,{useContext , useEffect, useState} from 'react'
import AppContext from '../../context/AppContext'
import { Link,useParams } from 'react-router-dom'


const SearchProduct = () => {
    const { products ,addToCart} = useContext(AppContext);
    // console.log(products);
    const [searchProduct, setSearchProduct] = useState([]);

    const {term} = useParams();
    useEffect(() => {
        setSearchProduct(
        products.filter(
          (data) => data?.title?.toLowerCase().includes(term.toLocaleLowerCase())
        )
        
      );
    }, [term, products]);

  return (
    <> 
    {
      searchProduct.length > 0 ? (

      <div className='text-center my-2'> 
       
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5
       gap-y-8 max-w-6xl p-6 mx-auto my-7 min-h-[80vh]">
            {searchProduct?.map((product) => <div key={product._id}>
                <div className="flex flex-col items-center justify-between w-full gap-3 p-4 rounded-xl 
                      border-2 border-[#00095] shadow-lg hover:shadow-2xl hover:scale-[1.03]
                      md:hover:scale-[1.05] transition ease-in h-[55vh]">
                    <div>

                        <p className="text-[#1d783e] font-semibold text-lg text-left truncate w-40 mt-1">
                            {product.title}
                        </p>
                    </div>
                    <div>
                        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
                            {product.description.split(" ").slice(0, 10).join(" ") + "..."}
                        </p>
                    </div>

                    <Link to={`/product/${product._id}`} className="h-[180px]">
                        <img src={product.imgsrc} className="h-full w-full" alt="" />
                    </Link>
                    <div className="flex justify-between items-center w-full mt-5">
                        <div>
                            <p className="text-green-600 font-semibold">${product.price}</p>
                        </div>

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
            </div>)}
        </div>
      </div>
      ):
      (
        <div className="w-screen h-[calc(100vh-80px)] flex justify-center items-center">
        <p className="text-3xl font-bold">No Product Found !</p>
       </div> 
      )
    }
    </>
  )
}

export default SearchProduct;