import { useSelector } from 'react-redux'
import ButtonSwitch from './buttonSwitch'
import FavCart from './FavCart'

export default function Favourites () {
    const favourites = useSelector(store => store.favourites)
    const degree = useSelector(store => store.degree)

    return(
        <div className='favourites'>
            <ButtonSwitch />
            <ul className='row row-cols-1 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 mt-5'>
                {favourites.length===0 && <div className='p-5 w-100 text-center fs-3 font-monospace'>No cities in favourites</div>}
                {favourites.map((el,index) => <FavCart key={index} id={el.id} city={el.city} text={el.weatherText} temp={degree === '℃'? el.weather:((el.weather*1.8)+32).toFixed()} />)}
            </ul>
        </div>
    )
}