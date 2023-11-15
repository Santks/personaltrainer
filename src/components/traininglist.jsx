import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    const columns = [
        { field: "date", headerName: "Date", sortable: true, filter: true },
        { field: "duration", headerName: "Duration", sortable: true, filter: true },
        { field: "activity", headerName: "Activity", sortable: true, filter: true },
    ]

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        fetch(trainingLink)
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData.content)
            })
            .catch(err => consoler.error(err))
    }

    const trainingLink = "https://traineeapp.azurewebsites.net/api/trainings";

    return (
        <>
            <div className="ag-theme-material"
                style={{ height: "700px", width: "95%", margin: "auto" }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    sortable={true}
                    animateRows={true}>
                </AgGridReact>

            </div>
        </>
    )

}

export default Traininglist;