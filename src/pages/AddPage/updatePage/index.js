import NavBar from "../../../components/navbar";
import NavLine from "../../../components/navLine";
import UpdateAgend from "../../../components/SecondPageComp/Body/updateAgend";
import { ProSidebarProvider } from 'react-pro-sidebar';

const UpdatePage = () => {
    return (
      <>
        <ProSidebarProvider>
          <NavBar/>          
          <UpdateAgend/>
          <NavLine name="Alterar Agendamento"/>
        </ProSidebarProvider>
      </>
    );
  };
export default UpdatePage;