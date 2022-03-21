import { useDispatch, useSelector} from 'react-redux'
import { switchDegree } from "../actions/weatherActions";

export default function ButtonSwitch () {
    let dispatch = useDispatch()
    const degree = useSelector(store => store.degree)

    const handleClick = () => {
        dispatch(switchDegree())
    }
    return (
        <button onClick={handleClick} className="p-3 fs-5 bg-success border-dark rounded">{degree}</button>
    )
}