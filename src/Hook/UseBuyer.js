import { useEffect } from "react"
import { useState } from "react"

const useBuyer=email=>{
    const [isBuyer,setIsBuyer]=useState(false)
    const [isBuyerLoading,setIsBuyerLoading]=useState(true)
    useEffect(()=>{
        if(email){
            fetch(`https://bikroy-server.vercel.app/isbuyer/${email}`)
            .then(res=>res.json())
            .then(data=>{
                setIsBuyer(data.isbuyer)
                setIsBuyerLoading(false)
            })
        }
    },[email])
    return [isBuyer,isBuyerLoading]
}

export default useBuyer