var count = 0;

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


$('#datepicker').val(today);
$('#datepicker-autoclose').val(today);

jQuery('#datepicker').datepicker({
	startDate : date,
	format : "dd/mm/yyyy",
	autoclose : true,
	language : "es",
	todayHighlight : true,
});

jQuery('#datepicker').change(
		function() {

			if ($('#datepicker').val() > $('#datepicker-autoclose').val()) {
//				swal({
//					title : "Fecha Incorrecta",
//					text : "La fecha no puede ser mayor a la fecha final "
//							+ $('#datepicker-autoclose').val(),
//					type : "warning",
//					showCancelButton : false,
//					confirmButtonClass : 'btn-warning',
//					confirmButtonText : "Ok",
//					closeOnConfirm : false
//				});

				$('#datepicker-autoclose').val($('#datepicker').val());
			}
		});

jQuery('#datepicker-autoclose').datepicker({
	language : "es",
	startDate : date,
	format : "dd/mm/yyyy",
	autoclose : true,
	todayHighlight : true,
	minDate : new Date()
});

jQuery('#datepicker-autoclose').change(
		function() {
			if ($('#datepicker').val() > $('#datepicker-autoclose').val()) {
//				swal({
//					title : "Fecha Incorrecta",
//					text : "La fecha no puede ser menor a la fecha inicial "
//							+ $('#datepicker').val(),
//					type : "warning",
//					showCancelButton : false,
//					confirmButtonClass : 'btn-warning',
//					confirmButtonText : "Ok",
//					closeOnConfirm : false
//				});

				$('#datepicker').val($('#datepicker-autoclose').val());

			}

		});

var metaToken = $("meta[name='_csrf']").attr("content");

var catalogName = "Cat_Branch";

var next = 1;

var optionsSurvey = [];

var catalogData = {
	"catalogName" : catalogName,
	"language" : "es"
};

$('#questionSurvey').on('change', function() {
	var val = this.value;
	modalDraw(val);

});

function hideDiv(idDiv) {

	document.getElementById(idDiv).style.display = 'none';
}

function showDiv(idDiv) {
	document.getElementById(idDiv).style.display = 'block';

}

function createQuestion() {
	 var i=0;
	var questionSurvey = $("#questionSurvey").val();

	var flag = true;

	var $validQuestion = $('#multipleChoiceSurvey').parsley().validate({
		group : 'block-question'
	});
	if (questionSurvey == 6) {
		var $validFromD = $('#multipleChoiceSurvey').parsley().validate({
			group : 'block-fromD'
		});
		var $validToD = $('#multipleChoiceSurvey').parsley().validate({
			group : 'block-fromTo'
		});
		
		if (!$validQuestion || !$validFromD || !$validToD) {
			flag = false;
		}
		
		var rangeFrom =$("#rangeFrom").val();
		var rangeTo =$("#rangeTo").val();
		
		if(rangeFrom > rangeTo){
			swal({
				title : "Rango desde",
				text : "El rango debe ser menor a " + rangeTo ,
				type : "warning",
				showCancelButton : false,
				confirmButtonClass : 'btn-warning',
				confirmButtonText : "Ok",
				closeOnConfirm : false
			});
			
			flag = false;
		}
	} else if (questionSurvey == 2 || questionSurvey == 4) {

		var $validField1 = $('#multipleChoiceSurvey').parsley().validate({
			group : 'block-field1'
		});

		var optionsQuestion1 = [];

		$("#fields :input").each(function() {
			try {
				var input = $(this);

				var val = input.attr('name');

				var n = val.includes("field");
				if (n) {
					i++;

				}
			} catch (err) {

			}

		});
		if (!$validQuestion || !$validField1) {
			flag = false;
		}

		if (i < 2 && questionSurvey == 2) {

			swal({
				title : "Opcion Multiple sencilla",
				text : "Debe contener al menos 2 opciones",
				type : "warning",
				showCancelButton : false,
				confirmButtonClass : 'btn-warning',
				confirmButtonText : "Ok",
				closeOnConfirm : false
			});
			flag = false;
		}

		if (i < 3 && questionSurvey == 4) {

			swal({
				title : "Opcion Multiple respuesta multiple",
				text : "Debe contener al menos 3 opciones",
				type : "warning",
				showCancelButton : false,
				confirmButtonClass : 'btn-warning',
				confirmButtonText : "Ok",
				closeOnConfirm : false
			});

			flag = false;
		}

	}

	if (!flag || !$validQuestion) {

		return false;
	} else {

		var questionComplete = $("#questionComplete").val();
		var rangeFrom = $("#rangeFrom").val();
		var rangeTo = $("#rangeTo").val();
		var optionsQuestion = [];

		var buttons = '<td class="text-center min-action">  <a onclick="editwin()" data-animation="fadein" data-plugin="custommodal" data-overlaySpeed="200" data-overlayColor="#36404a"> <i class="fa fa-pencil" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="" data-original-title="Editar"></i> </a> <a onclick="deleteQuestion()"> <i class="fa fa-trash" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="" data-original-title="Eliminar" id="delate-alert"></i></td>';

		$("#multipleChoiceSurvey :input").each(function() {
			var input = $(this);

			var val = input.attr('name');
			if (input.val() != "") {
				optionsQuestion.push(val + ":" + input.val())
			}
		});

		count++;

		var t = $('#datatable-buttons').DataTable();
		t.row.add(
				[ count, questionComplete, buttons, questionSurvey, rangeFrom,
						rangeTo, optionsQuestion ]).draw(false);

		$('#myModal').modal('hide');
	}
}

