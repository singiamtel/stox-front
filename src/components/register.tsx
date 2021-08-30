import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./register.css"

async function registerUser(credentials:{username:string, password:string}) {
	return fetch(process.env.REACT_APP_API_URL + '/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
	.then(data => data.json())
}

function loginRedirect(history : any){
	history.push("/login")
	history.go(0)
}

function Register() {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [statusColor, setStatusColor] = useState("#eeeeee")
	const [statusText, setStatusText] = useState("")
	let history = useHistory()

	const handleSubmit = async (e:React.FormEvent) => {
		e.preventDefault();
		const ret = await registerUser({
			username,
			password
		});
		if(ret.status === "success"){
			setStatusColor("#90EE90")
			setStatusText("Success, redirecting to login...")
			setTimeout(()=>{
				loginRedirect(history);
			}, 1500)
		}
		else{
			setStatusColor("#ffcccb")
			setStatusText("Error, username already exists")
		}
	}
	return (
		<div className="register-comp">
			<div className="login-button" onClick={() => {loginRedirect(history)}}>
				Login
			</div>

			<div className="register-logo">

				<svg width="136" height="34" viewBox="0 0 136 34" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M25.6436 33.9799L17.3261 22.1849L9.15626 33.9799H0L12.7458 16.6989L0.638809 0.000732422H9.69512L17.6172 11.02L25.3959 0.000732422H34.009L22.002 16.4074L34.8477 33.9799H25.6436Z" fill="#192124"/>
					<path d="M12.7463 16.698L0.639404 -0.00012207H9.69571L17.6178 11.0191L12.7463 16.698ZM22.0026 16.4066L34.8483 33.9791H25.6442L17.3266 22.1841" fill="#5173F5"/>
					<path d="M47.2012 6.40753H36.1763V0H66.2003V6.40753H55.1754V33.9792H47.2012V6.40753Z" fill="#192124"/>
					<path d="M75.0542 31.6862C72.286 30.2204 70.1176 28.1974 68.5531 25.6258C66.9887 23.05 66.2021 20.1569 66.2021 16.9424C66.2021 13.728 66.9844 10.8349 68.5531 8.25907C70.1176 5.6832 72.286 3.66451 75.0542 2.1987C77.8224 0.732901 80.9295 0 84.3756 0C87.8217 0 90.9245 0.732901 93.6753 2.1987C96.4261 3.66451 98.5945 5.68748 100.176 8.25907C101.758 10.8349 102.549 13.728 102.549 16.9424C102.549 20.1569 101.758 23.05 100.176 25.6258C98.5945 28.2017 96.4261 30.2204 93.6753 31.6862C90.9245 33.152 87.8217 33.8849 84.3756 33.8849C80.9295 33.8849 77.8224 33.152 75.0542 31.6862ZM89.6903 26.093C91.2721 25.2015 92.515 23.9629 93.4145 22.3728C94.3184 20.7827 94.766 18.974 94.766 16.9424C94.766 14.9152 94.3141 13.1065 93.4145 11.5121C92.515 9.92202 91.2721 8.67909 89.6903 7.7919C88.1085 6.9047 86.3355 6.45896 84.3756 6.45896C82.4157 6.45896 80.6427 6.9047 79.0609 7.7919C77.4791 8.67909 76.2362 9.92202 75.3367 11.5121C74.4371 13.1022 73.9852 14.9152 73.9852 16.9424C73.9852 18.9697 74.4371 20.7784 75.3367 22.3728C76.2406 23.9629 77.4791 25.2058 79.0609 26.093C80.6427 26.9802 82.4157 27.4259 84.3756 27.4259C86.3398 27.4259 88.1085 26.9802 89.6903 26.093Z" fill="#192124"/>
					<path d="M126.796 33.9792L118.479 22.1842L110.309 33.9792H101.153L113.899 16.6981L101.796 0H110.852L118.774 11.0192L126.549 0H135.162L123.155 16.4067L136 33.9792H126.796Z" fill="#192124"/>
					<path d="M118.479 22.1842L110.309 33.9792H101.153L113.899 16.6981L118.479 22.1842ZM118.774 11.0192L126.549 0H135.162L123.155 16.4067" fill="#5173F5"/>
				</svg>
			</div>
			<h1>Registrarse</h1>
			<form className="register-form" onSubmit={handleSubmit} acceptCharset="utf-8">
				<span className="register-prompt">Nombre de usuario</span>
        <input className="user-input register-input" type="text" name="username" id="user" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}/>
				<span className="register-prompt">Contraseña</span>
        <input className="pass-input register-input" type="password" name="password" id="pass" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
				<input className="submit-input" type="submit" value="Aceptar" id="submit"/>
			</form>
			<div className="api-response" style={{backgroundColor: statusColor}}>
				{statusText}
			</div>
		</div>
	);
}


export default Register;
