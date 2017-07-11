

define(function(require, exports, module) {

	var uploadImg = document.querySelector('#uploadImg');

	uploadImg.addEventListener('change', function(e){
		var file = e.srcElement.files;

		var formData = new FormData();
		for(var i = 0, len = file.length; i < len; i++){
			formData.append("file", file[i]); 
		} 
  

        $.ajax({
				type: "POST",
				url: '/uploadImg',
				dataType: 'json',
				data: formData,
				contentType: false, // 注意这里应设为false
                processData: false,
                cache: false,
				success: function (data, textStatus){
					if(data.success){
						console.log(data)				
					}
				},
				error: function(data, textStatus){
					//console.log(data)
				}
			});
			
	}, !1);

});
