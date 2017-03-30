// Ocultar columna 3 de la tabla en todas las páginas
var handleDataTableButtons = function() {
	"use strict";
	0 !== $("#datatable-buttons").length && $("#datatable-buttons").DataTable({
		"language" : {
			"url" : $("#auxLangUrl").text() // "url":
		// "assets/plugins/datatables/json/Spanish.json"
		},
		"columnDefs" : [ {
			"width" : "60px",
			"targets" : 0
		}, {
			"targets" : [ 4 ],
			"visible" : false
		}, {
			"targets" : [ 0, 1, 2, 3 ],
			"orderable" : false
		} ],
		dom : "rtip",
		responsive : !0
	});

}, TableManageButtons = function() {
	"use strict";
	return {
		init : function() {
			handleDataTableButtons();
		}
	};
}();

// Variables
var metaToken = $("meta[name='_csrf']").attr("content");

$(document).ready(function() {
	$("#auxLangUrl").remove();
	var catalogData = {
		"catalogName" : "Cat_Brand",
		"language" : "es"
	};
	var $brands = $("#brandList");

	$.ajax({
		url : 'ajaxCatalogRequest',
		type : 'POST',
		dataType : 'json',
		cache : false,
		async : true,
		headers : {
			'X-CSRF-TOKEN' : metaToken
		},
		data : JSON.stringify(catalogData),
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Content-Type", "application/json");
		}
	}).done(function(data) {
		$(data.Cat_Brand).each(function(index) {
			// console.log( index + ": " + this.id );
			$brands.append("<option value=" + this.value + " >" + this.value + "</option>");
		});
	}).fail(function(xhr, status, err) {
		console.error('simpleCatalog', status, err.toString());
	});

	var tables = $('#datatable-buttons').DataTable({
		destroy : true,
		bRetrieve : true,
		paging : false
	});

	$('#productName').on('keyup change', function() {
		tables.columns(1).search(this.value).draw();
	});

	$('#description').on('keyup change', function() {
		tables.columns(3).search(this.value).draw();
	});

	$('#brandList').on('change', function() {
		if (this.value != 0)
			tables.columns(2).search(this.value).draw();
		else
			tables.columns(2).search("").draw();
	});
	//ajustar el tamaño de la imagen preview del producto en la tabla, timeout para mostrar animación sencilla
	setTimeout(function(){
		$(".img-table").each(function(i, elem) {
			var elem = this;
			$(elem).addClass("img-responsive");
			resizeImage(this.src, 70, 70).then(function(data) {
				$(elem).width(data.width);
				$(elem).height(data.height);
			});
		});
	}, 1000);
});
TableManageButtons.init();