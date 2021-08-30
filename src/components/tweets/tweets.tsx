import './tweets.css'

interface TweetInfo {
	img: string,
	userName: string,
	userTag: string,
	date: string,
	text: string,
	embed: string
}

const Tweet = (tweetInfo: TweetInfo) => {
	return (
		<div className="tweet">
			<img src={tweetInfo.img} alt="Twitter Profile" />
			<div className="tweet-content">
				<div className="tweet-top">
				<span className="tweet-topLeft">
					<span className="tweet-userName">{tweetInfo.userName} </span>
					<span className="tweet-userTag">@{tweetInfo.userTag}</span>
				</span>
				<span className="tweet-topRight"> {tweetInfo.date} </span>
			</div>
			<div className="tweet-bot">
				<div className="tweet-text" >{tweetInfo.text}</div>
				</div>
			</div>
		</div>
	)
}

const Tweets = () => {
	const MyTweets = [
		{
			img: "https://bit.ly/3vA8wJf",
			userName: "Sample Name",
			userTag: "Sample Tag",
			date: "19 feb.",
			text: "Gráfico con tendencia hacia arriba Futuros en verde.",
			embed: ""
		},
		{
			img: "https://bit.ly/3tg2AUo",
			userName: "Twitter",
			userTag: "twitter",
			date: "19 ene.",
			text: `
				Esto es un tweet de práctica donde no se ve del todo lo que se va a
				escribir pero sí se puede ver de manera resumida lo que sería el
				contenido de un tweet que tiene más palabras.
			`,
			embed: ""
		},
		{
			img: "https://bit.ly/2PFv8IZ",
			userName: "Yahoo Finance",
			userTag: "yahooBroke",
			date: "23 mar.",
			text: `
				Buenos días! hace un gran día y mucho sol además de poca lluvia. Se ve
				un gran día de cara al futuro y espero que el día siguiente sea igual!
			`,
			embed: ""
		}
	]
	return (
		<div className="tweets">
			<div className="tweets-title"> Últimos tweets </div>
			<div className="tweets-index">
				<div className="tweets-subtitle"> Índices </div>
				<div className="tweets-subtitle"> Divisas </div>
				<div className="tweets-subtitle"> Futuro </div>
				<div className="tweets-subtitle"> Cripto </div>
				<div className="tweets-subtitle"> Bonos </div>
			</div>
			<div className="tweets-body">
				<Tweet {...MyTweets[0]} />
				<Tweet {...MyTweets[1]} />
				<Tweet {...MyTweets[2]} />
				<Tweet {...MyTweets[1]} />
				<Tweet {...MyTweets[2]} />
				<Tweet {...MyTweets[1]} />
				<Tweet {...MyTweets[0]} />
				<Tweet {...MyTweets[1]} />
				<Tweet {...MyTweets[0]} />
			</div>
		</div>
	)
}

export default Tweets
