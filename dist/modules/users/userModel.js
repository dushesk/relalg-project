var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// models/userModel.ts
import { executeQuery, executeTransaction } from '../../config/db.js';
class UserManager {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM user_info';
            const results = yield executeQuery(query);
            return results.map((row) => ({
                id: row.user_id,
                lastName: row.user_lastname,
                firstName: row.user_firstname,
                middleName: row.user_middlename,
                email: row.user_email,
                roleName: row.role_name,
                groupName: row.group_name,
                institutionName: row.institution_name
            }));
        });
    }
    static getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM user_info WHERE user_id = $1';
            const results = yield executeQuery(query, [userId]);
            if (results.length === 0) {
                return null;
            }
            const row = results[0];
            return {
                id: row.user_id,
                lastName: row.user_lastname,
                firstName: row.user_firstname,
                middleName: row.user_middlename,
                email: row.user_email,
                roleName: row.role_name,
                groupName: row.group_name,
                institutionName: row.institution_name
            };
        });
    }
    static create(lastName, firstName, middleName, email, password, roleName, groupName, institutionName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newUser = null;
                yield executeTransaction((client) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c;
                    const roleQuery = 'SELECT id FROM roles WHERE name = $1';
                    const roleResult = yield client.query(roleQuery, [roleName]);
                    const roleId = (_a = roleResult.rows[0]) === null || _a === void 0 ? void 0 : _a.id;
                    const groupQuery = 'SELECT id FROM groups WHERE name = $1';
                    const groupResult = yield client.query(groupQuery, [groupName]);
                    const groupId = (_b = groupResult.rows[0]) === null || _b === void 0 ? void 0 : _b.id;
                    const institutionQuery = 'SELECT id FROM institutions WHERE name = $1';
                    const institutionResult = yield client.query(institutionQuery, [institutionName]);
                    const institutionId = (_c = institutionResult.rows[0]) === null || _c === void 0 ? void 0 : _c.id;
                    const userQuery = 'INSERT INTO users (last_name, first_name, middle_name, email, password, role_id, group_id, institution_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
                    const userResult = yield client.query(userQuery, [lastName, firstName, middleName, email, password, roleId, groupId, institutionId]);
                    newUser = {
                        id: userResult.rows[0].id,
                        lastName,
                        firstName,
                        middleName,
                        email,
                        roleName,
                        groupName,
                        institutionName
                    };
                }));
                return newUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update(userId, lastName, firstName, middleName, email, groupName, institutionName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updatedUser = null;
                yield executeTransaction((client) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    const groupQuery = 'SELECT id FROM groups WHERE name = $1';
                    const groupResult = yield client.query(groupQuery, [groupName]);
                    const groupId = (_a = groupResult.rows[0]) === null || _a === void 0 ? void 0 : _a.id;
                    const institutionQuery = 'SELECT id FROM institutions WHERE name = $1';
                    const institutionResult = yield client.query(institutionQuery, [institutionName]);
                    const institutionId = (_b = institutionResult.rows[0]) === null || _b === void 0 ? void 0 : _b.id;
                    const userQuery = 'UPDATE users SET last_name = $1, first_name = $2, middle_name = $3, email = $4, group_id = $5, institution_id = $6 WHERE id = $7 RETURNING *';
                    const userResult = yield client.query(userQuery, [lastName, firstName, middleName, email, groupId, institutionId, userId]);
                    updatedUser = {
                        id: userResult.rows[0].id,
                        lastName,
                        firstName,
                        middleName,
                        email,
                        roleName: userResult.rows[0].role_name,
                        groupName,
                        institutionName
                    };
                }));
                return updatedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM users WHERE id = $1';
            yield executeQuery(query, [userId]);
        });
    }
    static getByGroupName(groupName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Находим id группы по её названию
                const groupQuery = 'SELECT id FROM groups WHERE name = $1';
                const groupResult = yield executeQuery(groupQuery, [groupName]);
                const groupId = (_a = groupResult.rows[0]) === null || _a === void 0 ? void 0 : _a.id;
                if (!groupId) {
                    throw new Error('Group not found');
                }
                // Запрос пользователей по найденному id группы
                const userQuery = `
        SELECT 
          user_id,
          user_lastname,
          user_firstname,
          user_middlename,
          user_email,
          role_name,
          group_name,
          institution_name
        FROM 
          user_info
        WHERE 
          group_name = $1`;
                const userResult = yield executeQuery(userQuery, [groupId]);
                return userResult.rows.map((row) => ({
                    id: row.user_id,
                    lastName: row.user_lastname,
                    firstName: row.user_firstname,
                    middleName: row.user_middlename,
                    email: row.user_email,
                    roleName: row.role_name,
                    groupName: row.group_name,
                    institutionName: row.institution_name
                }));
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getGroupsByInstitutionName(institutionName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Находим id института по его названию
                const institutionQuery = 'SELECT id FROM institutions WHERE name = $1';
                const institutionResult = yield executeQuery(institutionQuery, [institutionName]);
                const institutionId = (_a = institutionResult.rows[0]) === null || _a === void 0 ? void 0 : _a.id;
                if (!institutionId) {
                    throw new Error('Institution not found');
                }
                // Запрос названий групп по найденному id института
                const groupQuery = 'SELECT name FROM groups WHERE institution_id = $1';
                const groupResult = yield executeQuery(groupQuery, [institutionId]);
                return groupResult.rows.map((row) => row.name);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
export { UserManager as UserModel };
