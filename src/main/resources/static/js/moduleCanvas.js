var moduleCanvas=(function(){

  //private variables
  var canvas = document.getElementById("mycanvas"),
      context = canvas.getContext("2d");

  var points = [],
      bluePrint;

  var init = function(){
  //if PointerEvent is suppported by the browser:
        if(window.PointerEvent) {
          canvas.addEventListener("pointerdown", function(event){
            author = app.getName();
            if(author !== undefined){
                var { pX, pY } = event;
                pX = pX - canvas.offsetLeft;
                pY = pY - canvas.offsetTop;
                var point = {x: pX, y:pY}
                points.push(point);
                context.lineTo(point.x, point.y);
                context.stroke();
            }else{
                alert("No se ha seleccionado un autor");
            }

          });
        }
  }

  var getNewPoints = function(){
    return points;
  }

  //returns an object with 'public' functions:
  return {

    //function to initialize application
    init:init,
    getNewPoints:getNewPoints

    }

})();
