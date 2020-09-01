import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTransactions } from "../redux/transactionReducer";

const Categories = (props) => {
  const [isEditing, setEdit] = useState(false);
  const [totals, setTotals] = useState([]);
  const [thisTotal, setThisTotal] = useState(0);
  let [classes] = useState("table-col ");
  const [input, setInput] = useState({
    name: props.category.name,
    budget: props.category.budget,
  });

  useEffect(() => {
    console.log(props.categories)
    let tempTotals = props.categories.map((category) => {
      let categorySum = props.transactionReducer.transactions.reduce(
        (sum, transaction) => {
          return transaction.category === category.name
            ? sum + transaction.amount
            : sum;
        },
        0
      );
      return { name: category.name, sum: categorySum };
    });
    setTotals(tempTotals);
    let stuff = tempTotals.filter((e) => {
      return e.name === props.category.name;
    });
    setThisTotal(stuff[0].sum);
  }, [props.transactionReducer.transactions, props.categories]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    console.log(props.category.budget);
    setEdit(!isEditing);
    setInput({
      name: props.category.name,
      budget: props.category.budget,
    });
  };

  classes += props.category.budget - thisTotal < 0 ? "negative" : "positive";

  return (
    <div className="table">
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
            <div className="table-col">${thisTotal}</div>
            <div className={classes}>${props.category.budget - thisTotal}</div>
            <div className="category-btns">
              <button className="fa fa-pencil-square-o" onClick={toggleEdit}></button>
              <button
              className="fa fa-times"
                onClick={() => props.deleteCategory(props.category.category_id)}
              >
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
