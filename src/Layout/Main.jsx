import { Outlet } from "react-router-dom";
import Navmenu from "../components/Pages/Shared/Navmenu/Navmenu";

const Main = () => {
    return (
        <div >
            <Navmenu/>
            <Outlet/>
            
        </div>
    );
};

export default Main;