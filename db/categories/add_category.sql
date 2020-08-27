INSERT INTO categories
(name, budget, user_id)
VALUES
($1, $2, $3);

SELECT u.user_id, category_id, name, budget FROM users u 
JOIN categories c ON u.user_id = c.user_id
WHERE u.user_id = $3
ORDER BY name ASC;
