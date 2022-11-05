import NavBar from "../../../components/navbar";
import NavLine from "../../../components/navLine";
import UpdateAgend from "../../../components/SecondPageComp/Body/updateAgend";

const UpdatePage = () => {
    return (
      <>
        <NavBar/>
        <NavLine name="Alterar Agendamento"/>
        <UpdateAgend/>  
      </>
    );
  };
export default UpdatePage;