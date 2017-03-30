			
			/**
			  *	Function getFormData
			  */
		
	 
		function getFormData( businessId, dataSrc, typeUpload )
                  {
                  var df = $.Deferred();                    
      
					var formData  = new FormData();
					formData .append("businessId", businessId);
					
					if(typeUpload) formData .append("typeUpload", typeUpload);
					else           formData .append("typeUpload", "cropImage");
				
					var img1 = new Image(); // HTML5 Constructor
					//console.log("dataSrc: ", dataSrc);
					
					img1.src = dataSrc;
					  
					var width = img1.width;
					var height = img1.height;
					
					var canvas =  $('<canvas>')[0];
					  canvas.width = width;
					  canvas.height = height;
					  
					var context = canvas.getContext('2d');
						context.drawImage(img1, 0, 0, width, height);
					
					canvas.toBlob(function (blob) {
						//console.log("blob: ", blob);						
						formData .append("croppedImage", blob);
						
						df.resolve(formData );
					});
						 
                  return df.promise();
                  };
	 

      			
      			/**
      			  *	Function uploadSrc
      			  */
      	
	 

            function uploadSrc(business_Id, data_Src, setPhoto, type_Upload, idInputHidden, idImgAux )
				{
					var metaToken = $("meta[name='_csrf']").attr("content");
					//console.log("metaToken: " + metaToken);
	
					getFormData(business_Id, data_Src, type_Upload).then(function(newEntityForm){
	
						$.ajax( 'productImageUpload',
							  {
							  method:"POST", data:newEntityForm, processData:false, contentType:false, headers:{'X-CSRF-TOKEN':metaToken},
							success: function( data )             
										{      	    			
										console.log("data: " + JSON.stringify(data));
										//var photoFileName = data.photoFileName;
										
										$("#" + idImgAux).attr("src",data.photoFileName);
										$( "#" + idInputHidden ).val( data.photoFileName );

										//	$('#save-form').prop("disabled", false);
										}.bind(),     	    			
							error:   function( xhr, status, err ) 
										{ 
										//console.log("xhr: " +JSON.stringify(xhr)); 
										//console.log("status: "+status); 
										//console.log("err: "+err);

										//	 $('#save-form').prop("disabled", false);
										}
							});
						
					
					});

					
				
				};
			
			

				
				/**
				  *	Function onChangePhoto
				  */
		
				
			 function onChangePhoto( idInput, idHidden, idAux)
				{ 			 
				var files = $( "#" + idInput ).prop('files') ;		
				
				for (var i = 0, f; f = files[i]; i++) {
					// Only process image files.
					if (!f.type.match('image.*')) {
						continue;
					}
					
					var filename = f.name;
					var extension = filename.split('.').pop();
					
					console.log("filename : ", filename);
					console.log("extension: ", extension);			
					
					if (extension != "png" || extension != "jpg" ) {
					
						var reader = new FileReader();
						// Closure to capture the file information.
						reader.onload = (function (theFile) {
						
							console.log("onload.. ");
						
							return function (e) {
								// Render thumbnail.
								var newSrc = e.target.result;
								//$("#_imgHide").attr('src', newSrc);
								
								//console.log("onload..  file: ", newSrc);
								extensionSrc = newSrc.substring( newSrc.indexOf("/")+1, newSrc.indexOf(";") );				
								//console.log("onload..  extension: ", extensionSrc);
								
								if( extensionSrc == "png" || extensionSrc == "jpeg" || extensionSrc == "jpg") uploadSrc("9999", newSrc, "none", "cropImage", idHidden, idAux);
								
							};
						})(f);
						// Read in the image file as a data URL.
						reader.readAsDataURL(f);						
					}
				}
			};
    
			
			/**
			  *	Function updateForm
			  */
			
			function updateForm(entity, urlWS){
				var d = $.Deferred();
		
				var metaToken = $("meta[name='_csrf']").attr("content");		    		 
				
				
				$.ajax( urlWS,
		        {method:'POST', 
					data: JSON.stringify(entity),
			        dataType: 'json',
			        contentType: "application/json", 
			        mimeType: 'application/json',
			        headers:{'X-CSRF-TOKEN':metaToken}}  
				).done(function(data){
					d.resolve(data);
				}).fail(d.reject); 
				return d.promise();
			};
	 
			
			/**
	       	  *	Function SPINNER
	       	  */
	       	  
	       		function spinner(titleAlert) {
	       			
	                 swal({
	                     title: titleAlert,
	                     text: "Espera un momento",
	                     imageUrl: "/TPSUserPortal/resources/assets/images/spinner.gif",
	                     timer: 2000,
	                     showConfirmButton: false
	                 });
	       		}

	       		/**
	   		  *	Function continueToList
	   		  */
	   		  
	   			function continueToList( message ) 
	   		        {
	   				swal({ title: 'Error al guardar',
	   		               text:  message,
	   		               type:  'error',
	   		               confirmButtonClass: 'btn-success waves-effect waves-light',
	   		               confirmButtonText:  'Continuar' }, 
	   		               function () 
	   		                   {
	   		                   //swal( 'Cancelado', 'Se dirigirá a Listado', 'success' );
	   		                  // setTimeout( function() { window.location.replace( '/TPSUserPortal/sec/promotionlist' ); }, 1000 );
	   		                   } );
	   		        };

	         		  /**
	         		  *	Function failInResponse
	         		  */
	         			function failInResponse() {
	         				
	         				swal({
	         	                title: "Falla al obtener información",
	         	                text: "Intentar mas tarde.",
	         	                type: "error",
	         	                confirmButtonClass: 'btn-success waves-effect waves-light',
	         	                confirmButtonText: 'Continuar'
	         	            }, function () {
	         	                //swal("Cancelado", "Se dirigirá a Listado", "success");
	         					//setTimeout(function() { window.location.replace("/TPSUserPortal/sec/businessentity"); }, 1000);
	         	            });
	         			}

