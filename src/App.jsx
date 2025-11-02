import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import React from 'react'
import AdminDash from "./pages/AdminDash.jsx";
import Register from "./pages/Register.jsx";
import Employeedash from "./pages/Employeedash.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import RoleBasedRoute from "./utils/RoleBasedRoute.jsx";
import AdminHome from "./componenets/admin/home/Home.jsx";
import AddTeacher from "./componenets/admin/teacher/Teacher.jsx";
import AddStudent from "./componenets/admin/students/AddStudent.jsx";
import Student from "./componenets/admin/students/Student.jsx";
import StudentDetails from "./componenets/admin/students/StdudentDetails.jsx";
import EditStudent from "./componenets/admin/students/EditStudent.jsx";
import ClassPage from "./componenets/admin/class/Class.jsx";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={
          <PrivateRoute>      
            <RoleBasedRoute requiredRole={["admin" ]} >
               <AdminDash/>
               
            </RoleBasedRoute>
            
          </PrivateRoute>
         
        }>
        {/* <Route index element={<AdminSummary/>}/> */}
        <Route path="/admin/home" element={<AdminHome/>} />
        <Route path="/admin/teachers" element={<AddTeacher/>} />
        <Route path="/admin/students" element={<Student/>} />
        <Route path="/admin/Add-student" element={<AddStudent/>} />
        <Route path="/admin/student/view/:id" element={<StudentDetails />} />
        <Route path="/admin/student/edit/:id" element={<EditStudent />} />
        <Route path="/admin/classes" element={<ClassPage/>} />
        
        </Route>
           
        <Route path="/register" element={<Register/>} />
        <Route path="/employee" element={<Employeedash/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