function newwin() {

	hideDiv('rangeSurvey');
	showDiv("salvarModal");
	hideDiv("actualizarModal");

	$("#questionComplete").val("");
	$("#rangeFrom").val("");
	$("#rangeTo").val("");

	borradoOpciones();
	$('#myModal').modal('show');

}

function borradoOpciones() {
	$("#fields :input").each(function() {
		try {
			var input = $(this);

			var val = input.attr('name');

			var n = val.includes("field");
			if (n) {
				var rem = val.split("field");
				var rem1 = rem[1].split(",");
				$("#field" + rem1).remove();
				$("#remove" + rem1).remove();

			}
		} catch (err) {

		}

	});
	var b1 = "#b1";
	var newIn = '<input autocomplete="off" class="input" id="field1'
			+ '" name="field1" required data-parsley-group="block-field1" '
			+ '" placeholder="Escribe respuesta " type="text" data-items="8">';
	var newInput = $(newIn);
	$(b1).before(newInput);
	next = 1;
	$("#count").val(next);
}

var row;
function editwin() {

	showDiv("actualizarModal");
	hideDiv("salvarModal");
	borradoOpciones();
	var table = $('#datatable-buttons').DataTable();
	$('#datatable-buttons tbody')
			.on(
					'click',
					'tr',
					function() {
						borradoOpciones();
						var rowValue1 = table.row(this).data();
						var q = rowValue1[6];

						for (x = 0; x < q.length; x++) {
							try {
								var n = q[x].includes("field");
								if (n) {
									var res = q[x].split(":");

									var addto = "#field" + next;
									var addRemove = "#field" + next;
									next = next + 1;
									var newIn = '<input autocomplete="off" class="input" id="field'
											+ next
											+ '" name="field'
											+ next
											+ '" placeholder="Escribe respuesta " type="text" data-items="8">';

									var newInput = $(newIn);
									var removeBtn = '<button id="remove'
											+ (next - 1)
											+ '" class="btn btn-danger remove-me" >-</button>&nbsp;';
									var removeButton = $(removeBtn);
									$(addto).after(newInput);
									$(addto).val(res[1]);
									$(addRemove).after(removeButton);
									$("#field" + next).attr('data-source',
											$(addto).attr('data-source'));
								}

							} catch (err) {

							}
						}

						$('.remove-me').dblclick(function(e) {

							var fieldNum = this.id.charAt(this.id.length - 1);
							var fieldID = "#field" + fieldNum;
							$(this).remove();
							$(fieldID).remove();
						});

						$("#count").val(next);

						$("#questionSurvey").val(rowValue1[3]);
						$("#questionComplete").val(rowValue1[1]);
						$("#rangeFrom").val(rowValue1[4]);
						$("#rangeTo").val(rowValue1[5]);
						modalDraw(rowValue1[3]);
						row = this;
					});

	$('#myModal').modal('show');

}

