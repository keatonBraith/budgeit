import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTransactions } from "../redux/transactionReducer";

const Categories = (props) => {
  const [isEditing, setEdit] = useState(false);
  const [totals, setTotals] = useState([]);
  const [thisTotal, setThisTotal] = useState(0);
  const [input, setInput] = useState({
    name: props.category.name,
    budget: props.category.budget,
  });

  useEffect(() => {
    // console.log(props.transactionReducer.transactions);
    // console.log(props.categories.length);
    // for (let i = 0; i < props.categories.length; i++) {
    //   const total = props.transactionReducer.transactions.reduce((a, e) => {
    //     console.log(e.category === props.categories[i].name, e.amount);
    //     return e.category === props.categories[i].name ? a + e.amount : a;
    //   }, 0);
    //   let tempTotals = totals;
    //   tempTotals[i].name = total;
    //   setTotals([tempTotals]);
    //   console.log(total);
    // }
    // console.log(totals);

    let tempTotals = props.categories.map((category) => {
      console.log("category", category);
      let categorySum = props.transactionReducer.transactions.reduce(
        (sum, transaction) => {
          console.log("transaction/sum", transaction, sum);
          return transaction.category === category.name
            ? sum + transaction.amount
            : sum;
        },
        0
      );
      return { name: category.name, sum: categorySum };
    });
    console.log("tempTotals", tempTotals);
    setTotals(tempTotals);
    let stuff = tempTotals.filter((e) => {
      console.log(e.name, props.category.name, e.name === props.category.name);
      return e.name === props.category.name;
    });
    setThisTotal(stuff[0].sum);
  }, [props.transactionReducer.transactions]);

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
            <div className="table-col">{thisTotal}</div>
            <div className="table-col">{props.category.budget - thisTotal}</div>
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
