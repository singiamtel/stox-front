import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import axios from 'axios'
import './stocks.css'

interface StockInfo {
	stockSymbol: string,
	stockName: string,
	price: number,
	changePer: number,
	changeVol: number
}

const rstyle = { color: '#FB6A75' }
const gstyle = { color: '#00C7B7' }

const Stock = (stockInfo: StockInfo) => {
	return (
		<div className="stock">
			<div className="stock-left">
				<NavLink className="stock-stockSymbol" to={"/stock/"+stockInfo.stockSymbol.toUpperCase()}>{stockInfo.stockSymbol}</NavLink>
				<div className="stock-stockName">{stockInfo.stockName}</div>
			</div>
			<div className="stock-middle">
				{stockInfo.price}
			</div>
			<div className="stock-right">
				<div
					className="stock-stockChange"
					style={(stockInfo.changePer > 0) ? gstyle : rstyle}>
					{(stockInfo.changePer > 0 ? "+" : "") + stockInfo.changePer + "%"}
				</div>
				<div
					className="stock-stockChange"
					style={(stockInfo.changeVol > 0) ? gstyle : rstyle}>
					{(stockInfo.changeVol > 0 ? "+" : "") + stockInfo.changeVol}
				</div>
			</div>
		</div>
	)
}

function dataToStocks(data : any){
	const diff = data.hDailies[0].close - data.hDailies[1].close
	fetchedStocks.push({
		stockSymbol: data.symbol,
		stockName: data.name,
		price: data.hDailies[0].close.toFixed(3),
		changePer: (diff / data.hDailies[1].close * 100).toFixed(2),
		changeVol: diff.toFixed(3)
	})
}

const fetchedStocks : any = []


const Stocks = () => {
	const [renderedStocks, setFetchedStocks] = useState([])
	const featuredStocks = ["AAPL", "KR", "NVDA", "FCX", "LMT", "MARA"]

	useEffect(() =>{
		const fetchStocks = async (stocks : string[]) => {
			fetchedStocks.splice(0, fetchedStocks.length)
			for(let el of stocks){
				await axios.get(process.env.REACT_APP_API_URL + "/stock/" + el).then((result:any) =>{
					dataToStocks(result.data)
				})
			}
			setFetchedStocks(fetchedStocks)
		}
		fetchStocks(featuredStocks)
	}, [])
	return (
		<div className="stocks">
			<div className="stocks-title"> Stocks en el mercado </div>
			<div className="stocks-index">
				<div className="stocks-subtitle">Índices </div>
				<div className="stocks-subtitle">Divisas </div>
				<div className="stocks-subtitle">Futuro </div>
				<div className="stocks-subtitle">Cripto </div>
				<div className="stocks-subtitle">Bonos </div>
			</div>
			<div className="stocks-body-wrapper">
				<div className="stocks-body">
					{
						renderedStocks.map((el, index) =>{
							return <Stock key={index} {...el} />
						})
					}
				</div>
			</div>

		</div>
	)
}

export default Stocks
