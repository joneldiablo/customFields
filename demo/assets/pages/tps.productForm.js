/**
* ProductComponent
* Author: TPS
* Module/App: TPS Components js
*/


!function($) {
    "use strict";
	 

    
    
	 /**
	  *	Function cartesian
	  */
	  
		function cartesian(arg) {
			var r = [];
			//var arg = arguments;
			var max = arg.length-1;
			function helper(arr, i) {
				for (var j=0, l=arg[i].length; j<l; j++) {
					var a = arr.slice(0); // clone arr
					a.push(arg[i][j]);
					if (i==max){
						//r.push('[');
						//console.log("a: "+a);
						//console.log("typeof a: "+typeof ( a ));
						var combination = {};
						combination.modifiers = a;
						r.push(combination);							
						//r.push(']');
					}else
						helper(a, i+1);
				}
			}
			helper([], 0);
			return r;
		}
			
		//var cart = cartesian(["uno","dos"], ["tres","cuatro"], ["e","f","g"]);			
		//console.log("cart: "+JSON.stringify(cart));
		//console.log("cart length: "+cart.length);
	 
		/**
		  *	Function getCatalogList
		  */
		    function getCatalogList(catalogName, language){
				var d = $.Deferred();
		
				var metaToken = $("meta[name='_csrf']").attr("content");		    		 
				
				//console.log("JSON.stringify(jsonObj): ",JSON.stringify(jsonObj));
		  	    var catalogData = { "catalogName":catalogName, "language": language }; //"es" };
				
				$.ajax( 'ajaxCatalogRequest',
		        {method:'POST', 
					data: JSON.stringify(catalogData),
			        dataType: 'json',
			        contentType: "application/json", 
			        mimeType: 'application/json',
			        headers:{'X-CSRF-TOKEN':metaToken}}  
				).done(function(data){
					d.resolve(data);
				}).fail(d.reject); 
				return d.promise();
			}
		    
	 /**
	  *	Function buildVariants
	  */			 
				
		function buildVariants() {
		
			var optionList = [];			
			var modifiersList = [];
			
			//Recupera ID de cada div-option
			$( "div[id^='div-option']" ).each(function( index ) {
			  //console.log( index + ": " + this.id );
			  optionList.push(this.id.substring(10));
			});
			
			//Recupera value de cada input con "modifiers"
			$.each( optionList, function( key, value ) {
				//console.log( key + ": " + value );	
				var modifierValue = $('#modifier'+value).val();
				var newArray = modifierValue.split(",");
				modifiersList.push(newArray);
			});
			
			//console.log( "modifiersList: " + JSON.stringify(modifiersList) );	

			//Genera las variantes: la combinacion de los modificadores de cada opción
			var cart = cartesian(modifiersList);	
			//console.log("cart: "+JSON.stringify(cart));
			//console.log("cart length: "+cart.length);
			
			if(cart.length>0) $('#datatable-buttons').show();			
			$('#tbody-variants').html("");
			
			var checkId = 0;
			//Genera las filas correspondientes a las variantes
			$.each( cart, function( key, value ) {
				
				//console.log( "key1: " + key + ": " + JSON.stringify(value) );	
				var valueOption = value.modifiers;
				//var newArray = valueOption.split(",");
				var singleCombination = "";
				
				$.each( valueOption, function( key2, value2 ) {
					//console.log( "key2: " + key2 + ": " + value2 );
					if(value2.length>0) {
						singleCombination += '<button class="btn btn-success waves-effect waves-light btn-xs m-b-5 btn-mod">'+value2+'</button>';
					}else if(valueOption.length==1&&value2.length==0) {
						$('#datatable-buttons').hide();
					}							
				});
				
				$('#tbody-variants').append('<tr class="tr-variant" id="trVariant'+checkId+'"><td><div class="checkbox checkbox-primary"><input id="checkboxVariant'+checkId+'" type="checkbox" checked><label for="checkbox'+checkId+'"></label></div></td><td><div class="bootstrap-tagsinput tags-input" id="tagsVariant'+checkId+'">'+singleCombination+'</div></td><td><input type="text" id="barcodeVariant'+checkId+'" class="form-control input-caracter" required data-parsley-group="block-variant"></td><td><input type="text" id="skuVariant'+checkId+'" class="form-control input-caracter"></td><td><input type="number"  id="priceVariant'+checkId+'" class="form-control input-caracter" required data-parsley-min="0" data-parsley-group="block-variant"></td><td><input type="number" id="stockVariant'+checkId+'" class="form-control input-caracter" data-parsley-min="0" data-parsley-group="block-variant"></td></tr>');
				
				checkId++;
			});
			
		}		
		
	  /**
	  *	Function Hide Extra Items
	  */
	  
		function hideExtraItems() {
			if( !$( "div[id^='extraId']" ).length ){				
				$("#extras-headers").hide();			
				$("#remove-extras").hide();	
				$("#add-extra-div").hide();					
				$("#card-extras").addClass("card-box-empty");
			}
		}
		
	  /**
	  *	Function estimatePrice
	  */
	  
		function estimatePrice() {
			var cost = parseFloat( $('#cost').val() ).toFixed(2) ;
			var utility = parseFloat( $('#utility').val() ).toFixed(2);	
			
			if(cost=="" || cost== undefined || cost == NaN || cost == "NaN") cost = 0;
			if(utility=="" || utility== undefined || utility == NaN || utility == "NaN") utility = 0;			
			
			cost = cost * 1
			utility = utility * 1
			
			var price = cost + ( cost * (utility/100) );			
			$('#price').val( parseFloat( price ).toFixed(2) );	
		}
		
	  /**
	  *	Function estimatePrice
	  */
	  
		function estimateUtility() {
			var cost = parseFloat( $('#cost').val() ).toFixed(2) ;
			var price = parseFloat( $('#price').val() ).toFixed(2);	
			
			if(cost=="" || cost== undefined || cost == NaN || cost == "NaN") cost = 0;
			if(price=="" || price== undefined || price == NaN || price == "NaN") price = 0;
						
			cost = cost * 1;
			price = price * 1;
			
			var utility = ((price - cost) /cost )* (100) ;	
			$('#utility').val( parseFloat( utility ).toFixed(2));	
		}
	

		
	  /**
	  *	Function changeBtnCancel
	  */
	  
		function changeBtnCancel() {
    		$('#cancel-form-product').removeClass('close-form-product');
    		$('#cancel-form-product').addClass('cancel-form-product');
			$('#cancel-form-product').html("Cancelar");
			
		}
    /**
	 * ProductComponent
	 */	
    var ProductComponent = function() {
        this.VERSION = "0.1",
        this.AUTHOR = "TPS",
        this.SUPPORT = "israel.gonzalez@gonet.us"
    };
     //on doc load
    ProductComponent.prototype.onDocReady = function(e) {	
	
		
		
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
					window.location.replace("productlist");//window.location.replace("productos.html");//	
					}, 3000);
            });
        });
        
        
        
        //Cerrar formulario ver notificacion-> redirección a notificationList
         // $('.close-form-product').click(function () {
        $('.form-group').on('click','button#cancel-form-product.close-form-product', function() {
        	window.location.replace("productlist");//window.location.replace("productos.html");//	
          });
				
		//VALIDATE FORM PARLSLEY
		//$('form').parsley({
			//excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden], :hidden, .ignore-validation'
		//});
    	
    	$('#productForm').on('change','.form-control', function(event) {										
			//console.log("Chage productForm");
    		changeBtnCancel();
		});	
    	
    	$('#optionsForm').on('change','.form-control', function(event) {										
			//console.log("Chage productForm");
    		changeBtnCancel();
		});	
    	
    	$('#extraForm').on('change','.form-control', function(event) {										
			//console.log("Chage productForm");
    		changeBtnCancel();
		});	
    	
    	$('#inventoryForm').on('change','.form-control', function(event) {										
			//console.log("Chage productForm");
    		changeBtnCancel();
		});	
    	
    	$('#priceForm').on('change','.form-control', function(event) {										
			//console.log("Chage productForm");
    		changeBtnCancel();
		});	
		

		//Autocomplete INPUT Brands		
		var availableBrands = [];//["Adidas", "Nike", "Reebok"]; //
    	 getCatalogList("Cat_Brand", "es").done(function(data){			
             //console.log("getCatalogList: " + JSON.stringify(data));
             $( data.Cat_Brand ).each(function( index ) {						
				 //console.log( index + ": " + this.id );					
				 availableBrands.push( this.value );
			 });                  							
         });    	
		$("#brand").autocomplete({
			source: availableBrands
		});
		
		//Autocomplete INPUT Categories
		//var availableCats = ["Caballeros", "Damas", "Tecnología"];
		//$("#categories").autocomplete({source: availableCats});
		
		 
		var collectionsList = [];//["Navidad", "Primavera", "Día de la Madre"]; //[];
    	//Autocomplete Cat_CollectionList
    	 getCatalogList("Cat_CollectionList", "es").done(function(data){			
             //console.log("Cat_CollectionList: " + JSON.stringify(data));      
    		 $( data.Cat_CollectionList ).each(function( index ) {						
				 //console.log( index + ": " + this.id );					
    			 collectionsList.push( this.value );
			 }); 
         }); 
    	
		// SELECT Colections
		$('#colections').select2({
		  tags:collectionsList, //["Navidad", "Primavera", "Día de la Madre"],
		  tokenSeparators: [","]
		  });
	  					
		//EXTRAS
	  
		var itemsExtra =  [];//[{value: "10.00",label: "Bolsa"},{value: "20.00",label: "Caja"},{value: "50",label: "Bordado"}];
		//Autocomplete Cat_ToppingList
    	 getCatalogList("Cat_ToppingList", "es").done(function(data){			
             console.log("Cat_ToppingList: " + JSON.stringify(data)); 
             $( data.Cat_ToppingList ).each(function( index ) {						
				 //console.log( "this.doubleValue: " + this.doubleValue == 0 || this.doubleValue == "0" ? "0.00" : this.doubleValue);  			
				 //console.log( "this.value: " + this.value );              	
            	 itemsExtra.push( {value: this.doubleValue == 0 ? "0.00" : this.doubleValue , label: this.value} );
			 });  
         });		 
		//Autocomplete INPUT Extras
		$( ".label-extra" ).autocomplete({
		  minLength: 0,
		  source: itemsExtra,
		  focus: function( event, ui ) {
			$( ".label-extra" ).val( ui.item.label );
			return false;
		  },
		  select: function( event, ui ) {
			$( ".label-extra" ).val( ui.item.label );
			$( ".value-extra" ).val( ui.item.value );	 
			return false;
		  }
		});
		
		//Show row-extras to add new Extra Item
		$('#add-extras').click(function() {
			$("#add-extra-div").show();				
			$("#row-extras").show();
			$("#card-extras").removeClass("card-box-empty");
			
			var extrasLeft = $( "div[id^='extraIdNew']" ).length;						
			//console.log("extrasLeft... "+extrasLeft);
			if( extrasLeft > 0 ) {
				$("#remove-extras").show();	
				}
			
		});
			
		var extraIdNew = 0;		
		//Add Extra Item 
		$('#btn-add-extra').click(function() {
				//Validate input fields of extraForm
			var $valid = $('#extraForm').parsley().validate({group: 'block-1'});
					if(!$valid) {
						return false;
					}else{							
						//console.log("itemsExtra: ",JSON.stringify(itemsExtra));
						//console.log("label: ", $( ".label-extra" ).val() );
						//console.log("price: ", $( ".value-extra" ).val() 
						
						var extraLabel = $( ".label-extra" ).val();
						var extraPrice = $( ".value-extra" ).val();
							
						var newDiv = '<div class="form-group clearfix" id="extraIdNew' + extraIdNew + '"data-reference="extraIdNew"><div class="col-sm-7"><input type="text" class="form-control" readonly value="'+ extraLabel +'" id="extraName' + extraIdNew + '"/></div><div class="col-sm-3"><input type="number" class="form-control" readonly value="'+ extraPrice +'" id="extraPrice' + extraIdNew + '"/></div><div class="col-sm-1"><button class="btn btn-icon waves-effect waves-light btn-danger m-b-5" id="btnId' + extraIdNew + '" data-reference="extraIdNew"><i class="fa fa-remove" id="removeIconId' + extraIdNew + '" data-reference="extraIdNew"></i></button></div></div>'
												
						$('#extras-div').append(newDiv);
							
						$( ".label-extra" ).val( "" );
						$( ".value-extra" ).val( "" );
			
						var extrasLeft = $( "div[id^='extraIdNew']" ).length;						
						//console.log("extrasLeft... "+extrasLeft);
						if( extrasLeft > 0 ) {
							$("#row-extras").show();
							$("#extras-headers").show();
							$("#remove-extras").show();	
							$("#card-extras").removeClass("card-box-empty");
							}			
							
						 $("#add-extra-div").hide();
						 
						 extraIdNew++;	
						return false;								
					}
		});
			
		//Hide add-extra-div
		$('#btn-remove-extra').click(function() {
			$( ".label-extra" ).val( "" );
			$( ".value-extra" ).val( "" );
			$("#add-extra-div").hide();			
			hideExtraItems();			
			return false;
		});
		
		//Hide all Extra Items
		$('#remove-extras').click(function() {
			$("#row-extras").hide();		
			$("#remove-extras").hide();						
			$("#card-extras").addClass("card-box-empty");
		});
			
			
		$('#extras-div').on('click','div.form-group button', function(event) {
			console.log("btnId... "+event.target.id);
			var btnId = event.target.id.substring(5);
			console.log("id... "+btnId);
			
			var extraReference = $("#"+event.target.id).data( "reference" );			
			console.log("data-reference: "+ extraReference );
			
			//$("#extraIdNew"+btnId).remove();	
			$("#" + extraReference + btnId).remove();			
			hideExtraItems();
			return false;					
		});
			
		$('#extras-div').on('click','div.form-group i', function(event) {
			console.log("removeIconId... "+event.target.id);
			var removeIconId = event.target.id.substring(12);
			console.log("id... "+removeIconId);
			
			var extraReference = $("#"+event.target.id).data( "reference" );
			console.log("data-reference: "+extraReference);
			
			$("#" + extraReference + removeIconId).remove();	
			
			hideExtraItems(); 
			return false;
		});
			
		//END EXTRAS
				
		//VARIANTS    
		
		//Show 		
		$('#add-variants').click(function() {
			$("#row-variants").show();				
			$("#card-variants").removeClass("card-box-empty");		
			$("#remove-variants").show();		
			$("#add-variants").hide();
			//parsleyJs = new Parsley('#priceForm');			parsleyJs.reset(); 
		});		
				
		$('#remove-variants').click(function() {
			//$( "div[id^='extraIdNew']" ).remove();
			
			$("#row-variants").hide();							
			$("#card-variants").addClass("card-box-empty");		
			$("#remove-variants").hide();		
			$("#add-variants").show();
		});
				
		var newOptionId = 1;
		
		$('#btn-add-option').click(function() {
			var newVariant = '<div class="form-group" id="div-option'+newOptionId+'"><div class="col-md-3"><input type="text" placeholder="Nombre" id="option'+newOptionId+'" class="form-control option" required data-parsley-group="block-option"></div><div class="col-md-7"><input type="text" id="modifier'+newOptionId+'" class="form-control modifier" data-role="tagsinput" placeholder="Caracteristicas"/></div><div class="col-md-2"><button class="btn btn-icon waves-effect waves-light btn-danger m-b-5 visible-options" id="btn-remove-option'+newOptionId+'"><i class="fa fa-remove" id="removeOptionIconId' + newOptionId + '"></i></button></div></div>';					
			$('#optionsForm').append(newVariant);	
			
			$('#modifier'+newOptionId).tagsinput({
				maxTags: 3
			});
			
			newOptionId++;
			$('.visible-options').show();
			if($('.visible-options').length == 3) $('#btn-add-more-options').hide();
			
		});
				
		$('#optionsForm').on('click','div.form-group div.col-md-2 button.visible-options', function(event) {
			//console.log("btn-remove-option... "+event.target.id);
			var btnId = event.target.id.substring(17);
			//console.log("id... "+btnId);
			
			$("#div-option"+btnId).remove();
			
			var variantsLeft = $( "div[id^='div-option']" ).length;
			
			//console.log("variantsLeft... "+variantsLeft);
			if( variantsLeft == 1 ){
				$('.visible-options').hide();
			} 	
				
			if( variantsLeft > 1 ){
				$('#btn-add-more-options').show();
			} 	
				
			buildVariants();
			
			return false;
		});
		
		$('#optionsForm').on('click','div.form-group div.col-md-2 button.visible-options i', function(event) {
			//console.log("removeOptionIconId... "+event.target.id);
			var btnId = event.target.id.substring(18);
			//console.log("id... "+btnId);
			
			$("#div-option"+btnId).remove();
			
			var variantsLeft = $( "div[id^='div-option']" ).length;
			
			//console.log("variantsLeft... "+variantsLeft);
			if( variantsLeft == 1 ){
				$('.visible-options').hide();
			} 	
				
			if( variantsLeft > 1 ){
				$('#btn-add-more-options').show();
			} 		
				
			buildVariants();
			return false;
		});		
		
		$('#optionsForm').on('change','div.form-group input.modifier', function(event) {										
			buildVariants();
		});				
		
		
		//checkboxVariant
		$('#tbody-variants').on('change','tr.tr-variant td div.checkbox input[id^="checkboxVariant"]', function(event) {										
			//console.log("checkboxVariant id... "+this.id);
			
			var variantId = this.id.substring(15);			
			//console.log("variantId... "+variantId);
			
			if($("#"+this.id).is(':checked')) {  
				console.log( this.id + ": Está activado");  
				$( "#barcodeVariant"+variantId ).attr( "data-parsley-group", "block-variant" );
				$( "#priceVariant"+variantId ).attr( "data-parsley-group", "block-variant" );
				$( "#stockVariant"+variantId ).attr( "data-parsley-group", "block-variant" );
			} else {  
				console.log( this.id + ": No está activado");  
				$( "#barcodeVariant"+variantId ).attr( "data-parsley-group", "block-none" );
				$( "#priceVariant"+variantId ).attr( "data-parsley-group", "block-none" );
				$( "#stockVariant"+variantId ).attr( "data-parsley-group", "block-none" );
			}
		});
				
		//END VARIANTS
		
		//PRICE
		$('#cost').on('change', function(event) {										
			estimatePrice();
		});
		
		$('#utility').on('change', function(event) {										
			estimatePrice();
		});
		
		$('#price').on('change', function(event) {										
			estimateUtility();
		});		
		
		//END PRICE

    },
    //initilizing
    ProductComponent.prototype.init = function() {
        var $this = this;
        //document load initialization
        $(document).ready($this.onDocReady);
    },

    $.ProductComponent = new ProductComponent, $.ProductComponent.Constructor = ProductComponent

}(window.jQuery),

