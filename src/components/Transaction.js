import React, { useState } from "react";

const Transaction = (props) => {
  const [isEditing, setEdit] = useState(false);
  const [input, setInput] = useState({
    date: props.transaction.date,
    description: props.transaction.description,
    category: props.transaction.category,
    amount: props.transaction.amount,
    type: props.transaction.type,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setEdit(!isEditing);
    setInput({
      date: props.transaction.date,
      description: props.transaction.description,
      category: props.transaction.category,
      amount: props.transaction.amount,
      type: props.transaction.type,
    });
  };

  return (
    <div className="table">
      <div className="table-row" key={props.index}>
        {isEditing ? (
          <>
            <div className="table">
              <div className="table-row">
                <input
                  className="table-col"
                  name="date"
                  value={input.date}
                  onChange={handleChange}
                />
                <input
                  className="table-col"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                />
                <input
                  className="table-col"
                  name="category"
                  value={input.category}
                  onChange={handleChange}
                />
                <input
                  className="table-col"
                  value={input.amount}
                  name="amount"
                  type="number"
                  onChange={handleChange}
                />
                <input
                  className="table-col"
                  name="type"
                  value={input.type}
                  onChange={handleChange}
                />
                <a
                className="fa fa-floppy-o"
                  onClick={() => {
                    props.editTransaction(
                      props.transaction.transaction_id,
                      input.date,
                      input.description,
                      input.category,
                      input.amount,
                      input.type
                    );
                    toggleEdit();
                  }}
                >
                  
                </a>
                <a className="fa fa-times" onClick={toggleEdit}></a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="table-col">{props.transaction.date}</div>
            <div className="table-col">{props.transaction.description}</div>
            <div className="table-col">{props.transaction.category}</div>
            <div className="table-col">${props.transaction.amount}</div>
            <div className="table-col">{props.transaction.type}</div>
            <div className="category-btns">
              <a className="fa fa-pencil-square-o" onClick={toggleEdit}></a>
              <a
              className="fa fa-times"
                onClick={() =>
                  props.deleteTransaction(props.transaction.transaction_id)
                }
              >
              
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transaction;
