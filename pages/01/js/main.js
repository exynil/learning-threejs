var scene, camera, renderer;

init();

animate();

function init() {
    // Камера
    camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000000);
    camera.position.set(-200, 200, -200);

    // Сцена
    scene = new THREE.Scene();

    // Освещение
    let pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-100, 250, 100);
    scene.add(pointLight);

    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
    hemiLight.position.set(0, 150, 0);
    scene.add(hemiLight);

    // Сетка
    let helper = new THREE.GridHelper(200, 20, 0xFF4444, 0x404040);
    scene.add(helper);

    // Блоки
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let material = new THREE.MeshLambertMaterial({ color: randomColor() });
            let height = (i + j) * 5 + 2;
            let boxGeometry = new THREE.BoxGeometry(10, height, 10);
            let boxMesh = new THREE.Mesh(boxGeometry, material);
            boxMesh.position.x = i * 10 - 45;
            boxMesh.position.z = j * 10 - 45;
            boxMesh.position.y = height / 2;
            scene.add(boxMesh);
        }
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Генерация слуйного числа из заданного диапазона
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Генерация случайного цвета
function randomColor() {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    return 'rgb(' + red + ', ' + green + ',' + blue + ')';
}