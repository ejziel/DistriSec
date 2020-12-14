import React, { useState } from 'react';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import distriSecImg from '../../assets/DistriSec-no.png';


export default function Logon() {
    
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e) {
        e.preventDefault();
        try {
            console.log(id);
            const response = await api.post('sessions', { id });

            localStorage.setItem('userId', id);
            localStorage.setItem('userName',response.data[0]["name"]);

            history.push('/profile');
        } catch {
            alert('Falha no login, tente novamente!');
        }
    }
    
    return(
        <div className="logonContainer">
            <img src={distriSecImg} alt="Monitore Agora"/>
            <section className="form">
                
                <form onSubmit={handleLogin}>
                    <h1>Faça o seu logon</h1>
                    <input
                     placeholder="Sua ID"
                     value={id}
                     onChange= {e => setId(e.target.value) }/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        </div>
    );
}