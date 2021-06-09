//Declaración de variables
var nombreUsuario="Matias López";
var saldoCuenta=22000;
var limiteExtraccion=10000;
var limiteMaxExtraccion=40000;
var agua=350;
var telefono=425;
var luz=210;
var internet=570;
var cuentaAmigas=[1111,2222];
var codigoSeguridad=0;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
//     iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
function sumaDinero(dinero){
    saldoCuenta+=dinero;
}

function restaDinero(dinero){
    saldoCuenta-=dinero;
}

function haySaldoDisponible(dinero){
    if(dinero>saldoCuenta){
        alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.");
        return false;
    }else{
         if(dinero >0){
            if((dinero%100)!=0){
                alert("Solo puedes retirar billetes de 100.");
                return false;
            }
            else if(dinero>limiteExtraccion){
                alert("No puedes exceder el limite de extraccion.");
                return false;
            } 
            else
            return true;
            
        }else{
            alert("Solo puedes realizar extracciones mayores a 0.");
            return false;
        }
    }       
}

function cambiarLimiteDeExtraccion() {
    var stringLimiteExtraccion=prompt("Ingrese Nuevo Limite de Extraccion: ");
    var nuevoLimiteExtraccion=parseInt(stringLimiteExtraccion);
    if((nuevoLimiteExtraccion>0) && (nuevoLimiteExtraccion<=limiteMaxExtraccion)){
        limiteExtraccion=nuevoLimiteExtraccion;
        actualizarLimiteEnPantalla();
        alert("Su nuevo Limite de Extraccion es de: "+limiteExtraccion);
    }
    else if(nuevoLimiteExtraccion>limiteMaxExtraccion){
            alert("Su monto ingresado excede el limite maximo de extraccion.");
        }
        else{ 
        alert("Ingrese un monto positivo");
        }
}

function extraerDinero() {
    var stringDineroRetirado=prompt("Ingrese Cantidad de Dinero a Extraer: ");
    var dineroRetirado=parseInt(stringDineroRetirado);
    var saldoAnterior=saldoCuenta;
    if(haySaldoDisponible(dineroRetirado)){
        restaDinero(dineroRetirado);
        actualizarSaldoEnPantalla();
        alert("Retiraste: "+dineroRetirado+"\n"+"Saldo Anterior: "+saldoAnterior+"\n"+"Saldo Actual: "+saldoCuenta);
    }
}

function depositarDinero() {
    var stringDineroDepositado=prompt("Ingrese Cantidad de Dinero a Depositar: ");
    var dineroDepositado=parseInt(stringDineroDepositado);
    var saldoAnterior=saldoCuenta;
    if((stringDineroDepositado) && (dineroDepositado>0)){
        sumaDinero(dineroDepositado);
        actualizarSaldoEnPantalla();
        alert("Depositaste: "+dineroDepositado+"\n"+"Saldo Anterior: "+saldoAnterior+"\n"+"Saldo Actual: "+saldoCuenta);
    }
    else{
        alert("Debes depositar un monto mayor a 0.");
    }
}

function pagarServicio() {
    var stringServicio=prompt("Ingrese el servicio que desea pagar: \n  1-Agua\n  2-Luz\n  3-Internet\n  4-Telefono");
    var servicio=parseInt(stringServicio);
    var saldoAnterior=saldoCuenta;
    var obtieneValorServicio=0;

    switch (servicio) {
        case 1:
            obtieneValorServicio=350;
            break;
        case 2:
            obtieneValorServicio=425;
            break;
        case 3:
            obtieneValorServicio=210;
            break;
        case 4:
            obtieneValorServicio=570;
            break;
        default:
            break;
    }

    if(saldoCuenta>=obtieneValorServicio){
        switch (servicio) {
            case 1:
                restaDinero(agua);
                alert("Has pagado el servicio de Agua.\nSaldo Anterior: "+saldoAnterior+"\nDinero Descontado: "+agua+"\nSaldo Actual: "+saldoCuenta);
                break;
            case 2:
                restaDinero(telefono);
                alert("Has pagado el servicio de Telefono.\nSaldo Anterior: "+saldoAnterior+"\nDinero Descontado: "+telefono+"\nSaldo Actual: "+saldoCuenta);
                break;
            case 3:
                restaDinero(luz);
                alert("Has pagado el servicio de Luz.\nSaldo Anterior: "+saldoAnterior+"\nDinero Descontado: "+luz+"\nSaldo Actual: "+saldoCuenta);
                break;
            case 4:
                restaDinero(internet);
                alert("Has pagado el servicio de Internet.\nSaldo Anterior: "+saldoAnterior+"\nDinero Descontado: "+internet+"\nSaldo Actual: "+saldoCuenta);
                break;
            default:
                alert("No existe el servicio que se ha seleccionado.");
                break;
        }
        actualizarSaldoEnPantalla();
    }
    else
        alert("No hay suficiente saldo en la cuenta para pagar este servicio.");
}

