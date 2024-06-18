import dotenv from 'dotenv';
dotenv.config();

const _config = {
   Port: process.env.PORT,
   DataBaseUrl: process.env.DATABASE_URL,
   DataBaseName: process.env.DATABASE_NAME,
   CrossOrigin: process.env.CROS_ORIGIN,
   NodeEnv: process.env.NODE_ENV,
   SecretKey: process.env.SECRET_KEY,
   NodeMailerEmail: process.env.NODE_MAILER_EMAIL,
   NodeMailerPassword: process.env.NODE_MAILER_PASSWORD
}

export const config = Object.freeze(_config);