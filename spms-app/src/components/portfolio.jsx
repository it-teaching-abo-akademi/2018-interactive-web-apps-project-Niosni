import React, { Component } from "react";
import Stocks from "./stocks";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Portfolio extends Component {
  state = {
    stocks: [
      {
        id: 1,
        name: "NOK",
        unitValue: 4.72,
        quantity: 10,
        totalValue: 47.2,
        selected: true
      },
      {
        id: 2,
        name: "MSFT",
        unitValue: 82.78,
        quantity: 5,
        totalValue: 827.8,
        selected: true
      }
    ]
  };
  render() {
    const { stocks } = this.state;
    return (
      <div className="container border m-3">
        <span>Portfolio {this.props.portfolio.id}</span>
        <button
          onClick={() => this.props.onEuros(this.props.portfolio)}
          className="btn btn-primary btn-sm m-2"
        >
          Show in €
        </button>
        <button
          onClick={() => this.props.onDollars(this.props.portfolio)}
          className="btn btn-primary btn-sm m-2"
        >
          Show in $
        </button>
        <button
          onClick={() => this.props.onRemovePortfolio(this.props.portfolio)}
          className="btn btn-danger btn-sm m-2"
        >
          Remove portfolio
        </button>
        <br />
        <div>
          <ReactTable
            data={stocks}
            columns={[
              {
                Header: "Name",
                accessor: "name"
              },
              {
                Header: "Unit value",
                id: "unitValue",
                accessor: d => d.unitValue
              },
              {
                Header: "Quantity",
                accessor: "quantity"
              },
              {
                Header: "Total Value",
                accessor: "totalValue"
              },
              {
                Header: "Select",
                accessor: "select"
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
        <Stocks
          stocks={this.state.stocks}
          onAddStock={this.handleAddStock}
          onShowGraph={this.handleShowGraph}
          onRemoveStock={this.handleRemoveStock}
        />
        <br />
        <span>Total value of {this.props.portfolio.name} : totalValue</span>
        <button
          onClick={() => this.props.onAddStock(this.props.portfolio)}
          className="btn btn-success btn-sm m-2"
        >
          Add stock
        </button>
        <button
          onClick={() => this.props.onShowGraph(this.props.portfolio)}
          className="btn btn-info btn-sm m-2"
        >
          Show graph
        </button>
        <button
          onClick={() => this.props.onRemoveStock(this.props.stock.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Remove selected stocks
        </button>
      </div>
    );
  }
  getPortfolioName;
}

export default Portfolio;
