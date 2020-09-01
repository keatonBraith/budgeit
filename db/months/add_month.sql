INSERT INTO months
(name, user_id)
VALUES
($1, $2);

SELECT month_id, name, user_id FROM months
WHERE user_id = $2
ORDER BY month_id ASC;
