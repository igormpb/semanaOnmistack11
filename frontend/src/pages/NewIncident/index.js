import React, { useState } from 'react';
import './style.css';
import LogoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from "../../services/api"

export default function Register() {
    const ongId = localStorage.getItem('ongId')

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    async function HandleNewincidents(e) {
        e.preventDefault
        const data = {
            title,
            description,
            value
        }
        try {
            await api.post('/incidents/create_incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            }, history.push('/profile/'))
            
        } catch (err) {
            alert('Houve um error ao cadastrar')
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section className="form">
                    <img src={LogoImg} alt="" />
                    <h1>
                        Cadastrar novo caso
                </h1>
                    <p>Descrever o caso detalhadamente para encontrar um herói oara resikver isso.</p>
                    <Link to="/profile/"><FiArrowLeft size={16} color="#E02041" />voltar para Home</Link>
                </section>
                <form onSubmit={HandleNewincidents} >
                        <input type="text"
                            placeholder="Título"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea name="" id="" cols="30" rows="10"
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                        <input type="text"
                            placeholder="Valor"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        
                    <button className="button btn-hover-g2">Cadastrar</button>
                </form>

            </div>
        </div>
    );
}






<form action="">
    <input type="text" placeholder="Título" />
    <textarea name="" id="" cols="30" rows="10" placeholder="Descrição"></textarea>
    <input type="text" placeholder="Valor" />
    <button type="button"></button>
</form>