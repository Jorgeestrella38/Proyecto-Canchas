// ----------------------------Variables y funciones para consultas----------------------------

// Ejemplo de querys

let ReservacionesEjemplo =
[
    {
      "idReservacion": 19,
      "fechaInicio": 1636570800,
      "fechaFin": 1636574400,
      "aprobada": 0,
      "idUsuario": "0226259",
      "idCancha": 1,
      "nombreUsuario": "Juan Marquina Cancino",
      "esAdmin": 1,
      "inicioModoText": "2021-11-10 19:00",
      "finModoTexto": "2021-11-10 20:00"
    },
    {
        "idReservacion": 20,
        "fechaInicio": 1637549200,
        "fechaFin": 1637560000,
        "aprobada": 0,
        "idUsuario": "0226259",
        "idCancha": 1,
        "nombreUsuario": "Juan Marquina Cancino",
        "esAdmin": 1,
        "inicioModoText": "2021-11-10 13:00",
        "finModoTexto": "2021-11-10 16:00"
    },
    {
        "idReservacion": 21,
        "fechaInicio": 1639248400,
        "fechaFin": 1639577200,
        "aprobada": 0,
        "idUsuario": "0226259",
        "idCancha": 1,
        "nombreUsuario": "Juan Marquina Cancino",
        "esAdmin": 1,
        "inicioModoText": "2021-12-10 15:00",
        "finModoTexto": "2021-12-10 23:00"
    }
];

// Funciones de querys
let ReservacionesCancha = function(cancha, sqlReservacion){
    this.cancha = cancha;
    this.reservaciones = sqlReservacion;
};

infoDate = function(date, ReservacionesCancha){
    // En caso de que no se haya "corregido" la hora de js
    const sixHourMiliseconds = 6*60*60*1000;
    date.setTime(date.getTime() - sixHourMiliseconds);
    for (let reservacion of ReservacionesCancha.reservaciones){
        inicio = new Date(reservacion.fechaInicio*1000);
        fin = new Date(reservacion.fechaFin*1000);
        if(date.getTime() >= reservacion.fechaInicio*1000 && date.getTime() < reservacion.fechaFin*1000){
            return reservacion;
        }
    }
    return null;
};

// Crear objeto reservaciones
let objetoReservaciones = new ReservacionesCancha(1, ReservacionesEjemplo);










// ----------------------------Variables y funciones para obtener datos----------------------------

var sumaDias = 0
		
const dias = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
];

const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

getMesNombre = function(){
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + sumaDias);
    const nombreMes = meses[tomorrow.getMonth()];
    
    return nombreMes
}

fecha = function(x){
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + sumaDias + x);

    return tomorrow
}

getDiaNombre = function(x){
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + sumaDias + x);
    const nombreDia = dias[tomorrow.getDay()];
    
    return nombreDia
}

getDia = function(x){
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + sumaDias + x);
    var dd = String(tomorrow.getDate()).padStart(2, '0');
    
    return dd
}







// ----------------------------Funcion recargar----------------------------

