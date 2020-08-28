import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTransactions } from "../redux/transactionReducer";

const Categories = (props) => {
  const [isEditing, setEdit] = useState(false);
  const [totals, setTotals] = useState([]);
  const [input, setInput] = useState({
    name: props.category.name,
    budget: props.category.budget,
  });

  useEffect(() => {
    for (let i = 0; i < props.category.length; i++) {
      const total = props.transactions.reduce((a, e) => {
        return e.props.category === props.category[i] ? a + e.amount : a;
      }, 0);
      setTotals({ ...totals, [props.category[i]]: total });
      totals[props.category[i]] = total;
    }
  }, [props.category, props.transactions, totals]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // const actualSum = (arr) => {
  //   let transArr = arr.reduce
  // }

  const toggleEdit = () => {
    console.log(props.category.budget);
    setEdit(!isEditing);
    setInput({
      name: props.category.name,
      budget: props.category.budget,
    });
  };

  return (
    <div className="table">
      {console.log(totals.amount)}
      {console.log(props.transactionReducer.transactions)}
      <div className="table-row" key={props.index}>
        {isEditing ? (
          <>
            <div className="table-col">
              <input name="name" value={input.name} onChange={handleChange} />
            </div>
            <div className="table-col">
              <input
                name="budget"
                type="number"
                value={input.budget}
                onChange={handleChange}
              />
            </div>
            <div className="table-col">$0</div>
            <div className="table-col">$0</div>
            <button
              onClick={() => {
                props.editCategory(
                  props.category.category_id,
                  input.name,
                  input.budget
                );
                toggleEdit();
              }}
            >
              Save
            </button>
            <button onClick={toggleEdit}>Cancel</button>
          </>
        ) : (
          <>
            <div className="table-col">{props.category.name}</div>
            <div className="table-col">${props.category.budget}</div>
            <div className="table-col">$0</div>
            <div className="table-col">$0</div>
            <div>
              <button onClick={toggleEdit}>Edit</button>
              <button
                onClick={() => props.deleteCategory(props.category.category_id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getTransactions })(Categories);