/**
* StoreFormComponent
* Author: TPS
* Module/App: TPS Components js
*/



!function($) {
    "use strict";
	 
	  /**
		  *	Function changeBtnCancel
		  */
	  
		function changeBtnCancel() {
    		$('#cancel-general').removeClass('close-general');
    		$('#cancel-general').addClass('cancel-general');
			$('#cancel-general').html("Cancelar");
			
		};
		
		
		/**
		  *	Function updateControls
		  */		
		
		function updateControls(addressComponents) {
				$('#street').val(addressComponents.streetName);
				$('#outdoorNumber').val(addressComponents.streetNumber);
				$('#city').val(addressComponents.city);
				$('#state').val(addressComponents.stateOrProvince);
				$('#zipCode').val(addressComponents.postalCode);
				$('#countryCode').val(addressComponents.country);
				$('#reference').val(addressComponents.country);
				//console.log(JSON.stringify( addressComponents));
			};
		
		
	
				
    /**
	 * StoreFormComponent
	 */	
    var StoreFormComponent = function() {
        this.VERSION = "0.1",
        this.AUTHOR = "TPS",
        this.SUPPORT = "israel.gonzalez@gonet.us"
    };
     //on doc load
    StoreFormComponent.prototype.onDocReady = function(e) {	
	
//    	$('form').parsley();

    	
        $('#entityForm').on('change','.form-control', function(event) {										
			//console.log("Chage productForm");
    		changeBtnCancel();
		});

      //cancelar Edición en formulario -> redirección a dashboard
        //$('.cancel-form-product').click(function () {            
        $('.form-group').on('click','button#cancel-general.cancel-general', function() {	
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
                swal("Cancelado", "Se dirigirá al inicio", "success");
				setTimeout(function() {								  				 
					window.location.replace("dashboard");//window.location.replace("productos.html");//	
					}, 3000);
            });
        });
        
        
        
        //Cerrar formulario business
         // $('.close-form-product').click(function () {
        $('.form-group').on('click','button#cancel-general.close-general', function() {
        	window.location.replace("dashboard");//window.location.replace("productos.html");//	
          });
        
        
        
        //Cerrar formulario 
         // $('.close-form-product').click(function () {
        $('.form-group').on('click','button#cancel-fiscal.close-fiscal', function() {
        	window.location.replace("dashboard");//window.location.replace("productos.html");//	
          });
        
    	
				  $('#somecomponent').locationpicker({
					location: {
						latitude: '19.4305018',
						longitude: '-99.157754'
					},
					radius: 300,
					inputBinding: {
						latitudeInput: $('#latitude'),
						longitudeInput: $('#longitude'),
						locationNameInput: $('#address')
					},
					enableAutocomplete: true,
					onchanged: function (currentLocation, radius, isMarkerDropped) {
						var addressComponents = $(this).locationpicker('map').location.addressComponents;
						updateControls(addressComponents);
					}
				});
				
				$('#con-close-modal').on('shown.bs.modal', function () {
				    $('#somecomponent').locationpicker('autosize');
				});
				  
				  
				  $('form').parsley({
						excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden], :hidden, .ignore-validation'
					});

			
                $('#basicwizard').bootstrapWizard({onNext: function(tab, navigation, index) {
						console.log("onNext");
						if(index==1) {
							// Make sure we entered the name
							//$('#businessForm').parsley();
							//var $valid = $("#businessForm").valid();
							
							var $valid = $('#businessForm').parsley().validate({group: 'block-' + index});
      
							if(!$valid) {
								$('#businessName').focus();
								return false;
							}else{
							var business = {};
							
							business.businessName = $("#businessName").val();
							business.description = $("#description").val();
							business.address = {};
							business.address.street = $("#street").val();
							business.address.zipCode = $("#zipCode").val();
							business.address.city = $("#city").val();
							business.address.state = $("#state").val();
							
							
							console.log("Send to WS Business/Branch: " + JSON.stringify(business));
							
							if ($( "#drop-business .dropify-wrapper" ).hasClass( "has-preview" ) )
								{
								var imgBusiness = $('#drop-business .dropify-wrapper .dropify-preview .dropify-render img').attr('src');
								
								console.log("imgBusiness: " + imgBusiness );
								}
							}
						}
						else if(index==2) {
							// Make sure we entered the name
							var $valid = $('#businessForm').parsley().validate({group: 'block-' + index});
							if(!$valid) {
								$('#userName').focus();
								return false;
							}else{
							var user = {};
							
							user.userName = $("#userName").val();
							user.lastName = $("#lastName").val();
							user.phone = $("#phone").val();
							
							
							console.log("Send to WS User: " + JSON.stringify(user));
							}
							
						}
						// Set the name for the next tab
						//$('#tab3').html('Hello, ' + $('#name').val());
			 
					}, onTabShow: function(tab, navigation, index) {
						console.log("onTabShow");
						var $total = navigation.find('li').length;
						var $current = index+1;
						console.log("$current: ",$current);
						
						if($current == 3){
							//spinner("Cargando datos")
							console.log("onTab 3");
							var tax = {}
							updateForm(tax, 'getConfigTaxesForm').done(function(data){
            					
            		            console.log("Taxes getTaxes: " + JSON.stringify(data))
            		                        		            
            		            if(data != null){
                		            $('#value').val(data.response.value)
                		            $('#percentage').val(data.response.percentage)  

                		            if(data.response.value === null){
                		            	$('#action').val("c")
                    		        } else {
                    		        	$('#action').val("u")
                        		    }

                		            $('#id').val(data.response.id)
									
									switch(data.response.taxApplyingTypeId) {
															case 2:
																$('#chkTax').prop('checked', true);
																$('#include').prop('checked', true);
																break;
															case 3:
																$('#chkTax').prop('checked', true);
																$('#plus').prop('checked', true);
																break;
															default:
																$('#chkTax').prop('checked', false);
																$("#percentage").prop('disabled', true);
																$("#value").prop('disabled', true);
														}
										
            		            }
            		            else failInResponse();
            		            							
            		        }).fail(function() {
            		        	failInResponse();
            		        });
                        }else if($current == 4){
							//spinner("Cargando datos")
							console.log("onTab 4");
							var tax = {}
							updateForm(tax, 'getConfigTicketForm').done(function(data){
            					
            		            console.log("Ticket getTicket: " + JSON.stringify(data))
            		                        		            
            		            if(data != null){
            		            	if(data.response != null){
	            		            	$('#header').val(data.response[0].header)
	            		            	$('#footer').val(data.response[0].footer)
	            		                document.getElementById("headerEdit").innerHTML = document.getElementById("header").value;
	            		                document.getElementById("footerEdit").innerHTML = document.getElementById("footer").value;
	            		                $("#_fileCuatro").attr('data-default-file', data.response[0].photoFileName);
	            		                $("#logoPrev").attr("src", data.response[0].photoFileName);  
	            		                $("#idTicket").val(data.response[0].id);
	            		                
	            		                $( ".dropify-wrapper" ).addClass( "has-preview" );
	            		    			
	            		    			$(".dropify-preview").attr({
	            		    				"style" : "display: block;"
	            		    			});	
	            		    			
	            		    			var foundTicket = $(".dropify-render").find("img");	
	            		    			var bg = data.response[0].photoFileName;	            		    			
	            		    			
	            		    			var foundDrops = $(".dropify-render")[2]; 	            		                	    
	            		    				foundDrops.setAttribute("id","img2ticket");
	            		    			
	            		                if (foundTicket.length <= 2) {
	            		                	$('#img2ticket').html('<img src="'+ bg +'" />');
		            		                } 
	            		                else if (foundTicket.length > 2){
		            		                	
		            		                	var foundImgDrops = $(".dropify-render")[2]; 	            		                	    
		            		                		foundImgDrops.setAttribute("id","img2ticketDrop");
		            		    				
		            		    				$('#img2ticketDrop').html('<img src="'+ bg +'" />');
		            		                	
		            		                }
	            		                
            		            	}
            		            }
            		            else continueToList();
            		            							
            		        }).fail(function() {
            		        	continueToList();
            		        });
                        }  
						
					},
					'tabClass': 'nav nav-tabs navtab-wizard nav-justified bg-muted'});

                
                $('#save-general').click(function () {
        				spinner("Guardando datos del negocio");
        		 });


        		$('#save-fiscal').click(function () {
        				spinner("Guardando datos fiscales");   
        			});
        		
    },
    //initilizing
    StoreFormComponent.prototype.init = function() {
        var $this = this;
        //document load initialization
        $(document).ready($this.onDocReady);
    },

    $.StoreFormComponent = new StoreFormComponent, $.StoreFormComponent.Constructor = StoreFormComponent

}(window.jQuery),

