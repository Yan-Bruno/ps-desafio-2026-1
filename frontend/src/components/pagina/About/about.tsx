import Image from "next/image";
import "./about.css";

const About = () => {
    const aboutData = [
        {
            title: "Quem somos:",
            text: "Somos uma loja de departamento especializada em artigos esportivos, oferecendo as melhores marcas e produtos para atletas de todos os níveis."
        },
        {
            title: "Missão:",
            text: "Fornecer produtos esportivos de qualidade e inspirar pessoas a adotarem um estilo de vida ativo e saudável através do esporte."
        },
        {
            title: "Visão:",
            text: "Ser a maior e mais completa rede de artigos esportivos do país, reconhecida pela variedade e qualidade de nossos produtos."
        },
        {
            title: "Valores:",
            text: "Paixão pelo esporte, compromisso com a qualidade, respeito ao cliente, inovação constante e responsabilidade social."
        },
        {
            title: "História:",
            text: "Nossa jornada começou com o sonho de tornar o esporte acessível a todos. Hoje, somos referência em artigos esportivos, atendendo desde iniciantes até atletas profissionais."
        }
    ];

    return (
        <section className="aboutSection" id="about">
            <div className="aboutContainer">

                <div className="aboutImage">
                    <Image
                        src="/assets/imagens/eagle_about.png"
                        alt="Loja de artigos esportivos com diversos produtos e marcas"
                        width={600}
                        height={300}
                        className="image"
                        priority={false}
                        sizes="(max-width: 768px) 100vw, 600px"
                    />
                </div>

                <div className="aboutContent">
                    <h2 className="title">Sobre Nós</h2>

                    {aboutData.map((item, index) => (
                        <p key={index} className="paragraph">
                            <strong className="strong">{item.title}</strong>
                            {item.text}
                        </p>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default About;