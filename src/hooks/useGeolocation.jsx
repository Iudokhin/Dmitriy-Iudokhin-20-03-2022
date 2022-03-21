import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function useGeolocation() {
    const [city, setCity] = useState({
        city:"Tel Aviv",
        id:215854
    })
    let key = useSelector(state => state.key)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${position.coords.latitude}%2C%20${position.coords.longitude}`)
                .then(res => res.json())
                .then(data => setCity({city:data.LocalizedName, id:data.Key}))
                .catch(err => err)
                
          });   
    },[])


    return city
}