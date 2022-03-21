import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./components/Homepage";
import Favourites from "./components/Favourites";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addYourKey } from "./actions/weatherActions";

export default function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    let key = prompt("If you have your own key on AccuWeather, plase enter it below","");
    if (key === null || key === "" || key.length<30) return;

    fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/215854?apikey=${key}`)
    .then((res) => {
      if (res.ok) {
        dispatch(addYourKey(key));
      }
    })
    .catch(err => alert('wrong key'))

  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </>
  );
}
