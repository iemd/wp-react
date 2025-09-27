const operators = ["/", "*", "+", "-"];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expression: "",
      display: "0"
    };

    this.handleClearBtnClick = this.handleClearBtnClick.bind(this);
    this.handleOperatorBtnClick = this.handleOperatorBtnClick.bind(this);
    this.handleNumberBtnClick = this.handleNumberBtnClick.bind(this);
    this.handleDecimalBtnClick = this.handleDecimalBtnClick.bind(this);
    this.handleEqualBtnClick = this.handleEqualBtnClick.bind(this);
  }

  /**** 1. AC Button ****/
  handleClearBtnClick(event) {
    const key = event.target.value;
    if (key === "AC") {
      this.setState({
        expression: "",
        display: "0"
      });
    }
  }
  /**** 2. Operator Buttons ****/
  handleOperatorBtnClick(event) {
    const operator = event.target.value;
    const { expression, display } = this.state;

    const numberRegex = /[0-9]/;
    const operatorRegex = /[/*+\-]/;
    const asterisk = "*";
    const currOperator = operator === "x" ? asterisk : operator;

    if (expression.includes("=")) {
      const result = expression.split("=")[1];
      this.setState({
        expression: result + currOperator,
        display: operator
      });
    } else {
      const lastChar = expression.charAt(expression.length - 1);
      const beforeLastChar = expression.charAt(expression.length - 2);

      if (expression === "" || operators.includes(expression)) {
        this.setState({
          expression: currOperator,
          display: operator
        });
      } else if (lastChar === ".") {
        const newExpression1 = expression.slice(0, -1);
        this.setState({
          expression: newExpression1 + currOperator,
          display: operator
        });
      } else if (operatorRegex.test(lastChar)) {
        if (numberRegex.test(beforeLastChar)) {
          const afterNumberRegex = /[/*+\-][\-]/;
          if (afterNumberRegex.test(lastChar + currOperator)) {
            this.setState({
              expression: expression + currOperator,
              display: operator
            });
          }
        }
        if (
          currOperator === "/" ||
          currOperator === "*" ||
          currOperator === "+"
        ) {
          //const afterNumber = ["/-", "*-", "+-", "--"];
          if (numberRegex.test(beforeLastChar)) {
            const newExpression2 = expression.slice(0, -1);
            this.setState({
              expression: newExpression2 + currOperator,
              display: operator
            });
          }
          if (
            operatorRegex.test(beforeLastChar) &&
            operatorRegex.test(lastChar)
          ) {
            const newExpression3 = expression.slice(0, -2);
            this.setState({
              expression: newExpression3 + currOperator,
              display: operator
            });
          }
        }
      } else {
        this.setState({
          expression:
            expression === "" ? currOperator : expression + currOperator,
          display: operator
        });
      }
    }
  }
  /**** 3. Number Buttons ****/
  handleNumberBtnClick(event) {
    const number = event.target.value;
    const { expression, display } = this.state;

    const operatorRegex = /[/x+\-]/;

    if (display.length < 22) {
      this.setState({
        expression: display === "0" ? number : expression + number,
        display:
          display === "0" || operatorRegex.test(display)
            ? number
            : display + number
      });
    } else if (expression.includes("=")) {
      this.setState({
        expression: number,
        display: number
      });
    }
  }
  /**** 4. Decimal Point Button ****/
  handleDecimalBtnClick(event) {
    const decimalPoint = event.target.value;
    const { expression, display } = this.state;

    const numberRegex = /[0-9]/;
    const operatorRegex = /[/*+\-]/;
    const decimalPointWithZero = "0.";
    const lastChar = expression.charAt(expression.length - 1);

    if (expression === "" && display === "0") {
      this.setState({
        expression: decimalPointWithZero,
        display: decimalPointWithZero
      });
    } else if (operatorRegex.test(lastChar)) {
      this.setState({
        expression: expression + decimalPointWithZero,
        display: decimalPointWithZero
      });
    } else if (!display.includes(".")) {
      this.setState({
        expression: expression + decimalPoint,
        display: display + decimalPoint
      });
    }
  }
  /**** 5. Equal Sign Button ****/
  handleEqualBtnClick(event) {
    const key = event.target.value;
    let { expression, display } = this.state;

    if (expression === "" && display === "0") {
      this.setState({
        expression: "",
        display: "0"
      });
    } else {
      const answer = eval(expression.replaceAll("--", "-"));
      this.setState((prevState) => {
        return {
          expression: prevState.expression.replaceAll("--", "-") + key + answer,
          display: answer
        };
      });
    }
  }

  render() {
    return (
      <Calculator>
        <Display
          expression={this.state.expression}
          display={this.state.display}
        />
        <Keyboard
          handleClearBtnClick={this.handleClearBtnClick}
          handleOperatorBtnClick={this.handleOperatorBtnClick}
          handleNumberBtnClick={this.handleNumberBtnClick}
          handleDecimalBtnClick={this.handleDecimalBtnClick}
          handleEqualBtnClick={this.handleEqualBtnClick}
        />
      </Calculator>
    );
  }
}

const Calculator = (props) => {
  return <div className="calculator">{props.children}</div>;
};

const Display = ({ expression, display }) => {
  return (
    <>
      <div className="formulaScreen">{expression}</div>
      <div className="outputScreen" id="display">
        {display}
      </div>
    </>
  );
};

const Keyboard = ({
  handleClearBtnClick,
  handleOperatorBtnClick,
  handleNumberBtnClick,
  handleDecimalBtnClick,
  handleEqualBtnClick
}) => {
  return (
    <div className="keyboard">
      <button
        onClick={handleClearBtnClick}
        className="jumbo"
        id="clear"
        value="AC"
      >
        AC
      </button>
      <button
        onClick={handleOperatorBtnClick}
        className="operator"
        id="divide"
        value="/"
      >
        /
      </button>
      <button
        onClick={handleOperatorBtnClick}
        className="operator"
        id="multiply"
        value="x"
      >
        x
      </button>
      <button onClick={handleNumberBtnClick} id="seven" value="7">
        7
      </button>
      <button onClick={handleNumberBtnClick} id="eight" value="8">
        8
      </button>
      <button onClick={handleNumberBtnClick} id="nine" value="9">
        9
      </button>
      <button
        onClick={handleOperatorBtnClick}
        className="operator"
        id="subtract"
        value="-"
      >
        -
      </button>
      <button onClick={handleNumberBtnClick} id="four" value="4">
        4
      </button>
      <button onClick={handleNumberBtnClick} id="five" value="5">
        5
      </button>
      <button onClick={handleNumberBtnClick} id="six" value="6">
        6
      </button>
      <button
        onClick={handleOperatorBtnClick}
        className="operator"
        id="add"
        value="+"
      >
        +
      </button>
      <button onClick={handleNumberBtnClick} id="one" value="1">
        1
      </button>
      <button onClick={handleNumberBtnClick} id="two" value="2">
        2
      </button>
      <button onClick={handleNumberBtnClick} id="three" value="3">
        3
      </button>
      <button onClick={handleNumberBtnClick} id="zero" value="0">
        0
      </button>
      <button onClick={handleDecimalBtnClick} id="decimal" value=".">
        .
      </button>
      <button onClick={handleEqualBtnClick} id="equals" value="=">
        =
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
