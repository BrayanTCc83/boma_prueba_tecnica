CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth DATE NOT NULL,
    country TEXT NOT NULL,
    role SMALLINT NOT NULL CHECK (role IN (0, 1))
);
