import './style.css';
import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Body = () => {

    const [agendamentos, setAgendamentos] = useState([]);

    const [relatorio, setRelatorios] = useState({
      total: '',
      realizados: '',
      pendentes: '',
      andamento: ''
    });

    //const [deletar, setDeletar] = useState('');

    const navigate = useNavigate();

    var obj = JSON.parse(sessionStorage.getItem('userData'));

    /*const getProducts = async () => {
        await fetch("http://localhost/final/index.php/agendamentos", {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            setAgendamentos(responseJson.listaAgendamentos)
            setRelatorios(responseJson.relatorios[0].totalAgendamentos);
        });
    }; */

      /*const deleteAgend = async (id) => {
          await fetch(`http://localhost/final/index.php/${id}/delagend`,{
            method: 'DELETE'       
          })
          .then((response) => response.json())
          .then((responseJson) => {      
            getAgendamentos();          
          })
        }*/

    useEffect(() => {
      const userRel = {
        username: obj.userData.username,
        cargo: obj.userData.cargo,
        state: 'agendamentos'
      }     
        fetch(`https://agendphp.herokuapp.com/index.php`,{
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
                setAgendamentos(responseJson.listaAgendamentos);   
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
    }, [obj])

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
                      <div className='filtroDivDash'>
                        <div className='btnFiltro'>
                            <p>Exemplo</p>
                        </div>
                        <div className="tituloFiltro">
                          <p></p>
                        </div>
                        <div className='filterSearch'>
                        <div className="select">
                          </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;
