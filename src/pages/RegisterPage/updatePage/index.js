import NavBar from "../../../components/navbar";
import NavLine from "../../../components/navLine";
import UpdateUser from "../../../components/RegisterPage/updateUser";
import { ProSidebarProvider } from 'react-pro-sidebar';

const UpdateUserPage = () => {
    return (
      <>
        <ProSidebarProvider>          
        <NavBar/>        
        <UpdateUser/>  
        <NavLine name="Alterar Usuário"/>
        </ProSidebarProvider>
      </>
    );
  };
export default UpdateUserPage;