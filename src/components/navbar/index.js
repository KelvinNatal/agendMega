import { Link } from 'react-router-dom';
import logo from '../../agendaIcon.png';
import { TiHome } from "react-icons/ti";
import { TbCalendarTime } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import './style.css'
import Cargos from './Cargos';

const NavBar = () => {

var obj = JSON.parse(sessionStorage.getItem('userData'));

const choose = () => {
    if(obj.userData.cargo !== "Analista"){
        return <Cargos/>;
    }else{
        return <div></div>;
    }
}
    return ( 
    <>
    <header className="head">
        <nav className="navbar">
            <div className="logoNav"> 
                <Link to="/homepage"><img className="logoNav" src={logo} alt='...'/></Link>
            </div>
            <div className="iconsNav">
            <div className="icones">
                <div className=" teste">
                    <Link to="/homepage"><TiHome className="navIcons"/></Link>
                </div>
            </div>
            <div className="icones">
                <div className=" teste">
                    <Link to="/addproduct"><TbCalendarTime className="navIcons"/></Link>
                </div>
            </div>
            <div className="icones" >
                <div className=" teste">
                    <Link to="/addcliente"><FaClipboardList className="navIcons"/></Link>
                </div>
            </div>
            <div id="divCargo">      
                {choose()}           
            </div>
          </div>
        </nav>
    </header>
    </>
    );
}

export default NavBar;