var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { executeQuery, executeTransaction } from '../../config/db.js';
class InstitutionModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM institutions';
            const results = yield executeQuery(query);
            return results.rows.map((row) => ({
                id: row.id,
                name: row.name
            }));
        });
    }
    static getById(institutionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM institutions WHERE id = $1';
            const results = yield executeQuery(query, [institutionId]);
            if (results.rows.length === 0) {
                return null;
            }
            const row = results.rows[0];
            return {
                id: row.id,
                name: row.name
            };
        });
    }
    static create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newInstitution = null;
                yield executeTransaction((client) => __awaiter(this, void 0, void 0, function* () {
                    const query = 'INSERT INTO institutions (name) VALUES ($1) RETURNING *';
                    const result = yield client.query(query, [name]);
                    newInstitution = {
                        id: result.rows[0].id,
                        name: result.rows[0].name
                    };
                }));
                return newInstitution;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update(institutionId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updatedInstitution = null;
                yield executeTransaction((client) => __awaiter(this, void 0, void 0, function* () {
                    const query = 'UPDATE institutions SET name = $1 WHERE id = $2 RETURNING *';
                    const result = yield client.query(query, [name, institutionId]);
                    updatedInstitution = {
                        id: result.rows[0].id,
                        name: result.rows[0].name
                    };
                }));
                return updatedInstitution;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(institutionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM institutions WHERE id = $1';
            yield executeQuery(query, [institutionId]);
        });
    }
}
export { InstitutionModel };
