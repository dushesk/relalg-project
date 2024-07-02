let subqueryCounter = 0;
function getSubqueryAlias() {
    subqueryCounter += 1;
    return `subquery_${subqueryCounter}`;
}
export function translateToSQL(expression) {
    switch (expression.type) {
        case 'select':
            const selectExpr = expression;
            const selectSubqueryAlias = getSubqueryAlias();
            return `SELECT * FROM (${translateToSQL(selectExpr.relation)}) AS ${selectSubqueryAlias} WHERE ${selectExpr.condition}`;
        case 'project':
            const projectExpr = expression;
            const projectSubqueryAlias = getSubqueryAlias();
            return `SELECT ${projectExpr.attributes.join(', ')} FROM (${translateToSQL(projectExpr.relation)}) AS ${projectSubqueryAlias}`;
        case 'naturalJoin':
            const joinExpr = expression;
            const joinLeftAlias = getSubqueryAlias();
            const joinRightAlias = getSubqueryAlias();
            return `SELECT * FROM (${translateToSQL(joinExpr.left)}) AS ${joinLeftAlias} NATURAL JOIN (${translateToSQL(joinExpr.right)}) AS ${joinRightAlias}`;
        case 'rename':
            const renameExpr = expression;
            return `SELECT * FROM (${translateToSQL(renameExpr.relation)}) AS ${renameExpr.newName}`;
        case 'union':
            const unionExpr = expression;
            return `(${translateToSQL(unionExpr.left)}) UNION (${translateToSQL(unionExpr.right)})`;
        case 'difference':
            const differenceExpr = expression;
            return `(${translateToSQL(differenceExpr.left)}) EXCEPT (${translateToSQL(differenceExpr.right)})`;
        case 'cartesianProduct':
            const cartesianExpr = expression;
            const cartesianLeftAlias = getSubqueryAlias();
            const cartesianRightAlias = getSubqueryAlias();
            return `SELECT * FROM (${translateToSQL(cartesianExpr.left)}) AS ${cartesianLeftAlias} CROSS JOIN (${translateToSQL(cartesianExpr.right)}) AS ${cartesianRightAlias}`;
        case 'table':
            const tableExpr = expression;
            return `SELECT * FROM ${tableExpr.name}`;
        default:
            throw new Error('Неизвестный тип выражения: ' + expression.type);
    }
}
