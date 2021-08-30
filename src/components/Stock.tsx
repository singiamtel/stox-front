import News from './news/news';
import Tweets from "./tweets/tweets";
import './Stock.css';
import Footer from './footer/footer';
import Stocks from "./stocks/stocks";
import Graph from "./graph/graph";
import Info from "./info/info";
import Buy from "./buy/buy";
import { useParams } from 'react-router-dom';

function Stock() {
  const { symbol } : {symbol:string} = useParams()
	return (
		<div className="Stock">
			<div className="Stock-body">
				<div className="Stock-bodyTop">
					<Graph symbol={symbol}/>
					<Buy />
				</div>
				<div className="Stock-bodyMid">
					<Info symbol={symbol}/>
					<Stocks />
				</div>
				<div className="Stock-bodyBot">
					<News />
					<Tweets />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Stock;
