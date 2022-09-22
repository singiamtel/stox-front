import { useEffect, useState } from "react";
import axios from "axios";
import "./bar.css";
import down from "./down.svg";
import up from "./up.svg";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface StockInfo {
  stockSymbol: string;
  stockName: string;
  price: string;
  changePer: string;
  changeVol: string;
}

const rstyle = { color: "#FB6A75" };
const gstyle = { color: "#00C7B7" };

const usePathname = () => {
  const location = useLocation();
  return location.pathname;
};

const BarItem = ({
  stockSymbol,
  stockName,
  price,
  changePer,
  changeVol,
}: StockInfo) => {
  const inc = parseFloat(changeVol) > 0;
  return (
    <div className="featured-item">
      <div className="featured-item-name">
        <NavLink className="no-style-link" to={"/stock/" + stockSymbol}>
          {" "}
          {stockSymbol || ""}{" "}
        </NavLink>
      </div>
      <div className="featured-item-value">{price || ""}</div>
      <div className="featured-item-daily" style={inc ? gstyle : rstyle}>
        {changeVol ? (inc ? "+" : "") + changeVol : ""}
      </div>
      <div className="featured-item-percent" style={inc ? gstyle : rstyle}>
        {changePer ? (inc ? "+" : "") + changePer + "%" : ""}
      </div>
      <div className="featured-item-icon">
        <img src={inc ? up : down} width="12" height="8" alt="" />
      </div>
    </div>
  );
};

const getUsername = () => {
  return sessionStorage.getItem("username") || "";
};

