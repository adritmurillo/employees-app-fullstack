import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeForm } from "./components/EmployeeForm";

function App() {
  return (
    <div className="container">
      <BrowserRouter> 
        <h1 className="text-center my-5 text-primary">Employee Management System</h1>
        
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add-employee" element={<EmployeeForm />} />
          <Route path="/edit-employee/:id" element={<EmployeeForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;