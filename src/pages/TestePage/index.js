import NavLine from "../../components/navLine";
import { ProSidebarProvider } from 'react-pro-sidebar';
import TesteP from "../../components/TesteP";


const TestePage = () => {
    return (
        <>
        <ProSidebarProvider>         
        <div className="scroll">
          <NavLine name="Dashboard"/>        
                   
          <TesteP />
        </div>
        </ProSidebarProvider>
        </>
    );
};

export default TestePage;
