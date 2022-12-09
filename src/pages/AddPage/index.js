import NavBar from "../../components/navbar";
import NavLine from "../../components/navLine";
import Body from "../../components/SecondPageComp/Body";
import { ProSidebarProvider } from 'react-pro-sidebar';
import "./style.css"

const AddPage = () => {
    return (
      <>
        <ProSidebarProvider>        
        <NavBar/>
        <div className="scroll">      
          <NavLine name="Agendamentos"/> 
          <Body/>        
        </div> 
        </ProSidebarProvider>
      </>
    );
  };
export default AddPage;