import { useState } from "react";

export const useGetShowtime = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const addShowtime = async (title, date) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8000/api/getShowtimes', {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({title, date})
        })
        const json = await response.json(title, date) 
        console.log(response);
        if(!(response.status == 200)){
            setIsLoading(false)
            setError(json.error)
        }
        else if(response.ok){
            setIsLoading(false)
        }
    }

    return {getShowtime, isLoading, error}

}