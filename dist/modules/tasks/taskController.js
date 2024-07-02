var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TaskManager } from './taskModel.js';
export const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield TaskManager.getAll();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching tasks' });
    }
});
export const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = parseInt(req.params.id, 10);
    try {
        const task = yield TaskManager.getById(taskId);
        if (task) {
            res.json(task);
        }
        else {
            res.status(404).json({ error: 'Task not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the task' });
    }
});
export const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, teacherId, tableIds } = req.body;
    try {
        const newTask = yield TaskManager.create(description, teacherId, tableIds);
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the task' });
    }
});
export const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = parseInt(req.params.id, 10);
    const { description, teacherId, tableIds } = req.body;
    try {
        const updatedTask = yield TaskManager.update(taskId, description, teacherId, tableIds);
        if (updatedTask) {
            res.json(updatedTask);
        }
        else {
            res.status(404).json({ error: 'Task not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the task' });
    }
});
export const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = parseInt(req.params.id, 10);
    try {
        yield TaskManager.delete(taskId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the task' });
    }
});
