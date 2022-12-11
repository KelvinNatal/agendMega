import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './style.css';

const UpdateUser = (props) => { 

    const navigate = useNavigate();

    const {id} = useParams();

    const[input, setInput] = useState([]);  

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, state:'upUser', idup: id, [name]: value}));
    }

    const updateUsuario = async (e) =>{     
      e.preventDefault();   
              await fetch(`https://agendamentop.site/dashboard/`,{ 
              method: "PUT",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
                  body: JSON.stringify({input})         
              })
              .then((response) => response.json())
              .then((responseJson) => {
                navigate('/register');
              }).catch((err)=>{                
                  console.log(err);
              })                         
      }

      useEffect(() => { 
        const input = {
          state: 'usuario',
          idup: id
        }
        fetch(`https://agendamentop.site/dashboard/`,{
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
            body: JSON.stringify({input})         
          })
          .then((response) => response.json())
          .then((responseJson) => { 
            setInput(responseJson.usuario[0]);                           
          }).catch((error)=>{                
             console.log(error);
          }) 
        }, [id])

    return(
        <>
        <div className="corpoPaginaUser">
        <div className="corpoUpdateUser">
        <form onSubmit={updateUsuario}>
        <div className='dataHora' >
        </div>
        <div className="item">
          <p>Nome</p>
          <input type="text" name='username' id="nome" placeholder="Nome" onChange={handleChange} value={input.username}/>
        </div>
        <div className="item">
          <p>Senha</p>
          <input type="password" name="password" placeholder="Senha" onChange={handleChange} />
        </div>
        <div className="item">
          <p>Cargo</p>
          <select id="analista" name="cargo" onChange={handleChange} value={input.cargo}>
              <option value="Admin">Admin</option>
              <option value="Analista">Analista</option>
            </select>
        </div>
        <div className="btn-block">
          <button type="submit" className="botaoFormUser">Cadastrar</button>
        </div>    
        </form>
    </div>
    </div>
        </>
    );

}

export default UpdateUser;