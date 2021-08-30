import './footer.css';
import LinkList from './linklist';
import logo from './logo.svg';

const Footer = () => {
	return(
		<footer className="footer">
			<LinkList />
			<br/>
			<div className="footer-bottom">
				<img src={logo} alt="Stox Logo"/>
				<div className="footer-bottomLeft">
					<p>Copyright © {new Date().getFullYear()} XTOX Inc. </p>
					<p>Todos los derechos resevados. </p>
				</div>
			</div>

		</footer>
	);
}

export default Footer;
