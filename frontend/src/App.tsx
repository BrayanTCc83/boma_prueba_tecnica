import router from "./router/Router";
import SesionContextProvider from "./auth/SesionContext/SesionContext";

import { RouterProvider } from "react-router-dom";

const App = () => {
    return <SesionContextProvider>
        <RouterProvider router={router}/>
    </SesionContextProvider>;
};

export default App;