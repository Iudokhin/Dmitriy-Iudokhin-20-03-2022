import { useSelector } from "react-redux"

export default function FiveDaysForecast(props) {
    const dayOfWeek = new Date(Date.parse(props.Date)).toString().slice(0,3)
    let degree = useSelector(state => state.degree)

    return (
        <div className="d-flex align-items-center flex-column gap-4">
            <div className="border-dark border rounded p-5 d-flex flex-column">
                <div className="mb-2 fs-3 fw-bold text-center">{dayOfWeek}</div>
                <div className="d-flex align-items-center"><img src={`/images/${props.Day.Icon}-s.png`} /><span>DAY</span></div>
                <div className="d-flex align-items-center"><img src={`/images/${props.Night.Icon}-s.png`} /><span>Night</span></div>
                <div className='mt-4'>
                    {degree === '℃' ? (
                        <>
                            <div className="d-flex justify-content-between"><p>Max</p><p>{(props.Temperature.Maximum.Value-32)/1.8.toFixed()}</p></div>
                            <div className="d-flex justify-content-between"><p>Min</p><p>{(props.Temperature.Minimum.Value-32)/1.8.toFixed()}</p></div>
                        </>
                    ):
                    (
                        <>
                            <div className="d-flex justify-content-between"><p>Max</p><p>{props.Temperature.Maximum.Value}</p></div>
                            <div className="d-flex justify-content-between"><p>Min</p><p>{props.Temperature.Minimum.Value}</p></div>
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    )
}