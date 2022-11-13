import logo from '../../agendaIcon.png';
import { TiHome } from "react-icons/ti";
import { TbCalendarTime } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from 'react-pro-sidebar';
import './style.css'
import Cargos from './Cargos';
import { Link } from 'react-router-dom';

const NavBar = () => {

var obj = JSON.parse(sessionStorage.getItem('userData'));

const { collapseSidebar  } = useProSidebar();

const choose = () => {
    if(obj.userData.cargo !== "Analista"){
        return <Cargos/>;
    }else{
        return <div></div>;
    }
}
    return ( 
    <>
    <div style={{ display: 'flex', height: '100vh', position: 'fixed', zIndex:'3'}}>
    <Sidebar width="210px" backgroundColor="#272727" defaultCollapsed>
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
          <SubMenu icon={<TbCalendarTime className='navIcon' />} label="Agendamentos" >
            <MenuItem routerLink={<Link to="/addproduct" />}> Todos </MenuItem>
            <MenuItem> Pendentes </MenuItem>
          </SubMenu>
          <MenuItem routerLink={<Link to="/addcliente" />} icon={<FaClipboardList className='navIcon2'/>}>Clientes</MenuItem>
          {choose()}
        </Menu>
    </Sidebar>
  </div>
    </>
    );
}

export default NavBar;