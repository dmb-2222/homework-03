import React from "react";
import Controls from "../Controls/Controls";
import Balance from "../Balance/Balance";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import shortid from "short-id";
import style from "../style.module.css";
import LsBankHistory from "../services/Ls/Ls";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const prevTransactions = LsBankHistory.getBankHistory();

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [],
      balance: 0,
      deposit: 0,
      withdraw: 0,
      valueInput: ""
    };
  }

  noMoney = () =>
    toast("На счету недостаточно средств для проведения операции!", {
      autoClose: 5000
    });
  unCorrectInput = () =>
    toast("Введите сумму для проведения операции!", { autoClose: 5000 });

  componentDidMount() {
    if (prevTransactions) {
      this.setState({
        history: prevTransactions.history,
        balance: prevTransactions.balance,
        deposit: prevTransactions.deposit,
        withdraw: prevTransactions.withdraw
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.history !== this.state.history) {
      LsBankHistory.setBankHistory(this.state);
    }
  }

  handleInput = e => {
    e.preventDefault();
    if (Number(e.target.value) > 0) {
      this.setState({ valueInput: e.target.value });
    } else this.unCorrectInput();
  };

  createNewOperation = typyOperation => {
    const dateOperation = new Date().toLocaleDateString();
    return {
      id: shortid.generate(),
      type: typyOperation,
      amount: this.state.valueInput,
      date: dateOperation
    };
  };

  handleClearHistory = () => {
    LsBankHistory.clearLS();
    this.setState({ history: [], balance: 0, deposit: 0, withdraw: 0 });
  };

  handleCkickDeposit = () => {
    if (this.state.valueInput !== "") {
      const operation = this.createNewOperation("Deposit");
      this.setState(prevState => {
        return {
          history: [operation, ...prevState.history],
          deposit: (prevState.deposit += Number(operation.amount)),
          balance: (prevState.balance += Number(operation.amount)),
          valueInput: ""
        };
      });
    } else this.unCorrectInput();
  };

  handleCkickWithdraw = () => {
    if (this.state.valueInput !== "") {
      const operation = this.createNewOperation("Withdraw");

      this.setState(prevState => {
        if (this.state.balance >= this.state.valueInput) {
          return {
            balance: (prevState.balance -= Number(operation.amount)),
            history: [operation, ...prevState.history],
            withdraw: (prevState.withdraw += Number(operation.amount)),
            valueInput: ""
          };
        } else this.noMoney();
      });
    } else this.unCorrectInput();
  };

  render() {
    const { history, balance, deposit, withdraw, valueInput } = this.state;
    return (
      <div className={style.dashboard}>
        <Controls
          onInputChange={this.handleInput}
          deposit={this.handleCkickDeposit}
          withdraw={this.handleCkickWithdraw}
          resetForm={valueInput}
          clearHistory={this.handleClearHistory}
        />
        <ToastContainer />
        <Balance balance={balance} deposit={deposit} withdraw={withdraw} />
        <TransactionHistory history={history} />
      </div>
    );
  }
}
export default Dashboard;
