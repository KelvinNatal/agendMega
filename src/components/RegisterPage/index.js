import './style.css'
import { Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import { FaUser } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";


const Register = () => {

    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [users, setUsers] = useState([]);

    const [user, setUser] = useState({
        username: '',
        password: '',
        cargo: ''      
    }); 

    const handleClose = () => {
        setShow(false)
    };

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
      }  

    const inputValue = e => setUser({...user, [e.target.name]: e.target.value});

    /*const inputNome = () => {
        var nome = document.getElementById('nome').value;
        var sobrenome = document.getElementById('sobrenome').value;
        var username = `${nome} ${sobrenome}`;
        setUser({...user, username: username});
    }*/

    const navigate = useNavigate();

    const getUsers = async () => {
        await fetch("https://agendphp.herokuapp.com/index.php/usuarios", {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setUsers(responseJson.listaUsuarios);
        });
    };

    const cadUsuario = async () =>{                   
            await fetch("https://agendphp.herokuapp.com/index.php/registrar",{ 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                body: JSON.stringify({user})         
            })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
            }).catch((err)=>{                
                console.log(err);
            })                            
    }

    const deleteUser= async (id) => {
        await fetch(`https://agendphp.herokuapp.com/index.php/${id}/delUser`,{
          method: 'DELETE'       
        })
        .then((response) => response.json())
        .then((responseJson) => {      
          console.log(responseJson);
          getUsers();          
        })
      }

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        if(sessionStorage.getItem('userData') !== null){            
            navigate('/register');
         }else{
            navigate('/');
         }         
    }, [navigate])
    
    return (
        <>
            <div className="todoConteudoRegister d-flex">
            <div className='conjuntoUser'>
            <div className='btnUser' onClick={handleShow}>
                    <p>+</p>
                </div>
            <Modal  dialogClassName='regMod' fullscreen={fullscreen} show={show} onHide={handleClose} animation={true}>
              <Modal.Header closeButton>
                <Modal.Title>Criar Usuário</Modal.Title>
             </Modal.Header>
            <Modal.Body className="modd">
            <form onSubmit={cadUsuario}>
        <div className='dataHora' >
        </div>
        <div className="item">
          <p>Nome</p>
          <input type="text" name='username' id="nome" placeholder="Nome" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Senha</p>
          <input type="password" name="password" placeholder="Senha" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Cargo</p>
          <select id="analista" name="cargo" onChange={inputValue}>
              <option value="">Cargo</option>
              <option value="Admin">Admin</option>
              <option value="Analista">Analista</option>
            </select>
        </div>
        <div className="btn-block">
          <button type="submit" className="botaoForm">Cadastrar</button>
        </div>    
        </form>
    </Modal.Body>
            </Modal>
                        <div className='d-flex '>
                        {
                                typeof users !== "undefined" && Object.values(users).map((user, index) => {
                                    return (
                        <div className="card userCard" key={user.user_id}>
                            <h5 className="card-title titleCard">{user.cargo}</h5>
                        <div className="card-body bodyC">
                            <FaUser className="userIcon" id=""/>
                            <p className="card-text userTitle">{user.username}</p>
                        </div>
                        <div className="bottomCard">
                        <div className="opcoesUser">
                                <div className="opcUsers d-flex">
                                <Link className="link" to={`/register/${user.user_id}/edituser`}>
                                    <button className='buttonsUser' id="bu2">
                                        <GoPencil className="opcIcons"/>
                                    </button>
                                    </Link>
                                    <button className='buttonsUser' id="bt1ApagUser" onClick={() => deleteUser(user.user_id)}>
                                       <FaTrashAlt className="opcIcons"/>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    );
                                })
                            }
                            </div>
                </div>
            </div>
        </>
    );
}


export default Register;
