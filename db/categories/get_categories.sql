SELECT * FROM categories c
JOIN users u ON u.user_id = c.user_id
WHERE u.user_id = $1
ORDER BY name ASC;
