import { Routes, Route } from "react-router-dom";

import Home from "../Components/Pages/Home";

function Router() {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
        </Routes>
    );
}

export default Router;