class Vehicle {
    constructor(particle, limitation) {
        this.particle = particle;
        this.vel = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
        this.limitation = limitation;
    }

    update() {
        this.particle.position.x += this.vel.x;
        this.particle.position.y += this.vel.y;
        this.particle.position.z += this.vel.z;

        if (this.particle.position.x < -this.limitation || this.particle.position.x > this.limitation) {
            this.vel.x = -this.vel.x;
        }
        if (this.particle.position.y < -this.limitation || this.particle.position.y > this.limitation) {
            this.vel.y = -this.vel.y;
        }
        if (this.particle.position.z < -this.limitation || this.particle.position.z > this.limitation) {
            this.vel.z = -this.vel.z;
        }
    }
}