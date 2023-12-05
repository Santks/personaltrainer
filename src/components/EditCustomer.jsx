import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

function EditCustomer(props) {

    const [customer, setCustomer] = useState(props.customer);
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason !== "backDropClick")
            setOpen(false);
    }

    const handleInput = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    const saveChanges = () => {
        const updatedLink = props.customer.links[0].href.replace("http://", "https://")
        props.updateCustomer(customer, updatedLink);
        setOpen(false)
    }

    return (
        <>
            <Button variant="outlined" color="success" onClick={() => setOpen(true)}>Edit <EditIcon /></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer information</DialogTitle>
                <DialogContent>
                    <TextField style={{ marginBottom: "8pxx", marginRight: "5px", marginTop: "8px" }}
                        label="Firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInput}
                    />
                    <TextField style={{ marginBottom: "8px", marginTop: "8px" }}
                        label="Lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInput}
                    />
                    <TextField style={{ marginBottom: "8px", marginRight: "5px" }}
                        label="Street address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleInput}
                    />
                    <TextField style={{ marginBottom: "8px" }}
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleInput}
                    />
                    <TextField style={{ marginBottom: "8px", marginRight: "5px" }}
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={handleInput}
                    />
                    <TextField style={{ marginBottom: "8px" }}
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Phone number"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="error">Close <CancelIcon /></Button>
                    <Button onClick={saveChanges} variant="contained" color="success">Save changes <SaveIcon /></Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default EditCustomer;