var container = document.getElementById('container')

var vertexHeight = 2000,
planeDefinition = 75,
planeSize = 150000,
totalObjects = 1,
background = "#000000",
meshColor = "#005e97";

var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000)
camera.position.z = 8000;
camera.position.y = 8000;

var scene = new THREE.Scene();
scene.fog = new THREE.Fog(background, 1, 150000);

var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);
var plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
color: meshColor,
wireframe: true
}));
plane.rotation.x -= Math.PI * .5;

scene.add(plane);

var renderer = new THREE.WebGLRenderer({alpha: false});
renderer.setSize(window.innerWidth, window.innerHeight*0.92);
renderer.setClearColor(background, 1);

container.appendChild(renderer.domElement);


updatePlane();

function updatePlane() {
for (var i = 0; i < planeGeo.vertices.length; i++) {
  planeGeo.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
  planeGeo.vertices[i]._myZ = planeGeo.vertices[i].z
}
};

render();

var count = 0
function render() {
requestAnimationFrame(render);
// camera.position.z -= 150;
var x = camera.position.x;
var z = camera.position.z;
camera.position.x = x;
camera.lookAt(new THREE.Vector3(0, 8000, 0))

for (var i = 0; i < planeGeo.vertices.length; i++) {
  var z = +planeGeo.vertices[i].z;
  planeGeo.vertices[i].z = Math.sin(( i + count * 0.00001)) * (planeGeo.vertices[i]._myZ - (planeGeo.vertices[i]._myZ* 0.65))
  plane.geometry.verticesNeedUpdate = true;

  count += 0.1
}

renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
//changes the size of the canavs and updates it
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight*0.92);
}
