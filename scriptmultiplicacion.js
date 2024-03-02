// Define las variables
const matricesContainer = document.getElementById("matricesContainer");
const matrixDimensionSelect = document.getElementById("matrixDimension");
const matrixInputValues = document.getElementById("matrixInputValues");
const matrixInputsA = document.getElementById("matrixInputsA");
const matrixInputsB = document.getElementById("matrixInputsB");
const btnMultiplicacionMatrices = document.getElementById("btnMultiplicacionMatrices");


btnMultiplicacionMatrices.addEventListener("click", function () {
    matrixInputValues.style.display = "block";
});

// Función para crear la tabla de ingreso de datos
matrixDimensionSelect.addEventListener("change", function () {
    const selectedDimension = matrixDimensionSelect.value;
    const [rowsA, colsA] = selectedDimension.split("x").map(Number);
    const rowsB = colsA;
    const colsB = Number(prompt("Ingrese el número de columnas para la matriz B"));
    matrixInputsA.innerHTML = generateMatrixInputs(rowsA, colsA, "A");
    matrixInputsB.innerHTML = generateMatrixInputs(rowsB, colsB, "B");
    matrixInputValues.style.display = "block";
});

// Función para generar los inputs de la matriz
function generateMatrixInputs(rows, cols, matrixName) {
    let html = "<table>";
    for (let i = 0; i < rows; i++) {
        html += "<tr>";
        for (let j = 0; j < cols; j++) {
            html += `<td><input type="number" placeholder="${matrixName}[${i}][${j}]"></td>`;
        }
        html += "</tr>";
    }
    html += "</table>";
    return html;
}

// Función para leer una matriz desde una tabla HTML
function readMatrixFromTable(table) {
    const matrix = [];
    const rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        matrix.push([]);
        const cells = rows[i].cells;
        for (let j = 0; j < cells.length; j++) {
            const input = cells[j].querySelector('input');
            matrix[i].push(Number(input.value));
        }
    }
    return matrix;
}

// Función para multiplicar matrices
function multiplicarMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const rowsB = matrixB.length;
    const colsB = matrixB[0].length;

    if (colsA !== rowsB) {
        return "No se pueden multiplicar las matrices debido a dimensiones incorrectas.";
    }

    const resultMatrix = [];
    for (let i = 0; i < rowsA; i++) {
        const row = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            row.push(sum);
        }
        resultMatrix.push(row);
    }
    return resultMatrix;
}

btnMultiplicacionMatrices.addEventListener("click", function () {
    const tableA = document.getElementById("matrixInputsA");
    const tableB = document.getElementById("matrixInputsB");

    const matrixA = readMatrixFromTable(tableA);
    const matrixB = readMatrixFromTable(tableB);

    const resultado = multiplicarMatrices(matrixA, matrixB);

    if (typeof resultado === "string") {
        matricesContainer.innerHTML = `<h2>Resultado</h2>${resultado}`;
    } else {
        matricesContainer.innerHTML = `<h2>Resultado</h2>`;
        matricesContainer.appendChild(generateMatrixTable(resultado));
    }
});

function readMatrixFromTable(table) {
    const rows = table.querySelectorAll("tr");
    const matrix = [];
    rows.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll("td");
        cells.forEach(cell => {
            const value = parseFloat(cell.querySelector("input").value);
            rowData.push(value);
        });
        matrix.push(rowData);
    });
    return matrix;
}

function multiplicarMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const rowsB = matrixB.length;
    const colsB = matrixB[0].length;

    if (colsA !== rowsB) {
        return "No se pueden multiplicar las matrices. Las dimensiones no son compatibles.";
    }

    const resultMatrix = [];
    for (let i = 0; i < rowsA; i++) {
        resultMatrix[i] = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            resultMatrix[i][j] = sum;
        }
    }
    return resultMatrix;
}

function generateMatrixTable(matrix) {
    const table = document.createElement("table");
    matrix.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(value => {
            const td = document.createElement("td");
            td.innerText = value;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    return table;
}