import React from 'react'
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react"

function Home() {

    const [userData, setUserData] = useState({})
    const baseUrl = `http://localhost:5000/api`;
    const navigate = useNavigate()
    useEffect(async() => {
        
       if(localStorage.token){
            const homepageUrl = `${baseUrl}/`
            const response_raw = await fetch(homepageUrl, {
                method:"GET",
                headers:{
                    "authToken" : localStorage.getItem("token")
                }
            })
            const response = await response_raw.json()
            setUserData(response)
       }else{
            navigate("/login")
       }
    }, [])
    return (
        <div>
            Hi, {userData.username}
        </div>
    )
}

export default Home
