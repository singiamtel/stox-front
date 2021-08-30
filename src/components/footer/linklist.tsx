import Links from "./links";
import "./linklist.css";

const LinkList = () => {
  const links = [
    [
      { text: "Webs relacionadas", href: "/" },
      { text: "Yahoo Finance", href: "https://finance.yahoo.com" },
      { text: "Cómo funciona", href: "/" },
      { text: "Condiciones de uso", href: "/" },
      { text: "Exención de responsabilidad", href: "/" },
      { text: "Política de privacidad", href: "/" },
      { text: "Política de cookies", href: "/" }
    ],
    [
      { text: "Mercados", href: "/" },
      { text: "Índices", href: "/" },
      { text: "Criptomonedas", href: "/"},
      { text: "Divisas", href: "/"},
      { text: "Materias primas", href: "/"}
    ],

    [
      { text: "Comunidad", href: "/" },
      { text: "Recomendar a un amigo", href: "/" },
      { text: "Ideas", href: "/" },
      { text: "Streams", href: "/" },
      { text: "Normas internas", href: "/" }
    ],

    [
      { text: "Para empresas", href: "/" },
      { text: "Widgets", href: "/" },
      { text: "Solucionar broker y sitio web", href: "/" },
      { text: "Soluciones relacionadas con los gráficos", href: "/" },
      { text: "Biblioteca de gráficos ligeros", href: "/" },
      { text: "Integración de corretaje", href: "/" },
      { text: "Fuentes de contenido y RRSS", href: "/" }
    ]
  ]
  return(
    <div className="linklist">
      <Links links={links[0]} />
      <Links links={links[1]} />
      <Links links={links[2]} />
      <Links links={links[3]} />
    </div>
  );
}

export default LinkList;
