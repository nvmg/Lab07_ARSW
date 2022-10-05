var apiclient = (function(){

 var getNameAuthorBlueprints = function (author, callback) {
    $.ajax({
          type: "GET",
          url: "http://localhost:8080/blueprints/" + author,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data){
          callback(data);}
        });
  };

  var getBlueprintsByNameAndAuthor = function (author, blueprintName, callback) {
      $.ajax({
                type: "GET",
                url: "http://localhost:8080/blueprints/" + author + "/" + blueprintName,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                callback(data);}
              });
    };

  var addPoint = function (pointX, pointY, author, blueprintName, callback){
      var data = JSON.stringify({author:author,"points":[{"x":pointX,"y":pointY}],"name":blueprintName});
      $.ajax({
          type:"PUT",
          url: "http://localhost:8080/blueprints/" + author + "/" + blueprintName,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: data
      });
      callback();
  }

return{
        getNameAuthorBlueprints: getNameAuthorBlueprints,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
        addPoint: addPoint
    }
}

)();