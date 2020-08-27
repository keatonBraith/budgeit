import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Budget = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategory] = useState("");
  const [budgetInput, setBudget] = useState("");

  const handleCategoryInput = (event) => {
    const { value } = event.target;
    setCategory(value);
  };

  const handleBudgetInput = (event) => {
    const { value } = event.target;
    setBudget(value);
  };

  const handleClearInput = (event) => {
    setBudget("");
    setCategory("");
  };

  const onClick = (event) => {
    addCategory();
    handleClearInput();
  };

  useEffect(() => {
    axios
      .get(`/api/categories/${props.user.user_id}`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.user.user_id]);

  const addCategory = () => {
    axios
      .post(`/api/category/${props.user.user_id}`, {
        name: categoryInput,
        budget: budgetInput,
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCategory = (id) => {
    axios
      .delete(`/api/category/${id}/${props.user.user_id}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <h1>Get Budgeting!</h1>
      <div>
        <div>
          <button><Link to={`/trans/${props.months.month_id}`}>Add Transaction</Link></button>
          <button onClick={onClick}>Add Category</button>
          <input
            name="category"
            placeholder="Category Name"
            value={categoryInput}
            onChange={handleCategoryInput}
          />
          <input
            name="budget"
            placeholder="Budget Amount"
            value={budgetInput}
            onChange={handleBudgetInput}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budgeted</th>
              <th>Actual</th>
              <th>Difference</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
                <td>{category.budget}</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => deleteCategory(category.category_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Budget);
