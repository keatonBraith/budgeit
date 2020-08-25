SELECT * FROM transactions t
JOIN users u ON u.user_id = t.user_id
WHERE user_id = $1;