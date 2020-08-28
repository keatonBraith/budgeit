SELECT * FROM transactions t
JOIN months m ON m.month_id = t.month_id
WHERE month_id = $1
ORDER BY date ASC;