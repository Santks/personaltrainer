import { useRouteError } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

function Error() {

    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h1>An error happened</h1>
            <p>{error.data}</p>
            <Link to={"/"}>Back to home page</Link>
            <Outlet />
        </div>
    )
}

export default Error;