import React, { useState } from 'react';
import { FiArrowLeft }  from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import distriSecImg from '../../assets/DistriSec-no.png';


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        console.log({
            name,
            email,
        })
        const data = {
            name,
            email,
        };
        try {
            const response = await api.post('users', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch {
            alert(`Erro no cadastro, tente novamente`);
        }
    }

    return(
        <div className="register-container">
            <img className="logo-reg" src={distriSecImg} alt="Monitore Agora"/>
            <div className="content">
            
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre e monitore o seu dispositivo</p>


                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                     placeholder="Nome do Usuário"
                     value={name}
                     onChange={e => setName(e.target.value)}/>
                    
                    <input 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                     onChange={e => setEmail(e.target.value)}/>
                    
                    {/* <input 
                    placeholder="Whatsapp"
                    value={whatsapp}
                     onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={city}
                     onChange={e => setCity(e.target.value)}/>
                        
                        <input 
                        placeholder="UF"
                         style= {{ width: 80 }}
                         value={uf}
                        onChange={e => setUf(e.target.value)}/>
                    </div> */}

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}