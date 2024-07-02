import { parseRelAlgExpression } from './converterSQL/parser.js';
import { translateToSQL } from './converterSQL/translator.js';

// Пример использования
// var expression = 'π[name, age](employees)';
// var parsedExpression = parseRelAlgExpression(expression);
// var sqlQuery = translateToSQL(parsedExpression);

// console.log(sqlQuery);

// expression = 'π[name, age](σ[age > 30](employees))';
// parsedExpression = parseRelAlgExpression(expression);
// sqlQuery = translateToSQL(parsedExpression);

// console.log(sqlQuery);

const expression5 = '(π[department_name,location_id](departments))-(ρ[renamed_dept_name](employees))';
const parsedExpression5 = parseRelAlgExpression(expression5);
const sqlQuery5 = translateToSQL(parsedExpression5);
console.log(sqlQuery5);