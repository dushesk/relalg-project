import express from 'express';
import databaseRoutes from './modules/databases/databaseRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Эквивалент __filename
const __filename = fileURLToPath(import.meta.url);
// Эквивалент __dirname
const __dirname = dirname(__filename);
const app = express();
const PORT = 3000;
app.use(express.static('public'));
app.use(express.json());
// Подключение маршрутов
app.use('/api', databaseRoutes);
//   try {
//     const expression = req.body?.expression as string | undefined;
//     if (!expression) {
//       throw new Error('Expression must be provided in the request body');
//     }
//     const parsedExpression: RelAlgExpression = parseRelAlgExpression(expression);
//     const sqlQuery: string = translateToSQL(parsedExpression);
//     console.log(sqlQuery);
//     // Выполняем SQL запрос к базе данных
//     const queryResult = await executeQuery(sqlQuery);
//     // Проверяем, что результат является массивом и имеет хотя бы один элемент
//     if (!Array.isArray(queryResult) || queryResult.length === 0) {
//       throw new Error('Query result is empty or not an array');
//     }
//     // Формируем HTML для вывода результата в виде таблицы
//     let htmlResponse = '<table border="1"><tr>';
//     for (const column of Object.keys(queryResult[0])) {
//       htmlResponse += `<th>${column}</th>`;
//     }
//     htmlResponse += '</tr>';
//     for (const row of queryResult) {
//       htmlResponse += '<tr>';
//       for (const value of Object.values(row)) {
//         htmlResponse += `<td>${value}</td>`;
//       }
//       htmlResponse += '</tr>';
//     }
//     htmlResponse += '</table>';
//     res.send(htmlResponse);
//   } catch (error) {
//     console.error('Error parsing or translating expression:', error);
//     res.status(400).send('Error parsing or translating expression.');
//   }
// });
// Middleware для обработки статических файлов
app.use(express.static(path.join(__dirname, '../client/build')));
// Обработка всех маршрутов, кроме API, для React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
