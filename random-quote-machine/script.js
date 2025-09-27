class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: "",
      author: "",
      bgcolor: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.handleClick();
  }

  getQuotes() {
    // JSON data from API Call
    const jsonString = `{
      "quotes": [
        { "quote": "Three things can not hide for long: the Moon, the Sun and the Truth.", "author": "Gautham Buddha" },
        { "quote": "Strive not to be a success, but rather to be of value.", "author": "Albert Einstein" },
        { "quote": "Peace comes from within. Do not seek it without.", "author": "Gautham Buddha" },
        { "quote": "The only way to do great work is to love what you do.", "author": "Steve Jobs" },
        { "quote": "To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear.", "author": "Gautham Buddha" },
        { "quote": "Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.", "author": "Gautham Buddha" },
        { "quote": "Your time is limited, so don’t waste it living someone else’s life.", "author": "Steve Jobs" },
        { "quote": "The mind is everything. What you think you become.", "author": "Gautham Buddha" },
        { "quote": "Do not let the bahaviour of others destroy your inner peace.", "author": "Dalai Lama" },
        { "quote": "A man is not called wise because he talks and talks again; but if he is peaceful, loving and fearless then he is in truth called wise.", "author": "Gautham Buddha" },
        { "quote": "Happiness is not something readymade. It comes from your own actions.", "author": "Dalai Lama" },
        { "quote": "Everything that happens to us is the result of what we ourselves have thought, said, or done. We alone are responsible for our lives", "author": "Gautham Buddha" },
        { "quote": "Change your thoughts and you change your world.", "author": "Norman Vincent Peale" },
        { "quote": "Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.", "author": "Jesus" }
      ]
    }`;
    const quoteData = JSON.parse(jsonString);
    return quoteData;
  }
  getRandomQuote() {
    const quoteData = this.getQuotes();
    return quoteData.quotes[
      Math.floor(Math.random() * quoteData.quotes.length)
    ];
  }
  getRandomColor() {
    const colors = [
      "#0B4F30",
      "#FF6600",
      "#5C0E0E",
      "#F73859",
      "#006FFF",
      "#FF7F50",
      "#6B5B95",
      "#9A3197",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  handleClick() {
    const body = document.querySelector("body");
    const twitter = document.getElementById("tweet-quote");
    const tumblr = document.getElementById("tumblr-quote");
    const randomQuote = this.getRandomQuote();
    const randomColor = this.getRandomColor();
    this.setState(
      {
        quote: randomQuote.quote,
        author: randomQuote.author,
        bgcolor: randomColor
      },
      // Callback Function
      () => {
        body.style.backgroundColor = randomColor;
        twitter.setAttribute(
          "href",
          "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
          encodeURIComponent(
            '"' + randomQuote.quote + '" ' + randomQuote.author
          )
        );
        tumblr.setAttribute(
          "href",
          "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
          encodeURIComponent(randomQuote.quote) +
          "&content=" +
          encodeURIComponent(randomQuote.author) +
          "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
        );
      }
    );
  }

  render() {
    return (
      <div id="quote-box">
        <Quote quote={this.state.quote} color={this.state.bgcolor} />
        <Author author={this.state.author} color={this.state.bgcolor} />
        <Buttons color={this.state.bgcolor} handleClick={this.handleClick} />
      </div>
    );
  }
}

const Quote = (props) => {
  const styles = {
    color: props.color
  };
  return (
    <div className="quote-text" style={styles}>
      <i className="fa fa-quote-left"></i>
      <span id="text">{props.quote}</span>
      <i className="fa fa-quote-right"></i>
    </div>
  );
};
const Author = (props) => {
  const styles = {
    color: props.color
  };
  return (
    <div className="quote-author">
      <span id="author" style={styles}>
        - {props.author}
      </span>
    </div>
  );
};
const Buttons = (props) => {
  const styles = {
    backgroundColor: props.color
  };
  return (
    <div className="buttons">
      <a
        className="button"
        id="tweet-quote"
        title="Tweet this quote!"
        target="_top"
        style={styles}
      >
        <i className="fa-brands fa-twitter"></i>
      </a>
      <a
        className="button"
        id="tumblr-quote"
        title="Post this quote on tumblr!"
        target="_blank"
        style={styles}
      >
        <i className="fa-brands fa-tumblr"></i>
      </a>
      <button
        className="button"
        id="new-quote"
        style={styles}
        onClick={props.handleClick}
      >
        New Quote
      </button>
    </div>
  );
};
const wrapper = document.getElementById("wrapper");
const root = ReactDOM.createRoot(wrapper);
root.render(<App />);
