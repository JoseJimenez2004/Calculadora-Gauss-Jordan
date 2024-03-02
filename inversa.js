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
            input.placeholder = "[" + i + "][" + j + "]";
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
    calculateButton.textContent = "Calcular Inversa";

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

        var inverse;
        if (matrix.length === matrixSize && matrix[0].length === matrixSize) {
            if (matrixSize === 2) {
                inverse = calculateInverse2x2(matrix);
            } else if (matrixSize === 3) {
                inverse = calculateInverse3x3(matrix);
            } else if (matrixSize === 4) {
                inverse = calculateInverse4x4(matrix);
            } else {
                inverse = "La matriz no tiene inversa (dimensión no soportada).";
            }
        } else {
            inverse = "La matriz no tiene inversa (dimensiones incorrectas).";
        }

        resultDiv.innerHTML = "Matriz Inversa:<br>";
        resultDiv.innerHTML += inverse.replace(/&nbsp;/g, ' ');
    };

    resultDiv.appendChild(calculateButton);
}

function calculateInverse2x2(matrix) {
    var determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    if (determinant === 0) {
        return "La matriz no tiene inversa (determinante igual a 0).";
    }

    var inverseMatrix = [
        [matrix[1][1] / determinant, -matrix[0][1] / determinant],
        [-matrix[1][0] / determinant, matrix[0][0] / determinant]
    ];

    return matrixToString(inverseMatrix);
}

function calculateInverse3x3(matrix) {
    var determinant = calculateDeterminant3x3(matrix);

    if (determinant === 0) {
        return "La matriz no tiene inversa (determinante igual a 0).";
    }

    var inverseMatrix = [];
    for (var i = 0; i < 3; i++) {
        var row = [];
        for (var j = 0; j < 3; j++) {
            var cofactor = calculateCofactor3x3(matrix, i, j);
            row.push(cofactor / determinant);
        }
        inverseMatrix.push(row);
    }

    return matrixToString(inverseMatrix);
}

function calculateInverse4x4(matrix) {
    var determinant = calculateDeterminant4x4(matrix);

    if (determinant === 0) {
        return "La matriz no tiene inversa (determinante igual a 0).";
    }

    var inverseMatrix = [];
    for (var i = 0; i < 4; i++) {
        var row = [];
        for (var j = 0; j < 4; j++) {
            var cofactor = calculateCofactor4x4(matrix, i, j);
            row.push(cofactor / determinant);
        }
        inverseMatrix.push(row);
    }

    return matrixToString(inverseMatrix);
}

function calculateDeterminant3x3(matrix) {
    return (
        matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
        matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
        matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
    );
}

function calculateDeterminant4x4(matrix) {
    var det = 0;
    for (var i = 0; i < 4; i++) {
        det += matrix[0][i] * calculateCofactor4x4(matrix, 0, i);
    }
    return det;
}

function calculateCofactor3x3(matrix, row, col) {
    var minorMatrix = [];
    for (var i = 0; i < 3; i++) {
        if (i !== row) {
            var minorRow = [];
            for (var j = 0; j < 3; j++) {
                if (j !== col) {
                    minorRow.push(matrix[i][j]);
                }
            }
            minorMatrix.push(minorRow);
        }
    }

    var minorDeterminant = calculateDeterminant2x2(minorMatrix);

    
    return Math.pow(-1, row + col) * minorDeterminant;
}

function calculateCofactor4x4(matrix, row, col) {
    var minorMatrix = [];
    for (var i = 0; i < 4; i++) {
        if (i !== row) {
            var minorRow = [];
            for (var j = 0; j < 4; j++) {
                if (j !== col) {
                    minorRow.push(matrix[i][j]);
                }
            }
            minorMatrix.push(minorRow);
        }
    }

    var minorDeterminant = calculateDeterminant3x3(minorMatrix);

    
    return Math.pow(-1, row + col) * minorDeterminant;
}

function calculateDeterminant2x2(matrix) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

function calculateDeterminant4x4(matrix) {
    var det = 0;
    for (var i = 0; i < 4; i++) {
        det += matrix[0][i] * calculateCofactor4x4(matrix, 0, i);
    }
    return det;
}

function matrixToString(matrix) {
    var result = "";
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            result += matrix[i][j].toFixed(2) + " ";
        }
        result += "<br>";
    }
    return result;
}





