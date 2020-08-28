SELECT * FROM transactions t
JOIN months m ON m.month_id = t.month_id
WHERE t.month_id = $1
ORDER BY date ASC;