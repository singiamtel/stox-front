import "./links.css";

interface Link {
  text: string;
  href: string;
}

const Links = (props: { links: Link[] }) => {
  return (
    <div className="links">
      {props.links.map((link: Link, index: number) => (
        <div key={index} className="link-row">
          <a href={link.href}>{link.text}</a>
        </div>
      ))}
    </div>
  );
};

export default Links;
