import { createStore } from "redux";
import weatherReducer from "../reducers/weatherReducers";



const initState = {
    favourites:[
    ],
    city:{id:215854,city:'Tel Aviv'},
    degree:'℃',
    theme:'',
    key:'VYuNk6DiZgk7suS1iYMQTiV8GS1lh1tu'
}



const store = createStore(weatherReducer, initState)
export default store;