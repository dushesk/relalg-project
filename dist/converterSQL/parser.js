const selectRegex = /^σ\[(.*?)\]\((.*)\)$/;
const projectRegex = /^π\[(.*?)\]\((.*)\)$/;
const renameRegex = /^ρ\[(.*?)\]\((.*)\)$/;
const unionRegex = /^\((.*)\)∪\((.*)\)$/;
const differenceRegex = /^\((.*)\)-\((.*)\)$/;
const cartesianProductRegex = /^\((.*)\)⨯\((.*)\)$/;
const naturalJoinRegex = /^\((.*)\)⨝\((.*)\)$/;
export function parseRelAlgExpression(expression) {
    expression = expression.trim(); // убираем лишние пробелы
    let match;
    if (match = expression.match(selectRegex)) {
        return {
            type: 'select',
            condition: match[1],
            relation: parseRelAlgExpression(match[2])
        };
    }
    else if (match = expression.match(projectRegex)) {
        return {
            type: 'project',
            attributes: match[1].split(',').map(attr => attr.trim()),
            relation: parseRelAlgExpression(match[2])
        };
    }
    else if (match = expression.match(renameRegex)) {
        return {
            type: 'rename',
            newName: match[1].trim(),
            relation: parseRelAlgExpression(match[2].trim())
        };
    }
    else if (match = expression.match(unionRegex)) {
        return {
            type: 'union',
            left: parseRelAlgExpression(match[1].trim()),
            right: parseRelAlgExpression(match[2].trim())
        };
    }
    else if (match = expression.match(differenceRegex)) {
        return {
            type: 'difference',
            left: parseRelAlgExpression(match[1].trim()),
            right: parseRelAlgExpression(match[2].trim())
        };
    }
    else if (match = expression.match(cartesianProductRegex)) {
        return {
            type: 'cartesianProduct',
            left: parseRelAlgExpression(match[1].trim()),
            right: parseRelAlgExpression(match[2].trim())
        };
    }
    else if (match = expression.match(naturalJoinRegex)) {
        return {
            type: 'naturalJoin',
            left: parseRelAlgExpression(match[1].trim()),
            right: parseRelAlgExpression(match[2].trim()),
            condition: ''
        };
    }
    else if (/^[a-zA-Z_][.\w]*$/.test(expression)) {
        return { type: 'table', name: expression };
    }
    else {
        throw new Error('Не удалось распознать выражение: ' + expression);
    }
}
///^[a-zA-Z_]\w*$/
