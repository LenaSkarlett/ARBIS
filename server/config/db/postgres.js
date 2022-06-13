import pkg from 'pg';
const { Pool } = pkg;

const postgres = new Pool({
  user: 'postgres',
  database: 'arbis',
  password: 'postgres'
});

export default postgres;
