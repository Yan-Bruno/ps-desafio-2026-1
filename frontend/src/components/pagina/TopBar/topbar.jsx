'use client';

import React, { useState, useEffect } from 'react';
import './TopBar.css'; // Importando o CSS normal

const TopBar = ({ 
  messages = [
    'CONTEÚDO QUE VALE PONTOS',
    'COMPRE AGORA COM FRETE GRÁTIS',
    'USE SEUS PONTOS EAGLES E VOE COM CUPONS DE ATÉ 30% OFF '
  ],
  interval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('active');

  useEffect(() => {
    const timer = setInterval(() => {
      // Inicia a animação de saída
      setAnimationClass('exit');
      
      // Depois de 500ms, muda a mensagem e inicia a animação de entrada
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setAnimationClass('active');
      }, 500); // Metade do tempo da transição
      
    }, interval);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(timer);
  }, [messages.length, interval]); // Dependências do useEffect

  return (
    <div className="topBar">
      <div className="container">
        <div className={`message ${animationClass}`}>
          {messages[currentIndex]}
        </div>
      </div>
    </div>
  );
};

export default TopBar;