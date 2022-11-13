import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClientePage from "./pages/ClientePage";
import UpdatePage from "./pages/AddPage/updatePage";
import UpdateClientePage from "./pages/ClientePage/updatePage";
import UpdateUserPage from "./pages/RegisterPage/updatePage";
import TestePage from "./pages/TestePage";

const Routte = () => {

    return(
      <>      
    <Router>
      <div className="d-flex">
      
      <Routes>
        <Route path="/" caseSensitive={false} element={<Login />} />        
        <Route path="/homepage" caseSensitive={false} element={<HomePage />} />
        <Route path="/addproduct" caseSensitive={false} element={<AddPage />} />
        <Route path="/addproduct/:id/editagend" caseSensitive={false} element={<UpdatePage />} />
        <Route path="/addcliente" caseSensitive={false} element={<ClientePage />} />
        <Route path="/addcliente/:id/editcliente" caseSensitive={false} element={<UpdateClientePage/>} />
        <Route path="/register" caseSensitive={false} element={<RegisterPage />} />
        <Route path="/register/:id/edituser" caseSensitive={false} element={<UpdateUserPage />} />
        <Route path="/testepage" caseSensitive={false} element={<TestePage />} />
      </Routes>
      </div>
    </Router>
    
    </>
    );

};

export default Routte;