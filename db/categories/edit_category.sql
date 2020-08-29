UPDATE categories
SET
Name = ${name},
Budget = ${budget}
WHERE category_id = ${category_id};
SELECT user_id, category_id, name, budget FROM categories
ORDER BY name ASC;
