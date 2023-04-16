export default () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRES_HOST || 'postgres',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    database: process.env.POSTGRES_DB || 'postgres',
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    POSTGRES_SYNCHRONIZE: Boolean(process.env.POSTGRES_SYNCHRONIZE) || true,
  },
  jwt_secret: process.env.JWT_SECRET || 'secret-key',
});

/*
export default () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRES_HOST || 'postgres',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    database: process.env.POSTGRES_DB || 'kpd',
    username: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    POSTGRES_SYNCHRONIZE: Boolean(process.env.POSTGRES_SYNCHRONIZE) || true,
  },
  jwt_secret: process.env.JWT_SECRET || 'secret-key',
});
*/
