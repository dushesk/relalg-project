var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { executeQuery } from '../../config/db';
class CurrentTaskModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        SELECT 
          ct.id,
          g.name AS group,
          t.description AS task,
          ct.assigned_date AS assignedDate,
          ct.due_date AS dueDate
        FROM 
          current_tasks ct
        JOIN 
          groups g ON ct.group_id = g.id
        JOIN 
          tasks t ON ct.task_id = t.id
      `;
                const results = yield executeQuery(query);
                return results.rows.map((row) => ({
                    id: row.id,
                    group: row.group,
                    task: row.task,
                    assignedDate: row.assignedDate,
                    dueDate: row.dueDate,
                }));
            }
            catch (error) {
                throw new Error(`Failed to fetch current tasks: ${error.message}`);
            }
        });
    }
    static create(groupName, taskDescription, dueDate) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newTask = null;
                const groupQuery = 'SELECT id FROM groups WHERE name = $1';
                const groupResult = yield executeQuery(groupQuery, [groupName]);
                const groupId = (_a = groupResult.rows[0]) === null || _a === void 0 ? void 0 : _a.id;
                if (!groupId) {
                    throw new Error('Group not found');
                }
                const taskQuery = 'INSERT INTO tasks (description) VALUES ($1) RETURNING id';
                const taskResult = yield executeQuery(taskQuery, [taskDescription]);
                const taskId = (_b = taskResult.rows[0]) === null || _b === void 0 ? void 0 : _b.id;
                if (!taskId) {
                    throw new Error('Failed to create task');
                }
                const insertQuery = `
        INSERT INTO current_tasks (group_id, task_id, due_date)
        VALUES ($1, $2, $3)
        RETURNING id, assigned_date, due_date
      `;
                const insertResult = yield executeQuery(insertQuery, [groupId, taskId, dueDate]);
                if (insertResult.rows.length > 0) {
                    newTask = {
                        id: insertResult.rows[0].id,
                        group: groupName,
                        task: taskDescription,
                        assignedDate: insertResult.rows[0].assigned_date,
                        dueDate: insertResult.rows[0].due_date,
                    };
                }
                return newTask;
            }
            catch (error) {
                throw new Error(`Failed to create current task: ${error.message}`);
            }
        });
    }
    static delete(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'DELETE FROM current_tasks WHERE id = $1';
                yield executeQuery(query, [taskId]);
            }
            catch (error) {
                throw new Error(`Failed to delete current task: ${error.message}`);
            }
        });
    }
}
export { CurrentTaskModel };
