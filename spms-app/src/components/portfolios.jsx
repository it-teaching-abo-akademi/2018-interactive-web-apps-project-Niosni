import React, { Component } from "react";
import Portfolio from "./portfolio";

class Portfolios extends Component {
  render() {
    const {
      onEuros,
      onDollars,
      onRemovePortfolio,
      onAddStock,
      onShowGraph,
      onRemoveStock,
      portfolios,
      onAddPortfolio
    } = this.props;
    return (
      <div>
        <button onClick={onAddPortfolio} className="btn btn-success btn-sm m-2">
          Add new portfolio
        </button>
        {portfolios.map(portfolio => (
          <Portfolio
            key={portfolio.id}
            portfolio={portfolio}
            onEuros={onEuros}
            onDollars={onDollars}
            onRemovePortfolio={onRemovePortfolio}
            onAddStock={onAddStock}
            onShowGraph={onShowGraph}
            onRemoveStock={onRemoveStock}
          />
        ))}
      </div>
    );
  }
}

export default Portfolios;
