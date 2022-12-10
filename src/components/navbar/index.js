import logo from '../../agendaIcon.png';
import { TiHome } from "react-icons/ti";
import { TbCalendarTime } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import './style.css'
import Cargos from './Cargos';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {

var obj = JSON.parse(sessionStorage.getItem('userData'));

const { collapseSidebar  } = useProSidebar();

const navigate = useNavigate();

const logout = () => {
  sessionStorage.setItem("userData", '');
  sessionStorage.clear();
  navigate('/');
}  

const choose = () => {
    if(obj.userData.cargo !== "Analista"){
        return <Cargos/>;
    }else{
        return <div></div>;
    }
}
    return ( 
    <>
    <div style={{ display: 'flex', height: '100%', position: 'fixed', zIndex:'3'}}>
    <Sidebar width="210px" backgroundColor="#272727" defaultCollapsed>
    <div className='menu'>
    <button className="buttonSide" onClick={() => collapseSidebar()}><img className="logoSide" src={logo} alt='...'/></button>
        <Menu style={{marginTop: '30vh'}}
        renderMenuItemStyles={({ level }) => ({
          '.menu-anchor': {
            color: 'white',
            backgroundColor: level === 0 ? '#272727' : '#272727'
          },
          '.menu-anchor:hover': {
            backgroundColor: '#494949',
          }
        })}
        >
         <MenuItem routerLink={<Link to="/homepage" />} icon={<TiHome className='navIcon'/>}>Home</MenuItem>
          <MenuItem routerLink={<Link to="/addproduct" />} icon={<TbCalendarTime className='navIcon' />} > Agendamentos </MenuItem>
          <MenuItem routerLink={<Link to="/addcliente" />} icon={<FaClipboardList className='navIcon2'/>}>Clientes</MenuItem>
          {choose()}
          <div className='logout'><RiLogoutBoxRLine className='logoutIcon' onClick={logout}/></div>
        </Menu>
        </div>
        
    </Sidebar>    
  </div>
    </>
    );
}

export default NavBar;