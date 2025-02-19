function getMatrixFromInputs(matrixId) {
    const rows = parseInt(document.getElementById(`rows-${matrixId}`).value);
    const cols = parseInt(document.getElementById(`cols-${matrixId}`).value);
    let matrix = [];
    
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            const value = parseFloat(document.getElementById(`${matrixId}-${i}-${j}`).value) || 0;
            row.push(value);
        }
        matrix.push(row);
    }
    return matrix;
}

function displayResult(matrix) {
    let resultContainer = document.getElementById("resultado");
    resultContainer.innerHTML = "";
    matrix.forEach(row => {
        resultContainer.innerHTML += row.join(" &nbsp; ") + "<br>";
    });
}

function sumarMatrices() {
    let A = getMatrixFromInputs("matrix1");
    let B = getMatrixFromInputs("matrix2");
    if (A.length !== B.length || A[0].length !== B[0].length) {
        alert("Las matrices deben tener el mismo tamaño para sumarse.");
        return;
    }
    let result = A.map((row, i) => row.map((val, j) => val + B[i][j]));
    displayResult(result);
}

function restarMatrices() {
    let A = getMatrixFromInputs("matrix1");
    let B = getMatrixFromInputs("matrix2");
    if (A.length !== B.length || A[0].length !== B[0].length) {
        alert("Las matrices deben tener el mismo tamaño para restarse.");
        return;
    }
    let result = A.map((row, i) => row.map((val, j) => val - B[i][j]));
    displayResult(result);
}

function multiplicarMatrices() {
    let A = getMatrixFromInputs("matrix1");
    let B = getMatrixFromInputs("matrix2");
    if (A[0].length !== B.length) {
        alert("El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz.");
        return;
    }
    let result = Array.from({ length: A.length }, () => Array(B[0].length).fill(0));
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < A[0].length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    displayResult(result);
}

function transponerMatriz() {
    let A = getMatrixFromInputs("matrix1");
    let result = A[0].map((_, colIndex) => A.map(row => row[colIndex]));
    displayResult(result);
}

function determinanteMatriz() {
    let A = getMatrixFromInputs("matrix1");
    if (A.length !== A[0].length) {
        alert("La matriz debe ser cuadrada para calcular su determinante.");
        return;
    }
    function determinant(matrix) {
        if (matrix.length === 1) return matrix[0][0];
        if (matrix.length === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        let det = 0;
        for (let i = 0; i < matrix.length; i++) {
            let subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
            det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix);
        }
        return det;
    }
    document.getElementById("resultado").innerText = "Determinante: " + determinant(A);
}

function inversaMatriz() {
    let A = getMatrixFromInputs("matrix1");
    if (A.length !== A[0].length) {
        alert("La matriz debe ser cuadrada para calcular su inversa.");
        return;
    }
    function inverse(matrix) {
        let size = matrix.length;
        let augmented = matrix.map((row, i) => [...row, ...Array(size).fill(0).map((_, j) => (i === j ? 1 : 0))]);
        for (let i = 0; i < size; i++) {
            let diagElement = augmented[i][i];
            if (diagElement === 0) return null;
            for (let j = 0; j < 2 * size; j++) augmented[i][j] /= diagElement;
            for (let k = 0; k < size; k++) {
                if (k !== i) {
                    let factor = augmented[k][i];
                    for (let j = 0; j < 2 * size; j++) {
                        augmented[k][j] -= factor * augmented[i][j];
                    }
                }
            }
        }
        return augmented.map(row => row.slice(size));
    }
    let result = inverse(A);
    if (!result) {
        alert("La matriz no es invertible.");
    } else {
        displayResult(result);
    }
}