function hideModal() {

	borradoOpciones();
	$('#myModal').modal('hide');

}

function updateQuestion() {

	 var i=0;
		var questionSurvey = $("#questionSurvey").val();

		var flag = true;

		var $validQuestion = $('#multipleChoiceSurvey').parsley().validate({
			group : 'block-question'
		});
		if (questionSurvey == 6) {
			var $validFromD = $('#multipleChoiceSurvey').parsley().validate({
				group : 'block-fromD'
			});
			var $validToD = $('#multipleChoiceSurvey').parsley().validate({
				group : 'block-fromTo'
			});
			
			if (!$validQuestion || !$validFromD || !$validToD) {
				flag = false;
			}
			
			var rangeFrom =$("#rangeFrom").val();
			var rangeTo =$("#rangeTo").val();
			
			if(rangeFrom >= rangeTo){
				swal({
					title : "Rango desde",
					text : "El rango debe ser menor a " + rangeTo ,
					type : "warning",
					showCancelButton : false,
					confirmButtonClass : 'btn-warning',
					confirmButtonText : "Ok",
					closeOnConfirm : false
				});
				
				flag = false;
			}
		} else if (questionSurvey == 2 || questionSurvey == 4) {

			var $validField1 = $('#multipleChoiceSurvey').parsley().validate({
				group : 'block-field1'
			});

			var optionsQuestion1 = [];

			$("#fields :input").each(function() {
				try {
					var input = $(this);

					var val = input.attr('name');

					var n = val.includes("field");
					if (n) {
						i++;

					}
				} catch (err) {

				}

			});
			if (!$validQuestion || !$validField1) {
				flag = false;
			}

			if (i < 2 && questionSurvey == 2) {

				swal({
					title : "Opcion Multiple sencilla",
					text : "Debe contener al menos 2 opciones",
					type : "warning",
					showCancelButton : false,
					confirmButtonClass : 'btn-warning',
					confirmButtonText : "Ok",
					closeOnConfirm : false
				});
				flag = false;
			}

			if (i < 3 && questionSurvey == 4) {

				swal({
					title : "Opcion Multiple respuesta multiple",
					text : "Debe contener al menos 3 opciones",
					type : "warning",
					showCancelButton : false,
					confirmButtonClass : 'btn-warning',
					confirmButtonText : "Ok",
					closeOnConfirm : false
				});

				flag = false;
			}

		}

		if (!flag || !$validQuestion) {

			return false;
	} else {

		var updateOptions = [];
		$("#fields :input").each(function() {
			var input = $(this);

			try {
				var val = input.attr('name');

				var n = val.includes("field");
				if (n) {

					if (input.val() != "") {
						updateOptions.push(val + ":" + input.val());
					}

				}

			} catch (err) {

			}

		});

		var table = $('#datatable-buttons').DataTable();
		var d = table.row(row).data();
		d[1] = $("#questionComplete").val();
		d[3] = $("#questionSurvey").val();
		d[4] = $("#rangeFrom").val();
		d[5] = $("#rangeTo").val();
		d[6] = updateOptions;
		table.row(row).data(d).draw(false);
		borradoOpciones();

		$('#myModal').modal('hide');
	}
}

function modalDraw(val) {
	switch (val) {
	case "2":
	case "4":
		hideDiv('rangeSurvey');
		showDiv('fields');
		$("#rangeFrom").val("");
		$("#rangeTo").val("");
		break;
	case "6":
		hideDiv('fields');
		showDiv('rangeSurvey');
		borradoOpciones();
		break;
	default:
		hideDiv('fields');
		hideDiv('rangeSurvey');
		borradoOpciones();
		break;
	}
}

function showModalEdit(questionid) {

}

function deleteQuestion() {

	var table = $('#datatable-buttons').DataTable();
	var ind;
	$('#datatable-buttons tbody').on('click', 'tr', function() {
		ind = this;
	});
	table.row(ind).remove().draw();

}

