var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { InstitutionModel } from './institutionModel.js';
class InstitutionController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const institutions = yield InstitutionModel.getAll();
                res.status(200).json(institutions);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while fetching institutions' });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const institutionId = parseInt(req.params.id);
            try {
                const institution = yield InstitutionModel.getById(institutionId);
                if (!institution) {
                    res.status(404).json({ error: 'Institution not found' });
                }
                else {
                    res.status(200).json(institution);
                }
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while fetching the institution' });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            try {
                const newInstitution = yield InstitutionModel.create(name);
                res.status(201).json(newInstitution);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while creating the institution' });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const institutionId = parseInt(req.params.id);
            const { name } = req.body;
            try {
                const updatedInstitution = yield InstitutionModel.update(institutionId, name);
                if (!updatedInstitution) {
                    res.status(404).json({ error: 'Institution not found' });
                }
                else {
                    res.status(200).json(updatedInstitution);
                }
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while updating the institution' });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const institutionId = parseInt(req.params.id);
            try {
                yield InstitutionModel.delete(institutionId);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred while deleting the institution' });
            }
        });
    }
}
export default InstitutionController;
