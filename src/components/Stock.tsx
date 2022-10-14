import News from "./news/news";
import Tweets from "./tweets/tweets";
import "./Stock.css";
import Footer from "./footer/footer";
import Stocks from "./stocks/stocks";
import Graph from "./graph/graph";
import Info from "./info/info";
import Buy from "./buy/buy";
import { useParams, useHistory } from "react-router-dom";

function randomStock() {
  // List is too big for prettier
  // prettier-ignore
  const list = [ "AAPL", "KR", "NVDA", "FCX", "LMT", "MSFT", "FB", "BABA"];
  return list[Math.floor(Math.random() * list.length)];
}

function Stock() {
  const history = useHistory();
  let { symbol }: { symbol: string } = useParams();
  if (symbol.toLowerCase() === "random") {
    history.push("/stock/" + randomStock());
    history.go(0);
  }
  return (
    <div className="Stock">
      <div className="Stock-body">
        <div className="Stock-bodyTop">
		<div style={{width:"900px"}}>
          <Graph symbol={symbol} />
		</div>
          <Buy />
        </div>
        <div className="Stock-bodyMid">
          <Info symbol={symbol} />
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
