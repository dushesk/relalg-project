var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CurrentTaskModel } from './currentTaskModel.js';
export function getAllCurrentTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentTasks = yield CurrentTaskModel.getAll();
            res.json(currentTasks);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
export function createCurrentTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { groupName, taskDescription, dueDate } = req.body;
        try {
            const newTask = yield CurrentTaskModel.create(groupName, taskDescription, dueDate);
            res.status(201).json(newTask);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
export function deleteCurrentTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const taskId = parseInt(req.params.id, 10);
        try {
            yield CurrentTaskModel.delete(taskId);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
