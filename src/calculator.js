import React from "react";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: "0",
      text: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEqual = this.handleEqual.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleParenthesis = this.handleParenthesis.bind(this);
  }
  handleClick(event) {
    if (this.state.text.endsWith("-")) {
      this.setState({
        initialValue: this.state.initialValue + event.target.value,
        text: this.state.text + event.target.value,
      });
    } else {
      this.setState({
        initialValue:
          this.state.initialValue === "0"
            ? event.target.value
            : this.state.initialValue.replace(/([-+*/])+/g, "$1") +
              event.target.value,
        text:
          this.state.text === ""
            ? event.target.value
            : this.state.text.replace(/([-+*/])+/g, "$1") + event.target.value,
      });
    }
  }

  clearDisplay() {
    this.setState({
      initialValue: "0",
      text: "",
    });
  }

  handleOperators(event) {
    let result = event.target.value;
    if (/[+-/*]$/.test(this.state.text) && result !== "-") {
      this.setState({
        initialValue: result,
        text: this.state.text.replace(/[+-/*]$/, "") + result,
      });
    } else {
      this.setState({
        initialValue: result,
        text: this.state.text + result,
      });
    }
  }

  handleEqual() {
    try {
      // eslint-disable-next-line
      const compute = new Function(`return ${this.state.text}`);
      const solution = Math.round(1000000 * compute()) / 1000000;
      this.setState({
        initialValue: String(solution),
        text: String(solution),
        // text: String(solution),
      });
    } catch (error) {
      // Handle any potential errors
      console.error("Error evaluating expression:", error);
    }
  }

  handleDecimal(event) {
    let result = event.target.value;
    if (!this.state.initialValue.includes(".")) {
      this.setState({
        initialValue: this.state.initialValue + result,
        text: this.state.text + result,
      });
    }
  }

  handleParenthesis(event) {
    const result = event.target.value;
    if (this.state.initialValue === "0") {
      this.setState({
        initialValue: result,
        text: this.state.text + result,
      });
    } else {
      this.setState({
        initialValue: this.state.initialValue + result,
        text: this.state.text + result,
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="text-display">{this.state.text}</div>
          <div className="display" id="display">
            {this.state.initialValue}
          </div>
          <Button
            initialValue={this.state.initialValue}
            handleEqual={this.handleEqual}
            handleClick={this.handleClick}
            clearDisplay={this.clearDisplay}
            handleOperators={this.handleOperators}
            handleDecimal={this.handleDecimal}
            handleParenthesis={this.handleParenthesis}
          />
        </div>
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <div className="button-section">
        <button onClick={this.props.clearDisplay} id="clear">
          AC
        </button>
        <button onClick={this.props.handleOperators} id="add" value="+">
          +
        </button>
        <button onClick={this.props.handleOperators} id="subtract" value="-">
          -
        </button>
        <button onClick={this.props.handleClick} id="seven" value="7">
          7
        </button>
        <button onClick={this.props.handleClick} id="eight" value="8">
          8
        </button>
        <button onClick={this.props.handleClick} id="nine" value="9">
          9
        </button>
        <button onClick={this.props.handleOperators} id="multiply" value="*">
          X
        </button>
        <button onClick={this.props.handleClick} id="four" value="4">
          4
        </button>
        <button onClick={this.props.handleClick} id="five" value="5">
          5
        </button>
        <button onClick={this.props.handleClick} id="six" value="6">
          6
        </button>
        <button onClick={this.props.handleOperators} id="divide" value="/">
          /
        </button>
        <button onClick={this.props.handleClick} id="one" value="1">
          1
        </button>
        <button onClick={this.props.handleClick} id="two" value="2">
          2
        </button>
        <button onClick={this.props.handleClick} id="three" value="3">
          3
        </button>
        <button onClick={this.props.handleEqual} id="equals" value="=">
          =
        </button>
        <button onClick={this.props.handleClick} id="zero" value="0">
          0
        </button>
        <button onClick={this.props.handleDecimal} id="decimal" value=".">
          .
        </button>
        <button
          onClick={this.props.handleParenthesis}
          id="left-parenthesis"
          value="("
        >
          (
        </button>
        <button
          onClick={this.props.handleParenthesis}
          id="right-parenthesis"
          value=")"
        >
          )
        </button>
      </div>
    );
  }
}

export default Calculator;
