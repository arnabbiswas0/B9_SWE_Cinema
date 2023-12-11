import { useState } from "react";

export const useAddCard = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const addCard = async (email, cardNumber, type, cvv, exp, nameOnCard) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8000/api/addCard', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, cardNumber, type, cvv, exp, nameOnCard})
        })
        const json = await response.json(); 
        console.log(response);
        if(!(response.status == 200)){
            setIsLoading(false)
            setError(json.error)
        }
        else if(response.ok){
            setIsLoading(false)
        }
    }

    return {addCard, isLoading, error}

}