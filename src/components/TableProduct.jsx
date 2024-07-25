import React ,{useContext,useState,useEffect} from 'react'
import AppContext from '../context/AppContext'
const TableProduct = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [qty,setQty] = useState(0);
    const {cart} =useContext(AppContext) 

    useEffect(() => {
        let qty=0;
        let price=0;
        if(cart?.items)
        {
         for(let i=0;i<cart?.items.length;i++)
         {
           qty+=cart?.items[i].qty;
           price+=cart?.items[i].price;
   
         }
         setQty(qty);
         setTotalAmount(price);
        }
      }, [cart])

  return (
   <>
    <table className=' w-11/12  h-full m-auto my-1 border-2 border-black'>
         <thead className='border-2 border-black' >
          <tr>
            <th scope="col" className="border-2 border-black">
              Product Img
            </th>
            <th scope="col" className="border-2 border-black">
              Title
            </th>
            <th scope="col" className="border-2 border-black">
              Price
            </th>
            <th scope="col" className="">
              Qty
            </th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr className='w-1/5 text-center border-b-2 border-black' key={product._id}>
              <th  scope="row" className="flex items-center justify-center p-1 ">
                <img 
                  src={product.imgsrc}
                  style={{ width: "50px", height: "50px" }}
                />
              </th>
              <td className="w-1/2 border-l-2 border-black">{product.title}</td>
              <td className="border-l-2 border-black">{product.price}</td>
              <td className="border-l-2 border-black">{product.qty}</td>
             </tr>
           ))}
            
            <tr className='text-center border-b-2 font-bold border-black' >
              <th  scope="row" className="flex items-center justify-center p-1 ">
                 
              </th>
              <td className="border-l-2 border-black">Total : </td>
              <td className="border-l-2 border-black">₹ {totalAmount}</td>
              <td className="border-l-2 border-black">{qty}</td>
             </tr>
            
          </tbody>    

    </table>
   </>
  )
}

export default TableProduct