function transferirDinero() {
    var dineroTrans=prompt("Ingrese cantidad de dinero a transferir: ");
    var existe=0;
    if((dineroTrans<=saldoCuenta) && (dineroTrans>0)){
        var cuentaTransString=prompt("Ingrese numero de cuenta para realizar la transferencia: ");
        var cuentaTrans=parseInt(cuentaTransString);
        for(var i=0; i<cuentaAmigas.length;i++){
            if(cuentaTrans===cuentaAmigas[i]){
                existe=1;
            }
        }
        if (existe){
            alert("Se han transferido: "+dineroTrans+"\nCuenta Destino: "+cuentaTrans);
            restaDinero(dineroTrans);
            actualizarSaldoEnPantalla();
        }
        else{
                alert("La cuenta destino no existe.\n\nNo se pudo realizar la transferencia.");
            }
    }else if(dineroTrans>saldoCuenta){
        alert("No se pudo realizar la transferencia. Saldo insuficiente");
    }
    else
        alert("Debe ingresar un saldo mayor a 0 para poder transferir.");
}

function agregarCuentaAmiga(){
    var agregoAmigoString=prompt("Agregue una nueva cuenta amiga: ");
    var agregoAmigo=parseInt(agregoAmigoString);
    if(!isNaN(agregoAmigo)){
        cuentaAmigas.push(agregoAmigo);
        alert("Su cuenta amiga ha sido agregada con exito.");
    }
    else{
        alert("Debe ingresar una cuenta numerica.");
    }
}

function eliminarCuentaAmiga(){
    var eliminoAmigoString=prompt("Elimine una cuenta asociada: ");
    var eliminoAmigo=parseInt(eliminoAmigoString);
    var cont=0;
    for(var i=0; i<cuentaAmigas.length;i++){
        if(eliminoAmigo===cuentaAmigas[i]){
            cuentaAmigas.splice(i,1);
            cont++;
        }
    }
    if(cont>0){
        alert("Cuenta eliminada con exito.");
    }
    else{
        alert("No se encuentra la cuenta a eliminar.");
    }
}

function mostrarCuentas(){
    var cuentas="";
    if(cuentaAmigas.length>0){
        for(var i=0;i<cuentaAmigas.length;i++){
            cuentas+="Cuenta asociada numero "+(i+1)+": "+cuentaAmigas[i]+"\n";
        }
        alert(cuentas);
    }
    else{
        alert("No existen cuentas asociadas.");
    }
}

function iniciarSesion() {
        var verificacionUsuario=prompt("Ingrese su Usuario: ");
        if((verificacionUsuario) && (verificacionUsuario==nombreUsuario)){
        var codigoString=prompt("Ingrese su clave: ");
        var codigo=parseInt(codigoString);
        if(codigo==""){
            alert("Bienvenido/a "+nombreUsuario+", ya puedes comenzar a realizar operaciones.");
        }
        else{
            alert("Codigo incorrecto. Su dinero ha sido retenido por cuestiones de seguridad.");
            iniciarSesion();
            }
        }
    else{
        alert("El usuario ingresado no existe.");
        iniciarSesion();
    }
}

function cerrarSesion(){
    if(confirm("Estas seguro que desea cerrar sesion?")){        
        alert("Su sesion ha sido cerrada correctamente."); 
        window.location.reload();
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
