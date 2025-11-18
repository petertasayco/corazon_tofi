// Registrar botones solo si estamos en index.html
if (document.getElementById("btnEntrar")) {
    document.getElementById("btnEntrar").addEventListener("click", validarNombre);
}

// ------- PANTALLA DE ENTRADA --------
function validarNombre() {
    const nombre = document.getElementById("nombre").value.trim().toLowerCase();

    if (nombre !== "stephany") {
        alert("Tú no eres mi amor 😝");
        return;
    }

    // Ir a la página del corazón
    window.location.href = "corazon.html";
}


// ------- PANTALLA DEL CORAZÓN --------
if (document.getElementById("asciiCorazon")) {
    generarCorazon();
}

function generarCorazon() {
    const heart = [
"        *****       *****        ",
"     *********     *********     ",
"   ************* *************   ",
"  *****************************  ",
" ******************************* ",
" ******************************* ",
" ******************************* ",
"  *****************************  ",
"    *************************    ",
"      *********************      ",
"        *****************        ",
"          *************          ",
"            *********            ",
"              *****              ",
"               ***               ",
"                *                "
    ];

    const nombre = "STEPHANY";  // nombre que se repetirá dentro del corazón
    let index = 0;
    let text = "";

    for (let row of heart) {
        let line = "";
        for (let ch of row) {
            if (ch === "*") {
                line += nombre[index % nombre.length];
                index++;
            } else {
                line += " ";
            }
        }
        text += line + "\n";
    }

    document.getElementById("asciiCorazon").textContent = text;
}


//corazon.html

// if (document.getElementById("fireworksCanvas")) {
//     const canvas = document.getElementById("fireworksCanvas");
//     const ctx = canvas.getContext("2d");

//     // Ajustar tamaño
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     window.addEventListener("resize", () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     });

//     class Firework {
//         constructor(x, y, color) {
//             this.x = x;
//             this.y = y;
//             this.particles = [];
//             this.color = color;
//             for (let i = 0; i < 30; i++) {
//                 this.particles.push({
//                     x: x,
//                     y: y,
//                     vx: Math.random() * 6 - 3,
//                     vy: Math.random() * 6 - 3,
//                     alpha: 1,
//                     radius: Math.random() * 3 + 2
//                 });
//             }
//         }

//         update() {
//             for (let p of this.particles) {
//                 p.x += p.vx;
//                 p.y += p.vy;
//                 p.vy += 0.05; // gravedad
//                 p.alpha -= 0.02;
//             }
//             this.particles = this.particles.filter(p => p.alpha > 0);
//         }

//         draw() {
//             for (let p of this.particles) {
//                 ctx.beginPath();
//                 ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
//                 ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${p.alpha})`;
//                 ctx.fill();
//             }
//         }

//         isDone() {
//             return this.particles.length === 0;
//         }
//     }

//     const fireworks = [];

//     function randomColor() {
//         return {
//             r: Math.floor(Math.random() * 256),
//             g: Math.floor(Math.random() * 256),
//             b: Math.floor(Math.random() * 256)
//         };
//     }

//   let generarFuegos = true;

//    setTimeout(() => {
//         generarFuegos = false;
//     }, 4000);


//     function loop() {
//         ctx.fillStyle = "rgba(255, 230, 234, 0.2)"; // deja un rastro
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
// if(generarFuegos){
//     for (let i = 0; i < 2; i++) { // 2 fuegos por frame
//     if (Math.random() < 0.5) {
//         fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height/2, randomColor()));
//     }
// }

// }
        


//         for (let f of fireworks) {
//             f.update();
//             f.draw();
//         }

//         // eliminar fuegos terminados
//         for (let i = fireworks.length - 1; i >= 0; i--) {
//             if (fireworks[i].isDone()) fireworks.splice(i, 1);
//         }

//         requestAnimationFrame(loop);
//     }

//     loop();
// }

if (document.getElementById("fireworksCanvas")) {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const fireworks = [];

    function randomColor() {
        return {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = Math.random() * 6 - 3;
            this.vy = Math.random() * 6 - 5;
            this.alpha = 1;
            this.radius = Math.random() * 3 + 2;
            this.color = color;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05; // gravedad
            this.alpha -= 0.02;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
            ctx.fill();
        }

        isDone() {
            return this.alpha <= 0;
        }
    }

    class Firework {
        constructor(x) {
            this.x = x;
            this.y = canvas.height; // parte inferior de la pantalla
            this.targetY = Math.random() * canvas.height / 2; // altura a la que explota
            this.color = randomColor();
            this.exploded = false;
            this.particles = [];
        }

        update() {
            if (!this.exploded) {
                this.y -= 5; // sube como cohete
                if (this.y <= this.targetY) {
                    this.exploded = true;
                    this.explode();
                }
            } else {
                for (let p of this.particles) p.update();
                this.particles = this.particles.filter(p => !p.isDone());
            }
        }

        explode() {
            for (let i = 0; i < 30; i++) {
                this.particles.push(new Particle(this.x, this.y, this.color));
            }
        }

        draw() {
            if (!this.exploded) {
                // dibujar “cohete”
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
                ctx.fill();
            } else {
                for (let p of this.particles) p.draw();
            }
        }

        isDone() {
            return this.exploded && this.particles.length === 0;
        }
    }

    let generarFuegos = true;

    // detener generación de nuevos fuegos después de 4 segundos
    setTimeout(() => generarFuegos = false, 4000);

    function loop() {
        ctx.fillStyle = "rgba(255, 230, 234, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (generarFuegos) {
            if (Math.random() < 0.5) {
                fireworks.push(new Firework(Math.random() * canvas.width));
            }
        }

        for (let f of fireworks) {
            f.update();
            f.draw();
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
            if (fireworks[i].isDone()) fireworks.splice(i, 1);
        }

        requestAnimationFrame(loop);
    }

    loop();
}

