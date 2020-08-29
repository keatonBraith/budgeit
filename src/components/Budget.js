import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Categories from "./Categories";

const Budget = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategory] = useState("");
  const [budgetInput, setBudget] = useState("");

  const handleCategoryInput = (event) => {
    const { value } = event.target;
    setCategory(value);
  };

  useEffect(() => {
    axios
      .get(`/api/categories/${props.userReducer.user.user_id}`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const addCategory = () => {
    axios
      .post(`/api/category/${props.userReducer.user.user_id}`, {
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

  const editCategory = (id, name, budget) => {
    axios
      .put(`/api/category/${id}`, { name, budget })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCategory = (id) => {
    axios
      .delete(`/api/category/${id}/${props.userReducer.user.user_id}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <section>a
      <h1>Get Budgeting!</h1>
      <div>
        <div>
          <button>
            <Link to={`/trans/${props.match.params.monthId}`}>
              Add Transaction
            </Link>
          </button>
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
        <div className="table">
          <div className="table-row">
            <div className="table-col">Category</div>
            <div className="table-col">Budgeted</div>
            <div className="table-col">Actual</div>
            <div className="table-col">Difference</div>
          </div>
        </div>
        <div>
          <div>
            {categories.map((category, index) => {
              return (
                <Categories
                  editCategory={editCategory}
                  deleteCategory={deleteCategory}
                  category={category}
                  categories={categories}
                  index={index}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Budget);
