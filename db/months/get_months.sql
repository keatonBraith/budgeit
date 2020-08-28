SELECT month_id, name, m.user_id FROM months m
JOIN users u ON u.user_id = m.user_id
WHERE u.user_id = $1
ORDER BY month_id ASC;