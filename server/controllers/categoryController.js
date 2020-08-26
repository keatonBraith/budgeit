module.exports = {
    getCategories: async (req, res) => {
        const { id } = req.params;
        const db = req.app.get("db");
        const categories = await db.categories.get_categories(id);
        res.status(200).send(categories);
    },
}