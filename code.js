// window.addEventListener('temperature', function(event){

// 	var pressure = event.value;
// 	$(".values").html("<h2>" + pressure + "</h2>");
// });

// window.addEventListener('devicelight', function(event){
// 	// alert(e.value);
// 	var luminosity = event.value;
// 	// showLuminosity(luminosity);

// 	if(luminosity <= 5){
// 		$(".values").css("opticity", "0.7");
// 		$(".values").html("<h2>" + luminosity + " Lux</h2> <h2>" + magneticflux + " MgFlux</h2>");
// 		// document.getElementById("sensor").addClass("veryDark");
// 		// document.body.className = "veryDark";
// 	}else if(luminosity <= 20){
// 		$(".values").css("opticity", "0.5");
// 		$(".values").html("<h2>" + luminosity + " Lux</h2> <h2>" + magneticflux + " MgFlux</h2>");
// 		// document.getElementById("sensor").addClass("lighter");
// 		// document.body.className = "lighter"
// 	}else if (luminosity <= 50) {
// 		$(".values").css("opticity", "0.3");
// 		$(".values").html("<h2>" + luminosity + " Lux</h2> <h2>" + magneticflux + " MgFlux</h2>");
// 		// document.getElementById("sensor").addClass("toobright");
// 		// document.body.className = "toobright";
//     }else{
// 		// document.body.className = ""
// 		$(".values").css("opticity", "0");
//     }
//     // luminosity = luminOver;
// });

// $(document).ready(function(){

// });


//Initialize
init();
animate();

function init(){

	function degToRad(d){
		return d * Math.PI/180;
	}

	var vizual = document.getElementById('triDtest');
	window.addEventListener('resize', triDtest.onResize, false);
	
	var fullWidth = 1920;
	var fullHeight = 1080;

	canvas = new triDtest( 'triDtest', fullWidth, fullHeight, 0, 0, vizual.clientWidth, vizual.clientHeight );
			

						
}



function animate(){
	canvas.animate();

	requestAnimationFrame(animate);
}



