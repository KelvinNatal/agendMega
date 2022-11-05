import './style.css'
import logo from '../../agendaIcon.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {

    const [user, setUser] = useState({username: '', password: ''});

    const navigate = useNavigate();  

    const inputValue = e => setUser({...user, state: 'login', [e.target.name]: e.target.value});
    //const inputValue = e => setUser({...user, [e.target.name]: e.target.value});

    const loginn = () => {
        if(user.username !== '' && user.password !== ''){
        fetch(`http://localhost/final/index.php`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                body: JSON.stringify({ user })
            })
            .then((response) => response.json())
            .then((responseJson) => {   
                console.log(responseJson);       
                if(responseJson.userData){
                    sessionStorage.setItem('userData', JSON.stringify(responseJson));
                    navigate('/homepage');
                }else{
                    console.log('Login error');
                }
            }).catch((error)=>{                
                console.log(error)
            })      
        }            
    }
  
   /*useEffect(() => {
        if(sessionStorage.getItem('userData') !== null){            
            navigate('/homepage');
         }else{
            navigate('/');
         }         
    }, [navigate])*/
    
    return (
        <>
            <div className="todoConteudologin d-flex">
                <div className="meio container">
                    <div className='boxContainer'>
                        <div className='logoContainer'>
                            <img src={logo}
                                className='imagem' alt='...'></img>
                            <p id="title" className='logoTitle'>AGENDAMENTO</p>
                            <p id="subTitle" className='logoTitle'>Mega Conecta</p>
                        </div>
                        <div className="inputsLogin">
                            <h5 className='campos'>Usuário de acesso:</h5>
                            <input id="inputeId" type="text" className=" inpute form-control" placeholder="Digite seu usuário" name="username"
                                onChange={inputValue}></input>
                            <h5 className='campos'>Senha de acesso:</h5>
                            <input type="password" className=" inpute form-control" placeholder="Digite sua senha" name="password"
                                onChange={inputValue}></input>
                            <button type="submit" className="btnLogin btn btn-primary" onClick={loginn}>Logar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Register;
