export const TO_FAVOURITES = "TO_FAVOURITES";
export const SWITCH_DEGREE = "SWITCH_DEGREE";
export const SET_CITY = "SET_CITY";
export const SWITCH_THEMES = "SWITCH_THEMES";
export const ADD_GEO = "ADD_GEO";
export const ADD_KEY = "ADD_KEY";

export const toFavourites = (id, city,weatherText, weather, action) => ({
  type: TO_FAVOURITES,
  payload: {
      id,city,weatherText, weather,action
  }
});

export const setCity = (id,city) => ({
  type: SET_CITY,
  payload: {id,city},
});

export const switchDegree = () => ({
    type: SWITCH_DEGREE,
  });

  export const switchThemes = () => ({
    type: SWITCH_THEMES,
  });
  export const addYourKey = (key) => ({
    type: ADD_KEY,
    payload:key
  });


