import "./tweets.css";

interface TweetInfo {
img: string;
userName: string;
userTag: string;
date: string;
text: string;
embed: string;
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
			<div className="tweet-text">{tweetInfo.text}</div>
			</div>
			</div>
			</div>
		   );
};

const Tweets = () => {
	const MyTweets = [
	{
img: "https://bit.ly/3vA8wJf",
		 userName: "Sample Name",
		 userTag: "Sample Tag",
		 date: "19 feb.",
		 text: "Upward trending chart Futures in green.",
		 embed: "",
	},
	{
img: "https://bit.ly/3tg2AUo",
	 userName: "Twitter",
	 userTag: "twitter",
	 date: "19 ene.",
	 text: `
		 This is a practice tweet where you don't quite see what is going to happen.
		 write but you can see in summary what would be the
		 content of a tweet that has more words.
		 `,
	 embed: "",
	},
	{
img: "https://bit.ly/2PFv8IZ",
	 userName: "Yahoo Finance",
	 userTag: "yahooBroke",
	 date: "23 mar.",
	 text: `
		 Hello! It's a great day and a lot of sun as well as little rain. It looks
		 a great day looking forward to the future and i hope the next day will be the same!
		 `,
	 embed: "",
	},
	];
	return (
			<div className="tweets">
			<div className="tweets-container">
			<div>
			<div className="tweets-title"> Last tweets </div>
			<div className="tweets-body">
			<Tweet {...MyTweets[0]} />
			<Tweet {...MyTweets[1]} />
			<Tweet {...MyTweets[2]} />
			<Tweet {...MyTweets[0]} />
			<Tweet {...MyTweets[2]} />
			<Tweet {...MyTweets[1]} />
			<Tweet {...MyTweets[0]} />
			<Tweet {...MyTweets[1]} />
			<Tweet {...MyTweets[2]} />
			</div>
			</div>
			</div>
			</div>
		   );
};

export default Tweets;
