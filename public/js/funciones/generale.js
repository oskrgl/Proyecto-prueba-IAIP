$(function(){
  $('form input').keydown(function (e) {// DesActiva el submit del enter en el formulario
  //$(document).on('keydown','form input',function(e){
      if (e.keyCode == 13) {
          e.preventDefault();
          return false;
      }
  });
  $(document).on('click', "#btn_cancelar_confirm", function(e) {
      swal.close();
  });
  $(document).on("input",".campo_a_valida", function (e) {
      $(".btn_validar").removeClass("hide");
      $(".btn_validado").addClass("hide");
  });
  $(document).on('click', "#btn_nop", function(e) {
      swal.close();
  });  
  $.mask.definitions['~']='[267]';
  $('.tel_validar_mask').mask('~999-9999');
  $('.fecha_validar_mask').mask('99/99/9999');
  $('.dui_validar_mask').mask('99999999-9');
  $('.nit_validar_mask').mask('9999-999999-999-9');
  $('.select-chosen').chosen({
    placeholder_text_single: "Seleccione...",
    no_results_text: "Dato no encontrado."
  });
  $.validator.setDefaults({ ignore: ":hidden:not(select)" });
  $(document).on("keydown ",".campo_a_valida", function (e) {
    //alert("oskrgl");
      $(".btn_validar").removeClass("hide");
      $(".btn_validado").addClass("hide");
  });
  $(document).on("blur ",".valid_pattern2", function (e) {
    var valor = $(this);
    console.log(new RegExp(valor.attr("pattern")).test(valor.val()));
    if(valor.val() !="" && !new RegExp(valor.attr("pattern")).test(valor.val())){
      var html = '<label id="'+valor.attr("id")+'_n-error" class="error error_pattern" for="'+valor.attr("id")+'">Formato no Valido</label>';
      valor.after(html);
      valor.val("");valor.focus();
    }else{
      $('#'+valor.attr("id")+'_n-error').remove();
      $(".error_pattern").remove();
    }
  });
  $(document).on('keypress','.valid_pattern',function(e){
    //console.log('oskrgl');
    var valor = $(this);
    var tecla = (document.all) ? e.keyCode : e.which;
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
    // Patron de entrada, en este caso solo acepta numeros y letras
    var patron = valor.attr("pattern");
    tecla_final = String.fromCharCode(tecla);
    if (!tecla_final.match(patron)) {
        return false;
    }
    else return true;
  });
  $(document).on("click",'.toggle-content2',function(e){
    //console.log("minimizar");
    var blockContent = $(this).closest('.block').find('.block-content');

    if ($(this).hasClass('active')) {
        blockContent.slideDown();
    } else {
        blockContent.slideUp();
    }
    $(this).toggleClass('active');
  });
  $(document).on("click", "#btn_eliminar_general_pre", function (e) {
    var elem=$(this);
    var elid = elem.attr('data-id');
    var fila = elem.data("fila");
    var tabla = elem.data("tabla");
    var funcion = elem.data("funcion");
    var img = elem.data("img");
    console.log(funcion);
    swal({
        title: MENSAJE_ELIMINAR_ALERT,
        text: "",
        html: 
        '<br><button class="btn btn-danger" data-id ="'+elid+'" data-fila="'+fila+'" data-tabla="'+tabla+'" data-funcion="'+funcion+'" data-img="'+img+'" id="btn_eliminar_general_conf" data-toggle="tooltip" data-original-title="Eliminar">'+ELIMINAR_ALERT+'</button> ' +
        '<button class="btn btn-warning" id="btn_cancelar_confirm" data-toggle="tooltip" data-original-title="Cancelar">'+CANCELAR_ALERT+'</button>'
        ,
        type: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey:false,
        allowOutsideClick:false,
    });        
  });
  $(document).on('click', "#btn_eliminar_general_conf", function(e) {
      swal.close();
      var elem=$(this);
      var elid = elem.attr('data-id');
      var fila = elem.data("fila");
      var tabla = elem.data("tabla");
      var funcion = elem.data("funcion");
      var img = elem.data("img");
       console.log(funcion);
      swal({
      title: MENSAJE_ELIMINAR_CONFIRMAR,
      text: "",
      html: '<button class="btn btn-danger" data-id="'+elid+'" data-fila="'+fila+'" data-tabla="'+tabla+'" data-funcion="'+funcion+'" data-img="'+img+'" id="btn_eliminar_general" data-toggle="tooltip" data-original-title="Si, eliminar">'+CONFIRMAR_ELIMINAR+'</button> ' +
      '<button class="btn btn-info" id="btn_nop" data-toggle="tooltip" data-original-title="No">'+CANCELAR_ALERT+'</button>',
      type: 'info',
      showCancelButton: false,
      showConfirmButton: false,
      allowEscapeKey:false,
      allowOutsideClick:false,
      });
  });
  $(document).on("click","#btn_eliminar_general", function (e) {
    var elem=$(this);
      var elid = elem.attr('data-id');
      var fila = elem.data("fila");
      var tabla = elem.data("tabla");
      var funcion = elem.data("funcion");
      var img = elem.data("img");
      var datos={data_id:"eliminar_general",codigo:elid,tabla:tabla};
      var data_imagen,filas;
      if(img && img!="../imagenes/ingenios/avatar.jpg"){
        data_imagen = new Object();filas = 0;
          data_imagen[filas]={imagen:img};filas++;
      }
      else {data_imagen="";filas="";img="";}
      ajax_general(datos,'','','../json_genericos/data_json.php',funcion,data_imagen,filas,img);
  });
  $('[data-toggle="tooltip"]').tooltip();
  jQuery.extend(
    "novs[]",{ required:true, 
  });
  jQuery.extend(jQuery.validator.messages, {
    required: "Este campo es obligatorio.",
    remote: "Por favor, rellena este campo.",
    email: "Por favor, escribe una dirección de correo válida",
    url: "Por favor, escribe una URL válida.",
    date: "Por favor, escribe una fecha válida.",
    dateISO: "Por favor, escribe una fecha (ISO) válida.",
    number: "Por favor, escribe un número entero válido.",
    digits: "Por favor, escribe sólo dígitos.",
    creditcard: "Por favor, escribe un número de tarjeta válido.",
    pattern: "Formato no Valido",
    equalTo: "Por favor, escribe el mismo valor de nuevo.",
    accept: "Por favor, escribe un valor con una extensión aceptada.",
    maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
    minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
    rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
    range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
    max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
    min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
  });
});
/******funcion para validar solo numeros con 2 decimales***/
function verificar_numeros(evt,input){
    // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
    var key = window.Event ? evt.which : evt.keyCode;    
    var chark = String.fromCharCode(key);
    var tempValue = input.value+chark;
    if(key >= 48 && key <= 57){
        if(filter(tempValue)=== false){
            return false;
        }else{       
            return true;
        }
    }else{
          if(key == 8 || key == 13 || key == 0) {     
              return true;              
          }else if(key == 46){
                if(filter(tempValue)=== false){
                    return false;
                }else{       
                    return true;
                }
          }else{
              return false;
          }
    }
}
function filter(__val__){
    var preg = /^([0-9]+\.?[0-9]{0,3})$/; 
    if(preg.test(__val__) === true){
        return true;
    }else{
       return false;
    }   
}
function validar(e,table,quees,emailte,antiguo2="",campo=""){
  //Valida si un dato ya existe en la base de datos
  var actual = $(e).val();
  var antig = $("#valor_antiguo").val();
  if(antiguo2 !="" )antig = antiguo2;
  var datos ={emailte:emailte,validar:"validar_cote",valor_delcampo:actual, table:table,quees:'1',antiguo:"0",campo:campo};
  if(antiguo2 != actual){
    console.log("datos que envia",datos);
    $.ajax({
        dataType: "json",
        method: "POST",
        url: '../../php/json_genericos/json_genericos_bd.php',
        data : datos,
    }).done(function(msg) {
        swal.close();
        console.log(msg);
        if(msg.exito){
          iziToast.error({
              title: ERROR,
              message: ERROR_VALIDAR,
              timeout: 3000,
          });
          $(e).val("");$(e).focus();
        }else if (msg.error){
          //si no existe
          console.log(msg.error);
          $(".btn_validar").addClass("hide");
          $(".btn_validado").removeClass("hide");
        }
        else{
           console.log(msg.error2);
        }
    });
  }else{
    $(".btn_validar").addClass("hide");
    $(".btn_validado").removeClass("hide");
  }
}
function validar_array(e,table,quees,emailte,antiguo2="",campo="",fila=""){
  //valida si una serie de datos esta en la base de datos
  console.log(e,table,quees,emailte,antiguo2,campo,fila);
    var actual = $(e).val();//dato actual
    var antig = antiguo2;//valor anterior
    var datos = {emailte:emailte,validar:"validar_cote",valor_delcampo:actual,table:table[(fila-1)],quees:'0',antiguo:quees,campo:campo[(fila-1)]} ;
    if(actual != antiguo2){
      $.ajax({
          dataType: "json",
          method: "POST",
          url: '../../php/json_genericos/json_genericos_bd.php',
          data : datos,
      }).done(function(msg) {
          swal.close();
          console.log(msg);
          if(msg.exito){
            iziToast.error({
                title: ERROR,
                message: ERROR_VALIDAR,
                timeout: 3000,
            });
            $(e).val("");$(e).focus();
          }else if (msg.error){
            if((fila-1) == 0){
              console.log(msg.error);
              $(".btn_validar").addClass("hide");
              $(".btn_validado").removeClass("hide");
            }else{
              validar_array(e,table,quees,emailte,antiguo2,campo,(fila-1));
            }
            
          }
          else{
             console.log(msg.error2);
          }
      });
    }else{
      $(".btn_validar").addClass("hide");
      $(".btn_validado").removeClass("hide");
    }
}
function validar_archivo_general(file,id_img,img_src_error,img_src_success="",v_documentos="",v_imagenes="",btn="",name="",noname=""){
        $("#"+id_img).attr("src",img_src_error);
        $(".file_datos_"+id_img).remove();
        if(btn !="" )$(btn).empty().html(noname);
         //Para navegadores antiguos
         if (typeof FileReader !== "function") {
            $("#"+id_img).attr("src",img_src_error);
            $(".file_datos").remove();
            if(btn !="" )$(btn).empty().html(noname);
            return;
         }
         var Lector;
         var Archivos = file[0].files;
         var archivo = file;
         var archivo2 = file.val();
         if (Archivos.length > 0) {

            Lector = new FileReader();

            Lector.onloadend = function(e) {
                var origen, tipo, tamanio;
                //Envia la imagen a la pantalla
                origen = e.target; //objeto FileReader
                //Prepara la información sobre la imagen
                tipo = archivo2.substring(archivo2.lastIndexOf("."));
                tipo = tipo.toLowerCase();
                console.log(tipo);
                tamanio = e.total / 1024;
                console.log(tamanio);
                //Si el tipo de archivo es válido lo muestra, 

                //sino muestra un mensaje 
                if(v_documentos != "" && v_imagenes != ""){
                  var valid_array_d = v_documentos.split(",");
                  var valid_array_i = v_imagenes.split(",");
                  var d = valid_array_d.includes(tipo);
                  var i = valid_array_i.includes(tipo);
                  if(d){
                    $("#"+id_img).attr("src",img_src_success);
                    console.log("src",img_src_success);
                    $("#"+id_img).after("<div class='file_datos file_datos_"+id_img+"' style='position: absolute;margin: 0px 5px 6px 84%;width: 110px;font-size: 11px;'><!--strong>Tipo:</strong> Documento --> <strong>Tamaño:</strong> "+tamanio.toFixed(2)+" KB</div>");
                    if(btn !="" )$(btn).empty().html(name);
                  }else if(i){
                    $("#"+id_img).attr("src",img_src_success);
                    console.log("src",img_src_success);
                    $("#"+id_img).after("<div class='file_datos file_datos_"+id_img+"' style='position: absolute;margin: 0px 5px 6px 84%;width: 110px;font-size: 11px;'><!--strong>Tipo:</strong> Imagen --> <strong>Tamaño:</strong> "+tamanio.toFixed(2)+" KB</div>");
                    if(btn !="" )$(btn).empty().html(name);
                  }else{
                    $("#"+id_img).attr("src",img_src_error);
                    $(".file_datos_"+id_img).remove();
                    if(btn !="" )$(btn).empty().html(noname);
                    file.val("");
                    iziToast.warning({
                        title: 'Advertencia',
                        message: 'Formato no Valido<br>Intente con otro archivo',
                        timeout: 5000,
                    });
                  }
                }
                else if (tipo !== ".jpeg" && tipo !== ".JPEG" && tipo !== ".jpg" && tipo !== ".JPG" && tipo !== ".png" && tipo !== ".PNG") {
                    $("#"+id_img).attr("src",img_src_error);
                    $(".file_datos_"+id_img).remove();
                    if(btn !="" )$(btn).empty().html(noname);
                    file.val("");
                    console.log("error_tipo");
                    iziToast.warning({
                        title: 'Advertencia',
                        message: 'Formato no Valido<br>Intente con otro archivo',
                        timeout: 5000,
                    });
                }
                else{
                  if(img_src_success!=""){
                    $("#"+id_img).attr("src",origen.result);
                  }
                  else{
                    $("#"+id_img).attr("src",img_src_success);
                  }
                  $("#"+id_img).after("<div class='file_datos file_datos_"+id_img+"' style='position: fixed;margin: -1px 0 0 45px;font-size: 11px;'><!--strong>Tipo:</strong> Imagen --> <strong>Tamaño:</strong> "+tamanio.toFixed(2)+" KB</div>");
                  if(btn !="" )$(btn).empty().html(name);
                  console.log("src",img_src_success);
                }
           };
            Lector.onerror = function(e) {
            console.log(e)
           }
           Lector.readAsDataURL(Archivos[0]);
   }
}
function insertar_imagen_general(archivo,form_id,url_json,funcion){
    console.log('actualizar_imagen',archivo,form_id,url_json,funcion);
    var file =archivo.files;
    var formData = new FormData();
    formData.append('formData', $("#"+form_id));
    var data = new FormData();
     //Append files infos
     jQuery.each(archivo[0].files, function(i, file) {
        data.append('file-'+i, file);
     });

     console.log("data",data,file);
     $.ajax({  
        url: url_json,  
        type: "POST", 
        dataType: "json",  
        data: data,  
        cache: false,
        processData: false,  
        contentType: false, 
        context: this,
        success: function (json) {
            console.log(json);
            if(json[0]=='1'){
                iziToast.success({
                    title: EXITO,
                    message: EXITO_MENSAJE,
                    timeout: 3000,
                });
                fin_ajax_general(funcion);
            }else{
                NProgress.done();
                iziToast.error({
                    title: ERROR,
                    message: ERROR_MENSAJE,
                    timeout: 3000,
                });
            }
        }
    });
}
function insertar_data_imagen_general(formulario,modal_id,funcion,data_imagen,filas,id_item = ""){
    var archivo = $("#"+data_imagen[(filas-1)].files);
    var tabla = data_imagen[(filas-1)].tabla;
    var id_campo = data_imagen[(filas-1)].id_campo;
    var campo = data_imagen[(filas-1)].campo;
    var carpeta = data_imagen[(filas-1)].carpeta;
    var arc = data_imagen[(filas-1)].archivo;
    var id_valor = data_imagen[(filas-1)].id_valor;

    var url_json = "../json_genericos/data_imagen_json.php"

     if(id_item != ""){
        url_json = "../json_genericos/json_sibir_foto.php";
        id_valor = id_item
     } 
     url_json+= "?tb="+tabla+"&id_campo="+id_campo+"&id_valor="+id_valor+"&campo="+campo+"&carpeta="+carpeta+"&archivo="+arc+"&fila="+filas;
    //console.log("oskrgl",url_json,archivo);

    var file = archivo.files;
    var formData = new FormData();
    formData.append('formData', $("#"+formulario));
    var data = new FormData();
     //Append files infos
     jQuery.each(archivo[0].files, function(i, file) {
        data.append('file-'+i, file);
     });

     //console.log("data",data,file);
     $.ajax({  
        url: url_json,  
        type: "POST", 
        dataType: "json",  
        data: data,  
        cache: false,
        processData: false,  
        contentType: false, 
        context: this,
        success: function (json) {
            console.log(json);
            if(json[0]=='1'){
                if((filas-1) > 0)insertar_data_imagen_general(formulario,modal_id,funcion,data_imagen,(filas-1),id_valor);
                else {
                  fin_ajax_general(formulario,modal_id,funcion,data_imagen,id_valor);
                  //if(formulario != ""){
                    iziToast.success({
                      title: EXITO,
                      message: EXITO_MENSAJE,
                      timeout: 3000,
                    });
                  //}
                }
            }else{
                NProgress.done();
                iziToast.error({
                    title: ERROR,
                    message: ERROR_MENSAJE,
                    timeout: 3000,
                });
            }
        }
    });
}
function eliminar_archivo_general(formulario,modal_id,funcion,data_imagen,filas,id_valor){
    var imagen = data_imagen[(filas-1)].imagen;
    var url_json = "../json_genericos/data_eliminar_archivo_json.php?imagen="+imagen;
     $.ajax({  
        url: url_json,  
        type: "POST", 
        dataType: "json",  
        cache: false,
        processData: false,  
        contentType: false, 
        context: this,
        success: function (json) {
            console.log(json);
            if(json[0]=='1'){
                if((filas-1) > 0)eliminar_archivo_general(formulario,modal_id,funcion,data_imagen,(filas-1),id_valor);
                else {
                  fin_ajax_general(formulario,modal_id,funcion);
                  iziToast.success({
                    title: EXITO,
                    message: EXITO_MENSAJE,
                    timeout: 3000,
                  });
                }
            }else{
                NProgress.done();
                iziToast.error({
                    title: ERROR,
                    message: ERROR_MENSAJE,
                    timeout: 3000,
                });
            }
        }
    });
}
function ajax_general(datos,formulario="",modal_id="",url_ajax='data_json.php',funcion="", data_imagen ="",filas = "",eliminar_archivo=""){
  console.log(datos,formulario,modal_id,url_ajax,funcion,data_imagen,filas,eliminar_archivo);
    swal({
        title: '¡Cargando!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        onOpen: function() {
            swal.showLoading()
        }
    });
    $.ajax({
        dataType: "json",
        method: "POST",
        url:url_ajax,
        data : datos,
    }).done(function(json) {
        console.log("secult_ajax",json);
        if(json[0]=='1'){
          console.log('json',json);
          if(eliminar_archivo != ""){
            console.log('eliminar_archivo_general');
              eliminar_archivo_general(formulario,modal_id,funcion,data_imagen,filas);
          }
          else if(data_imagen !=""){
            console.log('insertar_data_imagen_general');
              insertar_data_imagen_general(formulario,modal_id,funcion,data_imagen,filas,json[1]);
          }
          else{
            console.log('else 2 sin imagen');
            swal.close();
            iziToast.success({title: EXITO, message: EXITO_MENSAJE, timeout: 4000, });
            fin_ajax_general(formulario,modal_id,funcion,data_imagen,filas,json[1]);
          }
        }if(json[0]=='0'){
          console.log('if 4');
          swal.close();
          iziToast.error({title: ERROR, message: ERROR_MENSAJE, timeout: 3000, });
        }
    });
}
function fin_ajax_general(formulario = "",modal_id = "",funcion = "",data_imagen = "",filas="",id_recuperado = ""){
  if(formulario !="" && formulario !="no"){
    console.log(formulario);
      $("#"+formulario)[0].reset();
      //$(".select_piker2").val('default');$(".select_piker2").selectpicker("refresh");
      $("#"+formulario+" .select-chosen").val('default').trigger("chosen:updated");
      if(data_imagen!=""){
          for (const prop in data_imagen) {
              console.log(data_imagen[prop]);
              $(data_imagen[prop].img_modal).attr("src",data_imagen[prop].src_img);
          }
      }
      if($(modal_id).is(":visible"))$(modal_id).modal('toggle');
      swal.close();
  }
  if($(".modal.fade.dtr-bs-modal.in").is(":visible"))$(".modal.fade.dtr-bs-modal.in").modal('toggle');
  switch (funcion) {
        case 'usuario':actualizar_tabla_usuarios();break;
        case 'tipo_caso':actualizar_tabla_tipo_caso(id_recuperado);break;
        case 'tipo_tribunal':actualizar_tabla_tipo_tribunal();break;
        case 'tribunal':actualizar_tabla_tribunal(id_recuperado);break;
        case 'cliente':actualizar_tabla_cliente(id_recuperado);break;
        case 'cliente_factura':actualizar_cliente_factura(id_recuperado);break;
        case 'contraparte':actualizar_tabla_contraparte(id_recuperado);break;
        case 'tipo_etapa':actualizar_tabla_tipo_etapa(id_recuperado);break;
        case 'subtipo_etapa':actualizar_tabla_subtipo_etapa(id_recuperado);break;
        case 'subtipo_etapa2':actualizar_select_subtipo_etapa(id_recuperado);break;
        case 'tipo_diligencia':actualizar_tabla_tipo_diligencia(id_recuperado);break;
        case 'nuevo_caso':fin_nuevo_caso();break;
        case 'nueva_diligencia_onliy':fin_nueva_diligencia();break;
        case 'caso_corporativo':actualiza_casos(id_recuperado);break;
        case 'caso_particular':actualiza_casos();break;
        case 'diligencia':actualizar_tabla_diligencias();break;
        case 'contacto':actualizar_tabla_contacto(id_recuperado);break;
  }
}
function cargar_select_generico(hijo,tabla,id_campo,campo,id_campo_buscar="",id_buscar="",selected=""){
  console.log(hijo,tabla,id_campo,campo,id_campo_buscar,id_buscar,selected);
  swal({
      title: '¡Cargando!',
      allowOutsideClick: false,
      allowEscapeKey: false,
      onOpen: function() {
          swal.showLoading()
      }
  });
  $.ajax({
      dataType: "json",
      method: "POST",
      url:'../json_genericos/data_json.php',
      data : {data_id:'cargar_select',tabla:tabla,id_campo:id_campo,campo:campo,id_campo_buscar:id_campo_buscar,id_buscar:id_buscar,selected:selected},
  }).done(function(json) {
      console.log(json);
      if(json[0]!='0'){
          $("#"+hijo).empty().html(json[0]).trigger("chosen:updated");
      }
      swal.close();
  });
}
function cargar_tabla(elem){
  App.datatables();
  $("#"+elem).DataTable({
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
     {
      text: 'Descargar Excel',
      action: function ( e, dt, node, config ) {
        descargar_logs();
      }
     }

     ]
 });

  $("[rel='tooltip']").tooltip();
}
function cargar_tabla2(elem){
  App.datatables();
  return $("#"+elem).DataTable({
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
      //"lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "Todos"]],
      "language":{
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
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
      "bInfo": false,
      columnDefs: [
      { responsivePriority: 1, targets: 0 },
      { responsivePriority: 2, targets: -1 }
      ]
  });
}
function cargar_tabla3(elem,colum){
  App.datatables();
  $("#"+elem).DataTable({
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.modal( {
          header: function ( row ) {
            var data = row.data();
            return 'Detalles de '+data[colum];
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
      "sSearch":         "Buscar:",
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
    "bInfo": false,
    columnDefs: [
       { responsivePriority: 1, targets: 0 },
       { responsivePriority: 2, targets: -1 }
       ],
      pageLength: 5,
        lengthMenu: [[5, 20, 30, -1], [5, 20, 30, 'Todo']]
  });
}
function cargar_tabla_orden(elem,col,orden){
  App.datatables();
  var table = $("#"+elem).DataTable({
     "order":  [[1,'asc']],
    responsive: {
        details: {
          type: 'column'
        }
    },
    "fnDrawCallback": function (oSettings) {
      $("#"+elem+' tbody tr').each(function () {
        $("[rel='tooltip']").tooltip();
        $('[data-toggle="tooltip"]').tooltip();
      });
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
      "sSearch":         "Buscar:",
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
    "bInfo": false,
     columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 },
        {
            "targets": [ col ],
            "visible": false,
            "searchable": false
        },
        {
          className: 'control',
          orderable: false,
          targets:   0
        }
    ],
      pageLength: 10,
      lengthMenu: [[10, 20, 30, -1], [10, 20, 30, 'Todo']]  
  });
  return table;
}
function cargar_tabla_orden2(elem,col,orden,hiden){
  var col_int = parseInt(col);
  App.datatables();
  var table = $("#"+elem).DataTable({
    responsive: {
        details: {
          type: 'column'
        }
    },
    "fnDrawCallback": function (oSettings) {
      $("#"+elem+' tbody tr').each(function () {
        $("[rel='tooltip']").tooltip();
        $('[data-toggle="tooltip"]').tooltip();
      });
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
      "sSearch":         "Buscar:",
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
    "bInfo": false,
     columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 },
        {
            "targets": [ hiden ],
            "visible": false,
            "searchable": false
        },
        {
          className: 'control',
          orderable: false,
          targets:   0
        }
    ],
    pageLength: 10,
    engthMenu: [[10, 20, 30, -1], [10, 20, 30, 'Todo']]  ,
    //order: [[col,orden]],
    "order": [[ col_int,orden ]]
  });
  return table;
}
jQuery(document).ready(function(){
    // This button will increment the value
    $('[data-quantity="plus"]').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        var max = parseInt($('input[name='+fieldName+']').attr("max"));
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
            if(max <= currentVal)$('input[name='+fieldName+']').val(max);
            $('input[name='+fieldName+']').trigger("input");
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
            $('input[name='+fieldName+']').trigger("input");
        }
    });
    
    // This button will decrement the value till 0
    $('[data-quantity="minus"]').click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        var min = parseInt($('input[name='+fieldName+']').attr("min"));
        // If it isn't undefined or its greater than 0
        if(min >= currentVal ){
             $('input[name='+fieldName+']').val(min);
             $('input[name='+fieldName+']').trigger("input");
         }
        else if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
            $('input[name='+fieldName+']').trigger("input");
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
            $('input[name='+fieldName+']').trigger("input");
        }
    });
});