function updateEntity(entity, urlWS) {
	var d = $.Deferred();

	var metaToken = $("meta[name='_csrf']").attr("content");

	console.log("JSON.stringify(jsonObj): ", JSON.stringify(entity));

	$.ajax(urlWS, {
		method : 'POST',
		data : JSON.stringify(entity),
		dataType : 'json',
		contentType : "application/json",
		mimeType : 'application/json',
		headers : {
			'X-CSRF-TOKEN' : metaToken
		}
	}).done(function(data) {
		d.resolve(data);
	}).fail(d.reject);
	return d.promise();
}

function changeBtnCancel() {
	$('#cancel-form').removeClass('close-form');
	$('#cancel-form').addClass('cancel-form');
	$('#cancel-form').html("Cancelar");

};

$('#saveSurvey')
		.click(
				function() {

					var $validNombre = $('#surveryForm').parsley().validate({
						group : 'block-survey'
					});
					var $validDesc = $('#surveryForm').parsley().validate({
						group : 'block-description'
					});
					var $validFrom = $('#surveryForm').parsley().validate({
						group : 'block-from'
					});
					var $validTo = $('#surveryForm').parsley().validate({
						group : 'block-to'
					});

					if (!$validNombre || !$validDesc || !$validFrom) {

						return false;
					}
					{
						var survey = {};
						var branchList = ["-1"];
						survey.id = parseInt("0");
						survey.name = $("#name").val();
						survey.description = $("#description").val();
						var branch =$("#branches").val();
						
						if(null==branch){
							
							survey.branchList = branchList;
						}else{
							survey.branchList = branch;
						}
						
						survey.startDate = $("#datepicker").val();
						survey.endDate = $("#datepicker-autoclose").val();

						var questions = [];
						var options = [];
						var bandera = false;
						var table = $('#datatable-buttons').DataTable();

						var data = table.rows().data();
						data.each(function(value, index) {
							var question = {};
							question.id = value[0];
							question.questionNumberId = value[0];
							question.questionTypeId = value[3];
							question.question = value[1];
							question.rangeMin = value[4];
							question.rangeMax = value[5];

							if (!value[4]) {
								question.rangeMin = 0;
							}

							if (!value[5]) {
								question.rangeMax = 0;
							}

							if (value[3] == 2 || value[3] == 4) {

								bandera = true;
							}

							var q = value[6];

							for (x = 0; x < q.length; x++) {
								try {
									var n = q[x].includes("field");
									if (n) {
										if (value[3] == 2 || value[3] == 4) {
											var option = {};
											var res = q[x].split(":");
											option.value = res[1];
											option.id = x;
											option.parentId = value[0];
											options.push(option);
										}
									}

								} catch (err) {

								}
							}

							questions.push(question);
						});

						if (bandera) {
							survey.options = options;
						}
						
						survey.questions = questions;
						if(questions.length>0){
						updateEntity(survey, 'surveyNewEntityForm')
								.done(
										function(data) {

											console
													.log("updateEntity productEntityForm: "
															+ JSON
																	.stringify(data));

											if (data.responseCode == "0000")
												window.location
														.replace("/TPSUserPortal/sec/surveylist");
										}).fail(function() {
									
								});
						}else{
							swal(
									{
										title : "Encuesta incompleta",
										text : "No se puede generar encuesta ya que no tiene al menos una pregunta",
										type : "error",
										showCancelButton : false,
										confirmButtonClass : 'btn-warning',
										confirmButtonText : "Ok"
										
									});	
						}
					}
				});


