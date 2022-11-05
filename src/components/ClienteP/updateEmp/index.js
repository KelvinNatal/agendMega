import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './style.css';

const UpdateEmpresa = (props) => { 

    const {id} = useParams();

    const[input, setInput] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, state: 'upEmp', idup: id, [name]: value}));
    }

    const updateEmpresa = async (e) =>{
      e.preventDefault();        
              await fetch(`https://agendphp.herokuapp.com/index.php`,{ 
              method: "PUT",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
                  body: JSON.stringify({input})         
              })
              .then((response) => response.json())
              .then((responseJson) => {
                navigate('/addcliente');
              }).catch((err)=>{                
                console.log(err);
              })                          
      }

    useEffect(() => {   
      const input = {
        state: 'empresa',
        idup: id
      }
      fetch(`https://agendphp.herokuapp.com/index.php`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
          body: JSON.stringify({input})         
        })
        .then((response) => response.json())
        .then((responseJson) => { 
          setInput(responseJson.empresa[0]);                           
        }).catch((error)=>{                
            console.log(error);
        })   
    }, [id]) 

    return(
        <>
        <div className="corpoPaginaEmp">
        <div className="corpoUpdateEmp">
        <form id="product_form" onSubmit={updateEmpresa}>
        <div className='dataHora' >
            <div className="item">
                <p>Data</p>
                <input type="date" name="dataEmp" id="dateCalendar" onChange={handleChange} value={input.dataEmp}/>
                <i className="icone fas fa-calendar-alt"></i>
            </div>
        </div>
        <div className="item">
          <p>Empresa</p>
          <input type="text" name="nomeEmpresa" placeholder="First" onChange={handleChange} value={input.nomeEmpresa}/>
        </div>
        <div className="item">
          <p>Cliente</p>
          <input type="text" name="cliente" onChange={handleChange} value={input.cliente} />
        </div>
        <div className="item">
          <p>Telefone</p>
          <input type="text" name="telCliente" onChange={handleChange} value={input.telCliente} />
        </div>
        <div className="item">
          <p>Comercial</p>
          <select id="comercial" name="comercial" onChange={handleChange} value={input.comercial}>
              <option value="">Comercial</option>
              <option value="Mariana">Mariana</option>
              <option value="Pamela">Pamela</option>
              <option value="Alef">Alef</option>
              <option value="Cleiton">Cleiton</option>
              <option value="Elieser">Elieser</option>
              <option value="Junior">Junior</option>
            </select>
        </div>
        <div className="item">
          <p>Produto</p>
          <input type="text" name="produto" onChange={handleChange} value={input.produto}/>
        </div>
        <div className="item">
          <p>Plano / Canais</p>
          <select id="plano" name="plano" onChange={handleChange} value={input.plano}>
              <option value="">Plano</option>
              <option value="Ilimitado">Ilimitado</option>
              <option value="Tarifado">Tarifado</option>
            </select>
        </div>
        <div className="item">
          <p>Ramais / Licenças</p>
          <input type="text" name="ramais" onChange={handleChange} value={input.ramais}/>
        </div>
        <div className="item">
          <p>Link</p>
          <input type="text" name="link" onChange={handleChange} value={input.link} />
        </div>
        <div className="btn-block">
          <button type="submit" className="botaoForm" href="/">Salvar</button>
        </div>    
        </form>
    </div>
    </div>
        </>
    );

}

export default UpdateEmpresa;