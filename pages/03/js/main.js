var scene, camera, renderer;
var stats;
var particles, particle, count = 1000, limitation = 100;

var colors = ['#00FF7F', '#7B68EE', '#00FFFF'];

init();

animate();

function init() {
    // Сцена
    scene = new THREE.Scene();

    // Камера
    camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000000);
    camera.position.set(0, 150, 400);

    // Куб
    let cubeGeometry = new THREE.BoxGeometry(limitation * 2, limitation * 2, limitation * 2);
    let cubeMaterial = new THREE.MeshBasicMaterial({ color: randomColorFromArray(colors), wireframe: true });
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    // Частицы
    particles = new Array();
    let map = new THREE.TextureLoader().load('./img/textures/sprites/disc.png');

    for (let i = 0; i < count; i++) {
        let material = new THREE.SpriteMaterial({ color: randomColorFromArray(colors), map: map });
        particle = new THREE.Sprite(material);
        particle.scale.x = particle.scale.y = 2;

        particle.position.x = randomIntFromRange(-limitation, limitation);
        particle.position.y = randomIntFromRange(-limitation, limitation);
        particle.position.z = randomIntFromRange(-limitation, limitation);

        particles.push(new Vehicle(particle, limitation));
        scene.add(particle);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function render() {
    for (let i = 0; i < count; i++) {
        particles[i].update();
    }

    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

// Генерация слуйного числа из заданного диапазона
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomColorFromArray(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}
