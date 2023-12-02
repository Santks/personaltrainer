import { Button } from "@mui/material";
import { useRouteError } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

function Error() {

    const error = useRouteError();
    console.log(error);

    return (
        <div style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <h1>An error happened</h1>
            <p>{error.data}</p>
            <Button variant="contained" color="success">
                <Link to={"/personaltrainer/"} style={{ color: "white", }}>Back to home page</Link>
            </Button>
            <Outlet />
        </div>
    )
}

export default Error;