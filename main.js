import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ();

renderer.render( scene, camera );


const geometry2 = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material2 = new THREE.MeshBasicMaterial( { color:0xB1FF65, wireframe: true } );

const torus = new THREE.Mesh( geometry2, material2);


scene.add( torus )


const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add( pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);



// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

// polyhedron
const verticesOfCube = [
  -1,-1,-2,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
  -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
  2,1,0,    0,3,2,
  0,4,7,    7,3,0,
  0,1,5,    5,4,0,
  1,2,6,    6,5,1,
  2,3,7,    7,6,2,
  4,5,6,    6,7,4
];

const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 1, 2 );
const material = new THREE.MeshStandardMaterial( { color:0xB1FF65, wireframe: true } );

const polyhedron = new THREE.Mesh( geometry, material );

scene.add( polyhedron )


/*
// star
const verticesOfStar = [
  6,0,0,    3,1,0,    4,4,0,   1,3,0,  0,6,0,    -1,3,0,   
  -4,4,0,   -3,1,0    -6,0,0    -3,-1,0   -4,-4,0 -3,-1,0,
  0,-6,0    -3,1,0,   4,-4,0,    3,-1,0,  0,0,1,   0,0,-1
];

const indicesOfStarFaces = [
  0,1,16,    1,2,16,    2,3,16,   ,3,4,16,  4,5,16,   5,6,16,   6,7,16,   7,8,16,   8,9,16,    9,10,16,     10,11,16,   11,12,16,   12,13,16,   13,14,16,   14,15,16, 
  0,1,17,    1,2,17,    2,3,17,   ,3,4,17,  4,5,17,   5,6,17,   6,7,17,   7,8,17,   8,9,17,    9,10,17,     10,11,17,   11,12,17,   12,13,17,   13,14,17,   14,15,17
];

const starGeometry = new THREE.PolyhedronGeometry( verticesOfStar, indicesOfStarFaces, 12, 1 );

const star = new THREE.Mesh( starGeometry, material);

scene.add( star )
*/

/*
// moon with standard and normal texture
const moonTexture = new THREE.TextureLoader().load('pastel.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial( { map: moonTexture, normalMap: normalTexture } )

);

scene.add(moon)

//both of these mean the same thing...
moon.position.z = -15;
moon.position.setX(-40);
*/

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  polyhedron.rotation.x += -0.01;
  polyhedron.rotation.y += -0.0075;
  polyhedron.rotation.z += -0.005;

  camera.position.z = t * -0.007;
  camera.position.x = t * -0.0017;
  camera.position.y = t * -0.0017;
}

document.body.onscroll = moveCamera


function animate(){
  requestAnimationFrame( animate );

  polyhedron.rotation.x += -0.006;
  polyhedron.rotation.y += -0.001;
  polyhedron.rotation.z += -0.001;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera );

}
 
animate() 
