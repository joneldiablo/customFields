/**
 * Theme: Adminto Admin Template
 * Author: Coderthemes
 * SweetAlert
 */

!function ($) {
    "use strict";

    var SweetAlert = function () {
    };

    //examples 
    SweetAlert.prototype.init = function () {
    	
    	//Warning Message
    	function activeMessage(){
    		
    	} 
        $('#sa-openSesion').click(function () {
        	swal({
        		  title: "Tienes una sesión abierta",
        		  text: "¿Deseas cerar tu sesión abierta?",
        		  type: "info",
        		  showCancelButton: true,
        		  closeOnConfirm: false,
        		  showLoaderOnConfirm: true
        		}, function () {
        			
        			
        			
        			
        			
        			
        			
        			
        		  setTimeout(function () {
        		    swal("Ajax request finished!");
        		  }, 2000);
        		  
        		  
        		  
        		  
        		  
        		  
        		  
        		});
        	
        	
//        	swal({
//                title: "Tienes una sesión abierta",
//                text: "¿Deseas cerar tu sesión abierta?",
//                type: "warning",
//                showCancelButton: true,
//                confirmButtonClass: 'btn-warning',
//                confirmButtonText: "Sí, cerrarla",
//                cancelButtonText: "No",
//                closeOnConfirm: false,
//                showLoaderOnConfirm: true                
//            }, function () {
//                setTimeout(function () {
//                //Auto Close Timer
//                    swal({
//                        title: "Sesión cerrada",
//                        //text: "I will close in 2 seconds.",
//                        timer: 2000,
//                        showConfirmButton: false
//                    });
//                }, 2000);
//                
//            });
        	
        	
        });
    	
        //Basic
        $('#sa-basic').click(function () {
            swal("Here's a message!");
        });

        //A title with a text under
        $('#sa-title').click(function () {
            swal("Here's a message!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis")
        });

        //Success Message
        $('#sa-success').click(function () {
            swal("Good job!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis", "success")
        });

        //Warning Message
        $('#sa-warning').click(function () {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
                swal("Deleted!", "Your imaginary file has been deleted.", "success");
            });
        });

        //Parameter
        $('#sa-params').click(function () {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                } else {
                    swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
        });

        //Custom Image
        $('#sa-image').click(function () {
            swal({
                title: "Sweet!",
                text: "Here's a custom image.",
                imageUrl: "assets/plugins/bootstrap-sweetalert/thumbs-up.jpg"
            });
        });

        //Auto Close Timer
        $('#sa-close').click(function () {
            swal({
                title: "Auto close alert!",
                text: "I will close in 2 seconds.",
                timer: 2000,
                showConfirmButton: false
            });
        });

        //Primary
        $('#primary-alert').click(function () {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "info",
                showCancelButton: true,
                cancelButtonClass: 'btn-success waves-effect waves-light',
                confirmButtonClass: 'btn-primary waves-effect waves-light',
                confirmButtonText: 'Primary!'
            });
        });

        //Info
        $('#info-alert').click(function () {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: 'btn-info waves-effect waves-light',
                confirmButtonText: 'Info!'
            });
        });

        //Success
        $('#success-alert').click(function () {
            swal({
                title: "Creación exitosa",
                text: "Elemento creado correctamente",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn-success waves-effect waves-light',
                confirmButtonText: 'Continuar'
            });
        });

        //welcome
        $('#move-alert').click(function () {
            swal({
                title: "Traspaso exitoso",
                text: "Nombre del producto",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn-success waves-effect waves-light',
                confirmButtonText: 'Continuar'
            });
        });
        //agregar
        $('#add-alert').click(function () {
            swal({
                title: "Adición exitosa",
                text: "Puedes continuar",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn-success waves-effect waves-light',
                confirmButtonText: 'Continuar'
            });
        });

        //Warning
        $('#warning-alert').click(function () {
            swal({
                title: "Estás Seguro?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: 'btn-warning waves-effect waves-light',
                confirmButtonText: 'Warning!'
            });
        });

        //Cancelar
        $('#danger-alert').click(function () {
            swal({
                title: "¿Estás Seguro?",
                text: "Todos los avances se perderán",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn-danger waves-effect waves-light',
                confirmButtonText: 'Continuar'
            });
        });

        //Eliminar
        $('[id^=delate-alert]').click(function () {
            swal({
                title: "¿Estás Seguro?",
                text: "Esta acción sera definitiva",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn-danger waves-effect waves-light',
                confirmButtonText: 'Continuar'
            });
        });
        
        //cancelar Edición en General -> redirección a dashboard
        $('.cancel-general').click(function () {
            swal({
                title: "¿Estás Seguro?",
                text: "Todos los avances se perderán",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "Si, cancelar",
                cancelButtonText: "No",
                closeOnConfirm: false
            }, function () {
                swal("Cancelado", "Se dirigirá a dashboard", "success");
				setTimeout(function() {								  				 
					window.location.replace("/TPSUserPortal/sec/dashboard");	
					}, 3000);
            });
        });
        
        //cancelar Edición en formulario -> redirección a dashboard
        $('#cancel-form').click(function () {
            swal({
                title: "¿Estás Seguro?",
                text: "Todos los avances se perderán",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "Si, cancelar",
                cancelButtonText: "No",
                closeOnConfirm: false
            }, function () {
                swal("Cancelado", "Se dirigirá a listado de Productos", "success");
				setTimeout(function() {								  				 
					window.location.replace("/TPSUserPortal/sec/productlist");	
					}, 3000);
            });
        });
        
        

        
        //cancelar Edición en formulario -> redirección a dashboard
        //$('.cancel-form-product').click(function () {            
        $('.form-group').on('click','button#cancel-form-product.cancel-form-product', function() {	
        	swal({
                title: "¿Estás Seguro?",
                text: "Todos los avances se perderán",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "Si, cancelar",
                cancelButtonText: "No",
                closeOnConfirm: false
            }, function () {
                swal("Cancelado", "Se dirigirá a listado de Productos", "success");
				setTimeout(function() {								  				 
					window.location.replace("/TPSUserPortal/sec/productlist");	
					}, 3000);
            });
        });
        
        
        
        //Cerrar formulario ver notificacion-> redirección a notificationList
         // $('.close-form-product').click(function () {
        $('.form-group').on('click','button#cancel-form-product.close-form-product', function() {
          	window.location.replace("/TPSUserPortal/sec/productlist");
          });
        

      //cancelar Edición en formulario branch-> redirección a branchList
              $('.cancel-form-branch').click(function () {
              	var value = $("#cancel-form-notification").text();
                  if(value=="Cancelar"){ //Save
                  	swal({
                          title: "¿Estás Seguro?",
                          text: "Todos los avances se perderán",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonClass: 'btn-warning',
                          confirmButtonText: "Si, cancelar",
                          cancelButtonText: "No",
                          closeOnConfirm: false
                      }, function () {
                          swal("Cancelado", "Se dirigirá a listado de sucursales", "success");
          				setTimeout(function() {								  				 
          					window.location.replace("/TPSUserPortal/sec/branchlist");	
          					}, 3000);
                      });
                  } else{
                  	window.location.replace("/TPSUserPortal/sec/branchlist");
                  }
                  
              });
              
              //Cerrar formulario ver notificacion-> redirección a notificationList
                $('.close-form-branch').click(function () {
                	
                	window.location.replace("/TPSUserPortal/sec/branchlist");
               
                });

        //cancelar Edición en formulario notificacion-> redirección a notificationList
        $('#cancel-form-notification').click(function () {
        	var value = $("#cancel-form-notification").text();
            if(value=="Cancelar"){ //Save
            	swal({
                    title: "¿Estás Seguro?",
                    text: "Todos los avances se perderán",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: 'btn-warning',
                    confirmButtonText: "Si, cancelar",
                    cancelButtonText: "No",
                    closeOnConfirm: false
                }, function () {
                    swal("Cancelado", "Se dirigirá a listado de notificaciones", "success");
    				setTimeout(function() {								  				 
    					window.location.replace("/TPSUserPortal/sec/notificationlist");	
    					}, 3000);
                });
            } else{
            	window.location.replace("/TPSUserPortal/sec/notificationlist");
            }
            
        });
        
        
      //cancelar Edición en TICKET -> redirección a dashboard
        $('#cancel-form-ticket').click(function () {
        	window.location.replace("/TPSUserPortal/sec/dashboard");
        });		
        
      //cancelar Edición en Fiscal -> redirección a dashboard
        $('#cancel-form-fiscal').click(function () {
        	window.location.replace("/TPSUserPortal/sec/dashboard");
        });
        
      //cancelar Edición en General -> redirección a dashboard
        $('#cancel-form-general').click(function () {
        	window.location.replace("/TPSUserPortal/sec/dashboard");
        });
        
      //cancelar Edición en Taxes -> redirección a dashboard
        $('#cancel-form-taxes').click(function () {
        	window.location.replace("/TPSUserPortal/sec/dashboard");
        });
   
        
      //Cerrar formulario ver notificacion-> redirección a notificationList
        $('#cancel-form-notificationDetail').click(function () {
        	
        	window.location.replace("/TPSUserPortal/sec/notificationlist");
       
        });
        
      //Cerrar formulario ver notificacion-> redirección a notificationList
        $("#sellerCancel").click(function () {
        	window.location.replace("/TPSUserPortal/sec/sellerlist");
        });
        
        
    },
        //init
        $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
}(window.jQuery),

//initializing 
    function ($) {
        "use strict";
        $.SweetAlert.init()
    }(window.jQuery);