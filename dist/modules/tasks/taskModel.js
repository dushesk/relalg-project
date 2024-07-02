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
class TaskManager {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT 
        task_id, task_description, teacher_id,
        table_id, table_name, 
        database_id, database_name
      FROM task_details
    `;
            const results = yield executeQuery(query);
            return this.mapTasks(results);
        });
    }
    static getById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT 
        task_id, task_description, teacher_id,
        table_id, table_name, 
        database_id, database_name
      FROM task_details
      WHERE task_id = $1
    `;
            const results = yield executeQuery(query, [taskId]);
            const tasks = this.mapTasks(results);
            return tasks.length ? tasks[0] : null;
        });
    }
    static create(description, teacherId, tableIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newTask = null;
                yield executeTransaction((client) => __awaiter(this, void 0, void 0, function* () {
                    const taskQuery = 'INSERT INTO tasks (description, teacher_id) VALUES ($1, $2) RETURNING *';
                    const taskResult = yield client.query(taskQuery, [description, teacherId]);
                    const task = taskResult.rows[0];
                    const taskTablesQuery = 'INSERT INTO tasks_tables (task_id, table_id) VALUES ($1, $2)';
                    for (const tableId of tableIds) {
                        yield client.query(taskTablesQuery, [task.id, tableId]);
                    }
                    newTask = yield this.getById(task.id);
                }));
                return newTask;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update(taskId, description, teacherId, tableIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updatedTask = null;
                yield executeTransaction((client) => __awaiter(this, void 0, void 0, function* () {
                    const taskQuery = 'UPDATE tasks SET description = $1, teacher_id = $2 WHERE id = $3 RETURNING *';
                    yield client.query(taskQuery, [description, teacherId, taskId]);
                    const deleteTaskTablesQuery = 'DELETE FROM tasks_tables WHERE task_id = $1';
                    yield client.query(deleteTaskTablesQuery, [taskId]);
                    const taskTablesQuery = 'INSERT INTO tasks_tables (task_id, table_id) VALUES ($1, $2)';
                    for (const tableId of tableIds) {
                        yield client.query(taskTablesQuery, [taskId, tableId]);
                    }
                    updatedTask = yield this.getById(taskId);
                }));
                return updatedTask;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM tasks WHERE id = $1';
            yield executeQuery(query, [taskId]);
        });
    }
    static mapTasks(rows) {
        const tasksMap = {};
        rows.forEach(row => {
            if (!tasksMap[row.task_id]) {
                tasksMap[row.task_id] = {
                    id: row.task_id,
                    description: row.task_description,
                    teacherId: row.teacher_id,
                    tables: []
                };
            }
            if (row.table_id) {
                tasksMap[row.task_id].tables.push({
                    id: row.table_id,
                    name: row.table_name,
                    database: {
                        id: row.database_id,
                        name: row.database_name
                    }
                });
            }
        });
        return Object.values(tasksMap);
    }
}
export { TaskManager };
