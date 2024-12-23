import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import AdminDashBoard from './Pages/AdminDashBoard'
import {ToastContainer} from 'react-toastify'
import EmployeeDashboard from './Pages/EmployeeDashboard'
import PrivateRoute from './utils/PrivateRoute'
import RoleBaseRoute from './utils/RoleBaseRoute'
import AdminDetails from './components/Dashboard/AdminDetails'
import Department from './components/Departments/Department'
import AddDepartment from './components/Departments/AddDepartment'
import EditDepartment from './components/Departments/EditDepartment'
import List from './components/Employee/List'
import Add from './components/Employee/Add'
import View from './components/Employee/View'
import Edit from './components/Employee/Edit'
import AddSal from './components/salary/Add'
import ViewSal from './components/salary/View'
import Sidebar from './components/EmpDashboard/Sidebar'
import Summary from './components/EmpDashboard/Summary'
import Profile from './components/EmpDashboard/Profile'
import LeaveList from './components/Leave/LeaveList'
import AddLeave from './components/Leave/AddLeave'
import Setting from './components/EmpDashboard/Setting'
import AdminLeave from './components/Leave/AdminLeave'
import LeaveDetail from './components/Leave/LeaveDetail'
function App() {

  return (
  <>
   <BrowserRouter>
   <Routes>
<Route path='/' element={<Navigate to="/admin-dashboard"/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/admin-dashboard' element={
  <PrivateRoute>
   <RoleBaseRoute requiredRole={["admin"]}>
   <AdminDashBoard/>
   </RoleBaseRoute>
  </PrivateRoute>
}>

<Route index element={<AdminDetails/>}></Route>
<Route path='/admin-dashboard/departments' element={<Department/>}></Route>
<Route path='/admin-dashboard/add-departments' element={<AddDepartment/>}></Route>
<Route path='/admin-dashboard/department/:id' element={<EditDepartment/>}></Route>

<Route path='/admin-dashboard/employees' element={<List/>}></Route>
<Route path='/admin-dashboard/add-employee' element={<Add/>}></Route>
<Route path='/admin-dashboard/employees/view/:_id' element={<View/>}></Route>
<Route path='/admin-dashboard/employees/edit/:_id' element={<Edit/>}></Route>
<Route path='/admin-dashboard/employees/salary/:_id' element={<ViewSal/>}></Route>
<Route path='/admin-dashboard/employees/leaves/:_id' element={<LeaveList/>}></Route>
<Route path='/admin-dashboard/leaves' element={<AdminLeave/>}></Route>
<Route path='/admin-dashboard/leaves/:_id' element={<LeaveDetail/>}></Route>
<Route path='/admin-dashboard/settings' element={<Setting/>}></Route>
<Route path='/admin-dashboard/salary/add' element={<AddSal/>}></Route>

</Route>

<Route path='/employee-dashboard' element={
  <PrivateRoute>
<RoleBaseRoute requiredRole={["admin","employee"]}>
<EmployeeDashboard/>
</RoleBaseRoute>
  </PrivateRoute>

}>
<Route index element={<Summary/>}></Route>
<Route path='/employee-dashboard/profile/:_id' element={<View/>}></Route>
<Route path='/employee-dashboard/leaves/:_id' element={<LeaveList/>}></Route>
<Route path='/employee-dashboard/add-leave' element={<AddLeave/>}></Route>
<Route path='/employee-dashboard/salary/:_id' element={<ViewSal/>}></Route>
<Route path='/employee-dashboard/setting' element={<Setting/>}></Route>


</Route>


   </Routes>
   
   </BrowserRouter>
  <ToastContainer position='bottom-right'/>
  </>
  )
}

export default App
