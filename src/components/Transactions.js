import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTransactions } from "../redux/transactionReducer";
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

  useEffect(() => {
    axios
      .get(`/api/trans/${props.match.params.monthId}`)
      .then((res) => {
        setTransactions(res.data);
        props.getTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editTransaction = (id, date, description, category, amount, type) => {
    axios
      .put(`/api/trans/${id}`, { date, description, category, amount, type })
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTransaction = (id) => {
    axios
      .delete(`/api/trans/${id}/${props.match.params.monthId}`)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {console.log(props)}
      <Link to={`/budget/${props.match.params.monthId}`}>Back to Budget</Link>
      <div>
        <button onClick={onClick}>Add Transaction</button>
        <input
          name="date"
          placeholder="Transaction Date"
          value={input.date}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Transaction Description"
          value={input.description}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Transaction Category"
          value={input.category}
          onChange={handleChange}
        />
        <input
          name="amount"
          placeholder="Transaction Amount"
          value={input.amount}
          onChange={handleChange}
        />
        <input
          name="type"
          placeholder="Transaction Type"
          value={input.type}
          onChange={handleChange}
        />
        <div className="table">
          <div className="table-row">
            <div className="table-col">Date</div>
            <div className="table-col">Description</div>
            <div className="table-col">Category</div>
            <div className="table-col">Amount</div>
            <div className="table-col">Type</div>
          </div>
        </div>
        <div>
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
