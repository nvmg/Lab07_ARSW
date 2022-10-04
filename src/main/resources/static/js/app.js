var apimock = apimock;
var app = (function (){
    var author;

    function getName() {
        $("#name").text(author + "'s " + "blueprints:");
    }

    function getNameAuthorBlueprints() {
        author = $("#inputName").val();
        apiclient.getNameAuthorBlueprints(author,tableData);
    }

    var tableData = function( data) {
        $("#tableBlueprints tbody").empty();
        getName();
        const newRow = data.map((element) => {
            return {
                authorName: element.name,
                points: element.points.length
            }
        });

        newRow.map((elements) => {
            $("#tableBlueprints > tbody:last").append($("<tr><td>" + elements.authorName + "</td><td>" + elements.points.toString() +
                "</td><td>" + "<button  id=" + elements.authorName + " onclick=app.getBlueprintsByNameAndAuthor(this)>open</button>" + "</td>"));
        });

        const total = newRow.reduce((suma, {points}) => suma + points, 0);

        $("#points").text(total);
        
    }

    function getBlueprintsByNameAndAuthor(data) {
        author = $("#inputName").val();
        blueprintName = data.id;

        document.getElementById("actualName").innerHTML =
                        "Current Blueprint: " + blueprintName;
        apiclient.getBlueprintsByNameAndAuthor(author,blueprintName , drawCanvas);
    }

    var drawCanvas = function(blueprint){
            can = document.getElementById("myCanvas");
            ctx = can.getContext("2d");
            ctx.clearRect(0, 0, can.width, can.height);
            ctx.beginPath();
            blueprintsPoints = blueprint.points.slice(1, blueprint.points.length);
            initx = blueprint.points[0].x;
            inity = blueprint.points[0].y;
            blueprintsPoints.forEach((element) => {
            ctx.moveTo(initx, inity);
            ctx.lineTo(element.x, element.y);
            ctx.stroke();
            initx = element.x;
            inity = element.y;
            });
    }

    return{
        getNameAuthorBlueprints: getNameAuthorBlueprints,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
        getName: getName
    }
})();

