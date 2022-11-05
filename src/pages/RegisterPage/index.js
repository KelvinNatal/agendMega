import NavBar from "../../components/navbar";
import NavLine from "../../components/navLine";
import Register from "../../components/RegisterPage";


const RegisterPage = () => {
    return (
        <>
        <div className="scroll">
          <NavLine name="Usuários"/>
          <NavBar/>
          <Register />
        </div>
        </>
    );
};

export default RegisterPage;
