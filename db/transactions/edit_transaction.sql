UPDATE transactions
SET 
date = ${date},
description = ${description},
category = ${category},
amount = ${amount},
img_url = ${img_url}
WHERE transaction_id = ${transaction_id};
SELECT * FROM transactions
WHERE month_id = ${month_id}
ORDER BY 
CAST(date as DATE) ASC;