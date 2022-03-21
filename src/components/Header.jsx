import { useRef,useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { switchThemes } from "../actions/weatherActions";

export default function Header () {
    const location = useLocation().pathname
    const buttonHome = useRef(null)
    const buttonFavourites = useRef(null)
    const dispatch = useDispatch()


    useEffect(() => {
        if(location === '/'){
            buttonHome.current.classList.add('bg-success')
            buttonFavourites.current.classList.remove('bg-success')
        }else{
            buttonFavourites.current.classList.add('bg-success')
            buttonHome.current.classList.remove('bg-success')
        }
    },[location])
    
    

    return(
        <div className='d-flex justify-content-between py-2 align-items-center fs-4 border-bottom px-4 border-2 border-dark bg-dark'>
            <h1 className='text-white'>Herolo Weather App</h1>
            <button onClick={() => dispatch(switchThemes())} className='bg-info p-2 rounded'>switch themes</button>
            <div className="d-flex gap-2">
                <div ref={buttonHome} className='h-100 rounded p-3'>
                    <NavLink  className='text-info' to='/'>Home</NavLink>
                </div>
                <div ref={buttonFavourites} className='h-100 rounded p-3'>
                    <NavLink className='text-info' to='/favourites'>Favourites</NavLink>
                </div>
            </div>
        </div>
    )
}