function($) {
    "use strict";

	
	  /**
	  *	Functions
	  */
	  
			

    var TaxEntity = function() {
        this.VERSION = "0.1",
        this.AUTHOR = "TPS",
        this.SUPPORT = "israel.gonzalez@gonet.us"
    };

     //on doc load
    TaxEntity.prototype.onDocReady = function(e) {
    	
    	$("#chkTax").change(function() {
			if(this.checked) {
    			$("#percentage").prop('disabled', false);
		    	$("#value").prop('disabled', false);
		    } else {
		    	$("#percentage").prop('disabled', true);
    			$("#value").prop('disabled', true);
		    	
		    }
		});
    	
    	$('#save-tax').click(function () {
			
			
			spinner("Guardando datos de Taxes");
		
			console.log("Guardando datos de Taxes");
			 
			 var $validTaxes = true;
			 
			 var chkTaxIsCchecked = $("#chkTax").is(':checked');
			console.log("chkTax is checked: ", chkTaxIsCchecked);
			if ( chkTaxIsCchecked ) $validTaxes  = $('#taxesForm').parsley().validate();			 
			 
			 var tax2Send = {};
			 
			 tax2Send.taxApplyingTypeId = !chkTaxIsCchecked ? 1 : $("#plus").is(':checked') ? 3 : 2;
			 tax2Send.value = $('#value').val();
			 tax2Send.percentage = $('#percentage').val();
			 tax2Send.id = $('#id').val();
			 
			 console.log("tax2Send: ", JSON.stringify(tax2Send));
			 
			if($validTaxes)
				{
				$('#taxesForm').parsley().reset();
				updateForm(tax2Send, 'saveConfigTaxes').done(function(data){
            					
            		            console.log("Taxes tax2Send: " + JSON.stringify(data))
            		                        		            
            		            console.log("responseCode: " + data.response.responseCode)
		            
								if(data.response.responseCode != "0000")  continueToList( data.response.responseMessage );
            		            							
            		        }).fail(function() {
								
							continueToList();
							
							});
				}			
				
			});
    	
    },
    //initilizing
    TaxEntity.prototype.init = function() {
        var $this = this;
        //document load initialization
        $(document).ready($this.onDocReady);
    },

    $.TaxEntity = new TaxEntity, $.TaxEntity.Constructor = TaxEntity
	
}(window.jQuery),

