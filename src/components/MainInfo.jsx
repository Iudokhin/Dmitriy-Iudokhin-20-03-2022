import FiveDaysForecast from "./FiveDaysForecast";
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { toFavourites } from "../actions/weatherActions";
import ButtonSwitch from "./buttonSwitch";
import { errorCity, errorForecast } from "./errorBase";


export default function MainInfo (props) {
    let [weather, setWeather] = useState({
        currentCityWeather:'',
        nextFiveDays:[]
    })
    const {favourites, degree, key} = useSelector(store => store)

    let isFavourite = favourites.some(el => el.id === props.id)
    let dispatch = useDispatch()

    useEffect(() => {

        const apiCurrentWeather = fetch(`https://dataservice.accuweather.com/currentconditions/v1/${props.id}?apikey=${key}`).then(res => res.json())
        const apiWeekWeather = fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.id}?apikey=${key}`).then(res => res.json())

        Promise.all([apiCurrentWeather, apiWeekWeather])
            .then(data => {
                setWeather({
                    currentCityWeather:{...data[0][0], Temperature:data[0][0].Temperature.Metric.Value},
                    nextFiveDays:data[1].DailyForecasts
                })        
            })
            .catch(error => {
                setWeather({
                    currentCityWeather:errorCity,
                    nextFiveDays:errorForecast
                }) 
            })
    },[props])

    const changeFavourites = () => {
        isFavourite? dispatch(toFavourites(props.id, props.city,weather.currentCityWeather.WeatherText, weather.currentCityWeather.Temperature , 'DEL')):dispatch(toFavourites(props.id, props.city,weather.currentCityWeather.WeatherText,weather.currentCityWeather.Temperature, 'ADD'))
    }

    return(
        <div className="border-dark border p-4 rounded">
            <div className='row row-cals-2 row-cols-md-3 align-items-center'>
                <div className='d-flex col-11 col-sm-11 col-lg-2 col-md-3'>
                    <img src={`/images/${weather.currentCityWeather.WeatherIcon}-s.png`}/>
                    <div className="d-flex flex-column gap-3 ms-3 fw-bold align-items-center fs-3">
                        <div>{props.city}</div>
                        {degree === '℃'? <div className='fs-5'>{weather.currentCityWeather.Temperature} {degree}</div>:<div className='fs-5'>{((weather.currentCityWeather.Temperature*1.8)+32).toFixed()} {degree}</div>}
                    </div>
                </div>
                <div className='col-1 col-sm-1 col-lg-2 col-md-2 d-flex justify-content-center'><ButtonSwitch/></div>
                <div className='like-block d-flex align-items-center gap-3 col-lg-8 col-md-7 justify-content-end'>
                    <button className="fs-5 border border-dark p-3 rounded" onClick={changeFavourites}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill={isFavourite?"red":'black'} className="bi bi-heart me-3" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                        {isFavourite?"Remove from ":"Add to "}Favourites
                    </button>
                </div>
            </div>
            <div className="mainInfo-text">
                <div >{weather.currentCityWeather.WeatherText}</div>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-2">
                {weather.nextFiveDays.map((el,index) => <FiveDaysForecast key={index} {...el} />)}
            </div>
        </div>
    )
}