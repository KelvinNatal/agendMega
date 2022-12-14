import './clientP.css'
import { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import {Link, useNavigate} from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { TiFilter } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import MultiSelect from  'react-multiple-select-dropdown-lite';

const ClienteP = () => {

  const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [products, setProducts] = useState([]);    
    const [vall, setvall] = useState('');
    const [error, setError] = useState({
      erro: false,
      message: ''
    });
    const [product, setProduct] = useState({
      nomeEmpresa: '',
      cliente: '',
      telCliente: '',
      comercial: '',
      produto: '',
      plano: '',
      ramais: '',
      dataEmp: '',   
      link: '',
      state: 'criarEmpresa',
      type: 1
  });

    useEffect(() => {
      setProduct(p => ({...p, 'produto': vall}));
    },[vall])

    const  options  = [
      { label:  'Discador', value:  'D'  },
      { label:  'Ura-bot', value:  'UB'  },
      { label:  'Mega-bot', value:  'MB'  },
      { label:  'SMS', value:  'SMS'  },
      { label:  'Cloudchat', value:  'CC'  },
      { label:  'Telefonia', value:  'T'  },
    ]

    
    const inputPlano = (e) => {
      let plano = document.getElementById('plano').value;
      let canais = document.getElementById('inputPlano').value;
      if(plano === "Tarifado"){
        canais = ""
      }
      let plan = `${canais} ${plano}`
      setProduct({...product, 'plano': plan});
    } 

    const inputRamais= (e) => {
      let ramais = document.getElementById('ramais').value;
      let licencas = document.getElementById('licencas').value;
      let rali = `${ramais}R ${licencas}L`;
      setProduct({...product, 'ramais': rali});
  } 

    const inputValue = (e) => {
        let valor = e.target.value;
        setProduct({...product, [e.target.name]: valor});     
    }   

    const inputD = () => {
        var date = document.getElementById('dateCalendar').value;
        //var array = date.split('-');
        //var dataFinal = `${array[2]}/${array[1]}/${array[0]}`;
        setProduct({...product, dataEmp: date});
    }

    const handleClose = () => {
        setShow(false)
    };

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
      } 

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
                 setProducts(responseJson.listaEmpresas);                          
            }).catch((error)=>{                
                console.log(error);
            })                
    }

    const getFilter = (e) => {
      var dataI = document.getElementById('inputInicialEmp').value; 
      var dataF = document.getElementById('inputFinalEmp').value; 
      const filtroAgend = {
        dataInicial: dataI,
        dataFinal: dataF,
        state: 'filterEmp'
      }     
      e.preventDefault();
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
              console.log(responseJson.erro);
              if(!responseJson.erro){
                setError({
                  erro: false,
                  message: ''
                })
                return navigate('/addproduct');
              }
              setError({
                erro: true,
                message: 'Essa empresa ja existe.'
              })
            }).catch((err)=>{                
                console.log(err);
            })                         
    }

    const deleteAgend = async (id) => {
      const input = {
        idup: id,
        state: 'delempresa',
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
      .then((responseJson) => {      
        //console.log(responseJson)
        getEmpresas();          
      })
    }

    useEffect(() => {   
      getEmpresas();  
    }, [])    

    useEffect(() => {
        if(sessionStorage.getItem('userData') !== null){            
            navigate('/addcliente');
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
  
    
    return (       
      <>
      <div className="todoConteudoCli d-flex">
            <div className='conjuntoCli'>
              <div className='cabeButtons d-flex'>
                <div className='btnAgend' onClick={handleShow}>
                    <p>+</p>
                </div>
                <div className='pesquisaFiltro'>
                  <input type="Text" placeholder="Insira..." id="inputFiltro" value={filter} onChange={searchText.bind(this)}></input>
                  <IoMdSearch className="fa addIcons"/>
                </div>
              </div>
            <Modal  dialogClassName='mod' fullscreen={fullscreen} show={show} onHide={handleClose} animation={true}>
              <Modal.Header closeButton className="modd">
                <Modal.Title>Criar Empresa</Modal.Title>
             </Modal.Header>
            <Modal.Body className="modd">
            <div className="">
            <div className={error.erro === true ? 'error' : '' }>{error.message}</div>            
            <div id="product_form">
        <div className='dataHora' >
            <div className="item">
                <p>Data</p>
                <input type="date" name="dataEmp" id="dateCalendar" onChange={inputD}required/>
                <FaCalendarAlt className="calendarIconCliente" id="calendarIc"/>
            </div>
        </div>
        <div className="item">
          <p>Empresa</p>
          <input type="text" name="nomeEmpresa" placeholder="First" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Cliente</p>
          <input type="text" name="cliente" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Telefone</p>
          <input type="text" name="telCliente" onChange={inputValue} />
        </div>
        <div className="item">
          <p>Comercial</p>
          <select id="comercial" name="comercial" onChange={inputValue}>
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
          />
          </div>
        </div>
        <div className="item">
          <p>Plano / Canais</p>
          <select id="plano" onChange={inputPlano}>
              <option value="">Plano</option>
              <option value="Ilimitado">Ilimitado</option>
              <option value="Tarifado">Tarifado</option>
            </select>
          <input id="inputPlano" type="text" onChange={inputPlano} />
        </div>
        <div className="item">
          <p>Ramais / Licen??as</p>
          <input id="ramais" type="text" onChange={inputRamais} />
          <input id="licencas" type="text" onChange={inputRamais} />
        </div>
        <div className="item">
          <p>Link</p>
          <input type="text" name="link" onChange={inputValue} />
        </div>
        <div className="btn-div">
          <button onClick={handleClose} className="botaoVoltar">Cancelar</button>
          <button onClick={cadProduct} className="botaoAlterar">Criar</button>
        </div>    
        </div>
    </div>
            </Modal.Body>
            </Modal>
            <div className='addCliDiv d-flex'>
                      <div className='tudoCard'>
                        <div className="cabecalhoCard d-flex">
                          <div className='cabeEmp'>Empresa</div>
                          <div className='cabeCli'>Cliente</div>
                          <div className='cabeTel'>Telefone</div>
                          <div className='cabeDat'>Comercial</div>
                          <div className='cabeHor'>Produto</div>
                          <div className='cabeSta'>Plano</div>
                          <div className='cabeAna'>Ramais</div>
                          <div className='cabeObs'>Data</div>
                          <div className='cabeOpcEmp'>Op????es</div>
                        </div>
                        {
                                typeof products !== "undefined" && Object.values(dataSearch).map((produc, index) => {
                                    return (
                      <div className="agendCard d-flex" key={produc.idEmpresa}>
                            <div className="empresaDiv">
                            {produc.nomeEmpresa}
                            </div>
                            <div className="clienteDiv">
                            {produc.cliente}
                            </div>
                            <div className="telefoneDiv">
                            {produc.telCliente}
                            </div>
                            <div className="comercialDiv">
                            {produc.comercial}
                            </div>
                            <div className="produtoDiv">
                            {produc.produto}
                            </div>
                            <div className="planoDiv">
                            {produc.plano}
                            </div>
                            <div className="ramaisDiv">
                            {produc.ramais}
                            </div>
                            <div className="dataDiv">
                            {produc.dataEmp}
                            </div>
                            <div className="opcoesDivEmp">
                                <div className="opcButtonsEmp d-flex">
                                <Link to={`/addcliente/${produc.idEmpresa}/editcliente`}>
                                        <button className='buttonsOpcEmp' id="bt2EditEmp">
                                          <GoPencil className="opcIcons"/>
                                        </button>
                                    </Link>
                                      <button className='buttonsOpcEmp' id="bt1ApagEmp" onClick={() => deleteAgend(produc.idEmpresa)}>
                                        <FaTrashAlt className="opcIcons"/>
                                      </button>                                      
                                </div>
                            </div>
                      </div>
                      );
                    })
                }
                      </div>                      
                      </div>                      
                      <form onSubmit={getFilter}>
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
                          <input type="date" name="dataInicial" className="inputF" id="inputInicialEmp"/>
                          <FaCalendarAlt className="calendarIcon" id="calendarI"/>
                          </div>
                          <div className="subtituloFiltro">
                            <p>Data Final:</p>
                          </div>                          
                          <div className="inputFiltroDiv">
                            <input type="date" name="dataFinal" className="inputF" id="inputFinalEmp"/>
                            <FaCalendarAlt className="calendarIcon" id="calendarF"/>
                            <button type="submit" className="botaoFiltro" href="/"><TiFilter className="filterIcons"/></button>
                           </div>
                          </div>
                        </div>                        
                    </div>
                    </form>
            </div>     
            
        </div>
      </>
    );
  };

export default ClienteP;