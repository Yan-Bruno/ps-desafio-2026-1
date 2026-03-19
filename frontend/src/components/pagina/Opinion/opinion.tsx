// src/components/pagina/Opinion/opinion.tsx
import './opinion.css';
const Opinion = () => {
    const testimonials = [
        {
            name: "Rafael Mendes",
            initials: "RM",
            rating: 5,
            text: "Comprei uma chuteira da Nike e o conforto é surreal! Entrega super rápida."
        },
        {
            name: "Camila Souza",
            initials: "CS",
            rating: 4,
            text: "A camisa do Flamengo que comprei é original e chegou antes do previsto. Recomendo!"
        },
        {
            name: "Lucas Oliveira",
            initials: "LO",
            rating: 5,
            text: "A qualidade da bola de basquete é absurda! Quero comprar mais produtos."
        },
        {
            name: "Patrícia Lima",
            initials: "PL",
            rating: 5,
            text: "Tênis de corrida perfeito! Usei na maratona e não tive nenhuma bolha."
        },
        {
            name: "Thiago Costa",
            initials: "TC",
            rating: 5,
            text: "Meias de compressão de alta qualidade. Melhoraram muito minha recuperação."
        },
        {
            name: "Juliana Freitas",
            initials: "JF",
            rating: 4,
            text: "Ótimo atendimento! Me ajudaram a escolher o tamanho certo da luva de goleiro."
        }
    ];

    const scrollList = [...testimonials, ...testimonials];

    return (
        <section className="testimonials-section" id="testimonials">
            <h2 className="testimonials-title">
                O que nossos clientes dizem
            </h2>

            <div className="testimonials-carousel">
                <div className="testimonials-viewport">
                    <div className="testimonials-container">
                        {scrollList.map((item, index) => (
                            <div
                                className="testimonial-card"
                                key={`${item.name}-${index}`}
                            >
                                <div className="avatar-wrapper initials-avatar">
                                    <span className="avatar-initials">{item.initials}</span>
                                </div>
                                <h3>{item.name}</h3>
                                <div className="stars">
                                    {"★".repeat(item.rating)}
                                    {"☆".repeat(5 - item.rating)}
                                </div>
                                <p className="testimonial-text">
                                    "{item.text}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Opinion;