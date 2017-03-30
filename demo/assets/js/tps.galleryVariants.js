/**
 * GalleryComponent Author: TPS Module/App: TPS Components js
 */

		!function($) {
			"use strict";

			/**
			 * Function Hide Extra Items
			 */

			function hideExtraItems() {
				if (!$("div[id^='newExtraId']").length) {
					$("#extras-headers").hide();
					$("#remove-extras").hide();
					$("#add-extra-div").hide();
					$("#card-extras").addClass("card-box-empty");
				}
			}

			/**
			 * GalleryComponent
			 */
			var GalleryComponent = function() {
				this.VERSION = "0.1", this.AUTHOR = "TPS", this.SUPPORT = "israel.gonzalez@gonet.us"
			};

					// on doc load
					GalleryComponent.prototype.onDocReady = function(e) {

						$('.dropify')
								.dropify(
										{
											messages : {
												'default' : 'Arrastra y suelta o da clic aquí para agregar',
												'replace' : 'Arrastra y suelta o da clic aquí para agregar',
												'remove' : 'Remover',
												'error' : 'Ooops, algo salió mal.'
											},
											error : {
												'fileSize' : 'El archivo es demasiado pesado.'
											},
											tpl : {
												wrap : '<div class="dropify-wrapper"></div>',
												loader : '<div class="dropify-loader"></div>',
												message : '<div class="dropify-message"><span class="file-icon" /> <p>{{ default }}</p></div>',
												preview : '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>',
												filename : '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
												clearButton : '<button type="button" class="dropify-clear">{{ remove }}</button>',
												errorLine : '<p class="dropify-error">{{ error }}</p>',
												errorsContainer : '<div class="dropify-errors-container"><ul></ul></div>'
											}
										});

						// Make Sorteable Image Gallery
						$("#sortable").sortable();
						$("#sortable").disableSelection();

						var found = $(".dropify-render").find("img");
						var newId = 0;
						var actualId = "";

						// Show image from thumbnail to DROPIFY PREVIEW
						$('#galery-content').on('click', '.icon-galery', function(event) {
							// console.log("icon-galery click...
							// "+event.target.id);
							$(".dropify-wrapper").addClass("has-preview");

							$(".dropify-preview").attr({
								"style" : "display: block;"
							});

							found = $(".dropify-render").find("img");
							var bg = $(event.target).css('background-image');
							bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
							if (found.length == 0) {
								$('.dropify-render').prepend($('<img />', {
									src : bg,
									css : {
										"max-height" : 250
									},
									id : "_" + event.target.id
								}));
							} else {
								$('.dropify-render img').attr({
									"src" : bg,
									"id" : "_" + event.target.id
								});
							}

							found.length = 1;
							// console.log("found:
							// "+found.length);
						});

						// Detecta carga de imagen para agregar en thumbnails
						$(".dropify-wrapper").change(function(e) {
							// console.log( "Handler for
							// .change() called." );

							setTimeout(function() {
								// console.log("on
								// setTimeout... ");

								found = $(".dropify-render").find("img");
								// console.log(
								// "has-preview: " +
								// found.length );

								if (found.length == 1) {
									var li = $("<li />", {
										"class" : "ui-sortable-handle"
									});
									var preview = $("<div></div>", {
										id : "imgNew" + newId,
										"class" : "icon-galery",
										"css" : {
											width : "100%",
											height : "100%",
											backgroundImage : "url(" + $(".dropify-render img").attr('src') + ")",
											backgroundSize : "contain",
											backgroundRepeat : "no-repeat",
											backgroundPosition : "center",
											backgroundColor : "#ebf0f3"
										}
									});
									$('.ui-sortable').prepend(li.append(preview));

									$(".dropify-render img").attr({
										"id" : "_imgNew" + newId
									});

									newId++;
								}
							}, 100);
						});
						$('.dropify').dropify().on("dropify.fileReady", function(event, src) {
							var $elem = $(this);
							var $canvas = $("<canvas></canvas>", {
								id : "canvasAux",
								css : {
									"display" : "none"
								}
							});
							var image = new Image();
							image.onload = function() {
								var w = 900;
								var h = 900;
								var ratio = 1;
								if (image.width > image.height) {
									ratio = image.height / image.width;
									h = w * ratio;
								} else {
									ratio = image.width / image.height;
									w = h * ratio;
								}
								var $canvasAux = $canvas;
								$canvasAux[0].width = w;
								$canvasAux[0].height = h;
								var c = $canvasAux[0];
								var ctx = c.getContext("2d");
								ctx.clearRect(0, 0, $canvasAux[0].width, $canvasAux[0].height);
								ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, w, h);
								var imgSrc = $canvasAux[0].toDataURL();
								$elem.parent().find(".dropify-render img").attr("src", imgSrc);
							};
							image.src = src;
						});
						// Detecta REMOVE de DROPIFY-PREVIEW y remueve thumbnail
						var drEvent = $('.dropify').dropify();
						drEvent.on('dropify.beforeClear', function(event, element) {
							found.length = 0;
							var cleanedId = $('.dropify-render img').attr("id");
							cleanedId = cleanedId.substring(1, cleanedId.length);
							// console.log("cleaned: "+cleanedId);

							$('.icon-galery#' + cleanedId).parent().remove();
						});

					},
					// initilizing
					GalleryComponent.prototype.init = function() {
						var $this = this;
						// document load initialization
						$(document).ready($this.onDocReady);
					},

					$.GalleryComponent = new GalleryComponent, $.GalleryComponent.Constructor = GalleryComponent

		}(window.jQuery),
		// initializing main application module
		function($) {
			"use strict";
			$.GalleryComponent.init();
		}(window.jQuery);