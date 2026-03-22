// Footer.tsx
"use client";
import "./footer.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* LOGO */}
                <div className="footer-logo">
                    <Link href="/">
                        <Image
                            src="/assets/logo_eagle.png"
                            alt="Eagle Logo"
                            width={160}
                            height={48}
                            priority
                        />
                    </Link>
                </div>

                {/* 4 COLUNAS DE LINKS */}
                <div className="footer-links-grid">
                    {/* Coluna 1 - Sobre a Eagle */}
                    <div className="footer-column">
                        <h3>Sobre a Eagle</h3>
                        <Link href="/blog">Eagle Blog</Link>
                        <Link href="/historia">Nossa história</Link>
                        <Link href="/sustentabilidade">Nossa missão com a sustentabilidade</Link>
                        <Link href="/seguranca">Segurança do Site</Link>
                    </div>

                    {/* Coluna 2 - Fale com a gente */}
                    <div className="footer-column">
                        <h3>Fale com a gente</h3>
                        <Link href="/contato">Contato</Link>
                        <Link href="/whatsapp">Fale com nosso WhatsApp de Vendas</Link>
                        <Link href="/indique">Indique e Ganhe</Link>
                    </div>

                    {/* Coluna 3 - Nossas Políticas */}
                    <div className="footer-column">
                        <h3>Nossas Políticas</h3>
                        <Link href="/frete">Nossa Política de Frete</Link>
                        <Link href="/privacidade">Nossa Política de privacidade</Link>
                        <Link href="/trocas">Nossa Política de Troca & Devoluções</Link>
                        <Link href="/semana-consumidor">Semana do Consumidor Eagle</Link>
                    </div>

                    {/* Coluna 4 - Perguntas Frequentes */}
                    <div className="footer-column">
                        <h3>Perguntas Frequentes</h3>
                        <Link href="/assinatura">Como funciona: Assinatura</Link>
                        <Link href="/faq">Perguntas Frequentes</Link>
                    </div>
                </div>

                {/* COPYRIGHT */}
                <div className="footer-copyright">
                    <p>© 2026 Eagle — Todos os direitos reservados</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;