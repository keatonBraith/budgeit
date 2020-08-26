module.exports = {
  getMonths: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const months = await db.months.get_months(id)
    res.status(200).send(months);
  },
};
