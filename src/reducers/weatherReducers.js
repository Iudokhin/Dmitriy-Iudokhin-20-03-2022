import {
    ADD_GEO,
  ADD_KEY,
  SET_CITY,
  SWITCH_DEGREE,
  SWITCH_THEMES,
  TO_FAVOURITES,
} from "../actions/weatherActions";

export default function weatherReducer(state, action) {
  switch (action.type) {
    case TO_FAVOURITES:
      let favouritesUpd = [...state.favourites];
      if (action.payload.action === "DEL") {
        return {
          ...state,
          favourites: favouritesUpd.filter((el) => el.id !== action.payload.id),
        };
      }
      return {
        ...state,
        favourites: [
          ...state.favourites,
          {
            id: action.payload.id,
            city: action.payload.city,
            weatherText: action.payload.weatherText,
            weather: action.payload.weather,
          },
        ],
      };
    case SET_CITY:
      return { ...state, city:{id:action.payload.id, city:action.payload.city} };
    case SWITCH_DEGREE:
      return { ...state, degree: state.degree === "℃" ? "℉" : "℃" };
    case SWITCH_THEMES:
      return { ...state, theme:state.theme===''?'dark':'' };
    case ADD_KEY:
        return { ...state, key:action.payload};
    default:
      return { ...state };
  }
}
