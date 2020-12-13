import React, { useState, useEffect, useMemo} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Webcam from "react-webcam";

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';


export default function NewIncident() {
    const [image, setImage] = useState('');
    const history = useHistory();
    const userId = localStorage.getItem('userId');

    async function handleSubmit() {
        // e.preventDefault();
        const data = {
            image,
        }
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: userId,
                }
            })
            // history.push('/profile');
        } catch {
            alert('Erro ao cadastrar caso, tente novamente');
        }
    }
    
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [captureOn, setCaptureOn] = useState(false);
    // const prevCaptureOnRef = useRef();
    const FPS = 1;

    const handleStartCaptureClick = React.useCallback(() => {
        setCaptureOn(true);
        // console.log(captureOn)
    }, [setCaptureOn]);

    const handleStopCaptureClick = React.useCallback(() => {
        // webcamRef.current.stop()
        setCaptureOn(false);
        // console.log(captureOn)
    }, [setCaptureOn]);

    useEffect(() => {
        console.log(captureOn)
        
            const interval = setInterval(() => {
                if(captureOn){
                    const imageSrc = webcamRef.current.getScreenshot();
                    const image64 = imageSrc.toString('base64');
                    setImage(image64);
                    setImgSrc(imageSrc);
                }
            }, 1000/FPS);
            return () => clearInterval(interval);   
        
    }, [captureOn]);

    useEffect(() => {
        
        handleSubmit()
        // setInterval(() => {
        //     console.log(captureOn)
        //     if(captureOn){
        //         handleSubmit()
        //     }
        // }, 1000/FPS)    
        
    }, [image]);


    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
                <h1>Iniciar novo monitoramento</h1>
                <p>Clique em iniciar para começar a monitorar</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para home
                </Link>
            </section>
            <div>
                {/* <> */}
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                {captureOn ? (
                    <button className="button" onClick={handleStopCaptureClick}>Stop Capture</button>
                ) : (
                    <button className="button" onClick={handleStartCaptureClick}>Start Capture</button>
                )}
                
                {/* {imgSrc && (
                    <img
                    src={imgSrc}
                    />
                )} */}
                
                {/* </> */}
                {/* {console.log(captureOn)} */}
            </div>
            {/* <form onSubmit = {handleSubmit}>
                <input 
                placeholder="Titulo do caso"
                value= { title }
                onChange= {e => setTitle(e.target.value)}/>               
                <textarea 
                placeholder="Descrição"
                value={ description }
                onChange= {e => setDescription(e.target.value)}
                />
                <input
                 placeholder="Valor em reais"
                 value={value}
                 onChange = {e => setValue(e.target.value)}/>
                <button className="button" type="submit">Registrar</button>
            </form> */}
        </div>
    </div>
    );
    
}