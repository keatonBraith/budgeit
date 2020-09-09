DELETE FROM transactions
WHERE transaction_id = $1;

SELECT * FROM transactions
WHERE month_id = $2
ORDER BY 
CAST(date as DATE) ASC;