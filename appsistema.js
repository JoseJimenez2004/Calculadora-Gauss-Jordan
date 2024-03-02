function iniciarResolucion() {
    const n = parseInt(document.getElementById('incognitas').value);
    const camposEntrada = document.getElementById('camposEntrada');

    let entradaHTML = '<h2>Ingrese los coeficientes de la matriz aumentada:</h2>';
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n + 1; j++) {
            entradaHTML += `<label for="a_${i}_${j}">a[${i}][${j}] =</label>`;
            entradaHTML += `<input type="text" id="a_${i}_${j}">`; // Cambia a tipo "text"
        }
        entradaHTML += '<br>';
    }

    camposEntrada.innerHTML = entradaHTML;
}

function resolverSistema() {
    const n = parseInt(document.getElementById('incognitas').value);
    const a = new Array(n);
    const x = new Array(n);

    for (let i = 0; i < n; i++) {
        a[i] = new Array(n + 1);
        for (let j = 0; j < n + 1; j++) {
            a[i][j] = math.fraction(document.getElementById(`a_${i}_${j}`).value);
        }
    }

    for (let i = 0; i < n; i++) {
        if (math.equal(a[i][i], 0)) {
            document.getElementById('resultados').innerHTML = '¡Se detectó una división por cero!';
            return;
        }

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                const ratio = math.divide(a[j][i], a[i][i]);
                for (let k = 0; k < n + 1; k++) {
                    a[j][k] = math.subtract(a[j][k], math.multiply(ratio, a[i][k]));
                }
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (math.equal(a[i][i], 0)) {
            document.getElementById('resultados').innerHTML = '¡La matriz es singular y no se puede resolver!';
            return;
        }

    let resultadosHTML = '<h2>La solución requerida es:</h2>';
    for (let i = 0; i < n; i++) {
        const resultado = math.divide(a[i][n], a[i][i]);
        if (math.isInteger(resultado)) {
            x[i] = resultado;
        } else {
            x[i] = math.format(resultado, { fraction: 'ratio' });
        }
        resultadosHTML += `X${i} = ${x[i]}<br>`;
    }

    document.getElementById('resultados').innerHTML = resultadosHTML;
}}
