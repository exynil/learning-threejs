class LightVehicle {
    constructor(light, limitation) {
        this.light = light;
        this.limitation = limitation;
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
    }

    update() {
        let time = Date.now() * 0.00025;
        let d = 100;
        let a = Math.random();
        let b = Math.random
        this.light.position.x = Math.sin( time * this.x ) * d;
        this.light.position.y = Math.cos( time * this.y ) * d;
        this.light.position.z = 20;
    }
}