import {Route, Routes} from "react-router-dom";
import ChatInterface from "../../components/SendMessage";
import MessagePage from "../../components/MessagePage";
import Result from "../Coordinator/Result";
import CalendarPage from "../../components/Calendar/CalendarPage";
import CalendarView from "../../components/Calendar/CalendarView";
import Newss from "../../Newss";
import DynamicForm from "../Admin/FormInsertion";
import AdminRoute from "./AdminRoute";
import Insertion from "../Admin/Insertion";
import CoDashboard from "../Coordinator/CoDashboard";
import LayoutNews from "../../components/LayoutNews";
import Home from "../Home/Home";
import Courses from "../Courses/Courses";
import About from "../About/About";
import News from "../News/News";
import SignInSide from "../Contact/Login";
import FileUpload from "../Admin/FileUpload";
import FileUploadToApi from "../Admin/FileUploadToApi";
import MainPage from "../Admin/Main";
import UsersPage from "../Admin/UsersPage";
import Dashboard from "../Admin/Dashboard";
import Dashboard2 from "../Admin/Dashboard2";
import AdminRoutes from "../../AdminRoutes";
import React from "react";

export  function Routing(){
    return(
    <Routes>
        <Route path="/sendMessage" element={<ChatInterface />} />
        <Route path="/MessagePage" element={<MessagePage />} />
        <Route path="/result" element={<Result />} />
        <Route path="/forminsertion" element={<DynamicForm />} />

        <Route path="/addCalendar" element={<CalendarPage />} />
        <Route path="/view" element={<CalendarView />} />
        <Route path="/sendMessage/:recipientId" element={<ChatInterface />} />
        <Route path="/MessagePage/:messageId" element={<MessagePage />} />
        <Route path="/newss" element={<Newss />} />
        <Route path="/insert" element={  <AdminRoute >
            <Insertion /> />
        </AdminRoute>} />
        <Route path="/coordinator/dashboard" element={<CoDashboard />} />


        <Route path="/layout-news" element={<LayoutNews />} />
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/file" element={<FileUpload />} />
        <Route path="/fileapi" element={<FileUploadToApi />} />

        <Route path="/analysis" element={<MainPage />} />
        <Route path='/users' element={<UsersPage />}/>
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Nested admin routes */}
        <Route path="/dashboard2/*" element={<Dashboard2 />} /> {/* Nested admin routes */}



        <Route path="admin/*" element={<AdminRoutes />} /> {/* Nested admin routes */}








    </Routes>
)
}