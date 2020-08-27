UPDATE categories
SET
Name = ${name},
Budget = ${budget}
WHERE category_id = ${category_id};
SELECT * FROM categories
ORDER BY name ASC;
