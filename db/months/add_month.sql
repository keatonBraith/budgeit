INSERT INTO months
(name, user_id)
VALUES
($1, $2);

SELECT * FROM months
WHERE user_id = $2;
