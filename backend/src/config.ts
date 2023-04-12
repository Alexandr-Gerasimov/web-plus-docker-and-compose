export default () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 4000,
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    database: process.env.POSTGRES_DB || 'nest_project',
    username: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    POSTGRES_SYNCHRONIZE: Boolean(process.env.POSTGRES_SYNCHRONIZE) || true,
  },
  jwt_secret: process.env.JWT_SECRET || 'secret-key',
});

/*type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'nest_project',
      entities: [Offer, User, Wish, Wishlist],
      synchronize: true,
*/