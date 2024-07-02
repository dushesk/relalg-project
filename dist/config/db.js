var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
// Загрузка параметров подключения из .env файла
dotenv.config();
// Конфигурация подключения к базе данных PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
// Реализация функции executeQuery
function executeQuery(query, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let client;
        try {
            client = yield pool.connect();
            const result = params ? yield client.query(query, params) : yield client.query(query);
            return result.rows;
        }
        catch (err) {
            console.error('Error executing query', err);
            throw err;
        }
        finally {
            if (client)
                client.release();
        }
    });
}
// Функция для выполнения транзакции
function executeTransaction(operations) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            yield client.query('BEGIN');
            yield operations(client);
            yield client.query('COMMIT');
        }
        catch (error) {
            yield client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    });
}
export { executeQuery, executeTransaction };
