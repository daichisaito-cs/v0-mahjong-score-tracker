-- pgcryptoを有効化してgen_random_bytes()などを利用可能にする

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
