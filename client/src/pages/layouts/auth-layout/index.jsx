import {Suspense} from "react";
import {Outlet} from "react-router-dom";

// TODO: add spinnger
const AuthLayout = () => {
    return (
        <>
            <Suspense fallback={<div>loading...</div>}>
                <Outlet />
            </Suspense>
        </>
    )
}

export default AuthLayout