$('#report').click(function(e) {
	var an = $("#answered").val();
	
    e.preventDefault();  
    if(an>0){
     	swal({ 	title: "Encuesta!",
     		     text: "Descargando encuesta",
     		     type: "success",
     		     timer: 1000
     	});
    	window.location.href = 'http://localhost:9080/TPSUserServices/search/csv/survey?surveyId='+$("#idSurvey").val();
    	
    }else{
    	swal(
				{
					title : "Encuesta sin contestar",
					text : "No se puede generar reporte",
					type : "warning",
					showCancelButton : false,
					confirmButtonClass : 'btn-warning',
					confirmButtonText : "Ok"
					
				});	
    }
    
});
$('#updateSurvey')
		.click(
				function() {
					
					
					
					var $validNombre = $('#surveryForm').parsley().validate({
						group : 'block-survey'
					});
					var $validDesc = $('#surveryForm').parsley().validate({
						group : 'block-description'
					});
					var $validFrom = $('#surveryForm').parsley().validate({
						group : 'block-from'
					});
					var $validTo = $('#surveryForm').parsley().validate({
						group : 'block-to'
					});

					if (!$validNombre || !$validDesc || !$validFrom) {

						return false;
					}
					var survey = {};
					var options = [];
					var questions = [];
					var branchList = ["-1"];
					survey.id = parseInt($("#idSurvey").val());
					survey.name = $("#name").val();
					survey.description = $("#description").val();
					var branch =$("#branches").val();
					
					if(null==branch){
						
						survey.branchList = branchList;
					}else{
						survey.branchList = branch;
					}
					survey.startDate = $("#datepicker").val();
					survey.endDate = $("#datepicker-autoclose").val();
					var questionSurvey = $("#editSurvey").val();
					var optionsSurvey = $("#optionsSurvey1").val();

					

					var comaSplit = questionSurvey.split("},");

					for (var int = 0; int < comaSplit.length; int++) {

						var splitIni;
						if (int == 0) {
							splitIni = comaSplit[int].split("[{");
						} else {
							splitIni = comaSplit[int].split("{");
						}

						var splitValues = splitIni[1].split(",");
						var question = {};
						for (var int2 = 0; int2 < splitValues.length; int2++) {

							var value = splitValues[int2].split("=");
							var valf = value[0].trim();
							switch (valf) {
							case "id":
								question.id = parseInt(value[1].split("}]")
										.join(""));
								break;

							case "surveyId":
								question.surveyId = value[1].split("}]").join(
										"");
								break;

							case "questionTypeId":
								question.questionTypeId = value[1].split("}]")
										.join("");
								break;
							case "questionNumberId":
								question.questionNumberId = parseInt(value[1]
										.split("}]").join(""));
								break;
							case "rangeMax":
								question.rangeMax = parseInt(value[1].split(
										"}]").join(""));
								break;

							case "rangeMin":
								question.rangeMin = parseInt(value[1].split(
										"}]").join(""));
								break;

							case "question":
								question.question = value[1].split("}]").join(
										"");
								break;
							default:

								break;
							}

						}

						questions.push(question);
					}

					if (options.length > 2) {
						var comaSplit2 = optionsSurvey.split("},");

						for (var int = 0; int < comaSplit2.length; int++) {

							var splitIni;
							if (int == 0) {
								splitIni = comaSplit2[int].split("[{");
							} else {
								splitIni = comaSplit2[int].split("{");
							}
							var splitValues = splitIni[1].split(",");
							var option = {};
							for (var int2 = 0; int2 < splitValues.length; int2++) {

								var value = splitValues[int2].split("=");
								var valf = value[0].trim();
								switch (valf) {
								case "id":
									option.id = parseInt(value[1].split("}]")
											.join(""));
									break;
								case "value":
									option.value = value[1];
									break;
								case "parentId":
									option.parentId = parseInt(value[1].split(
											"}]").join(""));
									break;
								default:

									break;
								}

							}
							options.push(option);
						}
						survey.options = options;
					}
					// console.log("JSON.stringify(jsonObj): ",
					// JSON.stringify(options));

					survey.questions = questions;

					updateEntity(survey, 'surveyNewEntityForm')
							.done(
									function(data) {

										console
												.log("updateEntity productEntityForm: "
														+ JSON.stringify(data));

										if (data.responseCode == "0000")
											window.location
													.replace("/TPSUserPortal/sec/surveylist");
									}).fail(function() {
								alert("Fallo");
							});

					console.log("JSON.stringify(jsonObj): ", JSON
							.stringify(survey));

					// console.log("JSON.stringify(jsonObj): ",
					// JSON.stringify(survey));

				});

