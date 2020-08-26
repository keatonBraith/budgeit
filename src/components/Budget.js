import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";


const Budget = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategory] = useState("");

  const handleCategoryInput = (event) => {
    const { value } = event.target;
    setCategory(value);
  };

  useEffect(() => {
       axios
          .get(`/api/categories/${props.user.user_id}`)
          .then((res) => {
            setCategories(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
  }, [props.user.user_id]);

  return (
    <section>
      <h1>Get Budgeting!</h1>
      <div>
        <div>
          <input
            name="category"
            placeholder="Add a Category"
            value={categoryInput}
            onChange={handleCategoryInput}
          />
          <button>Add Category</button>
        </div>
        {categories.map((category, index) => {
            return (
                <div key={index}>
                    <h3>{category.name}</h3>
                    <h3>{category.budget}</h3>
                    <h3>Actual</h3>
                    <h3>Difference</h3>
                </div>
            )
        })}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Budget);
