// Отслеживание изменения размера окна
addEventListener('resize', function () {
	camera.aspect = innerWidth / innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(innerWidth, innerHeight);
})