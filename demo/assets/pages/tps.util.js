	// Global Variables
    var metaToken = $("meta[name='_csrf']").attr("content");
    var timeOutFilterVar;
    
    


	/*
  	 * Function to fetch the required catalog
  	 * Input 
  	 * catalogName: i.e. Cat_Branch
  	 * url: i.e. ajaxBranchSimpleCatalogRequest
  	 * metaToken: metatoken
  	 * language: i.e. es
  	 * Output
  	 * An array of objects, the catalog list. 
  	 * Each object on the list contains at least the pair of properties id and value   
  	 */
  	function catalogList( catalogName, url, metaToken, language  ){
  		//var catalogName = "Cat_Branch";
  		var d = $.Deferred();
  		var catalogBranchList = [];
  	    var catalogData = { "catalogName":catalogName,
  	            			"language": language }; //"es" };
  			$.ajax( { 
  					url:  url, //'ajaxBranchSimpleCatalogRequest',
  			  		type: 'POST', 
  			  		dataType: 'json', 
  			  		cache: false, 
  			  		async: true, 
  			  		headers: { 'X-CSRF-TOKEN': metaToken },
  			  		data:       JSON.stringify( catalogData ),
  			  		beforeSend: function( xhr  ) { xhr.setRequestHeader("Content-Type", "application/json"); },
  			  		success:    function( data ) { catalogBranchList = data[catalogName];  },
  			  		error:      function( xhr, status, err ) { console.error( 'simpleCatalog', status, err.toString() ); }.bind( this ) 
  			  		} ).done(function(data){
  		    			d.resolve(data);
  		    		}).fail(d.reject); 
  		    		return d.promise();
  		//return catalogBranchList;
  	};
  	
  	/* Function to update a DropdownList with an array of options
  	 * Input
  	 * catalogList: is a list of objects, each object must contain id and value properties
  	 * target: is the jquery selector of the dropdownlist that will be updated
  	 * selected: is an optional argument and is the preselected option in the dropdownlist   
  	 */
  	function updateDropdownList( catalogList, target, selected ){
  		//var $target1 = $("#target1");
  		//catalogBranchList = data[catalogName];
  		selected = (selected == undefined )? 0 : selected;
		var i = 0;
		for ( i = 0 ; i < catalogList.length; i++ ){
			if( catalogList[i].id == selected ){
				target.append("<option value="+ catalogList[i].id +" selected='selected' >" + catalogList[i].value + "</option>");
			}else{
				target.append("<option value="+ catalogList[i].id +" >" + catalogList[i].value + "</option>");
			}
	  	}
  	}; 
  	  
  	/*
  	 * Function to get a string that represents an html select component with the options and values from a catalog list
  	 * This funtion is useful for the transferInventory page
  	 * Input: 
  	 * catalogList, a list of otions from a catalog
  	 * Output:
  	 * A string representation of an html select component  
  	 */
  	function stringSelectOptions( catalogList ){
  		var strSelect = '<select id="example" name="example" class="form-control"> <option value="0">Seleccione una opción</option>';
  		var i;
  		for ( i = 0 ; i < catalogList.length; i++ )    
			{
  			strSelect = strSelect.concat('<option value='+ catalogList[i].id +' >' + catalogList[i].value + '</option>' );
			}
  		strSelect = strSelect.concat('</select>');	
  		return strSelect;
  	}
  	
  	/*
  	 * Function to evaluate if a number is valid taking into account the unitId of a product
  	 * So, for a number to be valid is has to be related with the unitid pzas, kg, lts. mts, etc.
  	 * Input:
  	 * number: a quantity to be evaluated
  	 * unitId: the id of a type measurement i.e. 1 Piezas, 2 Kilogramos, 3 Litros, 4 Metros
  	 * Output:
  	 * boolean true if the value is valid taking into account the unitId 
  	 * or false otherwise 
  	 */
  	function isValidNumber( number, unitId ){
  		if(unitId == 1){
  			if (integerValue( number )){
  				return true;
  			}else{
  				return false;
  			}
  		}else{
  			if (decimalValue( number )){
  				return true;
  			}else{
  				return false;
  			}
  		}
  	}

  	/*
  	 * Function to evaluate a integer number
  	 * Input:
  	 * A regExp to match Integers
  	 * A number
  	 * Output:
  	 * true if the number is an integer
  	 * false if the number is not an integer, even more, false if the "number" doesn't match the regExp
  	 */
  	function integerValue( e )
  	{
  		var re = /^[123456789]{1}(\d{1,5})?$/;  
  	    var str = e; //e.currentTarget.value;
  	    var m;
  	     
  	    while ((m = re.exec(str)) !== null) {
  	    	//e.currentTarget.value = m[0];
  	    	break;
  	    }
  		if(m === null){
  			return false;
  		}else{
  			return true;
  		}
  	}
  	
  	/*
  	 * Function to evaluate a decimal number
  	 * Input:
  	 * A regExp to match Decimals
  	 * A number
  	 * Output:
  	 * true if the number is a decimal
  	 * false if the number is not a decimal number, even more, false if the "number" doesn't match the regExp
  	 */  	
  	function decimalValue( e )
  	{
  	    var re = /^\d{1,5}(\.{0,1}\d{0,2})?$/; 
  	    var str = e; //e.currentTarget.value;
  	    var strtWith = str.slice(0, 1);
  	    
  	    while ( strtWith == "0" && str.length > 1) {
  	    	str = str.slice(1, str.length);
  	    	strtWith = str.slice(0, 1);
  	    }
  	    
  	    if ( strtWith == "." ){
  	    	str = "0".concat(str);
  	    }

  	    var m;
  	     
  	    while ((m = re.exec(str)) !== null) {
  	    	//e.currentTarget.value = m[0];
  	    	break;
  	    }
  		if(m === null){
  			return false;
  			//e.currentTarget.value = "";
  		}else{
  			return true;
  		}
  	}
  	
      	
      	