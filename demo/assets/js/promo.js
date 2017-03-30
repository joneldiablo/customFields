 !function(a) {
				a.fn.datepicker.dates.es = {
					days : [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves",
							"Viernes", "Sábado" ],
					daysShort : [ "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb" ],
					daysMin : [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
					months : [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
							"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre",
							"Diciembre" ],
					monthsShort : [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago",
							"Sep", "Oct", "Nov", "Dic" ],
					today : "Hoy",
					monthsTitle : "Meses",
					clear : "Borrar",
					weekStart : 1,
					format : "dd/mm/yyyy"
				}
			}(jQuery);
			
			

	        var date = new Date();
	        date.setDate(date.getDate());

	        var dd = date.getDate();
	        var mm = date.getMonth()+1; //January is 0!

	        var yyyy = date.getFullYear();
	        if(dd<10){
	            dd='0'+dd;
	        } 
	        if(mm<10){
	            mm='0'+mm;
	        } 
	        var today = dd+'/'+mm+'/'+yyyy;


	        $('#startDate').val(today);
	        $('#endDate').val(today);

	        jQuery('#startDate').datepicker({
	        	language : "es",
	        	startDate : date,
	        	format : "dd/mm/yyyy",
	        	autoclose : true,
	        	todayHighlight : true,
	        	minDate : new Date()
	        });

	        jQuery('#startDate').change(
	        		function() {

	        			if ($('#startDate').val() > $('#endDate').val()) {
//	        				swal({
//	        					title : "Fecha Incorrecta",
//	        					text : "La fecha no puede ser mayor a la fecha final "
//	        							+ $('#endDate').val(),
//	        					type : "warning",
//	        					showCancelButton : false,
//	        					confirmButtonClass : 'btn-warning',
//	        					confirmButtonText : "Ok",
//	        					closeOnConfirm : false
//	        				});

	        				$('#endDate').val($('#startDate').val());
	        			}
	        		});

	        jQuery('#endDate').datepicker({
	        	language : "es",
	        	startDate : date,
	        	format : "dd/mm/yyyy",
	        	autoclose : true,
	        	todayHighlight : true,
	        	minDate : new Date()
	        });

	        jQuery('#endDate').change(
	        		function() {
	        			if ($('#startDate').val() > $('#endDate').val()) {
//	        				swal({
//	        					title : "Fecha Incorrecta",
//	        					text : "La fecha no puede ser menor a la fecha inicial "
//	        							+ $('#startDate').val(),
//	        					type : "warning",
//	        					showCancelButton : false,
//	        					confirmButtonClass : 'btn-warning',
//	        					confirmButtonText : "Ok",
//	        					closeOnConfirm : false
//	        				});

	        				$('#startDate').val($('#endDate').val());

	        			}

	        		});