function($) {
    "use strict";

	
	  /**
	  *	Functions
	  */
	  
			

    var TicketEntity = function() {
        this.VERSION = "0.1",
        this.AUTHOR = "TPS",
        this.SUPPORT = "israel.gonzalez@gonet.us"
    };

     //on doc load
    TicketEntity.prototype.onDocReady = function(e) {

        var header = document.getElementById('header').value;
        var footer = document.getElementById('footer').value;
		document.getElementById("headerEdit").innerHTML = header;
        document.getElementById("footerEdit").innerHTML = footer;
    	
    	$("#header").on('keyup change',function(){
            var newHeader = document.getElementById('header').value; 
            var textHeader = newHeader.replace(/\r?\n/g, '<br />');
            document.getElementById("headerEdit").innerHTML = textHeader;
        });

        $("#footer").on('keyup change',function(){
            var newFooter = document.getElementById('footer').value;
            var textFooter = newFooter.replace(/\r?\n/g, '<br />');
            document.getElementById("footerEdit").innerHTML = textFooter;
        });
        
        var maxLength = 30;
        $('#header').on('input focus keydown keyup', function() {
            var text = $(this).val();
            var lines = text.split(/(\r\n|\n|\r)/gm); 
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].length > maxLength) {
                    lines[i] = lines[i].substring(0, maxLength);
                }
            }
            $(this).val(lines.join(''));
        });

        $('#footer').on('input focus keydown keyup', function() {
            var text = $(this).val();
            var lines = text.split(/(\r\n|\n|\r)/gm); 
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].length > maxLength) {
                    lines[i] = lines[i].substring(0, maxLength);
                }
            }
            $(this).val(lines.join(''));
        });
        

		$('#save-ticket').click(function () {
			
			console.log("on save-ticket");
			
			spinner("Guardando datos de Ticket");
			
			
			var  ticket2Send = {};
			
			ticket2Send.footer = $('#footer').val();			
			ticket2Send.header = $('#header').val();			
			ticket2Send.id = $('#idTicket').val();			
			ticket2Send.photoFileName = $('#photoFileNameTicket').val();
			

			 console.log("ticket2Send: ", JSON.stringify(ticket2Send));
			 
		
				updateForm(ticket2Send, 'saveConfigTicket').done(function(data){
           					
           		            console.log("Ticket ticket2Send: " + JSON.stringify(data))
           		                        		            
           		            console.log("responseCode: " + data.response.responseCode)
		            
								if(data.response.responseCode != "0000")  continueToList( data.response.responseMessage );
           		            							
           		        }).fail(function() {
								
							continueToList();
							
							});
					
			
			});
		
		
		$('#_fileCuatro').dropify().on("dropify.fileReady", function(event, previewable, src) {

			 //console.log("src: ",JSON.stringify(src));
			 
				$('#_imgHider').attr({
	                "src" : src
	            });
				
				$('#logoPrev').attr({
	                "src" : src
	            }); 
				
			});
		
		var drEvent = $('#_fileCuatro').dropify();
		drEvent.on('dropify.afterClear', function(event, element) {
			console.log("on dropify.afterClear ");
			$('#logoPrev').attr({
				"src" : ""
			});
			$('#_imgHider').attr({
				"src" : ""
			}); 
			});
		
        

    },
    //initilizing
    TicketEntity.prototype.init = function() {
        var $this = this;
        //document load initialization
        $(document).ready($this.onDocReady);
    },

    $.TicketEntity = new TicketEntity, $.TicketEntity.Constructor = TicketEntity
	
}(window.jQuery),
    //initializing main application module
function($) {
    "use strict";
    $.StoreFormComponent.init();
    $.TaxEntity.init();
    $.TicketEntity.init();
    
}(window.jQuery);




