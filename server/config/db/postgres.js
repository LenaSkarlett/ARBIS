import pkg from 'pg';
const { Pool } = pkg;

const postgres = new Pool({
  user: 'postgres',
  database: 'apbic',
  password: 'postgres'
});

export default postgres;

