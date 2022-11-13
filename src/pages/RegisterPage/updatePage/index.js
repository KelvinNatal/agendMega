import NavBar from "../../../components/navbar";
import NavLine from "../../../components/navLine";
import UpdateUser from "../../../components/RegisterPage/updateUser";
import { ProSidebarProvider } from 'react-pro-sidebar';

const UpdateUserPage = () => {
    return (
      <>
        <ProSidebarProvider>
        <NavBar/>
        <NavLine name="Alterar Usuário"/>
        <UpdateUser/>  
        </ProSidebarProvider>
      </>
    );
  };
export default UpdateUserPage;