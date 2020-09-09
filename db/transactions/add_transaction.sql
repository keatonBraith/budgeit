INSERT INTO transactions
(date, description, category, amount, img_url, month_id)
VALUES
($1, $2, $3, $4, $5, $6);

SELECT * FROM transactions t 
JOIN months m ON m.month_id = t.month_id
WHERE m.month_id = $6
ORDER BY 
CAST(date as DATE) ASC;