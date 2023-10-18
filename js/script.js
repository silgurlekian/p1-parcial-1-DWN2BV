// Objeto para la carga de discos
let coleccionDiscos = []; // array discos
let contadorDiscos = 0; // contador discos cargados

// Nuevo disco
function cargarDisco() {
  let disco = {};

  let nombreDisco = validarString(`Nombre del disco:`);
  disco.nombreDisco = nombreDisco;
  let banda = validarString(`Autor o Banda de ${nombreDisco}:`);
  disco.banda = banda;

  let codigo;
  do {
    // código numérico único para el disco
    codigo = validarNumber(`Código numérico único del disco "${nombreDisco}":`);
    if (codigo < 1 || codigo > 999) {
      alert("El código numérico debe estar entre 1 y 999.");
    } else if (codigoRepetido(coleccionDiscos, codigo)) {
      alert("El código ya ha sido utilizado. Por favor, ingresa otro código.");
    }
  } while (codigo < 1 || codigo > 999 || codigoRepetido(coleccionDiscos, codigo));

  function codigoRepetido(coleccionDiscos, codigo) {
    for (let discoExistente of coleccionDiscos) {
      if (discoExistente.codigo === codigo) {
        return true;
      }
    }
    return false;
  }

  // código al disco
  disco.codigo = codigo;

  // pistas del disco
  disco.pistas = [];

  let cantidadPistas = 0; // Contador de pistas
  let duracionTotal = 0; // Suma de la duración de todas las pistas
  let pistaMayorDuracion = null; //pista con mayor duracion

  do {
    let pista = cargarPistas();
    disco.pistas.push(pista);

    if (pistaMayorDuracion === null || pista.duracionPista > pistaMayorDuracion.duracionPista) {
      pistaMayorDuracion = pista;
    }

    // Incrementar la cantidad de pistas y sumar la duración de la pista
    cantidadPistas++;
    duracionTotal += pista.duracionPista;

  } while (confirm("¿Quieres cargar otra pista?"));

  // Agregar la cantidad de pistas al objeto disco
  disco.cantidadPistas = cantidadPistas;
  disco.duracionTotal = duracionTotal;
  disco.pistaMayorDuracion = pistaMayorDuracion;

  // promedio de duración de las pistas
  disco.promedioDuracion = (duracionTotal / cantidadPistas);

  // info en HTML
  disco.mostrar = function () {
    const infoDiscos = document.getElementById("lista-discos");
    let html = "";
    html +=
      `
        <div class="card">
          <h2 class="card-title"><strong>Disco:</strong> ${this.nombreDisco}</h2>
          <p><strong>Banda:</strong> ${this.banda}</p>
          <p><strong>Código:</strong> ${this.codigo}</p>
          <p><strong>Cantidad de pistas:</strong> ${this.cantidadPistas}</p>
          <p><strong>Promedio de duración:</strong> ${this.promedioDuracion} segundos</p>
          <ul class="list-group list-group-flush">
        `;

    for (let pista of this.pistas) {
      if (pista === this.pistaMayorDuracion) {
        html += `<li class="destacada"><strong>Nombre de pista:</strong> ${pista.nombrePista}<br/>`;
        html += `<strong>Duración:</strong> ${pista.duracionPista} segundos (mayor duración)</li>\n\n`;
      } else {
        html += `<li><strong>Nombre de pista:</strong> ${pista.nombrePista} <br/>`;
        html += `<strong>Duración:</strong> ${pista.duracionPista} segundos</li>\n\n`;
      }

    }
    html += `</ul><p><strong>Duración total:</strong> ${this.duracionTotal} segundos</p></div>`;
    infoDiscos.innerHTML += html;
  };

  // Agregar el disco al array de discos
  coleccionDiscos.push(disco);

  contadorDiscos++;
  document.getElementById("contador-discos").textContent = contadorDiscos; // Actualizar el contador
}

// pistas
function cargarPistas() {
  let nombrePista = validarString("Nombre de la pista:");
  let duracionPista;

  do {
    duracionPista = validarNumber("Duración de la pista (en segundos):");

    if (duracionPista < 0 || duracionPista > 7200) {
      alert("La duración debe estar entre 0 y 7200 segundos.");
    }
  } while (duracionPista < 0 || duracionPista > 7200);

  let pista = {
    nombrePista: nombrePista,
    duracionPista: duracionPista,
  };

  return pista;
}

// discos en HTML
function mostrarDiscos() {
  document.getElementById("lista-discos").innerHTML = "";
  for (let i in coleccionDiscos) {
    coleccionDiscos[i].mostrar();
  }
}

function buscarDiscoPorCodigo() {
  let codigoDisco = validarNumber("Ingresá el código del disco que deseas mostrar:");
  let discoEncontrado = null;

  document.getElementById("lista-discos").innerHTML = "";

  for (let i = 0; i < coleccionDiscos.length; i++) {
    if (coleccionDiscos[i].codigo === codigoDisco) {
      discoEncontrado = coleccionDiscos[i];
      break;
    }
  }

  if (discoEncontrado) {
    discoEncontrado.mostrar();
  } else {
    alert("No se encontró un disco con ese código.");
  }
}


function validarString(mensaje) {
  let str;
  do {
    str = prompt(mensaje);
  } while (!isNaN(str) || str === null);
  return str;
}

function validarNumber(mensaje) {
  let numero;
  do {
    numero = parseInt(prompt(mensaje));
  } while (isNaN(numero));
  return numero;
}
