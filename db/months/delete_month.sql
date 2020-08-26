DELETE FROM months
WHERE month_id = $1;

SELECT * FROM months
WHERE user_id = $2;
