//@author hcadavid

apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	 {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"},
	 {author:"johnconnor","points":[{"x":300,"y":250},{"x":150,"y":200}],"name":"Test"}];
	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"}];
	mockdata["nicole"]=	[{author:"nicole","points":[{"x":180,"y":150},{"x":115,"y":120}],"name":"test1"}]
	mockdata["daniel"]=	[{author:"daniel","points":[{"x":18,"y":15},{"x":195,"y":140}],"name":"test2"}]

	function addPoint(puntos, author, bpname, callback){
		puntos.forEach((element) => {
			mockdata[author].find(function(e){return e.name===bpname}).points.push(element);
		})
		callback();
	}

	return {
		getNameAuthorBlueprints:function(authname,callback){
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		},

		addPoint:addPoint
	}	

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/