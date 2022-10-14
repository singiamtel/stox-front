import News from "./news/news";
import Tweets from "./tweets/tweets";
import "./Home.css";
import Stocks from "./stocks/stocks";
import Graph from "./graph/graph";

const Home = () => {
  return (
    <div className="Home">
      <div className="Home-body">
          <Stocks />
          <Graph symbol="AAPL" />
          <News />
          <Tweets />
      </div>
    </div>
  );
};

export default Home;
