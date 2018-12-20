import React, { Component } from "react";
import Portfolios from "./components/portfolios";
import "./App.css";

class App extends Component {
  state = {
    portfolios: [
      {
        id: 1,
        name: "Portfolio 1",
        currency: "EUR"
      }
    ],
    newId: 1
  };
  handleAddPortfolio = () => {
    if (this.state.portfolios.length <= 10) {
      const newId = this.state.newId + 1;
      this.setState({ newId });
      const name = "Portfolio " + newId;
      const portfolios = [...this.state.portfolios, { id: newId, name }];
      this.setState({ portfolios });
    } else {
      alert("You can only have 10 portfolios!");
    }
  };

  handleRemovePortfolio = portfolio => {
    const portfolios = this.state.portfolios.filter(c => c.id !== portfolio.id);
    this.setState({ portfolios });
  };

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Portfolios
            portfolios={this.state.portfolios}
            onAddPortfolio={this.handleAddPortfolio}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            onEuros={this.handleEuros}
            onDollars={this.handleDollars}
            onRemovePortfolio={this.handleRemovePortfolio}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
