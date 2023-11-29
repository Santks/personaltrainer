import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react"

function TrainingCalendar() {

    const localizer = dayjsLocalizer(dayjs);

    const [trainings, setTrainings] = useState([]);

    const trainingLink = "https://traineeapp.azurewebsites.net/gettrainings";

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        fetch(trainingLink)
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData)
            })
            .catch(err => console.error(err))
    }

    const events = trainings ? trainings.map(training => ({
        start: new Date(training.date),
        end: dayjs(training.date).add(training.duration, 'minutes').toDate(),
        title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`
    })) : [];

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "450px", marginTop: "10px" }}
            />
        </div>
    )
}

export default TrainingCalendar;