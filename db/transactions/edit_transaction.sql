UPDATE transactions
SET 
date = ${date},
description = ${description},
category = ${category},
amount = ${amount},
type = ${type}
WHERE transaction_id = ${transaction_id};
SELECT * FROM transactions
WHERE month_id = ${month_id}
ORDER BY date ASC;