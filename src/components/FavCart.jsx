import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCity } from "../actions/weatherActions";

export default function FavCart(props) {
    const toLink = useNavigate()
    const degree = useSelector(store => store.degree)
    const dispatch = useDispatch()

    return (
        <li role='button' className="col fs-5 mb-3" onClick={() => {
             dispatch(setCity(props.id, props.city))
             toLink('/')
        }}>
            <div className="border border-success rounded text-primary w-100 fw-bold d-flex flex-column align-items-center">
                <p className='fs-3 mt-3'>{props.city}</p>
                <p className="mb-5">{props.temp} {degree}</p>
                <p className="mb-t fs-3">{props.text}</p>
            </div>
        </li>
    )
}