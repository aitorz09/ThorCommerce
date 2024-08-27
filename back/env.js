import dotenv from 'dotenv';

dotenv.config();

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    PORT,
    JWT_SECRET,
    JWT_EXPIRATION,
    VITE_URL_FRONT,
    UPLOADS_DIR,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    URL_FRONT,
    MongooseURL,
} = process.env;

export {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    PORT,
    JWT_SECRET,
    JWT_EXPIRATION,
    UPLOADS_DIR,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    MongooseURL,
    VITE_URL_FRONT,
    URL_FRONT,
};
