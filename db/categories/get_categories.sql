SELECT c.user_id, category_id, name, budget FROM categories c
JOIN users u ON u.user_id = c.user_id
WHERE c.user_id = $1
ORDER BY name ASC;
