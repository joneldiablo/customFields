var uploadPhoto = function(businessId )
  	{
  	var newEntityForm = new FormData();
  	newEntityForm.append("businessId", businessId);      	

		console.log("businessId: " +JSON.stringify(businessId)); 

  		var metaToken = $("meta[name='_csrf']").attr("content");
  		//console.log("metaToken: " + metaToken);

  		$.ajax( 'dataChart2',
              {
              method:"POST", data:newEntityForm, processData:false, contentType:false, headers:{'X-CSRF-TOKEN':metaToken},
       	    success: function( data )             
       	    			{      	    			
  		     	    	console.log("data: " + JSON.stringify(data));
//      						var photoFileName = data.photoFileName;
//      						setPhoto(photoFileName);
       	    			}.bind(),     	    			
  	        error:   function( xhr, status, err ) 
  	        			{ 
  	        			console.log("xhr: " +JSON.stringify(xhr)); 
  	        			console.log("status: "+status); 
  	        			console.log("err: "+err);
  	        			}
  	        } );
  		
  	
  	};
  	

    //uploadPhoto(1);        
      	
      	