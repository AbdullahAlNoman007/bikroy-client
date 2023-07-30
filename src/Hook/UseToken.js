import { useEffect, useState } from "react"


const useToken=(email)=>{
    const [token ,setToken]=useState('')
    useEffect(()=>{
        if(email){
            fetch(`https://bikroy-server.vercel.app/jwt?email=${email}`)
            .then(res=>res.json())
            .then(data=>{
                setToken(data.accessToken)
                localStorage.setItem('accesstoken',data.accessToken)
            })
        }
    },[email])
    return token

}
export default useToken