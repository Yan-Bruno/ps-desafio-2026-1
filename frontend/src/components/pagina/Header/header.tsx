'use client';

import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DarkMode from '@/components/pagina/Dark_Mode/dark_mode';
import './header.css';

const NAV_ITEMS = [
  { id: 'banner', label: 'Banner', sectionId: 'banner' },
  { id: 'produtos', label: 'Produtos', sectionId: 'produtos' },
  { id: 'sobre', label: 'Sobre', sectionId: 'about' },
  { id: 'feedbacks', label: 'Feedbacks', sectionId: 'opinion' },
  { id: 'informacoes', label: 'Informações', sectionId: 'footer' },
] as const;

const useScrollToSection = (onComplete?: () => void) => {
  const scrollToSection = useCallback((sectionId: string) => {
    try {
      const element = document.getElementById(sectionId);

      if (!element) {
        console.warn(`Elemento não encontrado: ${sectionId}`);
        return;
      }

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      onComplete?.();
    } catch (error) {
      console.error('Erro ao rolar para seção:', error);
    }
  }, [onComplete]);

  return { scrollToSection };
};

const NavLinks = memo(({ onLinkClick }: { onLinkClick: () => void }) => {
  const { scrollToSection } = useScrollToSection(onLinkClick);

  return (
    <>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.sectionId)}
          className="nav-link"
          type="button"
        >
          {item.label}
        </button>
      ))}
    </>
  );
});

NavLinks.displayName = 'NavLinks';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href="/" onClick={closeMenu} aria-label="Página inicial">
            <Image
              src="/assets/logo_eagle.png"
              alt="Eagle Logo"
              width={200}
              height={60}
              priority
            />
          </Link>
        </div>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <NavLinks onLinkClick={closeMenu} />
        </nav>

        <div className="header-actions">
          <DarkMode />
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            type="button"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}