import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Customerlist() {

    const [customers, setCustomers] = useState([]);

    const columns = [
        { field: "firstname", headerName: "Firstname", sortable: true, filter: true },
        { field: "lastname", headerName: "Lastname", sortable: true, filter: true },
        { field: "streetaddress", headerName: "Street Address", sortable: true, filter: true },
        { field: "postcode", headerName: "Post Code", sortable: true, filter: true },
        { field: "city", headerName: "City", sortable: true, filter: true },
        { field: "email", headerName: "Email", sortable: true, filter: true },
        { field: "phone", headerName: "Phone", sortable: true, filter: true }
    ]

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch(customerLink)
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(err => consoler.error(err))
    }

    const customerLink = "https://traineeapp.azurewebsites.net/api/customers";

    return (
        <>
            <div className="ag-theme-material"
                style={{ height: "700px", width: "95%", margin: "auto" }}>
                <AgGridReact
                    rowData={customers}
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

export default Customerlist;