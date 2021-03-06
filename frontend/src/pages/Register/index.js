import React, { useState } from 'react';
import './style.css';
import LogoImg from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from "../../services/api";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(e){
        e.preventDefault()
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try{
            const response = await api.post('/ongs/register',data)
            alert(`Grave seu ID de acesso: ${response.data.id}`)
        }catch(err){
            alert('Error no cadastro')
        }
      
    }
    return (
        <div className="register-container">
            <div className="content">
            <section className="form">
                <img src={LogoImg} alt=""/>
                <h1>
                    Cadastro
                </h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
                <Link to="/"><FiArrowLeft size={16} color="#E02041"/>Já tenho cadastro</Link>
                </section> 
                <form onSubmit={handleRegister}>

                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="tell" placeholder="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                    <div className="input-group">
                    <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                    <input type="text" placeholder="UF" style={{width: 80}} value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button className="button btn-hover-g2">Cadastrar</button>
                </form>
            
            </div>
        </div>
    );
}