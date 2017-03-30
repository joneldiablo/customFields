(function ($) {
	"use strict";
	$.customFields = function (el, radius, options) {
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// Add a reverse reference to the DOM object
		base.$el.data("customFields", base);

		// funciones privadas
		function createRow(i, elem) {
			var tipo = elem.customFieldsType;
			if ((typeof elem.enabled === "undefined") || (elem.enabled !== "false" && !!elem.enabled) || !base.options.propertyVisible) {
				var formGroup = $("<div>", {
						"class": "form-group"
					}),
					label = $("<label>", tipo.label).attr("for", base.$el.attr("id") + "_custom_" + elem.id),
					span = $("<span>", {
						"class": "span-label"
					}),
					wrap = $("<div>", {
						"class": "col-sm-6"
					}),
					obj = $(tipo.tag, tipo.attrs).attr("id", base.$el.attr("id") + "_custom_" + elem.id).attr("name", "custom_" + elem.id),
					fixed = $("<div>", {
						"class": "clearfix"
					});
				obj.data("format", elem);

				label.append(span.text(elem.etiqueta));

				switch (elem.customFieldsType.type) {
					case "select":
						obj.append($("<option>").text("--Selecciona--"));
						$.each(elem.list.split(","), function (i, elemList) {
							var el = $("<option>", {
								value: i
							}).text(elemList);
							obj.append(el);
						});
						// ATENCIÓN!!! no coloco break para que se ejecute la opción default.
						//Mantener juntos o duplicar default dentro del case "select"
					default:
						obj.addClass("form-control");
						label.addClass("control-label col-sm-3");
						label.append(":");
						formGroup.append(label, wrap.append(obj), fixed);
				}
				base.$el.$form.append(formGroup);
				if (typeof obj[tipo.jquery] == "function") {
					obj[tipo.jquery](tipo.jqueryAttrs);
				}
			}
		}

		function createRowAdmin(i, elem) {
			var formGroup = $("<div>", {
				"class": "form-group"
			});
			// elemento para mostrar que es posible arrastrar la fila
			var enabledWrap = $("<div>", {
				"class": "col-xs-1"
			});
			var drag = $("<div>", {
				"class": "btn"
			}).html("<i class='fa fa-arrows'></i>");
			var enabled = $("<div>", {
				"class": "checkbox checkbox-primary checkbox-single"
			});
			var checkEna = $("<input>", {
				type: 'checkbox',
				"class": "enabled-checkbox"
			}).prop("checked", (typeof elem.enabled == "undefined") || (elem.enabled != "false" && !!elem.enabled)).change();
			var labelEna = $("<label>").append($("<span>", {
				"class": "hidden-sm hidden-md"
			}).text("Visible"));

			var wrap = $("<div>", {
				"class": "col-sm-3"
			});
			var label = $("<input>", {
				placeholder: "Nombre"
			}).addClass("form-control label-input").attr("id", base.$el.attr("id") + "_custom_" + elem.id).attr("name", "custom_" + elem.id).val(elem.etiqueta);
			formGroup.data("format", elem);

			var wrap2 = wrap.clone();
			var select;
			if (elem.new) {
				select = $("<select>", {
					"class": "form-control"
				}).on("change", enablingList);
				$.each(base.options.types, function (i, elemType) {
					if ((typeof elemType.enabled == "undefined") || (elemType.enabled != "false" && !!elemType.enabled)) {
						var elemlist = $("<option>", {
							value: elemType.id,
							list: elemType.list
						}).text(elemType.name);
						select.append(elemlist);
					}
				});
			} else {
				select = $("<p>", {
					"class": "form-control-static"
				}).text(elem.customFieldsType.name);
			}

			var wrap3 = $("<div>", {
				"class": "col-sm-4"
			});
			var listInput = $("<input>", {
				"data-role": "tagsinput",
				"class": 'form-control',
				"type": 'text',
				"name": "options[]",
				"placeholder": "Este campo no admite opciones",
				"disabled": "disabled"
			});

			// botones para quitar la fila
			var wrapBtn = $("<div>", {
				"class": "col-sm-1 col-xs-2"
			});
			var btnDeleteRow = $("<a>", {
				"class": "btn-delete-row btn btn-icon waves-effect waves-light btn-danger"
			}).html("<i class='fa fa-remove'></i>").click(removeElementFunc);
			var fixed = $("<div>", {
				"class": "clearfix"
			});
			// construccion
			wrapBtn.append(btnDeleteRow);
			if (base.options.propertyVisible) {
				enabledWrap.append(enabled.append(checkEna, labelEna));
			}
			if (base.options.propertyPriority) {
				enabledWrap.append(drag);
			}
			formGroup.append(enabledWrap, wrap.append(label), wrap2.append(select), wrap3.append(listInput), wrapBtn, fixed);
			switch (elem.customFieldsType.type) {
				case "select":
					listInput.prop("disabled", false);
					listInput.tagsinput();
					listInput.tagsinput("add", elem.list);
					listInput.tagsinput("input").attr("placeholder", "Opciones, separa con comas");
					listInput.tagsinput("input").width("100%");
					break;
				default:
			}
			if (i - 1 < 0) {
				base.$el.$form.append(formGroup);
			} else {
				base.$el.$form.children().eq(i - 1).after(formGroup);
			}
		}

		function createRowValues(i, elem) {
			var format = base.options.formats.filter(function (thisElem) {
				return thisElem.id == elem.customFieldsFormatId;
			})[0];
			if ((typeof format.enabled === "undefined") || (format.enabled !== "false" && !!format.enabled) || !base.options.propertyVisible) {
				var obj = base.$el.$form.find("#" + base.$el.attr("id") + "_custom_" + elem.customFieldsFormatId);
				switch (format.customFieldsType.value) {
					case "value":
						obj.val(elem.value);
						break;
					case ":checked":
						var boolVal = (typeof elem.value == "string" ? (elem.value == "true" ? true : false) : elem.value);
						obj.prop("checked", boolVal).change();
						break;
					case "option:selected":
						$(obj).find("option[value=" + elem.value + "]").prop("selected", true);
						break;
					default:
						obj.html(elem.value);
				}
				base.$el.$form.find("#" + base.$el.attr("id") + "_custom_" + elem.customFieldsFormatId).data("value", elem);
			}
		}

		function addExtraFunc(e) {
			var position = $(this).closest(".form-group").index();
			createRowAdmin(++position, {
				etiqueta: "",
				customFieldsTypeId: 0,
				new: true,
				customFieldsType: {}
			});
		}

		function removeAllFunc(e) {
			base.$el.$form.children().remove();
		}

		function removeElementFunc(e) {
			var row = $(this).closest(".form-group").data("format");
			$(this).closest(".form-group").remove();
			if (!row.new) {
				base.$el.trigger("deleteRow", row);
			}
		}

		function sortPriority(a, b) {
			return a.priority - b.priority;
		}

		function enablingList(e) {
			var listInput = $(this).closest(".form-group").find("[data-role=tagsinput]");
			if ($(this).find("option:selected").attr("list") == "true") {
				if (!$(this).closest(".form-group").find(".bootstrap-tagsinput").length > 0) {
					listInput.prop("disabled", false);
					listInput.tagsinput();
					listInput.tagsinput("input").attr("placeholder", "Opciones, separa con comas");
					listInput.tagsinput("input").width("100%");
				}
			} else {
				if ($(this).closest(".form-group").find(".bootstrap-tagsinput").length > 0) {
					listInput.tagsinput('destroy');
					listInput.prop("disabled", true);
					listInput.val("");
					$(this).closest(".form-group").find(".bootstrap-tagsinput").remove();
					listInput.show();
				}
			}
		}

		function sortValueFunc(event, ui) {
			base.$el.$form.children().each(function (i, elem) {
				elem = $(elem);
				var f = elem.data("format");
				f.priority = elem.index();
				elem.data("format", f);
			});
		}

		function dateSupported() {
			var foo = "foo";
			var el = $('<input>', {
				type: "date",
				value: foo
			});
			// A supported browser will modify this if it is a true date field
			return el.val() !== foo;
		};
		//terminan funciones privadas

		base.init = function () {
			base.options = $.extend({}, $.customFields.defaultOptions, options);
			var $panel = $("<div>", {
					"class": "panel"
				}),
				$panelHeading = $("<div>", {
					"class": "panel-heading",
					css: {
						"overflow": "hidden"
					}
				}),
				$title = $("<h4>", {
					"class": "header-title pull-left",
					css: {
						margin: "8px 0 "
					}
				}).text(base.options.title),
				$btnWrap = $("<div>", {
					css: {
						position: "relative"
					}
				}),
				$btnAddFirst = $("<a>", {
					"class": "btn btn-md waves-effect waves-light",
					css: {
						position: "absolute",
						right: 0
					}
				}).html("<i class='zmdi zmdi-plus'></i> Mostrar").click(base.showBody),
				$btnRemoveAll = $("<a>", {
					"class": "btn btn-md waves-effect waves-light text-danger",
					css: {
						position: "absolute",
						right: 0
					}
				}).html("<i class='zmdi zmdi-close'></i> Ocultar").click(base.hideBody).hide(),
				$panelBody = $("<div>", {
					"class": "panel-body"
				}).hide(),
				$form = $("<form>", {
					"class": "form-horizontal" + (base.options.admin ? " admin" : ""),
					onsubmit: "return false"
				});

			// construccion
			$btnWrap.append($btnAddFirst, $btnRemoveAll, "<div class='clearfix'></div>");
			$panelHeading.append($title, $btnWrap, "<div class='clearfix'></div>");
			$panelBody.append($form);
			$panel.append($panelHeading, $panelBody);
			base.$el.append($panel);

			// mantener relacion con los objetos importantes
			base.$el.$btnAddFirst = $btnAddFirst;
			base.$el.$btnRemoveAll = $btnRemoveAll;
			base.$el.$panelBody = $panelBody;
			base.$el.$form = $form;

			if (base.options.admin) {
				var btnAddWrap = $("<div>", {
						"class": "row"
					}).append($("<div>", {
						"class": "col-sm-1",
						css: {
							paddingTop: 15
						}
					})),
					btnAddRow = $("<button>", {
						"class": "btn-add-row btn btn-icon waves-effect waves-light btn-success btn-block"
					}).html("<i class='fa fa-plus'></i>").click(addExtraFunc);
				btnAddWrap.find("div").append(btnAddRow);
				$panelBody.append(btnAddWrap);
				// permitir que se puedan reordenar las filas
				var sorted = base.options.formats;
				if (base.options.propertyPriority) {
					$form.sortable({
						stop: sortValueFunc,
						axis: 'y'
					}).on("click", "input, textarea", function (e) {
						$(this).focus();
					});
					$form.on("sortstart", function (event, ui) {
						ui.helper.css('margin-top', $(window).scrollTop());
					});
					$form.on("sortbeforestop", function (event, ui) {
						ui.helper.css('margin-top', 0);
					});
					// refrescar el orden de los elementos
					$form.sortable("refresh");
					sorted = base.options.formats.sort(sortPriority);
				}
				$.each(sorted, createRowAdmin);

			} else {
				var sorted = base.options.formats;
				if (base.options.propertyPriority) {
					sorted = base.options.formats.sort(sortPriority);
				}
				$.each(sorted, createRow);
				$.each(base.options.values, createRowValues);
			}
			base.showBody();
		};
		base.showBody = function (e) {
			base.$el.$panelBody.slideDown("slow");
			base.$el.$btnAddFirst.animate({
				opacity: 0,
				top: 50
			}, function () {
				$(this).hide()
			}, "esae-in");
			base.$el.$btnRemoveAll.show();
			base.$el.$btnRemoveAll.offset({
				top: 50
			});
			base.$el.$btnRemoveAll.animate({
				opacity: 1,
				top: 0
			}, "esae-in");
		}
		base.hideBody = function (e) {
			base.$el.$panelBody.slideUp("slow");
			base.$el.$btnRemoveAll.animate({
				opacity: 0,
				top: -50
			}, function () {
				$(this).hide()
			}, "esae-in");
			base.$el.$btnAddFirst.show();
			base.$el.$btnAddFirst.animate({
				opacity: 1,
				top: 0
			}, "esae-in");
		}
		base.getFields = function () {
			var toReturn = [];
			if (base.options.admin) {
				var formGroups = base.$el.$form.find(".form-group");
				formGroups.each(function () {
					var format = $(this).data("format");
					format.etiqueta = $(this).find("input.label-input").val();
					format.list = $(this).find("[data-role=tagsinput]").val();
					format.enabled = base.options.propertyVisible ? $(this).find(".enabled-checkbox").is(":checked") : true;
					var select = $(this).find("select option:selected");
					if (select.length > 0) {
						format.customFieldsTypeId = parseInt($(this).find("select option:selected").val());
					}
					$(this).data("format", format);
					sortValueFunc();
					toReturn.push(format);
				});
			} else {
				$.each(base.$el.$form[0], function (i, elem) {
					var format = $(elem).data("format");
					var value = $(elem).data("value");
					if (!value) {
						value = {
							// "producto": base.options.producto,
							"customFieldsFormatId": format.id,
							"value": format.customFieldsType.value == "value" ? $(this).val() : $(this).html()
						}
					}
					switch (format.customFieldsType.value) {
						case "value":
							value.value = $(this).val();
							break;
						case ":checked":
							value.value = $(this).is(":checked");
							break;
						case "option:selected":
							value.value = $(this).find("option:selected").val();
							break;
						default:
							value.value = $(this).html();
					}
					toReturn.push(value);
				});
			}
			return toReturn;
		}
		// Run initializer
		base.init();
	};

	$.customFields.defaultOptions = {
		title: "Campos personalizados",
		admin: false,
		propertyPriority: true,
		propertyVisible: true,
		values: [],
		formats: [],
		types: []
	};

	$.fn.customFields = function (command, options) {
		if (!options && typeof command != "string") {
			options = command;
			command = null;
		}
		var response = this.each(function () {
			$(this).data("customFields") ? $(this).data("customFields") : (new $.customFields(this, command, options));
		});
		switch (command) {
			case "getFields":
				var customFields = response
				response = response.data("customFields").getFields();
				break;
			default:
				break;
		}
		return response;
	};
})(jQuery);
