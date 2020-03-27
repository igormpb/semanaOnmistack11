import React, {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './style.css';
import api from '../../services/api'
import LogoImg from '../../assets/logo.svg';




export default function Profile(){
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);
    
    const ongName = localStorage.getItem('ongName')
    
    const ongId = localStorage.getItem('ongId')
   
    useEffect(()=>{
       api.get('profile/',{
           headers:{
               Authorization: ongId
           }
       }).then(res=>{
           setIncidents(res.data)
       })
   }, [ongId]);

  async function deleteIncident(id){
       try{
           await api.delete(`/incidents/all/${id}`,{
               headers:{
                   Authorization: ongId,
               }
           });
           setIncidents(incidents.filter(i=>i.id !== id))
       }catch(Err){
           alert('error')
       }
   }

   function handleLogout(){
       localStorage.clear()
       history.push('/')
   }
    return(
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt=""/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button btn-hover-g2" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout}type="button">
                   <FiPower size={18} color="#E02041" />
                    
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
               {incidents.map(i =>( <li key={i.id}>
                       <strong>CASO:</strong>
                       <p>{i.tittle}</p>

                       <strong>DESCRIÇÃO:</strong>
                       <p>{i.description}</p>

                       <strong>VALOR:</strong>
                       <p>{Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(i.value)}</p>
                       <button onClick={()=> deleteIncident(i.id)}type="button"><FiTrash2 size={20} color="#a8a8b3"/> </button>
                   </li>))}
            </ul>
        </div>

    );
}