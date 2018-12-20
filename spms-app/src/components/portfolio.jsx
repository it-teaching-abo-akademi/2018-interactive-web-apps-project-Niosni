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
    ],
    portfolioValue: 0
  };
  componentDidMount() {
    this.updatePrices();
  }

  handleAddStock = portfolio => {
    alert("joo");
  };

  updatePrices = () => {
    let stocks = [...this.state.stocks];

    let total = 0;
    let unitValue;
    stocks.forEach(stock => {
      console.log(stock.name);
      let url =
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
        stock.name +
        "&interval=5min&apikey=N5W66DMTP80L3027";
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          if (myJson["Note"]) {
            alert(
              "Free API key limit reached! Wait a minute to refresh get updated prices."
            );
          } else {
            const time = myJson["Meta Data"]["3. Last Refreshed"];
            unitValue = myJson["Time Series (5min)"][time]["1. open"];
            stock.unitValue = unitValue;
            stock.totalValue = unitValue * stock.quantity;
            this.setState({ stocks });

            console.log(stock.unitValue);
            total = parseFloat(total) + parseFloat(stock.unitValue);
            this.setState({ portfolioValue: total });
          }
        });
    });
  };

  render() {
    const { stocks } = this.state;
    return (
      <div className="container border m-3">
        <text type="text" onClick="">
          {this.props.portfolio.name}
        </text>
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
                accessor: "name",
                width: 200
              },
              {
                Header: "Unit value",
                id: "unitValue",
                accessor: d => d.unitValue,
                width: 200
              },
              {
                Header: "Quantity",
                accessor: "quantity",
                width: 200
              },
              {
                Header: "Total Value",
                accessor: "totalValue",
                width: 200
              },
              {
                Header: "Select",
                accessor: "select",
                width: 200
              }
            ]}
            defaultPageSize={5}
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
        <span>
          Total value of {this.props.portfolio.name} :{" "}
          {this.state.portfolioValue}
        </span>
        <br />
        <button
          onClick={() => this.handleAddStock(this.props.portfolio)}
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
