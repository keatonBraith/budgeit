DELETE FROM categories
WHERE category_id = $1;

SELECT * FROM categories
WHERE user_id = $2;
