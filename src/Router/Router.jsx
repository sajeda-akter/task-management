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
import AdminRoute from "../components/Dashboard/AdminRoute/AdminRoute";
import Payment from "../components/Dashboard/Payment/Payment";
import PaymentHistory from "../components/Dashboard/PaymentHistory/PaymentHistory";

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
                loader:({params})=>fetch(`https://task-management-server-six-zeta.vercel.app/task/${params.id}`),
                element:<TaskDetails/>
            },
            {
                path:'mytask',
                element:<UserTask/>
            },
            {
                path:'task',
                element:<AdminRoute><Task/></AdminRoute>
            },
            {
                path:'paymentHistory',
                element:<PaymentHistory/>
            },
            {
                path:'alltask',
                element:<AdminRoute><AllTask/></AdminRoute>
            },
            {
                path:'profile',
                element:<ProfileSetting/>
            },
            {
                path:'employee',
                element:<AdminRoute><Employees/></AdminRoute>
            },
            {
                path:'payment/:id',
                loader:({params})=>fetch(`https://task-management-server-six-zeta.vercel.app/users/${params.id}`),
                element:<AdminRoute><Payment/></AdminRoute>
            }
        ]
    }

])