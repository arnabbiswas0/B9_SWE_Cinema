import { useState } from "react";

export const useAddShowtime = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const addShowtime = async (startDate, endDate, times, roomNum, title) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8000/api/addShowtimes', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({startDate : startDate, endDate : endDate, times : times, room : roomNum, movie : title})
        })
        console.log("startdate: " + times)
        const json = await response.json(startDate, endDate, times, roomNum, title) 
        console.log(response);
        if(!(response.status == 200)){
            setIsLoading(false)
            setError(json.error)
        }
        else if(response.ok){
            setIsLoading(false)
        }
    }

    return {addShowtime, isLoading, error}

}