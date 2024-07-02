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
class StudentProgressModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM student_progress';
            const results = yield executeQuery(query);
            return results.rows;
        });
    }
    static getById(progressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM student_progress WHERE id = $1';
            const result = yield executeQuery(query, [progressId]);
            return result.rows[0] || null;
        });
    }
    static create(currentTaskId, grade, feedback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newProgress = null;
                yield executeTransaction((client) => __awaiter(this, void 0, void 0, function* () {
                    const query = `
          INSERT INTO student_progress (current_task_id, grade, feedback)
          VALUES ($1, $2, $3)
          RETURNING *`;
                    const result = yield client.query(query, [currentTaskId, grade, feedback]);
                    newProgress = result.rows[0];
                }));
                return newProgress;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(progressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM student_progress WHERE id = $1';
            yield executeQuery(query, [progressId]);
        });
    }
}
export { StudentProgressModel };
