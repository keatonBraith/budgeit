import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTransactions } from "../redux/transactionReducer";
import Aws from './Aws';
import Transaction from "./Transaction";

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [input, setInput] = useState({
    date: transactions.date,
    description: transactions.description,
    category: transactions.category,
    amount: transactions.amount,
    type: transactions.type,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const getTransactions = () => {
    axios
      .get(`/api/trans/${props.match.params.monthId}`)
      .then((res) => {
        setTransactions(res.data);
        props.getTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleClearInput = (event) => {
    setTransactions([]);
    setInput({
      date: "",
      description: "",
      category: "",
      amount: "",
      type: "",
    });
  };

  const onClick = (event) => {
    addTransaction();
    handleClearInput();
  };

  const addTransaction = () => {
    console.log(input.category);
    axios
      .post(`/api/trans/${props.match.params.monthId}`, {
        date: input.date,
        description: input.description,
        category: input.category,
        amount: input.amount,
        type: input.type,
      })
      .then((res) => {
        setTransactions(res.data);
        getTransactions();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editTransaction = (id, date, description, category, amount, type) => {
    axios
      .put(`/api/trans/${id}/${props.match.params.monthId}`, {
        date,
        description,
        category,
        amount,
        type,
      })
      .then((res) => {
        setTransactions(res.data);
        getTransactions();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTransaction = (id) => {
    axios
      .delete(`/api/trans/${id}/${props.match.params.monthId}`)
      .then((res) => {
        setTransactions(res.data);
        getTransactions();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="trans-main">
      <Link
        className="budget-link"
        to={`/budget/${props.match.params.monthId}`}
      >
        Back to Budget
      </Link>
      <div className="add-trans">
        <button onClick={onClick}>
          <i className="fa fa-floppy-o"></i>
          <span className="save-trans">Save Transaction</span>
        </button>
        <input
          className="date"
          name="date"
          placeholder="Date"
          value={input.date}
          onChange={handleChange}
        />
        <input
          className="description"
          name="description"
          placeholder="Description"
          value={input.description}
          onChange={handleChange}
        />
        <input
          className="category"
          name="category"
          placeholder="Category"
          value={input.category}
          onChange={handleChange}
        />
        <input
          className="amount"
          name="amount"
          placeholder="Amount"
          value={input.amount}
          onChange={handleChange}
        />
        <input
          className="type"
          name="type"
          placeholder="Type"
          value={input.type}
          onChange={handleChange}
        />
        <Aws/>
        <div className="table">
          <div className="table-row">
            <div className="table-col">Date</div>
            <div className="table-col">Description</div>
            <div className="table-col">Category</div>
            <div className="table-col">Amount</div>
            <div className="table-col">Type</div>
          </div>
        </div>
        <div className="transactions">
          {transactions.map((transaction, index) => {
            return (
              <Transaction
                editTransaction={editTransaction}
                deleteTransaction={deleteTransaction}
                transaction={transaction}
                index={index}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getTransactions })(Transactions);