function triDtest(containerID, fullWidth, fullHeight, viewX, viewY, viewWidth, viewHeight){
	var container, stats;
	

	var virtualCamera, scene, renderer, united;
	var camera;

	var mesh1, light;

	var mouseX = 0, mouseY = 0;
	var cameraZ = 1000;

	var windowHalfX = window.innerWidth;
	var windowHalfY = window.innerHeight;
	var FIXED_SIZE_W = 800;
	var FIXED_SIZE_H = 600;

	var rendertime = 0;
	var renderToggle = false;
	
	var glitchPass, bloomPass;
	var geometry, material;

	var radius = 500;


	init();

	function init(){

		container = document.getElementById(containerID);
		mesh1 = new THREE.Object3D();

		window.addEventListener('resize', onResize, false);

	//Camera Setup
		camera = new THREE.PerspectiveCamera(90, 800 / 600, 1, 10000);
		// camera.position.x = 200;
		// camera.position.y = 100;
		camera.position.z = 1000;
		// camera.setViewOffset(fullWidth, fullHeight, viewX, viewY, viewWidth, viewHeight);

	//Setup for virtual camera, for the illusion of movement. Attaches camera to the mouselistener
		// virtualCamera = new THREE.Camera();
		// virtualCamera.add( camera );
		// virtualCamera.position.z = cameraZ;

	//Important scene initialization
		scene = new THREE.Scene();

		// scene.add(virtualCamera);

		light = new THREE.DirectionalLight( 0xffffff );
		// light.position.set( 0, 0, 1 ).normalize();
		scene.add( light );

		// THREEx.WindowResize(renderer, camera);

			light.position.x = Math.random() - 0.5;
   			light.position.y = Math.random() - 0.5;
   			light.position.z = Math.random() - 0.5;

   		//Set a canvas to every div in the array
		var canvas = document.createElement( 'canvas' ); 
			

		// geometry = new THREE.RingGeometry( radius*.7,radius, 3,3, 3, Math.PI*2);
		geometry = new THREE.OctahedronGeometry(radius*.7, 0)
		// geometry.rotation.y = Math.random()*Math.PI;
		material = new THREE.MeshBasicMaterial( { 
			color: 0xFF3399, 
			wireframe: true ,
			// blending: THREE.AdditiveBlending,
			depthWrite:false,
			depthTest:false,
			transparent:false,
			opacity:1,
			wireframeLinewidth: 50
			// side: THREE.DoubleSide
		} );



			var mesh = new THREE.Mesh(geometry, material);
			mesh1.add(mesh);
			scene.add(mesh1);

			geometry = new THREE.RingGeometry( radius*.7,radius, 3,3, 3, Math.PI*2);

			material = new THREE.MeshBasicMaterial( { 
			color: 0xFF3399, 
			wireframe: false ,
			// blending: THREE.AdditiveBlending,
			depthWrite:false,
			depthTest:false,
			transparent:false,
			opacity:1,
			wireframeLinewidth: 50,
			side: THREE.DoubleSide
			} );

			var mesh = new THREE.Mesh(geometry, material);
			mesh1.add(mesh);
			scene.add(mesh1);


	//Renderer setup
		renderer = new THREE.WebGLRenderer({ anialias: true });
		renderer.setSize(1920,1080);
		renderer.setClearColor ( 0x000000 );
		renderer.setPixelRatio( window.devicePixelRatio);
		renderer.setSize( container.clientWidth, container.clientHeight);
		container.appendChild( renderer.domElement );

	//Shader Setup
		// effect = new THREE.AsciiEffect( renderer );
		// // effect.setSize( 450, 220 );
		// effect.setSize( container.clientWidth, container.clientHeight);
		// // container.appendChild( effect.domElement );
		// scene.add(effect);

	//Sets up a effectPass and pases everything in the group not the renderer
		united = new THREE.EffectComposer(renderer);
		united.addPass( new THREE.RenderPass(scene, camera));


	//BloomPass ew gross
		// bloomPass = new THREE.BloomPass();
		// united.addPass (bloomPass);

	//GlitchPass effect
		glitchPass = new THREE.GlitchPass();
		// glitchPass.renderToScreen = true;
		united.addPass (glitchPass);

	//FilmShader
		// effect = new THREE.ShaderPass(THREE.FilmShader);
		// united.addPass( effect );

		// effect = new THREE.ShaderPass(THREE.CopyShader);
		// united.addPass( effect );

		effect = new THREE.ShaderPass(THREE.MirrorShader)
		united.addPass( effect );

	//Glitch Shader effect
		// effect = new THREE.ShaderPass( THREE.DigitalGlitch);
		// // // effect.renderToScreen = true;
		// effect.uniforms['tDisp'].value = 50.0;
		// united.addPass (effect);

	//BadTV shader
		// effect = new THREE.ShaderPass(THREE.BadTVShader);
		// effect.uniforms['tDiffuse'].value = 1.0;
		// effect.uniforms['time'].value = 1.0;
		// effect.uniforms['distortion'].value = 2.5;
		// effect.uniforms['distortion2'].value = 1.0;
		// effect.uniforms['speed'].value = 0.1;
		// effect.uniforms['rollSpeed'].value = 8.0;
		// // effect.renderToScreen = true;
		// united.addPass(effect);

	//Colour displacment Shader
		effect = new THREE.ShaderPass( THREE.RGBShiftShader );
		// effect.uniforms[ 'amount' ].value = 0.07;	
		united.addPass( effect );

		effect.renderToScreen = true;

	//Mouse event listeners for movement
		// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		// document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
		
	}
		mesh1.rotation.z = Math.random()*Math.PI;

		//Mouse fucntions
			// function onDocumentMouseMove ( event ) {

			// 		mouseX = ( event.clientX - windowHalfX );
			// 		mouseY = ( event.clientY - windowHalfY );

			// 	}

			// 	function onDocumentMouseWheel ( event ) {

			// 		var delta = 0;

			// 		if ( event.wheelDelta ) {

			// 			delta = event.wheelDelta / 120;
			// 			if ( window.opera ) delta = -delta;

			// 		} else if ( event.detail ) {

			// 			delta = -event.detail / 3;

			// 		}

			// 		if ( delta ) {

			// 			if ( delta < 0 ) {

			// 				cameraZ -= 100;

			// 			} else {

			// 				cameraZ += 100;

			// 			}

			// 		}

			// 	}

		//update render time
			function update() {
				rendertime += 0.01;
				
			};


		//Resize
			// function onWindowResize() {

			// 	camera.aspect = clientX.innerWidth / clientY.innerHeight;
			// 	camera.updateProjectionMatrix();

			// 	renderer.setSize( clientX.innerWidth, clientY.innerHeight );

			// };

		function onResize(){
			var winResize = new THREEx.WindowResize(renderer, camera);
			renderer.devicePixelRatio   = 1/4;
			winResize.trigger();
			// var renderW;
			// var renderH;

			// if (document.fullSize){
			// 	var renderW = window.innerWidth;
			// 	var renderH = window.innerHeight;

			// 	// if (ControlsHandler.vizParams.showControls){
			// 	// 	renderW -= 250;
			// 	// }
			// 	$('#triDtest').css({top:0});

			// }else{
			// 	var renderW = FIXED_SIZE_W;
			// 	var renderH = FIXED_SIZE_H;
			// 	//vertically center viz output
			// 	$('#triDtest').css({top:window.innerHeight/2 - FIXED_SIZE_H/2});
			// }

			// camera.aspect = renderW / renderH;
			// camera.updateProjectionMatrix();
			// renderer.setSize( renderW,renderH);
		}

			// var windowResize = THREEx.WindowResize(renderer, camera);
			// 	windowResize.destroy();
				
			//update renderer camera and Passes
				this.animate = function() {

					render();
					// stats.update();
					// renderer.render( scene, camera );
					// effect.render( scene, camera );

				};

				function render() {
					mesh1.rotation.z += 0.01;
					mesh1.rotation.y += 0.01;

					window.addEventListener("deviceproximity", function(event){
						var prox = event.value;
						mesh1.scale.set(prox, prox, prox);
						$(".values").html("<p> You are " + prox + " close</p>")
					}, false);

				//Update Virtualcamera for mouse movement
					// virtualCamera.position.x = -mouseX * 3;
					// virtualCamera.position.y = -mouseY *-3;
					// virtualCamera.position.z = cameraZ;
					// virtualCamera.lookAt( scene.position );

					 // new renderer to render scenes

					camera.position.x += ( mouseX - camera.position.x ) * 0.02;
					camera.position.y += ( - mouseY - camera.position.y ) * 0.02;


				
                	// renderer.render( scene, camera );	
                	united.render(scene, camera);
				};
};