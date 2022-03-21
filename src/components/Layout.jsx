import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useSelector} from 'react-redux'

export default function Layout() {
    let theme = useSelector(store => store.theme)
    

    return(
        <div className={theme}>
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}