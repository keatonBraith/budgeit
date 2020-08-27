module.exports = {
  getMonths: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const months = await db.months.get_months(id);
    res.status(200).send(months);
  },

  addMonth: (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");
    db.months
      .add_month([name, id])
      .then((months) => res.status(200).send(months))
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something Went Wrong.",
        });
        console.log(err);
      });
  },

  deleteMonth: (req, res) => {
    const db = req.app.get("db");
    const { id, userId } = req.params;
    db.months
      .delete_month(id, userId)
      .then((months) => {
        // console.log(userId, months)
        res.status(200).send(months)})
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something went wrong.",
        });
        console.log(err);
      });
  },
};
