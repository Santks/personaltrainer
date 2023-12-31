import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./addCustomer";
import { Button, Snackbar } from "@mui/material";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);

    const columns = [

        { field: "firstname", headerName: "Firstname", sortable: true, filter: true },
        { field: "lastname", headerName: "Lastname", sortable: true, filter: true },
        { field: "streetaddress", headerName: "Street Address", sortable: true, filter: true },
        { field: "postcode", headerName: "Post Code", sortable: true, filter: true },
        { field: "city", headerName: "City", sortable: true, filter: true },
        { field: "email", headerName: "Email", sortable: true, filter: true },
        { field: "phone", headerName: "Phone", sortable: true, filter: true },
        {
            field: "Actions",
            cellRenderer: row => <EditCustomer customer={row.data} updateCustomer={updateCustomer} />,
            width: 115
        },
        {
            cellRenderer: params => <Button color="error" variant="outlined" onClick={() => {
                const confirmation = window.confirm("Are you sure you want to delete this customer?")
                if (confirmation) {
                    deleteCustomer(params)
                } else {
                    getCustomers();
                }
            }}>Delete
                <DeleteForeverIcon />
            </Button>,
            width: 160
        },
        {
            cellRenderer: row => <AddTraining customer={row.data} addNewTraining={addNewTraining} />,
            width: 220
        }
    ]

    useEffect(() => getCustomers(), []);

    const customerLink = "https://traineeapp.azurewebsites.net/api/customers";

    const getCustomers = () => {
        fetch(customerLink)
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(err => consoler.error(err))
    }

    const addNewCustomer = (customer) => {
        fetch(customerLink, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg("Customer added!")
                    setOpen(true)
                    getCustomers();
                } else
                    alert("Something went wrong while trying to add a new customer")
            })
            .catch(err => consoler.error(err));
    }

    const deleteCustomer = (params) => {
        const updatedLink = params.data.links[0].href.replace("http://", "https://")
        fetch(updatedLink, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    setMsg("Customer deleted successfully!");
                    setOpen(true)
                    getCustomers();
                } else {
                    alert("Something went wrong!")
                }
            })
            .catch(err => console.error(err))
    }

    const updateCustomer = (customer, customerLink) => {
        fetch(customerLink, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg("Changes saved!");
                    setOpen(true)
                    getCustomers();
                } else {
                    alert("Failed to update car")
                }
            })
            .catch(err => console.error(err))
    }

    const addNewTraining = (training) => {
        fetch(trainingLink, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    setMsg("Training added!")
                    setOpen(true)
                } else {
                    console.error("Error adding new training:", response.statusText);
                    alert("Something went wrong while trying to add a new training")
                }
            })
            .catch(err => console.error(err));
    }

    const trainingLink = "https://traineeapp.azurewebsites.net/api/trainings";

    const gridRef = useRef();

    const csvExport = useCallback(() => {
        const params = {
            columnKeys: ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"]
        }
        gridRef.current.api.exportDataAsCsv(params);
    }, [])

    return (
        <>
            <AddCustomer addNewCustomer={addNewCustomer} />
            <Button variant="contained" style={{ marginTop: "5px", marginLeft: "10px", marginBottom: "5px ", background: "green" }} onClick={csvExport}>
                Export to CSV
                <FileDownloadIcon />
            </Button>
            <div className="ag-theme-material"
                style={{ height: "700px", width: "90%", margin: "auto" }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={customers}
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

export default Customerlist;