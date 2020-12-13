import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';


export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    } ,[userId]);

    async function handleDeleteIncident(image_id) {
        try {
            await api.delete(`incidents/${image_id}`, {
                headers: {
                    Authorization: userId,
                }
            });
            setIncidents(incidents.filter(incident => incident.image_id !== image_id));
        } catch {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    
    return(
        <div className="profile-container">
            <header>
                <span>Bem vindo, {userName}</span>
                <Link className="button" to="/incidents/new">Monitorar</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Detecções</h1>
                <ul>
                    {incidents.map(incident => (
                            <li key={incident.image_id}>
                            <strong>IMAGEM: </strong>
                            <p><img src={incident.image} alt=""/></p>
                            {/* <p>{incident.image}</p> */}
                            <strong>TIMESTAMP: </strong>
                            <p>{incident.createdAt}</p>    
                            {/* <strong>Valor: </strong> */}
                            {/* <p>{Intl.NumberFormat('pt-Br',{style: 'currency', currency: 'BRL'}).format(incident.value)}</p>     */}
                            <button onClick={() => handleDeleteIncident(incident.image_id)} type="button">
                                <FiTrash2 size={20}  color="#a8a8b3"></FiTrash2>
                            </button>
                        </li>
                    ))}
                </ul>
        </div>
    );
}