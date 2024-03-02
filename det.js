function createMatrix() {
    var matrixSize = parseInt(document.getElementById("matrixSize").value);

    var matrixDiv = document.getElementById("matrixDiv");
    matrixDiv.innerHTML = "";

    var table = document.createElement("table");

    for (var i = 0; i < matrixSize; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < matrixSize; j++) {
            var cell = document.createElement("td");
            var input = document.createElement("input");
            input.type = "number";
            cell.appendChild(input);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    matrixDiv.appendChild(table);

    var resultDiv = document.getElementById("resultDiv");
    resultDiv.innerHTML = "";

    var calculateButton = document.createElement("button");
    calculateButton.textContent = "Calcular Determinante";

    calculateButton.onclick = function () {
        var matrix = [];
        var rows = table.rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var rowData = [];
            for (var j = 0; j < row.cells.length; j++) {
                rowData.push(parseFloat(row.cells[j].querySelector("input").value));
            }
            matrix.push(rowData);
        }

        var determinant;
        if (matrix.length === matrixSize && matrix[0].length === matrixSize) {
            if (matrixSize === 2) {
                determinant = calculateDeterminant2x2(matrix);
            } else if (matrixSize === 3) {
                determinant = calculateDeterminant3x3(matrix);
            } else if (matrixSize === 4) {
                determinant = calculateDeterminant4x4(matrix);
            } else {
                determinant = "La matriz no tiene determinante (dimensión no soportada).";
            }
        } else {
            determinant = "La matriz no tiene determinante (dimensiones incorrectas).";
        }

        resultDiv.innerHTML = "Determinante de la Matriz: " + determinant;
    };

    resultDiv.appendChild(calculateButton);
}

function calculateDeterminant2x2(matrix) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

function calculateDeterminant3x3(matrix) {
    return (
        matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
        matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
        matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
    );
}
function calculateDeterminant4x4(matrix) {
    if (matrix.length !== 4 || matrix[0].length !== 4) {
        return "La matriz no es 4x4.";
    }

    let det = 0;
    for (let i = 0; i < 4; i++) {
        det += matrix[0][i] * calculateCofactor4x4(matrix, 0, i);
    }

    return det;
}

function calculateCofactor4x4(matrix, row, col) {
    if (matrix.length !== 4 || matrix[0].length !== 4) {
        return "La matriz no es 4x4.";
    }

    const minorMatrix = [];
    for (let i = 0; i < 4; i++) {
        if (i !== row) {
            const minorRow = [];
            for (let j = 0; j < 4; j++) {
                if (j !== col) {
                    minorRow.push(matrix[i][j]);
                }
            }
            minorMatrix.push(minorRow);
        }
    }

    const minorDeterminant = calculateDeterminant3x3(minorMatrix);

    return ((-1) ** (row + col)) * minorDeterminant;
}
function calculateDeterminant3x3(matrix) {
    if (matrix.length !== 3 || matrix[0].length !== 3) {
        return "La matriz no es 3x3.";
    }

    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[0][2];
    const d = matrix[1][0];
    const e = matrix[1][1];
    const f = matrix[1][2];
    const g = matrix[2][0];
    const h = matrix[2][1];
    const i = matrix[2][2];

    const determinant = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);

    return determinant;
}

function calculateDeterminant2x2(matrix) {
    if (matrix.length !== 2 || matrix[0].length !== 2) {
        return "La matriz no es 2x2.";
    }

    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];

    const determinant = a * d - b * c;

    return determinant;
}