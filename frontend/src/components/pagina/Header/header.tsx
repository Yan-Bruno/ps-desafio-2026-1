
'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DarkMode from "@/components/pagina/Dark_Mode/dark_mode";
import "./header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
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
          <Link href="/" onClick={handleLinkClick}>Home</Link>
          <Link href="/produtos" onClick={handleLinkClick}>Produtos</Link>
          <Link href="/sobre" onClick={handleLinkClick}>Sobre Nós</Link>
          <Link href="/contato" onClick={handleLinkClick}>Contato</Link>
          <Link href="/footer" onClick={handleLinkClick}>Footer</Link>
        </nav>

        <div className="header-actions">
          <div className="header-actions">
            <DarkMode />
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}