$(document)
		.ready(
				function() {
					$("#branches").select2();

					$("#multipleChoiceSurvey").keyup(function(e) {
						var questionComplete = $("#questionComplete").val();
						if (e.which == 13 && questionComplete != "") {
							$("#b1").click();
						}

					});
					$('.dropify')
							.dropify(
									{
										messages : {
											'default' : 'Arrastra y suelta una imágen o da clic',
											'replace' : 'Arrastra y suelta una imágen o da clic para reemplazar',
											'remove' : 'Remover',
											'error' : 'Ooops, algo pasó.'
										},
										error : {
											'fileSize' : 'El archivo es demasiado grande (1M max).'
										}
									});

					$('#surveryForm').on('change', '.form-control',
							function(event) {
								changeBtnCancel();
							});

					$('.form-group')
							.on(
									'click',
									'button#cancel-form.cancel-form',
									function() {
										swal(
												{
													title : "¿Estás Seguro?",
													text : "Todos los avances se perderán",
													type : "warning",
													showCancelButton : true,
													confirmButtonClass : 'btn-warning',
													confirmButtonText : "Si, cancelar",
													cancelButtonText : "No",
													closeOnConfirm : false
												},
												function() {
													swal(
															"Cancelado",
															"Se dirigirá a listado de encuestas",
															"success");
													window.location
															.replace("surveylist");// window.location.replace("productos.html");//

												});
									});

					$('.form-group').on(
							'click',
							'button#cancel-form.close-form',
							function() {
								swal("Cancelado",
										"Se dirigirá a listado de encuestas",
										"success");
								window.location.replace("surveylist");// window.location.replace("productos.html");//
							});

					$(".add-more")
							.click(
									function(e) {
										var addto1 = "#field" + next;
										var data = $(addto1).val();
										console.log(data);

										if (data == "") {
											$(addto1).css({
												'background-color' : '#F2F5A9'
											});
											$(addto1).attr("placeholder",
													"Campo Requerido");

											return false;
										} else {
											$(addto1)
													.css(
															{
																'background-color' : 'transparent'
															});

											e.preventDefault();
											var addto = "#field" + next;
											var addRemove = "#field" + (next);
											next = next + 1;
											var newIn = '<input autocomplete="off" class="input" id="field'
													+ next
													+ '" name="field'
													+ next
													+ '" placeholder="Escribe respuesta " type="text" data-items="8" data-parsley-group="block-field"'
													+ next + ' >';

											var newInput = $(newIn);
											var removeBtn = '<button id="remove'
													+ (next - 1)
													+ '" class="btn btn-danger remove-me" >-</button>&nbsp;';
											var removeButton = $(removeBtn);
											$(addto).after(newInput);
											$(addRemove).after(removeButton);
											$("#field" + next)
													.attr(
															'data-source',
															$(addto)
																	.attr(
																			'data-source'));
											$("#count").val(next);

											$("#field" + next).focus();

											$('.remove-me')
													.dblclick(
															function(e) {

																var fieldNum = this.id
																		.charAt(this.id.length - 1);
																var fieldID = "#field"
																		+ fieldNum;
																$(this)
																		.remove();
																$(fieldID)
																		.remove();
															}

													);
										}
									});

					$('#datatable-buttons')
							.DataTable(
									{
										"language" : {
											"lengthMenu" : "",
											"zeroRecords" : "No existen preguntas",
											"info" : "Mostrando pagina _PAGE_ de _PAGES_",
											"infoEmpty" : "No existen registros",
											"infoFiltered" : "(filtrado de un total de _MAX_ total registros)",
											"oPaginate" : {
												"sFirst" : "Primero",
												"sLast" : "Último",
												"sNext" : "Siguiente",
												"sPrevious" : "Anterior"
											}
										}
									});

					var $branches = $("#branches");
					var catalogList = [];
					$.ajax({
						url : 'ajaxBranchSimpleCatalogRequest',
						type : 'POST',
						dataType : 'json',
						cache : false,
						async : true,
						headers : {
							'X-CSRF-TOKEN' : metaToken
						},
						data : JSON.stringify(catalogData),
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Content-Type",
									"application/json");
						},
						success : function(data) {
							catalogList = data[catalogName];
							var i = 0;
							for (i = 0; i < catalogList.length; i++) {
								$branches.append("<option value="
										+ catalogList[i].id + " >"
										+ catalogList[i].value + "</option>");
							}
						},
						error : function(xhr, status, err) {
							console.error('simpleCatalog', status, err
									.toString());
						}.bind(this)
					});

				});
