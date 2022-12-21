import './style.css';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Body = () => {

       
    const [agendamentos, setAgendamentos] = useState([]);
    const [agendAnd, setAgendAnd] = useState([]);
    const [statusAgend, setStatusAgend] = useState([]);
    const [stat, setStat] = useState('');
    const[input, setInput] = useState([]);

    const [relatorio, setRelatorios] = useState({
      total: '',
      realizados: '',
      pendentes: '',
      andamento: ''
    });      

    const handleEmp = (e) => {
      var select = document.getElementById("empSel");
      var opcaoTexto = select.options[select.selectedIndex].text;
      setStat(opcaoTexto);
    }    

    const handleChange = (e) => {
      const value = e.target.value;
      setInput(values => ({...values, state:'upState', nomeEmp: stat, statt: value}));
  }

    const navigate = useNavigate();

    var obj = JSON.parse(sessionStorage.getItem('userData'));

    useEffect(() => {
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
              console.log(responseJson);
              if(responseJson !== ''){
                setAgendamentos(responseJson.listaAgendamentosToday);  
                setAgendAnd(responseJson.listaAndamentoToday);
                setStatusAgend(responseJson.listaAndamentoTodayAnalist);
              if(obj.userData.cargo !== "Admin"){
                setRelatorios({ total : responseJson.listUserrel[0].totalAgendUser,
                                realizado: responseJson.realizadoUser[0].realizadoUser,
                                pendente: responseJson.pendenteUser[0].pendenteUser,
                                andamento: responseJson.andamentoUser[0].andamentoUser});
              }else{
                setRelatorios({total : responseJson.relatorios[0].totalAgendamentos,
                               realizado: responseJson.realizado[0].realizado,
                               pendente: responseJson.pendente[0].pendente,
                               andamento: responseJson.andamento[0].andamento});
              }   
            }else{
              return <div></div>;
            }                      
            }).catch((error)=>{                
                console.log(error);
            }) 
    }, [obj.userData.cargo, obj.userData.username])    

    const updateState = async (e) =>{ 
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
                  console.log(responseJson)
                  if(responseJson.estado === "Feito"){
                    setStat('');
                  }
                  window.location.reload(); 
                }).catch((err)=>{                
                  console.log(err);
                })                                                 
      }    

    useEffect(() => {
        if(sessionStorage.getItem('userData') !== null){            
            navigate('/homepage');
         }else{
            navigate('/');
         }         
    }, [navigate])

    return (
        <>
            <div className="todoConteudo">
                <div className='conjuntoTotal'>
                    <div className='dashDiv d-flex'>
                        <div className='dashCard' id="firstCard">
                            <div className='subtitleCard'>
                              <p>Total</p>
                            </div>
                            <div className='tituloCard'>
                              <p>{relatorio.total}</p>
                            </div>
                        </div>
                        <div className='dashCard' id="secondCard">
                            <div className='subtitleCard'>
                                <p>Realizados</p>
                            </div>
                            <div className='tituloCard'>
                                <p>{relatorio.realizado}</p>
                            </div>
                        </div>
                        <div className='dashCard' id="thirdCard">
                            <div className='subtitleCard'>
                                <p>Pendentes</p>
                            </div>
                            <div className='tituloCard'>
                              <p>{relatorio.pendente}</p>
                            </div>
                        </div>
                        <div className='dashCard' id="lastCard">
                            <div className='subtitleCard'>
                                <p>Em treinamento</p>
                            </div>
                            <div className='tituloCard'>
                              <p>{relatorio.andamento}</p>
                            </div>
                        </div>
                    </div>
                    <div className='conjunto-content'>
                    <div className='agendamentosDiv d-flex'>
                      <div className='tudoCardDash'>
                        <div className="cabecalhoCardDash d-flex">
                          <div className='cabeEmpDash'>Empresa</div>
                          <div className='cabeCliDash'>Cliente</div>
                          <div className='cabeTelDash'>Telefone</div>
                          <div className='cabeDatDash'>Data</div>
                          <div className='cabeHorDash'>Horário</div>
                          <div className='cabeStaDash'>Status</div>
                          <div className='cabeAnaDash'>Analista</div>
                          <div className='cabeObsDash'>Observação</div>
                        </div>
                        {typeof agendamentos !== "undefined" && Object.values(agendamentos).map((agendamento, index) => {
                                    return (
                      <div className="agendCardDash d-flex" key={agendamento.id}>
                            <div className="empresaDivDash">
                            {agendamento.nomeEmpresa}
                            </div>
                            <div className="clienteDivDash">
                            {agendamento.cliente}
                            </div>
                            <div className="telefoneDivDash">
                            {agendamento.telCliente}
                            </div>
                            <div className="dataDivDash">
                            {agendamento.data}
                            </div>
                            <div className="horarioDivDash">
                            {agendamento.horario}
                            </div>
                            <div className="statusDivDash">
                            {agendamento.status}
                            </div>
                            <div className="analistaDivDash">
                            {agendamento.analista}
                            </div>
                            <div className="obsDivDash">
                            {agendamento.observacao}
                            </div>
                      </div>
                      );
                    })
                }
                      </div>                      
                      </div>
                      <div className='conjunto-lado'>
                        <div></div>
                      <div className='filtroDivDash'>
                        <div className='conteudoT'>
                          <div className='btnFiltroHome'>
                            <p>Treinamento</p>
                          </div>
                          <div className="containerAnalistas">
                            <div className="analistAnd">
                            {typeof agendAnd !== "undefined" && Object.values(agendAnd).map((produc, index) =>                                
                                <p className='analistEach'> | {produc.analista} </p>
                              )
                            }  
                            </div>
                          </div>
                        </div>                                              
                    </div>
                    <div className='andamentoDiv'> 
                      <div className='conteudoAnamentoDiv'>                  
                          <div className='btnAnd'>
                              <p>Andamento</p>
                         </div>
                         <div className="andContent">
                          <div className="searchBars">
                            <select id="empSel" className='andSelect' onChange={handleEmp}>
                            <option value=''>-Empresa-</option> 
                            {typeof statusAgend !== "undefined" && Object.values(statusAgend).map((produc, index) =>                          
                              <option value={produc.nomeEmpresa}>{produc.nomeEmpresa}</option>                             
                              )
                            } 
                            </select>
                            <select className='statSelect' onChange={handleChange} value={input.status}>
                              <option value="" >-Status-</option>
                              <option value="Andamento" >Andamento</option>
                              <option value="Feito">Feito</option>
                            </select>
                            </div>
                            <div className='buttonAndDiv'>
                              <button className="buttonAnd" onClick={updateState}>Alterar Status</button>
                            </div>
                        </div>  
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
