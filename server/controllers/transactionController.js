module.exports = {
  getTransactions: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const transactions = await db.transactions.get_transactions(id);
    res.status(200).send(transactions);
  },

  addTransaction: (req, res) => {
    const { date, description, category, amount, type } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");
    db.transactions
      .add_transaction([date, description, category, amount, type, id])
      .then((transactions) => res.status(200).send(transactions))
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something Went Wrong.",
        });
        console.log(err);
      });
  },

  editTransaction: async (req, res) => {
    const { date, description, category, amount, type } = req.body;
    const { id, monthId } = req.params;
    const db = req.app.get("db");
    const transactions = await db.transactions.edit_transaction({
      date,
      description,
      category,
      amount,
      type,
      transaction_id: id,
      month_id: monthId,
    });
    res.status(200).send(transactions);
  },

  deleteTransaction: (req, res) => {
    const db = req.app.get("db");
    const { id, monthId } = req.params;
    db.transactions
      .delete_transaction(id, monthId)
      .then((transactions) => res.status(200).send(transactions))
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something Went Wrong.",
        });
        console.log(err);
      });
  },
};
