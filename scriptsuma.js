        // Define las variables
        const matricesContainer = document.getElementById("matricesContainer");
        const matrixDimensionSelect = document.getElementById("matrixDimension");
        const matrixInputValues = document.getElementById("matrixInputValues");
        const matrixInputsA = document.getElementById("matrixInputsA");
        const matrixInputsB = document.getElementById("matrixInputsB");
    
        // Agrega escuchadores de eventos a los botones
        document.getElementById("btnSumaMatrices").addEventListener("click", function() {
            document.getElementById("matrixInputValues").style.display = "block";
        });
    
        // Función para crear la tabla de ingreso de datos
        matrixDimensionSelect.addEventListener("change", createMatrixInputs);
    
        function createMatrixInputs() {
            const selectedDimension = matrixDimensionSelect.value;
            const [rows, cols] = selectedDimension.split("x").map(Number);
    
            const matrixTableA = generateMatrixTable(rows, cols, "A");
            matrixInputsA.innerHTML = matrixTableA;
            
            const matrixTableB = generateMatrixTable(rows, cols, "B");
            matrixInputsB.innerHTML = matrixTableB;
    
            matrixInputValues.style.display = "block";
        }
    
        function generateMatrixTable(rows, cols, matrixName) {
            let matrixTable = `<table id="${matrixName}">`;
    
            for (let i = 0; i < rows; i++) {
                matrixTable += '<tr>';
                for (let j = 0; j < cols; j++) {
                    matrixTable += '<td>';
                    matrixTable += `<input type="text" `;
                    matrixTable += `placeholder="Fila ${i + 1}, Columna ${j + 1}">`;
                    matrixTable += '</td>';
                }
                matrixTable += '</tr>';
            }
    
            matrixTable += '</table>';
            return matrixTable;
        }
    
        // Función para mostrar el resultado en la tabla de resultados
        function showResult(result) {
            matricesContainer.innerHTML = `<h2>Resultado</h2>` + result;
        }
    
        // Botón para realizar la suma de matrices
        document.getElementById("btnSumaMatrices").addEventListener("click", () => {
            const dimension = matrixDimensionSelect.value;
            const matrixA = [];
            const matrixB = [];
    
            const tableA = document.getElementById("A");
            const tableB = document.getElementById("B");
    
            const rows = tableA.rows.length;
            const cols = tableA.rows[0].cells.length;
    
            // Leer valores de la tabla de inputs de la matriz A
            for (let i = 0; i < rows; i++) {
                const rowA = [];
                const rowB = [];
                for (let j = 0; j < cols; j++) {
                    const inputA = tableA.rows[i].cells[j].querySelector('input');
                    const inputB = tableB.rows[i].cells[j].querySelector('input');
                    rowA.push(Number(inputA.value));
                    rowB.push(Number(inputB.value));
                }
                matrixA.push(rowA);
                matrixB.push(rowB);
            }
    
            if (matrixA.length === matrixB.length && matrixA[0].length === matrixB[0].length) {
                const resultado = sumarMatrices(matrixA, matrixB, dimension);
                showResult(resultado);
            } else {
                showResult("Las matrices no tienen la misma dimensión.");
            }
        })
    
        // Función para sumar matrices
        function sumarMatrices(matrixA, matrixB, dimension) {
            const rows = matrixA.length;
            const cols = matrixA[0].length;
    
            const resultMatrix = [];
    
            for (let i = 0; i < rows; i++) {
                const row = [];
                for (let j = 0; j < cols; j++) {
                    row.push(matrixA[i][j] + matrixB[i][j]);
                }
                resultMatrix.push(row);
            }
    
            let resultString = '<table>';
    
            for (let i = 0; i < rows; i++) {
                resultString += '<tr>';
                for (let j = 0; j < cols; j++) {
                    resultString += '<td>';
                    resultString += resultMatrix[i][j];
                    resultString += '</td>';
                }
                resultString += '</tr>';
            }
    
            resultString += '</table>';
    
            return resultString;
        }