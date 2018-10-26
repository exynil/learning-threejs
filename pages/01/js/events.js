// Отслеживание изменения размера окна
addEventListener('resize', function () {
	camera.aspect = innerWidth / innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(innerWidth, innerHeight);
})

// Отслеживание нажатия клавиш
addEventListener('keypress', function (event) {
	if (event.shiftKey) {
		switch (event.keyCode) {
			case 43:

				break;
			case 45:

				break;
		}
	} else {
		switch (event.keyCode) {
			case 13:

				break;
		}
	}
})

addEventListener('keydown', function (event) {
	switch (event.code) {
		case 'Delete':

			break;
	}
})