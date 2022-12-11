import './style.css'
import { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { TiFilter } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

const Body = () => {

    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [products, setProducts] = useState([]);      
    const [empresas, setEmpresas] = useState([]);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    
    const [product, setProduct] = useState({
        nomeEmpresa: '',
        data: '',
        horario: '',
        status: '',
        analista: '',
        observacao: '',
        state: 'criarAgendamento',
        type: 1     
    });    

    const [status, setStatus] = useState({
      type: '',
      message: ''
  })

    const inputValue = (e) => {
        let valor = e.target.value;
        setProduct({...product, state: 'criarAgendamento',[e.target.name]: valor});     
    }

    const inputD = () => {
        var date = document.getElementById('dateCalendar').value;
        //var array = date.split('-');
        //var dataFinal = `${array[2]}/${array[1]}/${array[0]}`;
        setProduct({...product, data: date});
    }

    const handleClose = () => {
        setShow(false)
    };

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);

      }

      var dataI;
      var dataF;  
      
      const getEmpresas = () => {
        const input = {
          state: 'empresas'
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
                  //console.log(responseJson)
                   setEmpresas(responseJson.listaEmpresas);                          
              }).catch((error)=>{                
                  console.log(error);
              })                
      }

   var obj = JSON.parse(sessionStorage.getItem('userData'));     

      const getUsers = async () => {
        const user = {
            state: 'usuarios'
        }
        await fetch("https://agendamentop.site/dashboard/", {
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
            setUsers(responseJson.listaUsuarios);
        });
    };

    const getFilter = () => {
       dataI = document.getElementById('inputInicial').value; 
       dataF = document.getElementById('inputFinal').value; 
      const filtroAgend = {
        dataInicial: dataI,
        dataFinal: dataF,
        state: 'filter'
      }     
      
        fetch(`https://agendamentop.site/dashboard/`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                body: JSON.stringify({filtroAgend})         
            })
            .then((response) => response.json())
            .then((responseJson) => {
              //console.log(responseJson)
                setProducts(responseJson.listaFiltro);
            }).catch((error)=>{                
                console.log(error)
            })                
    }   

    const cadProduct = async (e) =>{ 
      e.preventDefault();        
            await fetch("https://agendamentop.site/dashboard/",{ 
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                body: JSON.stringify({product})         
            })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.erro){                 
                setStatus({
                    type: 'erro',
                    message: responseJson.message
                })
             }else{
              window.location.reload(); 
             }
            }).catch((err)=>{                
                console.log(err);
            })                         
    }

    const deleteAgend = async (id) => {
      const input = {
        idup: id,
        state: 'delagend',
        type: 0
      }
      await fetch(`https://agendamentop.site/dashboard/`,{
        method: 'PUT',      
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
          body: JSON.stringify({input})         
      })
      .then((response) => response.json())
      .then((responseJson) =>{
        //console.log(responseJson)
        window.location.reload();      
      })
    }

    useEffect(() => {   
      var dataI = document.getElementById('inputInicial').value; 
      var dataF = document.getElementById('inputFinal').value; 
       const userRel = {
        username: obj.userData.username,
        cargo: obj.userData.cargo,
        state: 'agendamentos'
      }     
       fetch(`https://agendamentop.site/dashboard/`,{
           method: "POST",
           headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
           },
               body: JSON.stringify({userRel})         
           })
           .then((response) => response.json())
           .then((responseJson) => { 
             //console.log(responseJson)
             if(dataI === "" || dataF === ""){
               if(obj.userData.cargo === "Admin"){
                 setProducts(responseJson.listaAgendamentos);  
               }else{
                 setProducts(responseJson.listaUseragend);
               }            
           }         
           }).catch((error)=>{                
             console.log(error);
           })     
    }, [obj.userData.cargo,obj.userData.username]) 

    useEffect(() => {
      getEmpresas();
      getUsers();      
  }, []);

    useEffect(() => {
        if(sessionStorage.getItem('userData') !== null){            
            navigate('/addproduct');
         }else{
            navigate('/');
         }         
    }, [navigate]);

    const [filter, setFilter] = useState('');

    const searchText = (event) =>{
      setFilter(event.target.value);
    }

    if(products !== undefined){
      var dataSearch = products.filter(item=>{
        return Object.keys(item).some(key=>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
          )
      });
    }else{
      dataSearch = {};
    }      

    const [value, setValue] = useState("");

    const onChange = (e) => {     
      
      setValue(e.target.value);
        
     };

    const onSearch = (searchTerm) => {
      setValue(searchTerm);
      // our api to fetch the search result
      let valor = searchTerm;
      setProduct({...product, state: 'criarAgendamento','nomeEmpresa': valor}); 
    };
    
    return (       
      <>
      <div className="todoConteudoAdd d-flex">
            <div className='conjuntoAdd'>
              <div className='cabeButtons d-flex'>
                <div className='btnAgend' onClick={() => handleShow()}>
                    <p>+</p>
                </div>
                <div className='pesquisaFiltro'>
                  <input  type="Text" placeholder="Insira..." id="inputFiltro" value={filter} onChange={searchText.bind(this)}></input>
                  <IoMdSearch className="fa addIcons"/>
                </div>
              </div>
            <Modal  dialogClassName='mod' fullscreen={fullscreen} show={show} onHide={handleClose} animation={true}>
              <Modal.Header closeButton className="modd">
                <Modal.Title>Criar Agendamento</Modal.Title>
             </Modal.Header>
            <Modal.Body className="modd">
            <div className="">
        <div className='dataHora' >
            <div className="item">
                <p>Data/Horário</p>
                <input type="date" name="data" id="dateCalendar" onChange={inputD}required/>
                <select id="horario" name="horario" onChange={inputValue}>
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
                <FaCalendarAlt className="calendarIcon" id="calendarD"/>
            </div>
        </div>
        <div className="item testandoSearch">
          <p>Empresa</p>
          <div className="search-container">
          <div className="search-inner">
            <input className="EmpFilter" type="text" name="nomeEmpresa" autocomplete="off" placeholder="First" value={value} onChange={onChange} />
          </div>
          <div className="dropdown">
          {empresas.filter((item) => {
              const searchTerm = value.toLowerCase();
              const nomeEmp = item.nomeEmpresa.toLowerCase();

              return (
                searchTerm &&
                nomeEmp.startsWith(searchTerm) &&
                nomeEmp !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.nomeEmpresa)}
                className="dropdown-row"
                key={item.nomeEmpresa}
              >
                {item.nomeEmpresa}
              </div>
            ))}
        </div>
        </div>
          {status.type === 'erro'?<div className="serror">{status.message}</div> : ""} 
        </div>
        <div className="item">
          <p>Analista</p>
          <select id="analista" name="analista" onChange={inputValue} key={users.user_id}>
            {typeof users !== "undefined" && Object.values(users).map((user, index) =>                          
              <option value={user.username}>{user.username}</option>                             
              )
            }
            </select>
        </div>
        <div className="item">
          <p>Status</p>
          <select id="status" name="status" onChange={inputValue}>
            <option value="">Status</option>
              <option value="Pendente">Pendente</option>
              <option value="Andamento">Andamento</option>
              <option value="Feito">Feito</option>
            </select>
        </div>
        <h4>Observação</h4>
        <textarea rows="4" name="observacao" onChange={inputValue}></textarea>
        <div className="btn-block">
          <button onClick={cadProduct} className="botaoForm">Agendar</button>
        </div>    
    </div>
            </Modal.Body>
            </Modal>
            <div className='addagendDiv d-flex'>
                      <div className='tudoCardAgend'>
                        <div className="cabecalhoCardAgend d-flex">
                          <div className='cabeEmpAgend'>Empresa</div>
                          <div className='cabeCliAgend'>Cliente</div>
                          <div className='cabeTelAgend'>Telefone</div>
                          <div className='cabeDatAgend'>Data</div>
                          <div className='cabeHorAgend'>Horário</div>
                          <div className='cabeStaAgend'>Status</div>
                          <div className='cabeAnaAgend'>Analista</div>
                          <div className='cabeObsAgend'>Observação</div>
                          <div className='cabeOpcAgend'>Opções</div>
                        </div>
                        {Object.values(dataSearch).map((produc, index) => 
                                
                      <div className="agendCardAgend d-flex" key={index}>
                            <div className="empresaDivAgend">
                            {produc.nomeEmpresa}
                            </div>
                            <div className="clienteDivAgend">
                            {produc.cliente}
                            </div>
                            <div className="telefoneDivAgend">
                            {produc.telCliente}
                            </div>
                            <div className="dataDivAgend">
                            {produc.data}
                            </div>
                            <div className="horarioDivAgend">
                            {produc.horario}
                            </div>
                            <div className="statusDivAgend">
                            {produc.status}
                            </div>
                            <div className="analistaDivAgend">
                            {produc.analista}
                            </div>
                            <div className="obsDivAgend">
                            {produc.observacao}
                            </div>
                            <div className="opcoesDivAgend">
                                <div className="opcButtonsAgend d-flex">
                                <Link to={`/addproduct/${produc.id}/editagend`}>
                                        <button className='buttonsOpcAgend' id="bt2EditAgend">
                                          <GoPencil className="opcIcons"/>
                                       </button>
                                    </Link>
                                      <button className='buttonsOpcAgend' id="bt1ApagAgend" onClick={() => deleteAgend(produc.id)}>
                                        <FaTrashAlt className="opcIcons"/>
                                      </button>                                      
                                </div>
                            </div>                  
                      </div>
                    )
                }
                      </div>                      
                      </div>                      
                      <div className='filtroDiv'>
                        <div className='btnFiltro'>
                            <p>Data</p>
                        </div>
                        <div className="tituloFiltro">
                          <p>Data Inicial:</p>
                        </div>
                        <div className='filterSearch'>
                        <div className="select">
                          <div className="">
                          <input type="date" name="dataInicial" className="inputF" id="inputInicial"/>
                          <FaCalendarAlt className="calendarIcon" id="calendarI"/>
                          </div>
                          <div className="subtituloFiltro">
                            <p>Data Final:</p>
                          </div>                          
                          <div className="inputFiltroDiv">
                            <input type="date" name="dataFinal" className="inputF" id="inputFinal"/>
                            <FaCalendarAlt className="calendarIcon" id="calendarF"/>
                            <button onClick={getFilter} className="botaoFiltro" href="/"><TiFilter className="filterIcons"/></button>
                           </div>
                          </div>
                        </div>                        
                    </div>
            </div>     
            
        </div>
      </>
    );
  };

export default Body;