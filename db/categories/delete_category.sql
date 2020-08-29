DELETE FROM categories
WHERE category_id = $1;

SELECT user_id, category_id, name, budget FROM categories
WHERE user_id = $2;
