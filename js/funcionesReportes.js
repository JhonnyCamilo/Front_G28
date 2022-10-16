function getStatus(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarStatus(respuesta);
        }
    });

}

function pintarStatus(respuesta){
    let myTable="<table>";
        myTable+="<tr>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    
    myTable+="</table>";
    $("#resultado1").html(myTable);

}

function getFechas(){


}

function getClientes(){

}