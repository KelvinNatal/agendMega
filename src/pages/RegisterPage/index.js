import NavBar from "../../components/navbar";
import NavLine from "../../components/navLine";
import Register from "../../components/RegisterPage";
import { ProSidebarProvider } from 'react-pro-sidebar';


const RegisterPage = () => {
    return (
        <>
        <ProSidebarProvider>
        <NavBar/>
        <div className="scroll">
          <NavLine name="Usuários"/>          
          <Register />
        </div>
        </ProSidebarProvider>
        </>
    );
};

export default RegisterPage;
