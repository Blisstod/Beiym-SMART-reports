import {Outlet} from "react-router-dom";
import {Suspense} from "react";


// TODO: add spinner component
const RootLayout = () => {

    return (
        <>

            <Suspense fallback={<div>loading...</div>}>
                <Outlet />
            </Suspense>
        </>
    )
}

export default RootLayout