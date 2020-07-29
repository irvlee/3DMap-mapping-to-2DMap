 
 function mappingPosition(){
    //  dynamic input
    var left = -100;
    var right = 100;
    var top = -100;
    var bottom = 100;
   
     
    for (let index = 0; index < 10; index++) {
        const left = Math.random().toFixed(2) *125

        const top = Math.random().toFixed(2) *250
        let div = document.createElement("div")
        div.style.left = left -2.5+ "px";
        div.style.top = top-2.5 + "px";
        div.classList.add("circle");
        document.getElementsByClassName("map").item(0).appendChild(div);
        div.addEventListener("click",function(){
            alert(index);
        })
    }

    // realtime input position
    var inputX = 100;
    var inputY = 50;

    var inputWidth = right - left;
    var inputHight = bottom - top;

    // projection
    var width = 250;
    var height = 125;


    // projection position
    var xWidthRatio = (inputX - left) / inputWidth;
    var yHeightRatio =(inputY - top) / inputHight;
    var currentX = width * xWidthRatio;
    var currentY = height * yHeightRatio;

    // debugger

    // console.info([currentX,currentY]);
    var d = document.getElementsByClassName("map").item(0).addEventListener("click",function(){

        var direction = document.getElementById("direction")
        direction.style.top = currentY-10+'px';
        direction.style.left = `${currentX-10}px `;
     })

 }
 
 mappingPosition();


 function babylonjsInit(){
    var canvas = document.getElementById("renderCanvas"); 
    var engine = new BABYLON.Engine(canvas, true);
    var camera;
    /******* Add the create scene function ******/
    var createScene = function () {

        var scene = new BABYLON.Scene(engine);

        camera = new BABYLON.ArcRotateCamera(
            "Camera",
            -2.5, 1.2, 10, new BABYLON.Vector3(0, 0, 0),
            scene,
            true
        );
        camera.lowerRadiusLimit = 5;
        camera.upperRadiusLimit = 100;
        camera.attachControl(canvas, true);

        return scene;
    };
    /******* End of the create scene function ******/

    var scene = createScene(); //Call the createScene function
  
    //  dynamic input
    var left = -100;
    var right = 100;
    var top = -100;
    var bottom = 100;
    var xl,yl;
    var time =0;
  
    engine.runRenderLoop(function () {
            scene.render();
            // console.log(11);
            var pos =  camera.position.asArray()
            let x = pos[0]
            let y = pos[1]

            var {currentX, currentY } = mapping2DMap(x,y,top,bottom,left,right,125,250)

            direction.style.top = currentY-10+'px';
            direction.style.left = `${currentX-10}px `;
            

            // console.log(camera.position);
            // console.log(camera);
            const degree = camera.alpha * 180 / Math.PI;
            
        //    console.log(degree);
           
 
            direction.style.transform =`rotate(${degree}deg)`
            // direction.style.transition = "all ease 0.5s"
            
            
    });

    // 监听浏览器改变大小的事件，通过调用engine.resize()来自适应窗口大小
    window.addEventListener("resize", function () {
            engine.resize();
    });

    // scene.registerBeforeRender(function () {
    //     alert(1);
    //     panel.rotation = Math.PI - camera.alpha + Math.PI / 2;
    // });
 }
 babylonjsInit();

 /**
  *
  * @param {*} x inputX  in 3D
  * @param {*} y inputY  in 3D
  * @param {*} top    -90
  * @param {*} bottom  90
  * @param {*} left    -180 
  * @param {*} right    180
  * @param {*} projWidth  width 2D 
  * @param {*} projHeight height 2D
  * @returns {} x y in 2D
  */
 function mapping2DMap(x,y,top,bottom, left, right, projWidth,projHeight){
      // realtime input position
      var inputX = x;
      var inputY = y;

      var inputWidth = right - left;
      var inputHight = bottom - top;

      // projection
      var width = projWidth //250;
      var height = projHeight //125;

      // projection position
      var xWidthRatio = (inputX - left) / inputWidth;
      var yHeightRatio =(inputY - top) / inputHight;
      var currentX = width * xWidthRatio;
      var currentY = height * yHeightRatio;
      return {
          currentX,
          currentY
      }
 }