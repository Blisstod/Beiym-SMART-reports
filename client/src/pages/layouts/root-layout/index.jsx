import {Outlet} from "react-router-dom";
import {Suspense} from "react";
import Navbar from "../../../components/navbar";
import {Row} from "react-bootstrap";


// TODO: add spinner component
const RootLayout = () => {

    return (
        <div className={'d-flex'}>
            <div className={'col-2'}>
                <Navbar />
            </div>
            <div className={'col-10'}>
                <Suspense fallback={<div>loading...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}

export default RootLayout