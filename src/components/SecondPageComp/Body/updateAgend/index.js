import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateAgend = (props) => { 

    const {id} = useParams();

    console.log(id);
    const[input, setInput] = useState([]);

    

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, [name]: value}));
    }

    const updateProduct = async (e) =>{ 
        e.preventDefault();        
              await fetch(`https://agendphp.herokuapp.com/index.php/updateAgendamento/${id}`,{ 
              method: "PUT",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
                  body: JSON.stringify({input})         
              })
              .then((response) => response.json())
              .then((responseJson) => {
                //console.log(responseJson);
              }).catch((err)=>{                
                  console.log(err);
              })                         
      }

    useEffect(() => {   
        fetch(`https://agendphp.herokuapp.com/index.php/agendamento/${id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }    
            })
            .then((response) => response.json())
            .then((responseJson) => { 
              setInput(responseJson.agendamento[0]);                           
            }).catch((error)=>{                
                console.log(error);
            })                 
    }, [id]) 

    return(
        <>
        <div className="corpoPagina">
        <div className="corpoUpdate">
            <form id="product_form" onSubmit={updateProduct} >
        <div className='dataHora' >
            <div className="item">
                <p>Data/Horário</p>
                <input type="date" name="data" id="dateCalendar"  required value={input.data}/>
                <select id="horario" name="horario" onChange={handleChange} value={input.horario}>
                    <option value="">Horário</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                </select>
                <i className="icone fas fa-calendar-alt"></i>
            </div>
        </div>
        <div className="item">
          <p>Empresa</p>
          <input type="text" name="nomeEmpresa" placeholder="First" value={input.nomeEmpresa} />
        </div>
        <div className="item">
          <p>Analista</p>
          <select id="analista" name="analista" onChange={handleChange} value={input.analista} >
              <option value="">Analista</option>
              <option value="Amutti">Gabriel Amutti</option>
              <option value="Victor Rodrigues">Victor Rodrigues</option>
              <option value="Richard">Richard</option>
            </select>
        </div>
        <div className="item">
          <p>Status</p>
          <select id="status" name="status" onChange={handleChange} value={input.status} >
            <option value="">Status</option>
              <option value="Pendente">Pendente</option>
              <option value="Andamento">Andamento</option>
              <option value="Feito">Feito</option>
            </select>
        </div>
        <h4>Observação</h4>
        <textarea rows="4" name="observacao" onChange={handleChange} value={input.observacao}></textarea>
        <div className="btn-block">
          <button type="submit" className="botaoForm">Alterar</button>
        </div>    
        </form>
    </div>
    </div>
        </>
    );

}

export default UpdateAgend;