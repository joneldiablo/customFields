function resizeImage(dataUrl, minW, minH) {
	var deferred = new $.Deferred();
	var image = new Image();
	image.onload = function() {
		var w = minW ? minW : 900;
		var h = minH ? minH : 900;
		var ratio = 1;
		if (image.width > image.height) {
			ratio = image.height / image.width;
			h = w * ratio;
		} else {
			ratio = image.width / image.height;
			w = h * ratio;
		}
		deferred.resolve({
			width : w,
			height : h
		});
	};
	image.src = dataUrl;
	return deferred.promise();
};