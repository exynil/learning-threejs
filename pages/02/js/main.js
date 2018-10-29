var scene, camera, renderer;
var stats;
var SEPARATION = 10, AMOUNTX = 20, AMOUNTY = 20;
var particles, particle, count = 0;

init();

animate();

function init() {
    // Сцена
    scene = new THREE.Scene();

    // Камера
    camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000000);
    camera.position.set(0, 150, 200);

    // Частицы
    particles = new Array();
    let map = new THREE.TextureLoader().load('./img/textures/sprites/disc.png');
    let material = new THREE.SpriteMaterial({ color: 0x31F7F7, map: map });

    for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[ix * AMOUNTY + iy] = new THREE.Sprite(material);
            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
            scene.add(particle);
        }
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function render() {
    for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[ix * AMOUNTY + iy];
            particle.position.y = (Math.sin((ix + count) * 0.3) * 5) + (Math.sin((iy + count) * 0.5) * 5);
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1.5) + (Math.sin((iy + count) * 0.5) + 1.5);
        }
    }
    renderer.render(scene, camera);
    count += 0.1;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}