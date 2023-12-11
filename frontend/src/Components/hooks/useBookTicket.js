import { useState } from "react";

export const useBookTicket = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const bookTicket = async (email, seatName, showtimeID) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8000/api/bookTickets', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, seatName, showtimeID})
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

    return {bookTicket, isLoading, error}

}