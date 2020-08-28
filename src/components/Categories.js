import React, { useState } from "react";

const Categories = (props) => {
  const [isEditing, setEdit] = useState(false);
  const [input, setInput] = useState({
    name: props.category.name,
    budget: props.category.budget,
  });

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
              <div className="table-col">$0</div>
              <div className="table-col">$0</div>
              <div>
                <button onClick={toggleEdit}>Edit</button>
                <button
                  onClick={() =>
                    props.deleteCategory(props.category.category_id)
                  }
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div >
    </div>
  );
};

export default Categories;
