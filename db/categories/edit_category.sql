UPDATE categories
SET
Name = ${name},
Budget = ${budget}
WHERE category_id = ${category_id};
SELECT user_id, category_id, name, budget FROM categories
WHERE user_id = ${user_id}
ORDER BY name ASC;
