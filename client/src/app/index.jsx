import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {router} from "../pages";

import './style/index.sass'
import {store} from "../store";

const App = () => {

    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}

export default App