var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DatabaseManager } from './databaseModel.js';
export const getAllDatabases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const databases = yield DatabaseManager.getAllDatabases();
        res.json(databases);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching databases' });
    }
});
export const getTablesByDatabaseName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const databaseName = req.params.name;
    try {
        const tables = yield DatabaseManager.getTablesByDatabaseName(databaseName);
        res.json(tables);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching tables' });
    }
});
