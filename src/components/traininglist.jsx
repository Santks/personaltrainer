import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { Button, Snackbar } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);

    const columns = [
        {
            field: "date", headerName: "Date", sortable: true, filter: true, valueFormatter: function (params) {
                return dayjs(params.value).format("DD.MM.YYYY - HH:mm")
            }
        },
        { field: "duration", headerName: "Duration", sortable: true, filter: true },
        { field: "activity", headerName: "Activity", sortable: true, filter: true },
        { field: "customer.firstname", headerName: "Customer: Firstname", sortable: true, filter: true },
        { field: "customer.lastname", headerName: "Lastname", sortable: true, filter: true },
        {
            field: "Actions", cellRenderer: params => <Button color="error" variant="outlined" onClick={() => {
                const confirmation = window.confirm("Do you want to delete this training?")
                if (confirmation) {
                    deleteTraining(params.data.id)
                } else {
                    getTrainings();
                }
            }}>Delete
                <DeleteForeverIcon />
            </Button>
        }
    ]

    useEffect(() => getTrainings(), []);

    const trainingLink = "https://traineeapp.azurewebsites.net/gettrainings";
    const deleteLink = "https://traineeapp.azurewebsites.net/api/trainings"

    const getTrainings = () => {
        fetch(trainingLink)
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData)
            })
            .catch(err => console.error(err))
    }

    const deleteTraining = (params) => {
        fetch(`${deleteLink}/${params}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    setMsg("Training deleted successfully!");
                    setOpen(true)
                    getTrainings();
                } else {
                    alert("Something went wrong!")
                }
            })
            .catch(err => console.error(err))
    }

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
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg} >
                </Snackbar>

            </div>
        </>
    )
}

export default Traininglist;