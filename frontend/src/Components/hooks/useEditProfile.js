import { useState } from "react";

export const useEditProfile = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const editProfile = async (email, name, streetname, city, zip, state, expirationDate, cvv) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8080/api/updateProfile', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, name, streetname, city, zip, state, expirationDate, cvv})
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