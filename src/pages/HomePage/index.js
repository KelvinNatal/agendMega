import NavBar from "../../components/navbar";
import NavLine from "../../components/navLine";
import Body from "../../components/PrincipalPageComp/Body";
import { ProSidebarProvider } from 'react-pro-sidebar';


const HomePage = () => {
    return (
        <>
        <ProSidebarProvider>
        <NavBar/>
        <div className="scroll">          
          <NavLine name="Dashboard"/>                 
          <Body />          
        </div>
        </ProSidebarProvider>
        </>
    );
};

export default HomePage;
