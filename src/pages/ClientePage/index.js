import ClienteP from "../../components/ClienteP";
import NavBar from "../../components/navbar";
import NavLine from "../../components/navLine";

const ClientePage = () => {
    return (
        <>
        <div className="scroll">
          <NavLine name="Empresas"/>
          <NavBar/>
          <ClienteP />
        </div>
        </>
    );
};

export default ClientePage;
