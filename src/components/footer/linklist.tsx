import Links from "./links";
import "./linklist.css";

const LinkList = () => {
  const links = [
    [
      { text: "Related websites", href: "/" },
      { text: "Yahoo Finance", href: "https://finance.yahoo.com" },
      { text: "How it works", href: "/" },
      { text: "Terms of use", href: "/" },
      { text: "Disclaimer", href: "/" },
      { text: "Privacy policy", href: "/" },
      { text: "Cookies policy", href: "/" },
    ],
    [
      { text: "Markets", href: "/" },
      { text: "Index", href: "/" },
      { text: "Crypto", href: "/" },
      { text: "Forex", href: "/" },
      { text: "Commodities", href: "/" },
    ],

    [
      { text: "Community", href: "/" },
      { text: "Invite a friend", href: "/" },
      { text: "Ideas", href: "/" },
      { text: "Streams", href: "/" },
      { text: "Our rules", href: "/" },
    ],

    [
      { text: "For businesses", href: "/" },
      { text: "Business inquiries", href: "/" },
      { text: "Widgets", href: "/" },
      { text: "Contact us", href: "/" },
      { text: "Graphics library", href: "/" },
      { text: "Integration", href: "/" },
      { text: "Content API and social networks", href: "/" },
    ],
  ];
  return (
    <div className="linklist">
      <Links links={links[0]} />
      <Links links={links[1]} />
      <Links links={links[2]} />
      <Links links={links[3]} />
    </div>
  );
};

export default LinkList;
