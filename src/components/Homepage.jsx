import { useState, useEffect } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../actions/weatherActions";
import MainInfo from "./MainInfo";
import useGeolocation from "../hooks/useGeolocation";

export default function Homepage () {
    let [input, setInput] = useState('')
    let [cities, setCities] = useState([])
    let {id,city} = useSelector(store => store.city)
    let key = useSelector(store => store.key)
    let dispatch = useDispatch()
    let state = useGeolocation()

    const setLocation = () => {
        dispatch(setCity(state.id,state.city))
    }

    const handleClick = (id, city) => {
        dispatch(setCity(id,city))
        setInput("")
        setCities([])
    }

    useEffect(() => {
        if(input === "") {
            setCities([])
            return
        }else {
            fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${input}`)
            .then(res => res.json())
            .then(data => setCities(data.map(el=> <li key={el.Key} onClick ={() => handleClick(el.Key, el.LocalizedName )} className='bg-opacity-75 fw-bold bg-primary py-3 font-monospace'><span>{el.LocalizedName} / </span><span>{el.Country.LocalizedName}</span></li>)))
        }
    },[input])

    return(
        <>  
            <button className='m-1 border rounded bg-primary border-1 bg-success p-3' onClick={setLocation}>Set Current Location</button>
            <div className="mt-5 d-flex align-items-center flex-column ">
                <InputGroup className="mb-3 w-50 position-relative">
                    <InputGroup.Text className='border-dark w-'>Start typing...</InputGroup.Text>
                    <FormControl
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="City"
                    className="border-dark"
                    />   
                    <ul className='position-absolute top-100 d-flex flex-column fs-5 w-100 text-center '>
                        {input.length !== 0 && cities.length === 0 ? <div className="fs-4 text-danger position-absolute start-50">No match</div>:cities}
                    </ul>
                </InputGroup>
                
            </div>
            <MainInfo city={city} id={id} />
        </>
    )
}