import { useState } from "react";

export const useGetUnreservedSeats = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const getUnreservedSeats = async (showtimeID) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8000/api/getUnreservedSeats', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({showtimeID})
        })
        const json = await response.json() 
        //console.log(json);
        if(!(response.status == 200)){
            setIsLoading(false)
            setError(json.error)
        }
        else if(response.ok){
            setIsLoading(false)
        }
        return json;
    }

    return {getUnreservedSeats}

}