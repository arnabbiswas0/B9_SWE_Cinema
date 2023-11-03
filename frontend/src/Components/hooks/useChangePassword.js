import { useState } from "react";

export const useChangePassword = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const changePassword = async (email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://arnabbiswas1.ddns.net:8000/api/changePassword', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json() 
        console.log(response);
        if(!(response.status == 200)){
            setIsLoading(false)
            setError(json.error)
        }
        else if(response.ok){
            setIsLoading(false)
        }
    }

    return {changePassword, isLoading, error}

}