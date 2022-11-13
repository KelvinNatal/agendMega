import { FaUserCog } from "react-icons/fa";
import { MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const Cargos = () => {

    return(
        <>
            <div className="icones">
                    <MenuItem routerLink={<Link to="/register" />} icon={<FaUserCog className='navIcon3'/>}>Usuários</MenuItem>
            </div>
        </>
    );

}

export default Cargos;