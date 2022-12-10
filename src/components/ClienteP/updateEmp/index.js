import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import MultiSelect from  'react-multiple-select-dropdown-lite'

import './upStyle.css';

const UpdateEmpresa = (props) => { 

    const {id} = useParams();

    const[input, setInput] = useState([]);
    const[product, setProduct] = useState([]);
    const[plano, setPlan] = useState([]);
    const[ramais, setRamais] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {   
      const input = {
        state: 'empresa',
        idup: id
      }
      fetch(`http://107.23.232.93/dashboard`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
          body: JSON.stringify({input})         
        })
        .then((response) => response.json())
        .then((responseJson) => { 
          //console.log(responseJson)
          setInput(responseJson.empresa[0]);  
          setProduct(responseJson.empresa[0]);

          let planVariable = responseJson.empresa[0].plano;
          let sepVar = planVariable.split(' ');
          let ramVariable = responseJson.empresa[0].ramais;
          let sepRam = ramVariable.split(' ');
          let sepR = sepRam[0].split('R');
          let sepL = sepRam[1].split('L');
          let sepVirR = sepR[0].split(',');
          let sepVirL = sepL[0].split(',');
          
          console.log("Opa" + sepVirR)
          setPlan({pla: sepVar[1], cana: sepVar[0]}); 
          setRamais({ram: sepVirR, licencas: sepVirL});

        }).catch((error)=>{                
            console.log(error);
        })   
    }, [id]) 

    console.log(plano)

    const [vall, setvall] = useState(''); 

    const  options  = [
      { label:  'Discador', value:  'D'  },
      { label:  'Ura-bot', value:  'UB'  },
      { label:  'Mega-bot', value:  'MB'  },
      { label:  'SMS', value:  'SMS'  },
      { label:  'Cloudchat', value:  'CC'  },
      { label:  'Telefonia', value:  'T'  },
    ]

    const handlePlano = (e) => {
      let plan = document.getElementById('plano').value;
      let canais = document.getElementById('inputPlano').value;
      if(plan === "Tarifado"){
        canais = "";
      }
      let planoFinal = `${canais} ${plan}`
      setPlan({...plano, pla: plan, cana: canais});
      
      setInput(values => ({...values, state: 'upEmp', idup: id, plano: planoFinal}));       
    } 
    
    const handleRam = (e) => {
      let rama = document.getElementById('ramais').value;
      let licen = document.getElementById('licencas').value;
      let ramal = `${rama}R ${licen}L`
      setRamais({...ramais, ram: rama, licencas: licen});
      
      setInput(values => ({...values, state: 'upEmp', idup: id, ramais: ramal}));       
    } 

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({...values, state: 'upEmp', idup: id, [name]: value}));       
    } 
    
    useEffect(() =>{
      if (vall !== ''){ 
        setInput({...input, state: 'upEmp', idup: id, 'produto': vall});
      }
    },[vall, id, input])

    console.log(vall)

    const updateEmpresa = async (e) =>{
      e.preventDefault();             
      
              await fetch(`http://107.23.232.93/`,{ 
              method: "PUT",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
                  body: JSON.stringify({input})         
              })
              .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson)
                navigate('/addcliente');
              }).catch((err)=>{                
                console.log(err);
              })                          
      }

    return(
        <>
        <div className="corpoPaginaEmp">
        <div className="corpoUpdateEmp">
        <form id="product_form" onSubmit={updateEmpresa}>
        <div className='dataHora' >
            <div className="item">
                <p>Data</p>
                <input type="date" name="dataEmp" id="dateCalendar" onChange={handleChange} value={input.dataEmp}/>
                <FaCalendarAlt className="calendarIconEmp" id="calendarIE"/>
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
              <option value="Cassiana">Cassiana</option>
              <option value="Elieser">Elieser</option>
            </select>
        </div>
        <div className="item">
          <p>Produto</p>
          <div className='multiselect'>
            <MultiSelect
              onChange={setvall}
              options={options}
              downArrow={false}
              defaultValue={product.produto}
          />
          </div>
          {/*<input type="text" name="produto" onChange={handleChange} value={input.produto}/>*/}
        </div>
        <div className="item">
          <p>Plano / Canais</p>
          <select id="plano" name="plano" onChange={handlePlano} value={plano.pla}>
              <option value="">Plano</option>
              <option value="Ilimitado">Ilimitado</option>
              <option value="Tarifado">Tarifado</option>
          </select>
          <input id="inputPlano" type="text" onChange={handlePlano} value={plano.cana}/>
        </div>
        <div className="item">
          <p>Ramais / Licenças</p>
          <input id="ramais" type="text" onChange={handleRam} value={ramais.ram}/>
          <input id="licencas" type="text" onChange={handleRam} value={ramais.licencas}/>
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