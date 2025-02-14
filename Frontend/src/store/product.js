// import {create} from 'zustand' 

// export const useProductStore = create(( set)=>({
//     products:[],
//     setProducts:(products)=>set({products}),
//     createProduct: async (newProduct)=>{
//         if(!newProduct.name ||!newProduct.price||!newProduct.image){
//             return {success:false , message:'Please fill in all fields.'}
//         }
//         const res = await fetch("/api/products",{
//             method:'POST',
//             headers:{
//                 'Content-Type':"application/json"
//             },
//             body:JSON.stringify(newProduct)
//         })
//         const data = await res.json()
//         set((state)=>({products:[...state.products,data.data]}))
//         return {success:true , message:'Product Created Successfully.'}
//     },

//     fetchProducts : async()=>{
//         const res =await fetch("/api/products")
//         const data = await res.json()
//         set({products:data.data})
//     },

//     deleteProduct: async(pid)=>{
//         const res = await fetch(`api/products/${pid}`, {
//             method:'DELETE',
//         })
//         const data = await res.json()
//         if(!data.success) return{success:false,message:data.message}

//         set(state =>({products:state.products.filter(products=>products._id!==pid)}))//update the ui immediatly
//         return{success:true,message:data.message}
//     },

//     updateProduct: async (pid, updatedProduct) => {  // Add updatedProduct parameter
//         const res = await fetch(`/api/products/${pid}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(updatedProduct)  // Send the updated product data
//         });
        
//         const data = await res.json();
        
//         if (!data.success) return { success: false, message: data.message };
    
//         // Update state correctly
//         set(state => ({
//           products: state.products.map(product => 
//             product._id === pid ? data.data : product  // Fix variable name typo
//           )
//         }));
        
//         return { success: true, message: data.message };
//     }
// }))
import { useState } from 'react'
import {create} from 'zustand' 

export const useProductStore = create(( set)=>({
    
    products:[],
    setProducts:(products)=>set({products}),
    createProduct: async (newProduct)=>{
        if(!newProduct.name ||!newProduct.price||!newProduct.image){
            return {success:false , message:'Please fill in all fields.'}
        }
        cosnt [loader,setLoader]=useState(false)
        const res = await fetch("/api/products",{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json()
        set((state)=>({products:[...state.products,data.data]}))
        return {success:true , message:'Product Created Successfully.'}
    },

    fetchProducts : async()=>{
        const res =await fetch("/api/products")
        const data = await res.json()
        set({products:data.data})
    },

    deleteProduct: async(pid)=>{
        const res = await fetch(`api/products/${pid}`, {
            method:'DELETE',
        })
        const data = await res.json()
        if(!data.success) return{success:false,message:data.message}

        set(state =>({products:state.products.filter(products=>products._id!==pid)}))//update the ui immediatly
        return{success:true,message:data.message}
    },

    updateProduct: async (pid, updatedProduct) => {  // Add updatedProduct parameter
        const res = await fetch(`/api/products/${pid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedProduct)  // Send the updated product data
        });
        
        const data = await res.json();
        
        if (!data.success) return { success: false, message: data.message };
    
        // Update state correctly
        set(state => ({
          products: state.products.map(product => 
            product._id === pid ? data.data : product  // Fix variable name typo
          )
        }));
        
        return { success: true, message: data.message };
    }
}))