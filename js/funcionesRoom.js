/////////// GET, POST , PUT Y DELETE

function getRoom(){
    $.ajax({
        url:"http://localhost:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarRoom(respuesta);
        }
    });
}

function postRoom(){
    if($("#name").val().length==0 || 
       $("#stars").val().length==0 || 
       $("#hotel").val().length==0 || 
       $("#description").val().length==0 
       ){
        alert("Todos los campos son obligatorios para crear la habitacion");
    }else{
    
    let cajas = {
        name:$("#name").val(),
        stars:$("#stars").val(),
        hotel:$("#hotel").val(),
        description:$("#description").val(),
        category:{id: + $("#select-category").val()}
    };
    console.log(cajas);
    $.ajax({
        url:"http://localhost:8080/api/Room/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el Room");
            window.location.reload();
            }
        });
    }
}

function putRoom(idBotonActualizar){
    if($("#name").val().length==0 || 
    $("#stars").val().length==0 || 
    $("#hotel").val().length==0 || 
    $("#description").val().length==0 
    ){
     alert("Todos los campos son obligatorios para actualizar la habitacion");
    }else{
   
    let cajas = {
        id:idBotonActualizar,
        name:$("#name").val(),
        stars:$("#stars").val(),
        hotel:$("#hotel").val(),
        description:$("#description").val(),
        category:{id: + $("#select-category").val()}
    };
    console.log(cajas);
    $.ajax({
        url:"http://localhost:8080/api/Room/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente el Room");
            window.location.reload();
            }
        });
    }
}

function deleteRoom(idBotonBorrar){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar la habitacion?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
         
          let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://localhost:8080/api/Room/"+idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            contentType:"application/JSON",
            data:JSON.stringify(myData),
            success:function(respuesta){
          
                window.location.reload();
            }
        });
        swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })  
} 


/////////////////////////////////////////////////
function pintarRoom(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].stars+"</td>";
        myTable+="<td>"+respuesta[i].hotel+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button onclick='putRoom("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='deleteRoom("+respuesta[i].id+")'>Borrar</button>";
       
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}


//////////////////Get Category /////////////////////////////
function getRoom_Category(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           let $select = $("#select-category");
           $.each(respuesta, function(id, name){
            $select.append('<option value='+name.id+'>'+name.name+'</option>')
           })
        }
    });

}