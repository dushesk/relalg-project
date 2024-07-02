var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GroupModel } from './groupModel.js';
class GroupController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield GroupModel.getAll();
                res.status(200).json(groups);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while fetching groups' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = parseInt(req.params.id);
            try {
                const group = yield GroupModel.getById(groupId);
                if (!group) {
                    res.status(404).json({ error: 'Group not found' });
                }
                else {
                    res.status(200).json(group);
                }
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while fetching the group' });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, institutionId } = req.body;
            try {
                const newGroup = yield GroupModel.create(name, institutionId);
                res.status(201).json(newGroup);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while creating the group' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = parseInt(req.params.id);
            const { name, institutionId } = req.body;
            try {
                const updatedGroup = yield GroupModel.update(groupId, name, institutionId);
                if (!updatedGroup) {
                    res.status(404).json({ error: 'Group not found' });
                }
                else {
                    res.status(200).json(updatedGroup);
                }
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while updating the group' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = parseInt(req.params.id);
            try {
                yield GroupModel.delete(groupId);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while deleting the group' });
            }
        });
    }
}
export default GroupController;
