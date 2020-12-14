import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Webcam from "react-webcam";

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import distriSecImg from '../../assets/DistriSec-no.png';

const videoConstraints = {
    facingMode: "user"
};


export default function NewIncident() {
    const [image, setImage] = useState('');
    const [nbDetections, setNbDetections] = useState(0);
    const userId = localStorage.getItem('userId');

    async function handleSubmit() {
        // e.preventDefault();
        const data = {
            image,
        }
        try {
            const response = await api.post('incidents', data, {
                headers: {
                    Authorization: userId,
                }
            })
            // history.push('/profile');
            console.log(response);
            if(response.data.detected){
                setNbDetections(nbDetections + 1);
            }
            
        } catch {
            alert('Erro ao cadastrar caso, tente novamente');
        }
    }
    
    const webcamRef = React.useRef(null);

    const [captureOn, setCaptureOn] = useState(false);
    const [FPS, setFPS] = useState(1);
    

    const handleStartCaptureClick = React.useCallback(() => {
        setCaptureOn(true);
        // console.log(captureOn)
    }, [setCaptureOn]);

    const handleStopCaptureClick = React.useCallback(() => {
        setCaptureOn(false);
        // console.log(captureOn)
    }, [setCaptureOn]);

    function handleIncreaseFPSClick() {
        if(!captureOn){
            switch(FPS){
                case 0.1:
                    setFPS(0.5);
                    break;
                case 0.5:
                    setFPS(1);
                    break;
                case 1:
                    setFPS(5);
                    break;
                case 5:
                    setFPS(5);
                    break;
                default:
                    break;
            }
        }
    }

    function handleDecreaseFPSClick() {
        if(!captureOn){
            switch(FPS){
                case 0.1:
                    setFPS(0.1);
                    break;
                case 0.5:
                    setFPS(0.1);
                    break;
                case 1:
                    setFPS(0.5);
                    break;
                case 5:
                    setFPS(1);
                    break;
                default:
                    break;

            }
        }
    }



    useEffect(() => {
        // console.log(captureOn)
        
        const interval = setInterval(() => {
            if(captureOn){
                const imageSrc = webcamRef.current.getScreenshot();
                const image64 = imageSrc.toString('base64');
                setImage(image64);
            }
        }, 1000/FPS);
        return () => clearInterval(interval);   
        
    }, [captureOn, FPS]);

    useEffect(() => {
        if(image){
            handleSubmit()
        } 
    }, [image]);

    // console.log(nbDetections);

    return(
        <div className="new-incident-container">
        <div className="content">
            

            <section>
                <div className="logo-div">
                    <img className="logo-inci" src={distriSecImg} alt="Monitore Agora"/>
                </div>

                <h1>Iniciar novo monitoramento</h1>
                <p>Defina o número de frames por segundo:</p>

                <div className="fps-content"> 
                    <button className="button3" onClick={handleIncreaseFPSClick}>Aumentar FPS</button>
                    <div className="fps-number">
                        {FPS} FPS
                    </div>
                    <button className="button3" onClick={handleDecreaseFPSClick}>Diminuir FPS</button>
                </div>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para home
                </Link>
            </section>
            <div>
                <>
                <div className="webcam">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        videoConstraints={videoConstraints}
                        screenshotFormat="image/jpeg"
                    />
                </div>
                
                {captureOn ? (
                    <button className="button2" onClick={handleStopCaptureClick}>Parar Captura</button>
                ) : (
                    <button className="button" onClick={handleStartCaptureClick}>Iniciar Captura</button>
                )}

                <div className="face-count">
                <p>{nbDetections} faces detectadas</p>
                </div>

                
                {/* {imgSrc && (
                    <img
                    src={imgSrc}
                    />
                )} */}
                
                </>
                {/* {console.log(captureOn)} */}
            </div>

            

        </div>
    </div>
    );
    
}