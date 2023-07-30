import { useEffect } from "react"
import { useState } from "react"

const useSeller=email=>{
    const [isSeller,setIsSeller]=useState(false)
    const [isSellerLoading,setIsSellerLoading]=useState(true)
    useEffect(()=>{
        if(email){
            fetch(`https://bikroy-server.vercel.app/isseller/${email}`)
            .then(res=>res.json())
            .then(data=>{
                setIsSeller(data.isadmin)
                setIsSellerLoading(false)
            })
        }
    },[email])
    return [isSeller,isSellerLoading]
}
export default useSeller