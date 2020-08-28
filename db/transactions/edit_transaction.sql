UPDATE transactions
SET 
date = ${date},
description = ${description},
category = ${category},
amount = ${amount},
type = ${type}
WHERE transaction_id = ${transaction_id};
SELECT * FROM transactions
ORDER BY date ASC;