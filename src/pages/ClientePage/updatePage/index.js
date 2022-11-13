import UpdateEmpresa from "../../../components/ClienteP/updateEmp";
import NavBar from "../../../components/navbar";
import NavLine from "../../../components/navLine";
import { ProSidebarProvider } from 'react-pro-sidebar';

const UpdateClientePage = () => {
    return (
      <>
        <ProSidebarProvider>
          <NavBar/>
          <UpdateEmpresa/>  
          <NavLine name="Alterar Empresa"/>
        </ProSidebarProvider>
      </>
    );
  };
export default UpdateClientePage;