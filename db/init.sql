CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    password VARCHAR(200)
);

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY,
    date TEXT,
    description TEXT,
    category VARCHAR(100),
    amount INT,
    type VARCHAR(200),
    month_id INT REFERENCES months(month_id),
    user_id INT REFERENCES users(user_id)
);

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    budget INT,
    user_id INT
);

CREATE TABLE months(
    month_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    user_id INT REFERENCES users(user_id)
);