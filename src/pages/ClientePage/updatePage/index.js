import UpdateEmpresa from "../../../components/ClienteP/updateEmp";
import NavBar from "../../../components/navbar";
import NavLine from "../../../components/navLine";

const UpdateClientePage = () => {
    return (
      <>
        <NavBar/>
        <NavLine name="Alterar Empresa"/>
        <UpdateEmpresa/>  
      </>
    );
  };
export default UpdateClientePage;