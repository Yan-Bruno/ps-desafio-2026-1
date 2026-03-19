// components/pagina/Banner_Video/banner_video.tsx
'use client';

import { useEffect, useRef } from 'react';
import './banner_video.css';

interface VideoBannerProps {
    videoSrc?: string;
    posterSrc?: string;
    overlay?: boolean;
    overlayOpacity?: number;
    children?: React.ReactNode;
    height?: 'full' | 'medium' | 'small';
    className?: string;
    fallbackColor?: string; // Cor de fundo quando não tem vídeo
    fallbackImage?: string; // Imagem de fundo quando não tem vídeo
}

const VideoBanner: React.FC<VideoBannerProps> = ({
    videoSrc,
    posterSrc,
    overlay = true,
    overlayOpacity = 0.5,
    children,
    height = 'full',
    className = '',
    fallbackColor = '#1a1a1a',
    fallbackImage,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && videoSrc) {
            videoRef.current.play().catch(() => { });
        }
    }, [videoSrc]);

    // Estilo para fallback quando não tem vídeo
    const fallbackStyle = {
        backgroundColor: fallbackColor,
        backgroundImage: fallbackImage ? `url(${fallbackImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className={`video-banner video-banner--${height} ${className}`}>
            {videoSrc ? (
                // Tem vídeo
                <video
                    ref={videoRef}
                    className="video-banner__video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={posterSrc}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            ) : (
                // Não tem vídeo - mostra fallback
                <div className="video-banner__fallback" style={fallbackStyle} />
            )}

            {overlay && (
                <div
                    className="video-banner__overlay"
                    style={{ backgroundColor: '#000', opacity: overlayOpacity }}
                />
            )}

            {children && (
                <div className="video-banner__content">
                    {children}
                </div>
            )}
        </div>
    );
};

export default VideoBanner;