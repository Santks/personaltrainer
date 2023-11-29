import { AppBar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function App() {

  return (
    <div className='App'>
      <AppBar position='sticky'>
        <Typography variant='h6'>
          Personal trainer app
        </Typography>
      </AppBar>
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link to={"/"}> Home</Link>
        <Link to={"/trainings"}>Trainings</Link>
        <Link to={"/customers"}>Customers</Link>
        <Link to={"/calendar"}>Calendar</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
