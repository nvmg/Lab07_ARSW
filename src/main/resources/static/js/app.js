var apimock = apimock;
var app = (function (){
    var author;
    var blueprintName;

    function getName() {
        $("#name").text(author + "'s " + "blueprints:");
    }

    function getNameAuthorBlueprints() {
        clearCanvas()
        blueprintName = undefined;
        author = $("#inputName").val();
        apimock.getNameAuthorBlueprints(author,tableData);
    }

    function updateNameAuthorBlueprints(){
        apimock.getNameAuthorBlueprints(author,tableData);
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
        apimock.getBlueprintsByNameAndAuthor(author,blueprintName , drawCanvas);
    }

    function clearCanvas(){
        can = document.getElementById("myCanvas");
        ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);
    }

    var drawCanvas = function(blueprint){
            clearCanvas()
            can = document.getElementById("myCanvas");
            ctx = can.getContext("2d");
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

    function mousePos(canvas, evt){
        var ClientRect = canvas.getBoundingClientRect();
        return { //objeto
            x: Math.round(evt.clientX - ClientRect.left),
            y: Math.round(evt.clientY - ClientRect.top)
        }
    }

    function init() {
        var canvas = document.getElementById("myCanvas"),
            context = canvas.getContext("2d");


        //if PointerEvent is suppported by the browser:
        if(window.PointerEvent) {
            canvas.addEventListener("pointerdown", function(event){
                if(author !== "" && blueprintName !== undefined){
                    raton = mousePos(canvas,event)
                    //alert('punto marcado en: '+raton.x+','+raton.y+'Author: '+author+' Blueprint: '+blueprintName);
                    apimock.addPoint(raton.x,raton.y,author,blueprintName, updateNameAuthorBlueprints);
                    apimock.getBlueprintsByNameAndAuthor(author,blueprintName , drawCanvas);
                }else {
                    alert("No ha seleccionado ningún plano")
                }


            });
        }
    }

    return{
        getNameAuthorBlueprints: getNameAuthorBlueprints,
        updateNameAuthorBlueprints: updateNameAuthorBlueprints,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
        getName: getName,
        init: init
    }
})();

