import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import moment from 'moment';

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

    async function handleDeleteIncident(_id) {
        try {
            await api.delete(`incidents/${_id}`, {
                headers: {
                    Authorization: userId,
                }
            });
            setIncidents(incidents.filter(incident => incident._id !== _id));
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
                            <li key={moment(incident.createdAt).format('MMM Do, YYYY. h:mm a')}>
                            <strong>IMAGEM: </strong>
                            <p><img src={incident.image} alt=""/></p>
                            {/* <p>{incident.image}</p> */}
                            <strong>TIMESTAMP: </strong>
                            <p className="date">
                            { moment(incident.createdAt).format('MMM Do, YYYY. h:mm a') }
                            </p>
                            {/* <p>{incident.createdAt}</p>     */}

                            <button onClick={() => handleDeleteIncident(incident._id)} type="button">
                                <FiTrash2 size={20}  color="#a8a8b3"></FiTrash2>
                            </button>
                        </li>
                    ))}
                </ul>
        </div>
    );
}