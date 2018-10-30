var scene, camera, renderer;
var stats;
var lights, light, count = 4, limitation = 100;

var colors = ['#ff0040', '#0040ff', '#80ff80', '#ffaa00', '#00ffaa', '#ff1100'];

init();

animate();

function init() {
    // Сцена
    scene = new THREE.Scene();

    // Камера
    camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000000);
    camera.position.set(0, 150, 400);

    let pictureMat = new THREE.MeshStandardMaterial({
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 0.0005,
    });

    let textureLoader = new THREE.TextureLoader();
    textureLoader.load('img/photo_diffuse.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(1, 1);
        pictureMat.map = map;
        pictureMat.needsUpdate = true;
    })

    let pictureGeometry = new THREE.PlaneBufferGeometry(380, 280);
    let pictureMesh = new THREE.Mesh(pictureGeometry, pictureMat);
    pictureMesh.receiveShadow = true;
    scene.add(pictureMesh);

    let loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        let xMid, text;
        let color = 0x006699;
        let matLite = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1
        });
        let message = '<19.10.2018/>';
        let shapes = font.generateShapes(message, 40);
        let geometry = new THREE.ShapeBufferGeometry(shapes);
        geometry.computeBoundingBox();
        xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);
        text = new THREE.Mesh(geometry, matLite);
        text.rotation.z = text.rotation.x = Math.PI;
        scene.add(text);
    });


    // Свет
    lights = new Array();

    let sphere = new THREE.SphereBufferGeometry(1, 16, 8);

    for (let i = 0; i < count; i++) {
        light = new THREE.PointLight(randomColor(), 2.5, 100, 2.0);
        light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: randomColorFromArray(colors) })))

        lights.push(new LightVehicle(light, limitation));
        scene.add(light);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function render() {
    for (let i = 0; i < count; i++) {
        lights[i].update();
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

// Выбор случайного элемента из массива
function randomColorFromArray(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
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