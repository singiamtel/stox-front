import { useState, useEffect } from "react";
import axios from "axios";
import "./buy.css";
import "./toggle.css";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const rstyle = { color: "#FB6A75" };
const gstyle = { color: "#00C7B7" };

function getToken() {
  const tokenString: string = sessionStorage.getItem("token") || "";
  if (!tokenString) {
    return null;
  }
  return JSON.parse(tokenString);
}

async function buyStock(token: any, stock: any, amount: any) {
  const request = { token: token.token, stock: stock, amount: amount };
  return axios.post(
    process.env.REACT_APP_API_URL + "/buy/" + stock.trim(),
    JSON.stringify(request),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}

async function sellStock(token: any, stock: any, amount: any) {
  const request = { token: token.token, stock: stock, amount: amount };
  return axios.post(
    process.env.REACT_APP_API_URL + "/sell/" + stock.trim(),
    JSON.stringify(request),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}

function removeToken() {
  sessionStorage.removeItem("token");
}

const Buy = () => {
  const { symbol }: { symbol: string } = useParams();
  // Placeholder values, gets overwritten when fetchStock returns
  const [stock, setStock] = useState({
    stockSymbol: symbol,
    stockName: "Undefined",
    volume: 0,
    price: 0,
    changePer: 0,
    changeVol: 0,
  });
  const [amount, setAmount] = useState();
  const [toggle, setToggle] = useState(true);
  const [statusColor, setStatusColor] = useState("#eeeeee");
  const [statusText, setStatusText] = useState("");
  const history = useHistory();

  const triggerToggle = () => {
    setToggle(!toggle);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      history.push("/login");
    }
    if (!symbol || !amount) {
      return;
    }
    let status, buy;
    if (toggle) {
      try {
        status = await buyStock(token, symbol, amount);
        buy = "bought";
        toast.success("Successfully bought " + amount + " " + symbol);
      } catch {
        removeToken();
        history.push("/login");
        return;
      }
    } else {
      try {
        status = await sellStock(token, symbol, amount);
        toast.success("Successfully sold " + amount + " " + symbol);
      } catch {
        removeToken();
        history.push("/login");
        return;
      }
      buy = "sold";
    }

    if (status.data.status === "success") {
      setStatusColor("#90EE90");
      setStatusText(
        `Succesfully ${buy} ${amount} stocks of ${symbol.toUpperCase()}`
      );
    } else {
      setStatusColor("#ffcccb");
      setStatusText(status.data.message);
    }
  };

  useEffect(() => {
    const fetchStock = async () => {
      await axios
        .get(process.env.REACT_APP_API_URL + "/stock/" + symbol.toUpperCase())
        .then((res) => {
          const diff = res.data.hDailies[0].close - res.data.hDailies[1].close;
          const myStock = {
            stockSymbol: symbol,
            stockName: "Undefined",
            volume: 0,
            price: 0,
            changePer: 0,
            changeVol: 0,
          };
          myStock.stockSymbol = res.data.symbol;
          myStock.stockName = res.data.name;
          myStock.price = res.data.hDailies[0].close.toFixed(2);
          myStock.changePer = (diff / res.data.hDailies[1].close) * 100;
          myStock.changeVol = diff;

          setStock(myStock);
        });
    };
    fetchStock();
  }, [symbol]);

  return (
    <div className="buy">
      <div className="buy-title"> Trade</div>
      <div className="buy-index">
        <div className="buy-subtitle"> {stock.stockSymbol} </div>
        <div className="buy-subtitle"> {stock.stockName} </div>
      </div>
      <div className="buy-body">
        <div className="buy-bodyInfo">
          <span className="buy-value">
            {"$" + Math.round(stock.price).toFixed(2)}
          </span>
          <span
            className="buy-change"
            style={stock.changeVol > 0 ? gstyle : rstyle}
          >
            {stock.changeVol > 0
              ? "+" +
                Math.round(stock.changeVol).toFixed(2) +
                " (+" +
                Math.round(stock.changePer).toFixed(2) +
                "%)"
              : Math.round(stock.changeVol).toFixed(2) +
                " (" +
                Math.round(stock.changePer).toFixed(2) +
                "%)"}
          </span>
        </div>
        <div className="buy-bodyForm">
          <div onClick={triggerToggle} className="toggle">
            <div
              className={`toggle-button ${
                toggle ? "toggle-checked" : "toggle-unchecked"
              } `}
            >
              Buy
            </div>
            <div
              className={`toggle-button ${
                toggle ? "toggle-unchecked" : "toggle-checked"
              } `}
            >
              Sell
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="volume"
              onChange={(e: any) => setAmount(e.target.value)}
            />
            <button>Submit </button>
          </form>
        </div>
      </div>
      <div
        className="api-response-buy"
        style={{ backgroundColor: statusColor }}
      >
        {statusText}
      </div>
    </div>
  );
};

export default Buy;
