import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './style.css';
import api from "../../services/api";
import HeroesImg from '../../assets/heroes.png';
import LogoImg from '../../assets/logo.svg';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('/ongs/login', {id} );
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName',response.data.name);
            history.push('/profile')
        }catch(err){
            alert('Erro ao logar')
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={LogoImg} alt="Logo" />
                <h1>Faça seu Logon</h1>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register"><FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
            </Link>
                </form>
            </section>
            <img src={HeroesImg} alt="Heroes" />
        </div>

    );
}

