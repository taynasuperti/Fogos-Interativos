/* Define as cores */
const colors = [
	"#ff6f91",
	"#ff9671",
	"#ffc75f",
	"#f9f871",
	"#ff4c4c",
	"#ffcc00"
];
const letters = "I LOVE YOU"; // Define a mensagem 
let letterIndex = 0; // Acompanha o índice inicial

// Obtem a próxima letra da mensagem
function getRandomLetter() {
	const letter = letters.charAt(letterIndex);
	letterIndex = (letterIndex + 1) % letters.length;
	return letter;
}

// Cria um fogo de artifício na posição do clique
function createFirework(x, y) {
	const launchHeight = Math.random() * (window.innerHeight / 4) + window.innerHeight / 4;
	const projectile = document.createElement("div");
	projectile.classList.add("projectile");
	document.body.appendChild(projectile);
	projectile.style.left = `${x}px`;
	projectile.style.top = `${y}px`;

	anime({
		targets: projectile,
		translateY: -launchHeight,
		duration: 1200,
		easing: "easeOutQuad",
		complete: () => {
			projectile.remove();
			createBurst(x, y - launchHeight);
		}
	});
}

// Cria uma explosão de partículas
function createBurst(x, y) {
	const numLetters = 15;
	const numSparkles = 50;

	for (let i = 0; i < numLetters; i++) {
		createParticle(x, y, false);
	}

	for (let i = 0; i < numSparkles; i++) {
		createParticle(x, y, true);
	}
}

// Cria uma partícula (letra ou brilho)
function createParticle(x, y, isSparkle) {
	const el = document.createElement("div");
	el.classList.add(isSparkle ? "sparkle" : "particule");
	document.querySelector('.instructions').style.display = 'none';

	if (!isSparkle) {
		el.textContent = getRandomLetter();
		el.style.color = colors[Math.floor(Math.random() * colors.length)];
	} else {
		el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
	}

	el.style.left = `${x}px`;
	el.style.top = `${y}px`;
	document.body.appendChild(el);
	animateParticle(el, isSparkle);
}

// Anima a partícula
function animateParticle(el, isSparkle) {
	const angle = Math.random() * Math.PI * 2;
	const distance = anime.random(100, 200);
	const duration = anime.random(1200, 2000);
	const fallDistance = anime.random(20, 80);
	const scale = isSparkle ? Math.random() * 0.5 + 0.5 : Math.random() * 1 + 0.5;

	anime.timeline({
		targets: el,
		easing: "easeOutCubic",
		duration: duration,
		complete: () => el.remove()
	}).add({
		translateX: Math.cos(angle) * distance,
		translateY: Math.sin(angle) * distance,
		scale: [0, scale],
		opacity: [1, 0.9]
	}).add({
		translateY: `+=${fallDistance}px`,
		opacity: [0.9, 0],
		easing: "easeInCubic",
		duration: duration / 2
	});
}

// Música de fundo (apenas 'musica.mp3' será usada)
const audioPlayer = new Audio('musica.mp3');  
const inicioRefrao = 60;  // Começa em 1:00
let musicaIniciada = false;  // Evita que a música inicie múltiplas vezes

// Volume da música (30%)
audioPlayer.volume = 0.3;

// Evento de clique para criar fogos e iniciar música
document.addEventListener("click", (e) => {
	createFirework(e.clientX, e.clientY);

	// Inicia a música apenas uma vez
	if (!musicaIniciada) {
		audioPlayer.currentTime = inicioRefrao;  // Começa no refrão
		audioPlayer.play();
		musicaIniciada = true;
	}
});