function($) {
    "use strict";

	
	  /**
	  *	Function SPINNER
	  */
	  
		function spinner() {
			
          swal({
              title: "Guardando Producto",
              text: "Espera un momento",
              imageUrl: "/TPSUserPortal/resources/assets/images/spinner.gif", //"assets/images/spinner.gif", //
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
		  *	Function updateEntityAlert
		  */
		  
			function updateEntityAlert(entityId, action, message) {
				
				swal({
                title: "¿Estás Seguro?",
                text: message,
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "Si, "+ action,
                cancelButtonText: "No",
                closeOnConfirm: false
            }, function () {
                swal({
					  title: "Actualizando Producto",
					  text: "Espera un momento",
					  imageUrl: "/TPSUserPortal/resources/assets/images/spinner.gif", //"assets/images/spinner.gif", //
					  showConfirmButton: false
				  })
				  console.log("Actualizando: "+entityId);
                	updateStatusEntity(entityId);
            });
			
			}

		
		  /**
		  *	Function deleteEntityAlert
		  */
		  
			function deleteEntityAlert(entityId) {
				
				swal({
                title: "¿Estás Seguro?",
                text: "Este producto ya no aparecerá en tu cátalogo y no puede deshacer esta acción",
                type: "error",
                showCancelButton: true,
                confirmButtonClass: 'btn-warning',
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No",
                closeOnConfirm: false
            }, function () {
                swal({
					  title: "Eliminando Producto",
					  text: "Espera un momento",
					  imageUrl: "/TPSUserPortal/resources/assets/images/spinner.gif", //"assets/images/spinner.gif", //
					  showConfirmButton: false
				  })
				  
				  console.log("Eliminando: "+entityId);
            });
			
			}
		
		
		
		
		        	
		

	 /**
	  *	Function updateEntity
	  */
	    function updateEntity(entity, urlWS){
			var d = $.Deferred();
	
			var metaToken = $("meta[name='_csrf']").attr("content");		    		 
			
			//console.log("JSON.stringify(jsonObj): ",JSON.stringify(jsonObj));
			
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
		}
			

		 /**
		  *	Function enableDisableEntity
		  */
	    
	    function enableDisableEntity(entity){
			var d = $.Deferred();
	
			var metaToken = $("meta[name='_csrf']").attr("content");		    		 
			
			console.log("JSON.stringify(entity): ",JSON.stringify(entity));
			
			$.ajax( 'updateDisabledRemoved',
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
		}
	    
	    
	    /**
		  *	Function updateStatusEntity
		  */
	    
	    function updateStatusEntity(entityId){
	    	
	    var entityToUpdate = {};
		 
		entityToUpdate.action = "u";
		entityToUpdate.entityName = "ProductParent";
		entityToUpdate.entityId = entityId;

		enableDisableEntity(entityToUpdate).done(function(data){
			
            console.log("updateStatusEntity entityToUpdate: " + JSON.stringify(data));
            
            console.log("responseCode: " + data.response.responseCode);
            
            if(data.response.responseCode == "0001") window.location.replace("/TPSUserPortal/sec/productlist");
            else continueToList( data.response.responseMessage );	
            							
	        }).fail(function() {
	
	        	console.log("Fallo ");
	        	
	        	continueToList();
	        });
		
		}
	    
	    
	    
	    
	    
			

    var SaveProduct = function() {
        this.VERSION = "0.1",
        this.AUTHOR = "TPS",
        this.SUPPORT = "israel.gonzalez@gonet.us"
    };

     //on doc load
    SaveProduct.prototype.onDocReady = function(e) {
		
      $('#save-form-editU').click(function () {
            console.log("Save product");
						
			var imagesList = [];						
			var extraList = [];										
			var variantList = [];	
			
			var $validProduct = $('#productForm').parsley().validate({group: 'block-product'});
			var	$validBarcode = false;
			var	$validPrice = false;	
			
							
			$validBarcode = $('#productForm').parsley().validate({group: 'block-barcode'});			
			$validPrice = $('#priceForm').parsley().validate({group: 'block-price'});
			
			
			if(!$validPrice || !$validProduct || !$validBarcode) {
				console.log("Fail valiation price, or product, or barcode");
				console.log("$validPrice: " + $validPrice);
				console.log("$validProduct: " + $validProduct);
				console.log("$validBarcode: " + $validBarcode);
				
				return false;
			}else{
				
				
				spinner();
				
				var base64Imgs = $("#entityImage").dropifyGallery("getImages");
				$.each(base64Imgs,function(i,elem){
					var indexBase = elem.src.indexOf("base64,");
					var imagen = {};
					imagen.priority = elem.sortValue;
					if(elem.base64){
						imagen.data = elem.src.substring(indexBase + 7);
					}else{
						imagen.url = elem.src;
					}
					imagesList.push(imagen);
				});
				
				/*var indexImg = 0;
				$("div[id^='img'].icon-galery").each(function(index) {
					var bg = $(this).css('background-image');
					bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
					var indexBase = bg.indexOf("base64,");

					var imagen = {};

					imagen.priority = indexImg;

					var imgBusiness = bg;

					if (bg.substring(0, 6) != "https:") {
						imgBusiness = imgBusiness.substring(indexBase + 7);
						imagen.data = imgBusiness;
					} else {
						imagen.url = imgBusiness;
					}

					imagesList.push(imagen);

					indexImg++
				});*/
				//console.log( "imagesList: " + JSON.stringify(imagesList) );
				
				if( !$('#card-extras').hasClass("card-box-empty") ){
				
					$( "div[id^='extraId']" ).each(function( index ) {
						  //console.log( index + ": " + this.id );
						  //variantList.push(this.id.substring(9));
						  
						  var extraReference = $("#"+this.id).data( "reference" );			
						  console.log("data-reference: "+ extraReference );
						  
						  var extraId = this.id.substring(extraReference.length);
						  var extra = {};
								
								extra.price = $('#extraPrice'+extraId).val();
								extra.name = $('#extraName'+extraId).val();
							
							extraList.push(extra);
						});						
						//console.log( "extraList: " + JSON.stringify(extraList) );
					}
				
				var product = {};
				
				product.id 			= $('#entityId').val();
				product.childId 	= $("#entityId").data( "childid" );
				product.name 		= $("#name").val();
				product.description = $("#description").val();
				product.barCode 	= $("#barcode").val();
				product.sku 		= $("#sku").val();
				product.unitId 		= $("#measureUnit").val();
				product.brandId		= $("#brand").val();

				var colectionList = [];
				var newArray = $("#colections").val().split(",");				
				$.each( newArray, function( key, value ) {
					var colection = {};					
					colection.name = value;
					colection.description = value;					
					colectionList.push(colection);
				});				
				product.collectionList = colectionList;		

				product.cost 		= $("#cost").val();
				product.price 		= $("#price").val();
				product.stockQuantity 		= $("#stock").val();
				
				product.hasTax	 	= $("#hasTax").is(':checked');
				product.hasStock 	= $("#stock4All").is(':checked');
				
				product.variantsList 		= variantList;	
				product.toppingList 		= extraList;	
				product.photoFileList 		= imagesList;						
				
				console.log( "product: " + JSON.stringify(product) );
				
				updateEntity(product, 'productEditForm').done(function(data){
					
		            console.log("updateEntity productEditForm: " + JSON.stringify(data));
		            
		            console.log("responseCode: " + data.response.responseCode);
		            
		            if(data.response.responseCode == "0000") window.location.replace("/TPSUserPortal/sec/productlist");
		            else continueToList();
		            							
		        }).fail(function() {
		        	continueToList();
		        });
				
				return false;
			}
			
        });
		
	
	  $('#save-form-editV').click(function () {
            console.log("Save product");
						
			var imagesList = [];						
			var extraList = [];										
			var variantList = [];	
			
			var $validProduct = $('#productForm').parsley().validate({group: 'block-product'});
			var	$validBarcode = false;
			var	$validPrice = false;	
			
			
			if( !$('#card-variants').hasClass("card-box-empty") ){
			
				var $validOptions = true; //$('#optionsForm').parsley().validate({group: 'block-option'});				
				var $validVariants = true; //$('#variantsForm').parsley().validate({group: 'block-variant'});				
				$validBarcode = true;			
				$validPrice = true;
				
				if( !$validVariants || !$validOptions || !$validProduct ) {	
				console.log("Fail valiation Variants, or product, or Options");
				console.log("$validVariants: " + $validVariants);
				console.log("$validOptions: " + $validOptions);
				console.log("$validBarcode: " + $validBarcode);			
					return false;
				}else{
					
					
					var optionList = [];						
					//Recupera ID de cada div-option 
					$( 'input[id^="option"]' ).each(function( index ) {						
						console.log( index + ": " + this.id );					
						console.log( index + ": " + this.value );
						
						optionList.push(this.value);
					});
					//console.log( "optionList: " + JSON.stringify(optionList) );
					
					//Recupera ID de cada  trVariant
					$( "tr[class^='tr-variant']" ).each(function( index ) {
					  //console.log( index + ": " + this.id );
					  //variantList.push(this.id.substring(9));
					  
					  var variantId = this.id.substring(9);
							
							var variant = {};
							
							variant.id 	= $("#"+this.id).data( "entityid" );
							variant.price = $('#priceVariant'+variantId).val();
							variant.barCode = $('#barcodeVariant'+variantId).val();
							variant.sku = $('#skuVariant'+variantId).val();
							variant.stockQuantity = $('#stockVariant'+variantId).val();
							
							var combination = [];
							var optionListId = 0;
							$( '#tagsVariant' + variantId + ' button' ).each(function( index, item ) {
								//console.log( "Combination: " + JSON.stringify(this.innerHTML) );
								//console.log( "Data-feature: " + $(item).data('feature') );
								
								combination.push({"name":$(item).data('feature'),"value":this.innerHTML});
								optionListId++;
							});
							
							console.log( "Variant"+variantId+": " + JSON.stringify(variant) );
							variant.featureList = combination;
							
							variantList.push(variant);
					
					});					
					//console.log( "variantList: " + JSON.stringify(variantList) );
					
				}
			};
			
			if(!$validPrice || !$validProduct || !$validBarcode) {
				console.log("Fail valiation price, or product, or barcode");
				console.log("$validPrice: " + $validPrice);
				console.log("$validProduct: " + $validProduct);
				console.log("$validBarcode: " + $validBarcode);
				
				return false;
			}else{
				
				
				spinner();
				
				
				var base64Imgs = $("#entityImage").dropifyGallery("getImages");
				$.each(base64Imgs,function(i,elem){
					var indexBase = elem.src.indexOf("base64,");
					var imagen = {};
					imagen.priority = elem.sortValue;
					if(elem.base64){
						imagen.data = elem.src.substring(indexBase + 7);
					}else{
						imagen.url = elem.src;
					}
					imagesList.push(imagen);
				});
				/*var indexImg = 0;
				$("div[id^='img'].icon-galery").each(function(index) {
					var bg = $(this).css('background-image');
					bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
					var indexBase = bg.indexOf("base64,");

					var imagen = {};

					imagen.priority = indexImg;

					var imgBusiness = bg;

					if (bg.substring(0, 6) != "https:") {
						imgBusiness = imgBusiness.substring(indexBase + 7);
						imagen.data = imgBusiness;
					} else {
						imagen.url = imgBusiness;
					}

					imagesList.push(imagen);

					indexImg++
				});*/
				//console.log( "imagesList: " + JSON.stringify(imagesList) );
				
				if( !$('#card-extras').hasClass("card-box-empty") ){
				
					$( "div[id^='extraId']" ).each(function( index ) {
						  //console.log( index + ": " + this.id );
						  //variantList.push(this.id.substring(9));
						  
						  var extraReference = $("#"+this.id).data( "reference" );			
						  console.log("data-reference: "+ extraReference );
						  
						  var extraId = this.id.substring(extraReference.length);
						  var extra = {};
								
								extra.price = $('#extraPrice'+extraId).val();
								extra.name = $('#extraName'+extraId).val();
							
							extraList.push(extra);
						});						
						//console.log( "extraList: " + JSON.stringify(extraList) );
					}
				
				var product = {};
				
				product.id 			= $('#entityId').val();				
				product.name 		= $("#name").val();
				product.description = $("#description").val();
				product.barCode 	= $("#barcode").val();
				product.sku 		= $("#sku").val();
				product.unitId 		= $("#measureUnit").val();
				product.brandId		= $("#brand").val();

				var colectionList = [];
				var newArray = $("#colections").val().split(",");				
				$.each( newArray, function( key, value ) {
					var colection = {};					
					colection.name = value;
					colection.description = value;					
					colectionList.push(colection);
				});				
				product.collectionList = colectionList;		

				product.cost 		= $("#cost").val();
				product.price 		= $("#price").val();
				product.stockQuantity 		= $("#stock").val();
				
				product.hasTax	 	= $("#hasTax").is(':checked');
				product.hasStock 	= $("#stock4All").is(':checked');
				
				product.variantsList 		= variantList;	
				product.toppingList 		= extraList;	
				product.photoFileList 		= imagesList;						
				
				console.log( "product: " + JSON.stringify(product) );
				
				updateEntity(product, 'productEditForm').done(function(data){
					
		            console.log("updateEntity productEditForm: " + JSON.stringify(data));
		            
		            console.log("responseCode: " + data.response.responseCode);
		            
		            if(data.response.responseCode == "0000") window.location.replace("/TPSUserPortal/sec/productlist");
		            else continueToList();
		            							
		        }).fail(function() {
		        	continueToList();
		        });
				
				return false;
			}
			
        });
		
		
		$('#disable-form-edit').click(function () {
			
            console.log("on disable-form-edit");
			var entityId = $('#entityId').val();
            console.log("Id: " + entityId);
			
			updateEntityAlert(entityId, "Deshabilitar", "Este producto ya no aparecerá en el cátalogo de la APP");			
			
        });
			

		$('#enable-form-edit').click(function () {
			
            console.log("on disable-form-edit");
			var entityId = $('#entityId').val();
            console.log("Id: " + entityId);
			
			updateEntityAlert(entityId, "Habilitar", "Este producto aparecerá en el cátalogo de la APP");						
			
        });
		
		
		$('#delete-form-edit').click(function () {
			
            console.log("on delete-form-edit");
			var entityId = $('#entityId').val();
            console.log("Id: " + entityId);
			
			deleteEntityAlert(entityId);
        });

    },
    //initilizing
    SaveProduct.prototype.init = function() {
        var $this = this;
        //document load initialization
        $(document).ready($this.onDocReady);
    },
    
	
    $.SaveProduct = new SaveProduct, $.SaveProduct.Constructor = SaveProduct
	
}(window.jQuery),

function($) {
    "use strict";	

    var UpdateFormUnique = function() {
        this.VERSION = "0.1",
        this.AUTHOR = "TPS",
        this.SUPPORT = "israel.gonzalez@gonet.us"
    };

     //on doc load
    UpdateFormUnique.prototype.onDocReady = function(entity, variants) {	
		console.log("UpdateFormUnique.prototype.onDocReady...");
				
		console.log("entity: "+  JSON.stringify( entity ) );
		console.log("variants: "+  JSON.stringify( variants ) ); 
		
		$('#name').val(entity.name);
                $('#description').val(entity.description);
                $('#brand').val(entity.brandId);
                $('#entityId').val(entity.id);

                var collecttions = [];

                if(entity.collectionList != null && entity.collectionList.length)
                    {
        			$( entity.collectionList ).each(function( index ) {		
        				//console.log( "this.name: " + this.name );				
        				collecttions.push(this.name);					
        			});
                    }                

                if(entity.photoFileList.length)
                    {
                	//código sustituye al que está comentado en las siguientes líneas, implementa dropify.gallery
                	var imagesList=[];
        			$.each(entity.photoFileList, function(i,elem){
        				var image = {};
        				image.src = elem.url;
        				image.sortValue = elem.priority;
        				imagesList.push(image);
        			}); // sort elements
            
        			$("#entityImage").dropifyGallery({imgs:imagesList});
        			$("#entityImage").parent().find(".dropify-preview").show();
        			
        			/*
                	$( ".dropify-wrapper" ).addClass( "has-preview" );
        			
        			$(".dropify-preview").attr({
        				"style" : "display: block;"
        			});	

        			var photoFileListSorted = $(entity.photoFileList).sort(sort_li); // sort elements
					                    
					//console.log( "photoFileListSorted: " + JSON.stringify( photoFileListSorted ) ); 					                    
					  // sort function callback
					  function sort_li(a, b){
							//console.log(  "a.priority: " + a.priority ); 
							//console.log(  "b.priority: " + b.priority ); 					  
					      return (b.priority) < (a.priority) ? 1 : -1;    
					  }

					var newId = 0;
        			$( photoFileListSorted ).each(function( index ) {						
        				//console.log( index + ": " + this.id );        				
        				var li = $("<li />", {
							"class" : "ui-sortable-handle"
						});
						var preview = $("<div></div>", {
                            id : "img" + newId,
                            "class" : "icon-galery",
							"css" : {
								width : "100%",
								height : "100%",
								backgroundImage : "url(" + this.url + ")",
								backgroundSize : "contain",
								backgroundRepeat : "no-repeat",
								backgroundPosition : "center",
								backgroundColor : "#ebf0f3"
							}
						});
						$('.ui-sortable').append(li.append(preview));
						newId++;
        			});
        			$( "#img0" ).click();      */
                    }
					
				if(entity.toppingList != null && entity.toppingList.length)
                    {					
					//$("#add-extra-div").show();				
					$("#row-extras").show();
					$("#card-extras").removeClass("card-box-empty");
			
					var extraId = 1000;
					
        			$( entity.toppingList ).each(function( index ) {	
						var newDiv = '<div class="form-group clearfix" id="extraId' + extraId + '" data-reference="extraId"><div class="col-sm-7"><input type="text" class="form-control" readonly value="'+ this.name +'" id="extraName' + extraId + '"/></div><div class="col-sm-3"><input type="number" class="form-control" readonly value="'+ this.price +'" id="extraPrice' + extraId + '"/></div><div class="col-sm-1"><button class="btn btn-icon waves-effect waves-light btn-danger m-b-5" id="btnId' + extraId + '" data-reference="extraId"><i class="fa fa-remove" id="removeIconId' + extraId + '" data-reference="extraId"></i></button></div></div>'												
						$('#extras-div').append(newDiv);						
						extraId++;
        			});
                    } 					
					
                $('#hasTax').prop('checked', entity.hasTax);
    			var $colections = $("#colections");
				$colections.val(collecttions).trigger("change");
				
				
				$( variants ).each(function( index ) {	
					$("#entityId").attr({"data-childid" : this.id});	
					$('#barcode').val(this.barCode);
					$('#sku').val(this.sku);
					$('#cost').val(this.inventory.cost);					
					$('#price').val(this.inventory.priceList[0].value);
					$('#stock').val(this.inventory.stockQuantity);	
					

					var cost = this.inventory.cost * 1;
					var price = this.inventory.priceList[0].value * 1;
					
					var utility = ((price - cost) /cost )* (100) ;	
					$('#utility').val( parseFloat( utility ).toFixed(2));
					
					
        			});
			
			
			function changeBtnClose() {
				$('#cancel-form-product').addClass('close-form-product');
				$('#cancel-form-product').removeClass('cancel-form-product');			
				$('#cancel-form-product').html("Cerrar");				
			}
			
			changeBtnClose();
			

			
			if(entity.disabled)
		    	{
		    	$('#entityStatus').html('DESHABILIDATO');
		    	
		    	$("#productForm :input").attr("disabled", true);
		
		    	$("#inventoryForm :input").attr("disabled", true);
		
		    	$("#variantsForm :input").attr("disabled", true);
		
		    	$("#priceForm :input").attr("disabled", true);
		
		    	$("#add-extras").hide();
		
		    	$("button[id^='btnId']").hide();
		
		    	$("#galery-content").hide();
		
		    	$("#save-form-editU").hide();
            	
            	$("#disable-form-edit").hide();
            	
            	$("#enable-form-edit").show();
		    	}

    },
    //initilizing
    UpdateFormUnique.prototype.init = function( entity, variants ) {
		//console.log("UpdateFormUnique.prototype.init...");
		//console.log("entity: "+  JSON.stringify( entity ) );		
		
        var $this = this;
        //document load initialization
        $(document).ready($this.onDocReady(entity, variants));
    },

    $.UpdateFormUnique = new UpdateFormUnique, $.UpdateFormUnique.Constructor = UpdateFormUnique
	
}(window.jQuery),

function($) {
    "use strict";	

    var UpdateFormVariants = function() {
        this.VERSION = "0.1",
        this.AUTHOR = "TPS",
        this.SUPPORT = "israel.gonzalez@gonet.us"
    };

     //on doc load
    UpdateFormVariants.prototype.onDocReady = function(entity, variants) {	
		console.log("UpdateFormVariants.prototype.onDocReady...");
				
		console.log("entity: "+  JSON.stringify( entity ) );
		console.log("variants: "+  JSON.stringify( variants ) ); 
								
                $('#name').val(entity.name);
                $('#description').val(entity.description);
                $('#brand').val(entity.brandId);
                $('#entityId').val(entity.id);

                var collecttions = [];

                if(entity.collectionList != null && entity.collectionList.length)
                    {
        			$( entity.collectionList ).each(function( index ) {		
        				//console.log( "this.name: " + this.name );				
        				collecttions.push(this.name);					
        			});
                    }                

                if(entity.photoFileList.length)
                    {
                	//código sustituye al que está comentado en las siguientes líneas, implementa dropify.gallery
                	var imagesList=[];
        			$.each(entity.photoFileList, function(i,elem){
        				var image = {};
        				image.src = elem.url;
        				image.sortValue = elem.priority;
        				imagesList.push(image);
        			}); // sort elements
            
        			$("#entityImage").dropifyGallery({imgs:imagesList});
        			$("#entityImage").parent().find(".dropify-preview").show();
                	/*$( ".dropify-wrapper" ).addClass( "has-preview" );
        			
        			$(".dropify-preview").attr({
        				"style" : "display: block;"
        			});	

        			var photoFileListSorted = $(entity.photoFileList).sort(sort_li); // sort elements
					                    
					//console.log( "photoFileListSorted: " + JSON.stringify( photoFileListSorted ) ); 					                    
					  // sort function callback
					  function sort_li(a, b){
							//console.log(  "a.priority: " + a.priority ); 
							//console.log(  "b.priority: " + b.priority ); 					  
					      return (b.priority) < (a.priority) ? 1 : -1;    
					  }

					var newId = 0;
        			$( photoFileListSorted ).each(function( index ) {						
        				//console.log( index + ": " + this.id );        				
        				var li = $("<li />", {
							"class" : "ui-sortable-handle"
						});
						var preview = $("<div></div>", {
                            id : "img" + newId,
                            "class" : "icon-galery",
							"css" : {
								width : "100%",
								height : "100%",
								backgroundImage : "url(" + this.url + ")",
								backgroundSize : "contain",
								backgroundRepeat : "no-repeat",
								backgroundPosition : "center",
								backgroundColor : "#ebf0f3"
							}
						});
						$('.ui-sortable').append(li.append(preview));
						newId++;
        			});
        			$( "#img0" ).click();        	*/		
                    }
					
				if(entity.toppingList != null && entity.toppingList.length)
                    {					
					//$("#add-extra-div").show();				
					$("#row-extras").show();
					$("#card-extras").removeClass("card-box-empty");
			
					var extraId = 1000;
					
        			$( entity.toppingList ).each(function( index ) {	
						var newDiv = '<div class="form-group clearfix" id="extraId' + extraId + '" data-reference="extraId"><div class="col-sm-7"><input type="text" class="form-control" readonly value="'+ this.name +'" id="extraName' + extraId + '"/></div><div class="col-sm-3"><input type="number" class="form-control" readonly value="'+ this.price +'" id="extraPrice' + extraId + '"/></div><div class="col-sm-1"><button class="btn btn-icon waves-effect waves-light btn-danger m-b-5" id="btnId' + extraId + '" data-reference="extraId"><i class="fa fa-remove" id="removeIconId' + extraId + '" data-reference="extraId"></i></button></div></div>'												
						$('#extras-div').append(newDiv);						
						extraId++;
        			});
                    } 					
					
                $('#hasTax').prop('checked', entity.hasTax);
    			var $colections = $("#colections");
				$colections.val(collecttions).trigger("change");
				
				
				
				var checkId = 0;
				$( variants ).each(function( index ) {	
					var singleCombination = "";
					
					$.each( this.featureList, function( index2 ) {
						singleCombination += '<button class="btn btn-success waves-effect waves-light btn-xs m-b-5 btn-mod" data-feature="'+this.name+'">'+this.value+'</button>';										
					});
				
					var newVariant = '<tr class="tr-variant" id="trVariant'+checkId+'" data-entityid="'+ this.id +'">'
										+ '<td>'
										+	'<div class="bootstrap-tagsinput tags-input" id="tagsVariant'+checkId+'">'+singleCombination+'</div>'
										+ '</td>'
										+ '<td>'
										+	'<input type="text" value="'+ this.barCode +'" id="barcodeVariant'+checkId+'" class="form-control input-caracter" required data-parsley-group="block-variant">'
										+ '</td>'
										+ '<td>'
										+	'<input type="text" value="'+ this.sku +'" id="skuVariant'+checkId+'" class="form-control input-caracter">'
										+ '</td>'
										+ '<td>'
										+	'<input type="number" value="'+ this.inventory.priceList[0].value +'" id="priceVariant'+checkId+'" class="form-control input-caracter" required data-parsley-min="0" data-parsley-group="block-variant">'
										+ '</td>'
										+ '<td>'
										+ 	'<input type="number" value="'+ this.inventory.stockQuantity +'" id="stockVariant'+checkId+'" class="form-control input-caracter" data-parsley-min="0" data-parsley-group="block-variant">'
										+ '</td>'
									+ '</tr>';					
					
					$('#tbody-variants').append(newVariant);
					checkId++;
        			});			
				
				
			function changeBtnClose() {
				$('#cancel-form-product').addClass('close-form-product');
				$('#cancel-form-product').removeClass('cancel-form-product');			
				$('#cancel-form-product').html("Cerrar");				
			}
			
			changeBtnClose();
			
			$('#tbody-variants').on('click','button', function(event) {
				//console.log("btn btn-success... ");
				return false;					
			});
			

            
            if(entity.disabled)
            	{
            	$('#entityStatus').html('DESHABILIDATO');
            	
            	$("#productForm :input").attr("disabled", true);

            	$("#inventoryForm :input").attr("disabled", true);

            	$("#variantsForm :input").attr("disabled", true);

            	$("#add-extras").hide();

            	$("button[id^='btnId']").hide();

            	$("#galery-content").hide();

            	$("#save-form-editV").hide();
            	
            	$("#disable-form-edit").hide();
            	
            	$("#enable-form-edit").show();
            	
            	
            	}

    },
    //initilizing
    UpdateFormVariants.prototype.init = function( entity, variants ) {
		//console.log("UpdateFormVariants.prototype.init...");
		//console.log("entity: "+  JSON.stringify( entity ) );		
		
        var $this = this;
        //document load initialization
        $(document).ready($this.onDocReady(entity, variants));
    },

    $.UpdateFormVariants = new UpdateFormVariants, $.UpdateFormVariants.Constructor = UpdateFormVariants
	
}(window.jQuery),
    //initializing main application module
function($) {
    "use strict";
    $.ProductComponent.init();
    $.SaveProduct.init();
}(window.jQuery);




