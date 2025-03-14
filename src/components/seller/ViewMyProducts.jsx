/* eslint-disable react/jsx-key */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ViewMyProducts = () => {

    const [products, setproducts] = useState([])
    const getAllMyProducts = async() => {

        const res = await axios.get("/products/getproductbyuserid/"+localStorage.getItem("id"))
        console.log(res.data) //api response...
        setproducts(res.data.data)

    }

    useEffect(() => {
        
        getAllMyProducts()
        
    }, [])
    

  return (
    <div style={{textAlign:"center"}}>
        MY SCREENS
        <table className='table table-dark'>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {
                   products?.map((sc)=>{
                    return<tr>
                        <td>{sc.product_name}</td>
                        <td>
                            <img  style ={{height:100,width:100}}src={sc?.product_image_urls}></img>
                        </td>
                    </tr>
                   }) 
                }
            </tbody>
        </table>
    </div>
  )
}