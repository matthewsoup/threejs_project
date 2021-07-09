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

// torus
const geometry2 = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material2 = new THREE.MeshBasicMaterial( { color:0x0051ff, wireframe: true } );

const torus = new THREE.Mesh( geometry2, material2 );


scene.add( torus )
// torus

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);



//const berserkTexture = new THREE.TextureLoader().load('img/Berserk.png');
//scene.background = berserkTexture;

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
const material = new THREE.MeshStandardMaterial( { color: 0x0051ff, wireframe: true } );

const polyhedron = new THREE.Mesh( geometry, material );

scene.add( polyhedron )
// polyhedron

// plane *hidden*
//const geometry3 = new THREE.PlaneGeometry( 2, 2 );
//const material3 = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: true} );

//const plane = new THREE.Mesh( geometry3, material3 );

//scene.add( plane );

// plane positioning
//plane.position.z = 4;
//plane.position.setX(-5);
// plane *hidden*

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  //plane.rotation.x += -0.00;
  //plane.rotation.y += -0.000;
  //plane.rotation.z += -0.000;

  polyhedron.rotation.x += -0.01;
  polyhedron.rotation.y += -0.0075;
  polyhedron.rotation.z += -0.005;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0017;
  camera.position.y = t * -0.0017;
}

document.body.onscroll = moveCamera

moveCamera()

function animate(){
  requestAnimationFrame( animate );

  //plane.rotation.x += -0.01;
  //plane.rotation.y += -0.01;
  //plane.rotation.z += -0.000;

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

//bg color
scene.background = new THREE.Color(0xffffff);

/*
//hover effect
new hoverEffect({
  parent: document.querySelector('.img'),
  image1: './img/berserk.png',
  image2: './img/berserk2.jpg',
  displacementImage: './img/map.png'
})
*/

//movement animation to happen
const card = document.querySelector(".card");
const container = document.querySelector(".container");

//moving animation event
container.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
//animate in
container.addEventListener("mouseenter", (e) => {
  card.style.transition = "none";
});
//animate out
container.addEventListener("mouseleave", (e) => {
  card.style.transition = "all 0.5s ease";
  card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});
