class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }
  componentDidMount() {
    const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code,  \`<div></div>\`,  between 2 backticks.
\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;
    this.setState({ input: defaultText });
  }

  render() {
    return (
      <>
        <Header />
        <MarkdownPreviewer>
          <Editor input={this.state.input} handleChange={this.handleChange} />
          <Previewer output={this.state.input} />
        </MarkdownPreviewer>
      </>
    );
  }
}
const Header = () => {
  return (
    <div className="row mt-3">
      <div className="col">
        <h1 className="text-center">Markdown Previewer</h1>
      </div>
    </div>
  );
};
const MarkdownPreviewer = (props) => {
  return <div className="row mt-3">{props.children}</div>;
};
const Editor = (props) => {
  return (
    <div className="col-md-6">
      <div className="card mb-3">
        <div
          className="card-header text-white"
          style={{ backgroundColor: "#14823B" }}
        >
          Editor
        </div>
        <div className="card-body">
          <textarea
            id="editor"
            value={props.input}
            onChange={props.handleChange}
            className="w-100"
          ></textarea>
        </div>
      </div>
    </div>
  );
};
const Previewer = (props) => {
  return (
    <div className="col-md-6">
      <div className="card mb-5">
        <div
          className="card-header text-white"
          style={{ backgroundColor: "#14823B" }}
        >
          Previewer
        </div>
        <div className="card-body">
          <p
            id="preview"
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                marked.parse(props.output, {
                  gfm: true,
                  breaks: true,
                  highlight: function (code) {
                    return Prism.highlight(
                      code,
                      Prism.languages.javascript,
                      "javascript"
                    );
                  }
                })
              )
            }}
          ></p>
        </div>
      </div>
    </div>
  );
};
const app = document.getElementById("app");
const root = ReactDOM.createRoot(app);
root.render(<App />);
