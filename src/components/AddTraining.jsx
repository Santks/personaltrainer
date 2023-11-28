import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select } from "@mui/material";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function AddTraining(props) {

    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
        customer: props.customer.links[0].href
    });

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason !== "backDropClick")
            setOpen(false);
    }

    const handleInput = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const handleDateTimeChange = (date) => {
        setTraining({ ...training, date });
    };

    const save = () => {
        props.addNewTraining(training)
        console.log(training.customer)
        console.log(props.customer)
        setOpen(false)
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Button style={{ marginTop: "5px" }} variant="outlined" onClick={() => setOpen(true)}>New training</Button>
                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle>Add new training to the list</DialogTitle>
                    <DialogContent >
                        <div style={{ marginTop: "10px" }}>
                            <DateTimePicker
                                label="Date"
                                name="date"
                                value={training.date}
                                onChange={handleDateTimeChange}
                            />
                            <TextField
                                label="Duration"
                                name="duration"
                                value={training.duration}
                                onChange={handleInput}
                                style={{ marginLeft: "5px" }}
                            />
                            <TextField
                                label="Activity"
                                name="activity"
                                value={training.activity}
                                onChange={handleInput}
                                style={{ marginTop: "10px" }}
                            />
                            <TextField
                                label="Customer"
                                name="customer"
                                value={props.customer.firstname + " " + props.customer.lastname}
                                InputProps={{
                                    readOnly: true
                                }}
                                style={{ marginLeft: "5px", marginTop: "10px" }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button variant="contained" onClick={save} >Add training</Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </>
    );
}

export default AddTraining;