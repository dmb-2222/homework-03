import React from "react";
import style from "../style.module.css";
import PropTypes from "prop-types";

const TransactionHistory = ({ history = [] }) => {
  return (
    <table className={style.history}>
      <thead>
        <tr>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {history.map(item => (
          <tr key={item.id}>
            <td>{item.type}</td>
            <td>{item.amount}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TransactionHistory;

TransactionHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};
