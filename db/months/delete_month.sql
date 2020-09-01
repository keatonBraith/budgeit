DELETE FROM months
WHERE month_id = $1;

SELECT month_id, name, user_id FROM months
WHERE user_id = $2
ORDER BY month_id ASC;
