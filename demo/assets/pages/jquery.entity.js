
/**
* Theme: Adminto Admin Template
* Author: Coderthemes
* Dashboard
*/


function getEntity(entityId, formAction, event){   
	
	var csrfParameterName = '_csrf';
	var csrfToken         = $("meta[name='_csrf']").attr("content");
	
	$form = $("<form></form>");
	$form.attr("action", formAction);	
	$form.attr("method", "post");
	$form.append('<input name="entityId" value="'+entityId+'">');
	$form.append('<input name="'+csrfParameterName+'" value="'+csrfToken+'"/>');	
	$form.submit();
	};

	
	
	$(".entity-to-click").click(function(e){
	    eventObj = e;
	   // console.log(e.currentTarget.id);
	    
		var entityId = $("#"+e.currentTarget.id).data( "entityid" );
		
		//console.log("entityId: ",entityId);
		
		$('#entityId').val(entityId);
		
		$('#entityForm').submit();
		
		
	   // console.log("after submit");
	    //console.log("on entity-to-click " );
	    //console.log("e.currentTarget.id " );
	    
	});