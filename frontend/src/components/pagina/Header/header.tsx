'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DarkMode from "@/components/pagina/Dark_Mode/dark_mode";
import "./header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleLinkClick = (): void => {
    setMenuOpen(false);
  };

  const scrollToSection = (sectionId: string): void => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      handleLinkClick();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href="/" onClick={handleLinkClick}>
            <Image
              src="/assets/logo_eagle.png"
              alt="Eagle Logo"
              width={200}
              height={60}
              priority
            />
          </Link>
        </div>

        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <button
            onClick={() => scrollToSection('banner')}
            className="nav-link"
            type="button"
          >
            Banner
          </button>
          <button
            onClick={() => scrollToSection('produtos')}
            className="nav-link"
            type="button"
          >
            Produtos
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="nav-link"
            type="button"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('opinion')}
            className="nav-link"
            type="button"
          >
            Opinion
          </button>
          <button
            onClick={() => scrollToSection('footer')}
            className="nav-link"
            type="button"
          >
            Footer
          </button>
        </nav>

        <div className="header-actions">
          <DarkMode />
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            type="button"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}