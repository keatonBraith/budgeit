module.exports = {
  getCategories: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const categories = await db.categories.get_categories(id);
    res.status(200).send(categories);
  },

  addCategory: (req, res) => {
    const { name, budget } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");
    db.categories
      .add_category([name, budget, id])
      .then((categories) =>
        //   console.log(categories)
        res.status(200).send(categories)
      )
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something Went Wrong.",
        });
        console.log(err);
      });
  },

  deleteCategory: (req, res) => {
    const db = req.app.get("db");
    const { id, userId } = req.params;
    db.categories
      .delete_category(id, userId)
      .then((categories) => {
        console.log(userId, categories);
        res.status(200).send(categories);
      })
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something went wrong.",
        });
        console.log(err);
      });
  },

  editCategory: async (req, res) => {
    const { name, budget } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");
    const categories = await db.categories.edit_category({
      name,
      budget,
      category_id: id,
    });
    res.status(200).send(categories);
  },
};
