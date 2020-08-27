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
    <table>
      <tbody>
        <tr key={props.index}>
          {isEditing ? (
            <>
              <td>
                <input name="name" value={input.name} onChange={handleChange} />
              </td>
              <td>
                <input
                  name="budget"
                  type="number"
                  value={input.budget}
                  onChange={handleChange}
                />
              </td>
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
              <td>{props.category.name}</td>
              <td>${props.category.budget}</td>
              <td>$0</td>
              <td>$0</td>
              <td>
                <button onClick={toggleEdit}>Edit</button>
                <button
                  onClick={() =>
                    props.deleteCategory(props.category.category_id)
                  }
                >
                  Delete
                </button>
              </td>
            </>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default Categories;
