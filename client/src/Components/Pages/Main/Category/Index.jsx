import { Outlet, useLocation } from "react-router-dom";
import HOC from "../../../../helpers/HOC";
import CategoryList from "./CategoryList";



function Category() {
    const location = useLocation;
    return location().pathname !== "/category" ? (
        <Outlet />
    ) : (
        <>
            <HOC child={CategoryList} />
        </>
    );
}

export default Category;