const Bar = () => {
  const username = getUsername();
  let text;
  const path = usePathname();
  const [stock, setStock] = useState("");
  let history = useHistory();

  async function redirectStock(e: React.FormEvent) {
    e.preventDefault();
    if (stock) {
      try {
        await axios
          .get(process.env.REACT_APP_API_URL + "/stock/" + stock.toUpperCase())
          .then((res) => {
            if (res.data === null) {
              throw new Error("Stock not found!");
            }
            setStock("");
            history.push("/stock/" + stock.toUpperCase());
          });
      } catch {
        toast.info("Stock not found!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }
  if (getUsername()) {
    text = (
      <div className="conectarse-text">
        {" "}
        Bienvenido, {username.charAt(0).toUpperCase() + username.slice(1)}{" "}
      </div>
    );
  } else {
    // Should never render as long as site is login protected
    text = <div className="conectarse-text"> Conectarse </div>;
  }
  const [fetchedStocks, setFetchedStocks] = useState<StockInfo[]>([]);
  const featuredStocks = ["AAPL", "KR", "NVDA", "FCX", "LMT"];
  useEffect(() => {
    const stocks: StockInfo[] = [];
    function dataToStocks(data: any) {
      const diff = data.hDailies[0].close - data.hDailies[1].close;
      stocks.push({
        stockSymbol: data.symbol,
        stockName: data.name,
        price: data.hDailies[0].close.toFixed(2),
        changePer: ((diff / data.hDailies[1].close) * 100).toFixed(2),
        changeVol: diff.toFixed(2),
      });
      setFetchedStocks(fetchedStocks.concat(stocks));
      return stocks;
    }

    featuredStocks.forEach((i) => {
      axios
        .get(process.env.REACT_APP_API_URL + "/stock/" + i)
        .then((result) => {
          dataToStocks(result.data);
        });
    });
  }, []);
  return (
    <div className="header-stats">
      <ToastContainer />

      <div className="black-bar">
        <div className="featured-stocks">
          <div className="tendencias-text">Tendencias</div>
          {fetchedStocks.map((el: StockInfo, index: number) => {
            return <BarItem key={index} {...el} />;
          })}
        </div>
      </div>
      <div className="header">
        <div className="white-bar">
          {/* XTOX Logo */}
          <div className="logo">
            <a href="/">
              <svg
                width="136"
                height="34"
                viewBox="0 0 136 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.6436 33.9799L17.3261 22.1849L9.15626 33.9799H0L12.7458 16.6989L0.638809 0.000732422H9.69512L17.6172 11.02L25.3959 0.000732422H34.009L22.002 16.4074L34.8477 33.9799H25.6436Z"
                  fill="#192124"
                />
                <path
                  d="M12.7463 16.698L0.639404 -0.00012207H9.69571L17.6178 11.0191L12.7463 16.698ZM22.0026 16.4066L34.8483 33.9791H25.6442L17.3266 22.1841"
                  fill="#5173F5"
                />
                <path
                  d="M47.2012 6.40753H36.1763V0H66.2003V6.40753H55.1754V33.9792H47.2012V6.40753Z"
                  fill="#192124"
                />
                <path
                  d="M75.0542 31.6862C72.286 30.2204 70.1176 28.1974 68.5531 25.6258C66.9887 23.05 66.2021 20.1569 66.2021 16.9424C66.2021 13.728 66.9844 10.8349 68.5531 8.25907C70.1176 5.6832 72.286 3.66451 75.0542 2.1987C77.8224 0.732901 80.9295 0 84.3756 0C87.8217 0 90.9245 0.732901 93.6753 2.1987C96.4261 3.66451 98.5945 5.68748 100.176 8.25907C101.758 10.8349 102.549 13.728 102.549 16.9424C102.549 20.1569 101.758 23.05 100.176 25.6258C98.5945 28.2017 96.4261 30.2204 93.6753 31.6862C90.9245 33.152 87.8217 33.8849 84.3756 33.8849C80.9295 33.8849 77.8224 33.152 75.0542 31.6862ZM89.6903 26.093C91.2721 25.2015 92.515 23.9629 93.4145 22.3728C94.3184 20.7827 94.766 18.974 94.766 16.9424C94.766 14.9152 94.3141 13.1065 93.4145 11.5121C92.515 9.92202 91.2721 8.67909 89.6903 7.7919C88.1085 6.9047 86.3355 6.45896 84.3756 6.45896C82.4157 6.45896 80.6427 6.9047 79.0609 7.7919C77.4791 8.67909 76.2362 9.92202 75.3367 11.5121C74.4371 13.1022 73.9852 14.9152 73.9852 16.9424C73.9852 18.9697 74.4371 20.7784 75.3367 22.3728C76.2406 23.9629 77.4791 25.2058 79.0609 26.093C80.6427 26.9802 82.4157 27.4259 84.3756 27.4259C86.3398 27.4259 88.1085 26.9802 89.6903 26.093Z"
                  fill="#192124"
                />
                <path
                  d="M126.796 33.9792L118.479 22.1842L110.309 33.9792H101.153L113.899 16.6981L101.796 0H110.852L118.774 11.0192L126.549 0H135.162L123.155 16.4067L136 33.9792H126.796Z"
                  fill="#192124"
                />
                <path
                  d="M118.479 22.1842L110.309 33.9792H101.153L113.899 16.6981L118.479 22.1842ZM118.774 11.0192L126.549 0H135.162L123.155 16.4067"
                  fill="#5173F5"
                />
              </svg>
            </a>
          </div>
          <div className="nav-links">
            <div className="nav-links-el">
              <NavLink
                className={`nav-item ${path === "/" ? "nav-current" : ""}`}
                to="/"
              >
                Inicio
              </NavLink>
            </div>
            <div className="nav-links-el">
              <NavLink
                className={`nav-item ${path === "/news" ? "nav-current" : ""}`}
                to="/news"
              >
                Noticias
              </NavLink>
            </div>
            <div className="nav-links-el">
              <NavLink
                className={`nav-item ${
                  path === "/wallet" ? "nav-current" : ""
                }`}
                to="/wallet"
              >
                Mi cartera
              </NavLink>
            </div>
          </div>
          <div className="search">
            <div className="search-text">
              <form
                onSubmit={redirectStock}
                className="search-form"
                acceptCharset="utf-8"
              >
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    name="stock"
                    className="search-text"
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                    }}
                  />
                  <button type="submit" value="" className="submit-search">
                    <div className="search-icon">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                          fill="#192124"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="conectarse">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