function recargar(){
    // Poner la cancha
        let cancha = 'Cancha ';
        cancha += objetoReservaciones.cancha;

        document.getElementById("canchaID").innerHTML = cancha;

    // Poner el mes
        let newDay = fecha(0);
        let monthName = meses[newDay.getMonth()];
        for(let i=1;i<7;i++){
            newDay = fecha(i);
            if(meses[newDay.getMonth()] != monthName){
                monthName += ' / ' + meses[newDay.getMonth()];
                break;
            }

        }
        newDay = fecha(0);
        monthName += ' ' + newDay.getFullYear();

        document.getElementById("mesID").innerHTML = monthName;

    // Poner botones
        let calendarButtonFrame = '';
        if(sumaDias > 0){
            calendarButtonFrame += "<a class='calendarButton' onclick='semanaAnterior()'>";
            calendarButtonFrame += "<i class='fas fa-angle-left'></i>";
            calendarButtonFrame += "</a>";
        }
        calendarButtonFrame += "<a class='calendarButton' onclick='recargar()'>";
        calendarButtonFrame += "<i class='fas fa-redo-alt'></i>";
        calendarButtonFrame += "</a>";
        calendarButtonFrame += "<a class='calendarButton' onclick='semanaSiguiente()'>";
        calendarButtonFrame += "<i class='fas fa-angle-right'></i>";
        calendarButtonFrame += "</a>";

        document.getElementById("calendarButtonFrameID").innerHTML = calendarButtonFrame;


    // Poner DatePicker
        let datePickerVariable = '';
        datePickerVariable += "<input class='datePickerInput' type='text' placeholder='Selecciona una fecha' id='datepicker'></input>";
        datePickerVariable += "<a class='calendarButtonDatePicker' onclick='getDatePickerDate()'>";
        datePickerVariable += "<i class='fas fa-arrow-right'></i>";
        datePickerVariable += "</a>";

        document.getElementById("datePickerFrameID").innerHTML = datePickerVariable;

        // Activa el DatePicker
            $(document).ready(function () {
                $('#datepicker').datepicker({
                beforeShow: function() {
                    setTimeout(function(){
                        $('.ui-datepicker').css('z-index', 99999999999999);
                    }, 0);
                },
                inline: true,
                showOtherMonths: true,
                dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                });
            });


    // Poner el encabezado del calendario
        let weekdays = '';
        for(let i=0;i<7;i++){
            weekdays += "<li style='border-right:solid; border-color: #B79257; grid-column:" + (i+1) + "; grid-column-start: " + (i+1) + "; grid-column-end: " + (i+2) + ";'>";
            weekdays += "<p>" + getDiaNombre(i) + "</p>";
            weekdays += "<p>" + getDia(i) + "</p>";
            weekdays += "</li>";
        }
        document.getElementById("weekdaysID").innerHTML = weekdays;


    // Poner las horas en el calendario
        let timeslots=''
        for(let i=0;i<24;i++){
            timeslots += "<li> " + i + ":00 </li>";
        }
        document.getElementById("timeslotsID").innerHTML = timeslots;

    // Poner las reservaciones en el calendario
        let event_container = '';
        for(let i=1; i<=7; i++){
            for(let j=1; j<=24; j++){
                let fechaDia = fecha(i-1);
                let c = new Date(fechaDia.getMonth()+1  + '/' + fechaDia.getDate() + '/' +  fechaDia.getFullYear() + ' 0:00');
                let hora = (j-1)*60*60*1000;

                c.setTime(c.getTime() + hora);

                reservacionIndividual = infoDate(c, objetoReservaciones);

                if(reservacionIndividual != null){
                    event_container += "<div class='slot' style='margin-top: 1px; grid-row:" +  j + "; grid-column:" + i + "; grid-column-start: " + i + "; grid-column-end: " + (i+1) + ";'>";
                    event_container += "<div class='event-status'>RESERVADO</div>";
                    event_container += "<span> Reservación No." + reservacionIndividual.idReservacion  + "</span>"
                    event_container += "</div>";
                }
            }
        }
        
        document.getElementById("event_containerID").innerHTML = event_container;
}




// ----------------------------Funciones llamadas desde el ejs----------------------------
function semanaSiguiente(){
    console.log(sumaDias);
    sumaDias = parseInt(sumaDias/7);
    sumaDias = sumaDias*7;
    console.log(sumaDias);
    sumaDias = sumaDias + 7;

    recargar();
}

function semanaAnterior(){
    sumaDias = sumaDias - 7;

    if(sumaDias < 0){
        sumaDias = 0;
        recargar();
    }

    recargar();
}

function getDatePickerDate(){
    let a = new Date();
    var b = $( "#datepicker" ).datepicker( "getDate" );
    if(b != null){
        a = new Date(a.getMonth()+1  + '/' + a.getDate() + '/' +  a.getFullYear() + ' 0:00');

        let day1 = a.getTime();
        let day2 = b.getTime();
        let res = day2-day1;

        res = res/1000
        res = res/60
        res = res/60
        res = res/24

        if(res >= 0){
            sumaDias = res;
        }
        else{
            sumaDias = 0;
        }

        recargar();

        console.log(res);
    }
}


recargar()