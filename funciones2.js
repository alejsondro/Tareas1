document.addEventListener('DOMContentLoaded', function() {
  let botonCalcular = document.getElementById("calcular");
  let botonLimpiar = document.getElementById("limpiar");
  botonCalcular.addEventListener("click", calcularNota);
  botonLimpiar.addEventListener("click", limpiarNotas);

   function calcularNota() {
      const arrayInputs = document.querySelectorAll(".especial"); 
      let suma = 0;
      let nota = 0;
      let elol = false;
      let nada = 0; 
      arrayInputs.forEach(indice => { 
         nota = indice.value.trim();
         if (validarNota(nota))   {
            if (Number.isInteger(Number(nota))) {  
               console.log('Felicidades ... es un entero valido')
               suma += nota =Number(nota);
               document.getElementById(indice.id).value = nota; // el motor de JS convierte el valor numero a string
            }  else if (Number(nota) % 1 != 0 && Number(nota) <= 7)   {  
               console.log('Felicidades... es un coma flotante valido');
               suma += nota =Number(nota);
               document.getElementById(indice.id).value = nota; // el motor de JS convierte el valor numero a string
            }  else if ((Number(nota) % 1 != 0) && Number(nota) > 7)   {  
               console.log('Cuidado es un coma flotante mayor a 7 y menor a 8');
               document.getElementById(indice.id).value = "";
               document.getElementById(indice.id).placeholder = "Ingrese un valor menor o igual a 7.";
               elol = true;
            } 
         } else if (nota === "") { // solo es para especificar un mensaje, si es que todas las entradas estan vacias
            console.log("No se ingreso ningun valor");
            document.getElementById(indice.id).value = ''; 
            document.getElementById(indice.id).placeholder = `Ingrese ${String(indice.id).slice(0,-1)+' '+String(indice.id).slice(-1)}`;
            nada += 1;
         } else  {
            console.log("Diablos! ERROR al convertir a entero o coma flotante");
            document.getElementById(indice.id).value = ''; 
            document.getElementById(indice.id).placeholder = "Ingrese un valor entre 1 y 7.";
            elol = true;
         }            
      });

      if (nada == 4) {
         document.getElementById("resultado").placeholder = "No se ingresaron notas.";
      } else if (elol == false) { 
         document.getElementById("resultado").placeholder = `Tu promedio es un ${(suma/arrayInputs.length).toFixed(1)}` ; 
      } else if (elol == true) {
         document.getElementById("resultado").placeholder = 'Error al calcular promedio'; 
      }
   }

   function validarNota(cadena) {
      // expreision regualar para validar la nota
    const condicion = /^[1-7]{1}(\.[0-9]{1})?$/; 
    console.log('Validando nota con la variable condicion de tipo', typeof condicion);
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
   