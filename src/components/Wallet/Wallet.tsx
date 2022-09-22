import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Wallet.css";

function removeToken() {
  sessionStorage.removeItem("token");
}

type WalletInfo = {
  stockSymbol: string;
  amount: number;
  price?: number;
  profits?: number;
};

function getToken() {
  const tokenString: string = sessionStorage.getItem("token") || "";
  try {
    return JSON.parse(tokenString);
  } catch {
    return null;
  }
}

const Stock = ({ stockInfo }: { stockInfo: WalletInfo }) => {
  return (
    <div className="stock">
      <div className="stock-left">
        <div className="stock-stockSymbol">{stockInfo.stockSymbol}</div>
      </div>
      <div className="stock-right">{stockInfo.amount}</div>
      {/*
				<div className="stock-right">
				{stockInfo.price }
				</div> */}
    </div>
  );
};

const Wallet = () => {
  const [renderedStocks, setFetchedStocks] = useState([]);
  const history = useHistory();
  useEffect(() => {
    function dataToStocks(data: any) {
      const fetchedStocks: any = [];
      for (let i in data) {
        fetchedStocks.push({
          stockSymbol: i,
          amount: data[i],
        });
      }
      return fetchedStocks;
    }

    axios
      .post(
        process.env.REACT_APP_API_URL + "/wallet",
        JSON.stringify(getToken()),
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((result: any) => {
        if (result.status === 401 || result.status === 403) {
          removeToken();
          history.push("/login");
        }
        setFetchedStocks(dataToStocks(result.data));
      })
      .catch(() => {
        removeToken();
        history.push("/login");
        history.go(0);
      });
  }, [history]);
  return (
    <div className="wallet-layout">
      <div>
        <div className="aux">
          <div className="stocks">
            <div className="stocks-title"> Mi cartera </div>
            <div className="stocks-index">
              {/*

								<div className="stocks-subtitle"> Compras </div>
								<div className="stocks-subtitle"> Ventas </div> */}
            </div>
          </div>

          <div className="stocks-body">
            <div className="stocks-index">
              <div className="stocks-subtitle"> Stock </div>
              <div className="stocks-subtitle"> Cantidad </div>
              {/*<div className="stocks-subtitle"> Precio actual </div>*/}
            </div>
            {renderedStocks.map((el, index) => {
              return <Stock key={index} stockInfo={el} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
