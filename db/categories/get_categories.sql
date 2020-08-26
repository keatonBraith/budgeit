SELECT * FROM categories c
JOIN users u ON u.user_id = c.user_id
WHERE c.user_id = $1;
