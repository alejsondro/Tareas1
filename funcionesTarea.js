document.addEventListener('DOMContentLoaded', function() {
  let botonCalcular = document.getElementById("calcular");
  let botonLimpiar = document.getElementById("limpiar");
  botonCalcular.addEventListener("click", calcularNota);
  botonLimpiar.addEventListener("click", limpiarNotas);

   function calcularNota() {
      const arrayInputs = document.querySelectorAll(".especial"); 
      let suma = 0;
      let nota = ''; 
      let errol = false;
      let vacios = 0; 
      const condicion = /^[1-7]{1}(\.[0-9]{1})?$/; 
      /*- `^` : Este es el ancla de inicio. Significa que cualquier coincidencia debe comenzar al inicio del string.
      - `[1-9]` : Esto busca exactamente un dígito entre 1 y 9 al inicio del string.
      - `(\.[0-9]{1,2})?` : Esto busca un punto decimal seguido por entre 1 y 2 dígitos, pero todo el grupo es opcional debido al `?` al final. 
         Esto significa que puede haber un punto decimal seguido por 1 o 2 dígitos, o no puede haber nada en absoluto.
      - `$` : Este es el ancla de fin. Significa que cualquier coincidencia debe terminar al final del string.
      -  Por lo tanto, en resumen, esta expresión regular coincide con un string que comienza con un dígito entre 1 y 9, 
         seguido opcionalmente por un punto decimal y entre 1 y 2 dígitos, y no tiene nada más después de eso. Esencialmente, 
         está buscando un número que tenga exactamente un dígito antes del punto decimal y entre 1 y 2 dígitos después del punto decimal, 
         pero el punto decimal y los dígitos después de él son opcionales.*/
      arrayInputs.forEach(indice => { 
         nota = String(indice.value.trim());
         if (condicion.test(nota)) {
            if (Number.isInteger(Number(nota))) {  
               console.log(`Felicidades (${nota}) ... es un entero valido`);
               suma += nota =Number(nota);
               document.getElementById(indice.id).value = nota; // el motor de JS convierte el valor numero a string
            }  else if (Number(nota) % 1 != 0 && Number(nota) <= 7)   {  
               console.log('Felicidades... es un coma flotante valido');
               suma += nota =Number(nota);
               document.getElementById(indice.id).value = nota; // el motor de JS convierte el valor numero a string
            }  else if ((Number(nota) % 1 != 0) && Number(nota) > 7)   {  
               console.log('Cuidado es un coma flotante mayor a 7 y menor a 8');
               document.getElementById(indice.id).value = "";
               document.getElementById(indice.id).placeholder = "Ingrese numero entre 1 y 7";
               errol = true;
            } 
         } else if (nota === "") { // solo es para especificar un mensaje, si es que todas las entradas estan vacias
            console.log("Error No se ingreso valor");
            document.getElementById(indice.id).value = ''; 
            document.getElementById(indice.id).placeholder = `Ingrese ${String(indice.id).slice(0,-1)+' '+String(indice.id).slice(-1)}`;
            vacios += 1;
            errol = true;
         } else  {
            console.log("Error fuera de control en el calculo en ciclo foreach");
            document.getElementById(indice.id).value = ''; 
            document.getElementById(indice.id).placeholder = "Ingrese numero entre 1 y 7";
            errol = true;
         }              
      });
      if(errol === true && vacios === 4) {
         document.getElementById("resultado").placeholder = "No se ingresaron notas.";
      } else if (errol === true && vacios < 4) {
            document.getElementById("resultado").placeholder = "Ingrese bien todas las notas.";
      } else if (errol === false && vacios > 0) {
         document.getElementById("resultado").placeholder = "Algunas notas faltan.";
      } else if (errol === false && vacios === 0) {
         document.getElementById("resultado").placeholder = `Tu promedio es un ${(suma/arrayInputs.length).toFixed(1)}` ; 
      } else {
         console.log("Error fuera de control en el calculo");
         document.getElementById("resultado").placeholder = "Error en el calculo fuera del ciclo foreach.";
      }
   }

   function limpiarNotas()   {
      const arrayLimpieza = document.querySelectorAll(".especial");
      arrayLimpieza.forEach(i => {  
         document.getElementById(i.id).value = "";
         document.getElementById(i.id).placeholder = `Ingrese ${String(i.id).slice(0,-1)+' '+String(i.id).slice(-1)}`; 
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
   