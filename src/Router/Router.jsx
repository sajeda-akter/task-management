import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../components/Pages/Home/Home";
import Login from "../components/Pages/Register/Login";
import Signup from "../components/Pages/Register/Signup";
import Task from "../components/Pages/Task/Task";
import Dashboard from "../components/Dashboard/Dashboard";
import TaskDetails from "../components/Pages/Task/TaskDetails/TaskDetails";
import AllTask from "../components/Pages/Task/AllTask/AllTask";
import UserTask from "../components/Pages/Task/UserTask/UserTask";
import PrivateRouter from "./PrivateRouter";
import ProfileSetting from "../components/Pages/ProfileSetting/ProfileSetting";
import Employees from "../components/Dashboard/EmployList/Employees";

export const routers=createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
           
           
        ]

    },
    {
        path:'/dashboard',
        element:<PrivateRouter><Dashboard/></PrivateRouter>,
        children:[
            {
                path:'taskdetails/:id',
                loader:({params})=>fetch(`http://localhost:5000/task/${params.id}`),
                element:<TaskDetails/>
            },
            {
                path:'mytask',
                element:<UserTask/>
            },
            {
                path:'task',
                element:<Task/>
            },
            {
                path:'alltask',
                element:<AllTask/>
            },
            {
                path:'profile',
                element:<ProfileSetting/>
            },
            {
                path:'employee',
                element:<Employees/>
            }
        ]
    }

])