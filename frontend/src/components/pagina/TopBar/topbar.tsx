'use client';

import React, { useState, useEffect } from 'react';
import './TopBar.css';

interface TopBarProps {
  messages?: string[];
  interval?: number;
}

const TopBar: React.FC<TopBarProps> = ({
  messages = [
    'CONTEÚDO QUE VALE PONTOS',
    'COMPRE AGORA COM FRETE GRÁTIS',
    'USE SEUS PONTOS EAGLES E VOE COM CUPONS DE ATÉ 30% OFF'
  ],
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animationClass, setAnimationClass] = useState<string>('active');

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationClass('exit');

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setAnimationClass('active');
      }, 500);

    }, interval);

    return () => clearInterval(timer);
  }, [messages.length, interval]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

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