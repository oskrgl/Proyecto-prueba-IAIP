<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
	<title>Datos</title>

        <!-- Stylesheets -->
        <!-- Bootstrap is included in its original form, unaltered -->
        <link rel="stylesheet" href="css/bootstrap.min.css">

        <!-- Related styles of various icon packs and plugins -->
        <link rel="stylesheet" href="css/plugins.css">

        <link rel="stylesheet" href="css/main.css">
	
<link rel="stylesheet" href="https://cdn.datatables.net/rowreorder/1.2.3/css/rowReorder.dataTables.min.css">
        <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.1/css/responsive.dataTables.min.css">
        <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.2/css/buttons.dataTables.min.css">



</head>
<body>
<div id="page-content">
	<div class="block full">
        <div class="block-title">
            <h2><strong> Datos</strong></h2>
        </div>
		<table id="example" class="table table-bordered table-striped table-vcenter" data-toggle="lightbox-gallery" style="width:100%;">
	        <thead>
	            <tr>
	                <th>#</th>
	                <th>Nombre</th>
	                <th>Acronimo</th>
	                <th>Link facebook</th>
	                <th>Email</th>
	                <th>officer_name</th>
	            </tr>
	        </thead>
	        <tbody>
	        	<?php $n=0; foreach ($datos as $value) { $n++; ?>
		            <tr>
		                <td><?php echo $n; ?></td>
		                <td><?php echo $value->name; ?></td>
		                <td><?php echo $value->acronym; ?></td>
		                <td><?php echo $value->facebook_url; ?></td>
		                <td><?php echo $value->officer_email; ?></td>
		                <td><?php echo $value->officer_name; ?></td>
		            </tr>
		        <?php } ?>
	        </tbody>
	    </table>
	</div>
</div>	
</body>
<script src="js/vendor/jquery.min.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/app.js"></script>
<script src="https://cdn.datatables.net/rowreorder/1.2.3/js/dataTables.rowReorder.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.flash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js"></script> 
		<script >
	


$(document).ready(function() {
	App.datatables();
	  $("#example").DataTable({
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.modal( {
          header: function ( row ) {
            var data = row.data();
            return 'Detalles de '+data[0];
          }
        } ),
        renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
          tableClass: 'table'
        } )
      }
    },
    "language":{
      "sProcessing":     "Procesando...",
      "sLengthMenu":     "Mostrar _MENU_ registros",
      "sZeroRecords":    "No se encontraron resultados",
      "sEmptyTable":     "Ningún dato disponible en esta tabla",
      "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
      "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
      "sInfoPostFix":    "",
      "sSearch":         "Buscar: ",
      "sUrl":            "",
      "sInfoThousands":  ",",
      "sLoadingRecords": "Cargando...",
      "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
      }
    },
    "fnDrawCallback": function( oSettings ) {
      $('[rel="tooltip"]').tooltip();
         //$('.tooltip').tooltip();
     },
     columnDefs: [
     { responsivePriority: 1, targets: 0 },
     { responsivePriority: 2, targets: -1 }
     ],
     dom: 'Bfrtip',
     buttons: [
            'csv', 'excel', 
        ],
     pageLength: 50,
        lengthMenu: [[50, -1], [50, 'Todo']]
 });
} );



	</script>
</html>