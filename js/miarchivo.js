
//Entidades
class Paciente  {
    constructor(nombre, apellido, dni, po2, fio2, altura, sexo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = parseInt(dni);
        this.po2 = parseInt(po2);
        this.fio2 = parseInt(fio2);
        this.altura = parseInt(altura);
        this.sexo = sexo;
        this.pesoIdeal;
        this.paFi;
    }
        calcularPafi() {
            let p02 = this.po2;
            console.log("p02: " + p02);
        
            let fi02= this.fio2;
            console.log("fi02: " + fi02);
        
            const multiplicacion = (a, b) => a * b;
            const division= (a, b) => a / b;
        
            this.paFi = division((multiplicacion(p02, fi02)), 100);
            console.log("Resultado de paFi: " + this.paFi);
            return this.paFi;   
        }

        calcularPesoIdeal() {
            let sexo = this.sexo;
            let altura = this.altura;
            this.pesoIdeal = 0;

            let suma = (a,b) => a + b;
            let resta = (a,b) => a - b;
            let multiplicacion = (a, b) => a * b;
            
            if ((sexo = "f") || ( sexo = "F")) {
                this.pesoIdeal = (suma(45.5,(multiplicacion(0.91, (resta(altura, 152.4))))));
            }
            else if ((sexo = "h") || (sexo = "H")) {
                this.pesoIdeal = (suma(50,(multiplicacion(0.91, (resta(altura, 152.4))))));
            }
            return this.pesoIdeal;
        } 
    
}

//-Constantes
let pacientes = [];

//--Selectores
$("button").addClass("btn btn-success btn-lg");
const btnCalcular = document.getElementById("btncalcular")


//Funciones
function guardar(e) {
    e.preventDefault()

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let po2 = document.getElementById("po2").value;
    let fio2 = document.getElementById("fio2").value;
    let altura = document.getElementById("altura").value;
    let sexo = document.getElementById("sexo").value;

    console.log(nombre);
    console.log(apellido);
    console.log(dni);
    console.log(po2);
    console.log(fio2);
    console.log(altura);
    console.log(sexo);

    let paciente = new Paciente(nombre, apellido, dni, po2, fio2, altura, sexo);
    paciente.calcularPafi();
    paciente.calcularPesoIdeal();
    pacientes.push(paciente);

    localStorage.setItem("pacientes",JSON.stringify(pacientes));
    mostrarDatosEnHtml();
}

function mostrarDatosEnHtml() {
    const pacientesEnJson = JSON.parse(localStorage.getItem("pacientes"));

    if (pacientesEnJson != (null)) {
        console.log("Entré en el if donde el storage no es null");
        pacientesEnJson.forEach(paciente => {
            $('#datos').append(`<tr>
                                   <th>${paciente.apellido}</th> 
                                   <th>${paciente.dni}</th>
                                   <th>${paciente.paFi}</th>
                                   <th>${paciente.pesoIdeal}</th>
                                </tr>`);   
        }) 
    } else {
        console.log("no había datos");
    }
}

function mostrarDatosEnHtml() {
    const pacientesEnJson = JSON.parse(localStorage.getItem("pacientes"));

    if (pacientesEnJson != (null)) {
        $('#datos').empty();
        pacientesEnJson.forEach(paciente => {
            $('#datos').append(`<tr>
                                   <th>${paciente.apellido}</th> 
                                   <th>${paciente.dni}</th>
                                   <th>${paciente.paFi}</th>
                                   <th>${paciente.pesoIdeal}</th>
                                </tr>`);   
        }) 
    } else {
        console.log("no había datos");
    }
}



const borrar = () => {
    localStorage.clear();
    $('#datos').empty();
    pacientes = [];
}

function nuevoCalculo() {
    $("#btncargarnuevopaciente").click(function(event) {
        $("#calculadorapafi")[0].reset();
    });
}

//Eventos
btnCalcular.addEventListener("click", guardar);
$("#btnborrar").click(borrar); 
$("#btncargarnuevopaciente").on("click", nuevoCalculo);



//ajax
const URLJSON = "datos.json"
$("#botones").append('<button id="btnhistorialpacientes" class="btn btn-success btn-lg">Cargar historial pacientes</button>');
$("#btnhistorialpacientes").click(() => { 
$.getJSON(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;
      for (const dato of misDatos) {
        $("#tablaresultados").prepend(`<div>
                                <p> ${dato.nombre}</p>
                                <p> ${dato.apellido}</p>
                                <p> ${dato.dni}</p>
                                <p> ${dato.po2}</p>
                                <p> ${dato.fio2}</p>
                                <p> ${dato.altura}</p>
                                <p> ${dato.sexo}</p>
                                <p> ${dato.pesoIdeal}</p>
                                <p> ${dato.paFi}</p>
                            </div>`)
      }  
    }
    });
});

/////////FUNCIONES PARA BASE DE DATOS

$("#btnlistar").on("click", listar);

function listar()
{
    var url = "http://localhost/seleccion.php";
    
    $.getJSON(url, function (respuesta, estado) {
        if(estado === "success"){
          let misDatos = respuesta;
          for (const dato of misDatos) {
            $("#tablaresultados").prepend(`<div>
                                    <p> ${dato.nombre}</p>
                                    <p> ${dato.apellido}</p>
                                    <p> ${dato.dni}</p>
                                    <p> ${dato.po2}</p>
                                    <p> ${dato.fio2}</p>
                                    <p> ${dato.altura}</p>
                                    <p> ${dato.sexo}</p>
                                    <p> ${dato.pesoIdeal}</p>
                                    <p> ${dato.paFi}</p>
                                </div>`)
          }  
        }
        });
        
        console.log("PASE POR LISTAR");
}






