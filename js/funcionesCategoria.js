///GET, POST, PUT Y DELETE

function getCategoria(){
    $.ajax({
        url:"http://140.84.185.32:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCategoria(respuesta);
        }
    });

}

function postCategoria(){
    if($("#name").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            name:$("#name").val(),
            description:$("#description").val()
        };
        $.ajax({
            url:"http://140.84.185.32:8080/api/Category/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la categoria");
                window.location.reload();
            }
        });
    }
    
   
}

function putCategoria(idBotonActualizar){
    console.log(idBotonActualizar);
    if($("#name").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios para actualizar");
    }else{
    let cajas = {
        id:idBotonActualizar,
        name:$("#name").val(),
        description:$("#description").val()
    };
    $.ajax({
        url:"http://140.84.185.32:8080/api/Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la categoria");
            window.location.reload();
            }
        });
    }
}

function deleteCategoria(idBotonBorrar){
   
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar la categoria?',
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
            url:"http://140.84.185.32:8080/api/Category/"+idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            contentType:"application/JSON",
            data:JSON.stringify(myData),
            success:function(respuesta){
               // alert("se borro correctamente la categoria");
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
function pintarCategoria(respuesta){
    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">';
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='putCategoria("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='deleteCategoria("+respuesta[i].id+")' >Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}



