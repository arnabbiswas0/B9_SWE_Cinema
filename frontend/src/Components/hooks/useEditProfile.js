import { useState } from "react";

export const useEditProfile = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const editProfile = async (email, name, phone, streetname, city, zip, state) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8000/api/updateProfile', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, name,  phone, streetname, city, zip, state})
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

    return {editProfile, isLoading, error}

}