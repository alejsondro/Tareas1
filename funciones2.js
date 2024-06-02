document.addEventListener('DOMContentLoaded', function() {
  let botonCalcular = document.getElementById("calcular");
  let botonLimpiar = document.getElementById("limpiar");
  botonCalcular.addEventListener("click", calcularNota);
  botonLimpiar.addEventListener("click", limpiarNotas);

   function calcularNota() {
      const arrayInputs = document.querySelectorAll(".especial"); 
      let suma = 0;
      let elol = false;
      let nada = 0; 
      arrayInputs.forEach(indice => { 
         let nota = indice.value.trim();
         if (validarNota(nota)) {
            console.log('Cumple el formato de string de nota');
            nota = Number(nota);
            if (Number.isInteger(nota)) {
               console.log('Es un entero');
               //document.getElementById(indice.id).value = String(nota);;
               suma += nota;
            }  else if (!Number.isInteger(nota) && nota % 1 != 0) {
                  console.log('Es un decimal');
                  if (nota > 7) {
                     console.log('se ingreso  mayor que 7');
                     document.getElementById(indice.id).value = "";
                     document.getElementById(indice.id).placeholder = "Ingresa valor entre <1 y 7>.";
                     elol = true;
                  } else if ( nota < 0 ) {
                     console.log('Ingresa un valor matoy que 1'); 
                  }  else {
                     suma += nota;
               }
            }
         } else { // si no cumple con la validacion del string de notas
               if (nota === "") {
                  console.log("Ingresa nada");
                  nada += 1;
                  document.getElementById(indice.id).placeholder =  `Ingresa ${String(indice.id).slice(0,-1)+' '+String(indice.id).slice(-1)}`;
               } else {
                  console.log("error de formato");
                  document.getElementById(indice.id).value = "";
                  document.getElementById(indice.id).placeholder =  'No cumple con el formato de' + `${String(indice.id).slice(0,-1)+' '+String(indice.id).slice(-1)}`;
                  elol = true;
               }
         }
      });
      if (nada === 4) {
         document.getElementById("resultado").placeholder = "Ingresa al menos una nota";
      } else if (elol != true) { 
         document.getElementById("resultado").placeholder = `tu promedio es ${(suma/arrayInputs.length).toFixed(1)}` ; 
      } else if (elol === true) {
         document.getElementById("resultado").placeholder = 'No se puede calcular la nota'; 
      }
  }
   
   function validarNota(cadena) {
    const condicion = /^[1-7]{1}(\.[0-9]{1})?$/; 
    return condicion.test(cadena);
    /*- `^` : Este es el ancla de inicio. Significa que cualquier coincidencia debe comenzar al inicio del string.
      - `[1-9]` : Esto busca exactamente un dígito entre 1 y 9 al inicio del string.
      - `(\.[0-9]{1,2})?` : Esto busca un punto decimal seguido por entre 1 y 2 dígitos, pero todo el grupo es opcional debido al `?` al final. 
         Esto significa que puede haber un punto decimal seguido por 1 o 2 dígitos, o no puede haber nada en absoluto.
      - `$` : Este es el ancla de fin. Significa que cualquier coincidencia debe terminar al final del string.
      -  Por lo tanto, en resumen, esta expresión regular coincide con un string que comienza con un dígito entre 1 y 9, 
         seguido opcionalmente por un punto decimal y entre 1 y 2 dígitos, y no tiene nada más después de eso. Esencialmente, 
         está buscando un número que tenga exactamente un dígito antes del punto decimal y entre 1 y 2 dígitos después del punto decimal, 
         pero el punto decimal y los dígitos después de él son opcionales.*/
   }

   function limpiarNotas()   {
    const arrayLimpieza = document.querySelectorAll(".especial");
      arrayLimpieza.forEach(i => {  
         document.getElementById(i.id).value = "";
         document.getElementById(i.id).placeholder = `Ingresa ${String(i.id).slice(0,-1)+' '+String(i.id).slice(-1)}`; 
         console.log('Se limpiaron los inputs');
      });
      document.getElementById("resultado").placeholder ="Promedio de Notas v1.0";
   }   
   
   function generarTabla(){
      let factor = +parseFloat(document.getElementById("factor").value).toFixed(0);
      if (isNaN(factor))   {
         document.getElementById("factor").value = "Factor Invalido";   
      }else if (factor > 0 && factor < 12)   {
         let table = document.getElementById("tablita"); 
         table.style.display = "block";
         var resultado = 0;
         while (table.rows.length > 0) {
            table.deleteRow(0);
         }
         for (let i = 1; i <= 12; i++) {
            resultado= i * factor;
            let fila = table.insertRow();
            let celda = fila.insertCell();
            celda.innerHTML = i;
            let celda2 = fila.insertCell();
            celda2.innerHTML = resultado;
         }
      }
   }
} );
   