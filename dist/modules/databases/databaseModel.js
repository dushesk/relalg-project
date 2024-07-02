var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { executeQuery } from '../../config/db.js';
class DatabaseManager {
    static getAllDatabases() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT id, name FROM app.databases;';
            const results = yield executeQuery(query);
            console.log(results);
            return results.map((row) => ({
                id: row.id,
                name: row.name,
            }));
        });
    }
    static getTablesByDatabaseName(databaseName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT t.id, t.name, t.database_id, d.name as database_name
      FROM app.tables t
      JOIN app.databases d ON t.database_id = d.id
      WHERE d.name = $1
    `;
            const results = yield executeQuery(query, [databaseName]);
            return results.map((row) => ({
                id: row.id,
                name: row.name,
                database: {
                    id: row.database_id,
                    name: row.database_name
                }
            }));
        });
    }
}
export { DatabaseManager };
