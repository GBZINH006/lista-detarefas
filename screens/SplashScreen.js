
import React from 'react';
import Lottie from 'lottie-react';
import splashAnimation from '../assets/splash.json';

export default function SplashScreen() {
    return (
        <div className="splash">
            <Lottie animationData={splashAnimation} loop autoplay style={{ width: 200, height: 200 }} />
            <h2>Carregando easyTarefa...</h2>
        </div>
    );
}
