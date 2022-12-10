import { HiUserCircle } from "react-icons/hi";

import './style.css'

const NavLine = (props) => {

    var obj = JSON.parse(sessionStorage.getItem('userData')); 

    return (
        <>
            <header className="headLine">
                <nav className="naveLine navbar-expand-lg bg-light d-flex">
                <div className=" todoNavLine container-fluid d-flex">
                    <div className='TituloDiv'>
                        <h3 className='tituloPagina'>{props.name}</h3>
                    </div>                    
                        <div className="perfilDiv d-flex">
                            <HiUserCircle className='perfIcon'/>
                            <div className='descPerfil'>
                                <p className='titlePerfil' id="subtitlePerfil">{obj.userData.username}</p>
                                <p className='titlePerfil'>{obj.userData.cargo}</p>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default NavLine;
