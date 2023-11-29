import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./addCustomer";
import { Button, Snackbar } from "@mui/material";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

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
            cellRenderer: row => <EditCustomer customer={row.data} updateCustomer={updateCustomer} />
        },
        {
            cellRenderer: params => <Button color="error" variant="outlined" onClick={() => {
                const confirmation = window.confirm("Are you sure you want to delete this customer?")
                if (confirmation) {
                    deleteCustomer(params)
                } else {
                    getCustomers();
                }
            }}>Delete</Button>
        },
        {
            cellRenderer: row => <AddTraining customer={row.data} addNewTraining={addNewTraining} />
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
        fetch(params.data.links[0].href, { method: "DELETE" })
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
        gridRef.current.api.exportDataAsCsv();
    }, [])

    return (
        <>
            <AddCustomer addNewCustomer={addNewCustomer} />
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
                <Button variant="contained" style={{ marginBottom: "10px" }} onClick={csvExport}>Export to CSV</Button>
            </div>
        </>
    )

}

export default Customerlist;