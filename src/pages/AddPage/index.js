import NavBar from "../../components/navbar";
import NavLine from "../../components/navLine";
import Body from "../../components/SecondPageComp/Body";
import "./style.css"

const AddPage = () => {
    return (
      <>
        <NavBar/>
        <NavLine name="Agendamentos"/>
        <Body/>  
      </>
    );
  };
export default AddPage;