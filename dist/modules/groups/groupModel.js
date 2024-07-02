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
class GroupModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM groups';
            const results = yield executeQuery(query);
            return results.rows.map((row) => ({
                id: row.id,
                name: row.name,
                institutionId: row.institution_id
            }));
        });
    }
    static getById(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM groups WHERE id = $1';
            const results = yield executeQuery(query, [groupId]);
            if (results.rows.length === 0) {
                return null;
            }
            const row = results.rows[0];
            return {
                id: row.id,
                name: row.name,
                institutionId: row.institution_id
            };
        });
    }
    static create(name, institutionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newGroup = null;
                yield executeTransaction((client) => __awaiter(this, void 0, void 0, function* () {
                    const query = 'INSERT INTO groups (name, institution_id) VALUES ($1, $2) RETURNING *';
                    const result = yield client.query(query, [name, institutionId]);
                    newGroup = {
                        id: result.rows[0].id,
                        name: result.rows[0].name,
                        institutionId: result.rows[0].institution_id
                    };
                }));
                return newGroup;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update(groupId, name, institutionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updatedGroup = null;
                yield executeTransaction((client) => __awaiter(this, void 0, void 0, function* () {
                    const query = 'UPDATE groups SET name = $1, institution_id = $2 WHERE id = $3 RETURNING *';
                    const result = yield client.query(query, [name, institutionId, groupId]);
                    updatedGroup = {
                        id: result.rows[0].id,
                        name: result.rows[0].name,
                        institutionId: result.rows[0].institution_id
                    };
                }));
                return updatedGroup;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM groups WHERE id = $1';
            yield executeQuery(query, [groupId]);
        });
    }
}
export { GroupModel };
