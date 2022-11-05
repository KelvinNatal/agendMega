import NavBar from "../../../components/navbar";
import NavLine from "../../../components/navLine";
import UpdateUser from "../../../components/RegisterPage/updateUser";

const UpdateUserPage = () => {
    return (
      <>
        <NavBar/>
        <NavLine name="Alterar Usuário"/>
        <UpdateUser/>  
      </>
    );
  };
export default UpdateUserPage;