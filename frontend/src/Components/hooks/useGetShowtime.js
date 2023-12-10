import { useState } from "react";

export const useGetShowtime = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const getShowtime = async (title, date) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8000/api/getShowtimes', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({title, date})
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

    return {getShowtime, isLoading, error}

}