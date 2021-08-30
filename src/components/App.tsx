import Home from './Home';
import Stock from './Stock';
import Login from './login';
import Bar from './header/bar';
import Register from './register';
import Cartera from './Wallet/Wallet';
import News from './news/news';
import Footer from './footer/footer';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';

const freeURLS = [
	"/login",
	"/register"
]

function setToken(userToken : string){
	sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken(){
	const tokenString : string = sessionStorage.getItem('token') || "";
	try {
		return JSON.parse(tokenString);
	} catch (e) {
    // Invalid or empty token
		return undefined
	}
}

const App = () => {
  console.log(process.env);
	const token = getToken();
	const history = useHistory();

	if(freeURLS.includes(window.location.pathname.toString())){
		return (
		<div className="App">
				<Switch>
					<Route exact path={"/login"} >
						<Login setToken={setToken}/>
					</Route>
					<Route exact path={"/register"} >
						<Register/>
					</Route>

				</Switch>
		</div>

		)
	}
	if(!token || !token?.token) {
		history.replace("/login");
		return <Login setToken={setToken}/>
	}
	return (
		<div className="App">
			<Bar />
				<Switch>
					<Route path={"/stock/:symbol"}>
						<Stock/>
					</Route>
					<Route exact path={["/", "/home", "/dashboard"]} >
						<Home/>
					</Route>
					<Route exact path={"/wallet"} >
						<Cartera/>
					</Route>
					<Route exact path={"/news"} >
						<div style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
							<News/>
						</div>
					</Route>
					<Route path="*">
					</Route>

				</Switch>

			<Footer />
		</div>
	);
}

export default App;
