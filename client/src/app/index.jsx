import {RouterProvider} from "react-router-dom";
import {router} from "../pages";

import './style/index.sass'

const App = () => {

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App