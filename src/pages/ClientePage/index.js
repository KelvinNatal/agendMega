import ClienteP from "../../components/ClienteP";
import NavBar from "../../components/navbar";
import NavLine from "../../components/navLine";
import { ProSidebarProvider } from 'react-pro-sidebar';

const ClientePage = () => {
    return (
        <>
        <ProSidebarProvider>        
        <NavBar/>        
        <div className="scroll">  
          <NavLine name="Empresas"/>                
          <ClienteP />          
        </div>        
        </ProSidebarProvider>
         
        </>
    );
};

export default ClientePage;
