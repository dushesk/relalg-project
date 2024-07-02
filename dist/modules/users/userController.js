var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from './userModel.js';
class UserController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserModel.getAll();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while fetching users' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            try {
                const user = yield UserModel.getById(userId);
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                }
                else {
                    res.status(200).json(user);
                }
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while fetching the user' });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lastName, firstName, middleName, email, password, roleName, groupName, institutionName } = req.body;
            try {
                const newUser = yield UserModel.create(lastName, firstName, middleName, email, password, roleName, groupName, institutionName);
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while creating the user' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            const { lastName, firstName, middleName, email, groupName, institutionName } = req.body;
            try {
                const updatedUser = yield UserModel.update(userId, lastName, firstName, middleName, email, groupName, institutionName);
                if (!updatedUser) {
                    res.status(404).json({ error: 'User not found' });
                }
                else {
                    res.status(200).json(updatedUser);
                }
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while updating the user' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            try {
                yield UserModel.delete(userId);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while deleting the user' });
            }
        });
    }
    static getByGroupName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupName = req.params.groupName;
            try {
                const users = yield UserModel.getByGroupName(groupName);
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while fetching users' });
            }
        });
    }
}
export default UserController;
