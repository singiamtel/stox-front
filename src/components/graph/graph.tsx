import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './graph.css';

function dataToDailies(data : any){
	const fetchedDailies :any = []
	const length = data.hDailies.length > 60 ? 60 : data.hDailies.length;
	for(let i = 0; i < length ; i++) {
		if (data.hDailies[i] !== undefined 
			&& data.hDailies[i].close !== undefined 
		&& data.hDailies[i].date !== undefined) {
			fetchedDailies.push({ 
				x:  new Date(data.hDailies[i].date),
				y: data.hDailies[i].close.toFixed(3) 
			});
		}
	}
	return fetchedDailies
}

const Graph = ({symbol}:{symbol:string}) => {
	const [fetchedDailies, setFetchedDailies] = useState([]);
	useEffect(() =>{
		axios.get(process.env.REACT_APP_API_URL + "/stock/" + symbol).then((result) => {
			setFetchedDailies(dataToDailies(result.data))
		})
	}, [symbol])

	return (
		<div className="graph">
			<div className="graph-title"> {symbol.toUpperCase()} </div>
			<Line
				className="graph-lineGraph"
				type="line"
				data={{
					labels: fetchedDailies.map((e : any) => { 
						return `${e.x.getDay()}/${e.x.getMonth()}/${e.x.getFullYear()}`
					}),
					datasets: [{
						label: '',
						data: fetchedDailies.map((e : any ) => { return e.y }),
						fill: true,
						borderColor: "#5173F5",
						tension: 0,
						spanGaps: true
					}]
				}}
				options= {{
					scales: {
						x: [{
							type: 'time',
							time: {
								unit: 'month'
                }
						}]
				},
				plugins: {
					legend: {
						display: false,
						labels: {
							font: {
								color: "#56707C",
								family: "Noto Sans",
								style: "normal",
								weight: 300,
								size: 14,
								lineHeight: 2
							}
						}
					}
				}
			}}
			/>
		</div>
	);
};

export default Graph;
