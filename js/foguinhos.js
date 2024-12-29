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

// Carrega o som do fogo de artifício
const fireworkSound = new Audio('assets/firework.mp3'); // Caminho do som

// Obtem a próxima letra da mensagem
function getRandomLetter() {
	const letter = letters.charAt(letterIndex); // Obtém a letra atual
	letterIndex = (letterIndex + 1) % letters.length; // Avança para a próxima letra, volta ao início ao final da mensagem
	return letter;
}

// Cria um fogo de artifício na posição do clique
function createFirework(x, y) {
	const launchHeight =
			Math.random() * (window.innerHeight / 4) + window.innerHeight / 4;  // Define uma altura de lançamento aleatória
	const projectile = document.createElement("div");  // Cria um elemento de projétil (div)
	projectile.classList.add("projectile");  // Adiciona a classe 'projectile'
	document.body.appendChild(projectile);  // Adiciona o projétil ao corpo da página
	projectile.style.left = `${x}px`;  // Define a posição horizontal
	projectile.style.top = `${y}px`;  // Define a posição vertical

	anime({  // Anima o projétil
			targets: projectile,
			translateY: -launchHeight,  // Move o projétil para cima até a altura de lançamento
			duration: 1200,  // Duração da animação (1.2 segundos)
			easing: "easeOutQuad",  // Suaviza a animação
			complete: () => {
					projectile.remove();  // Remove o projétil após a animação
					createBurst(x, y - launchHeight);  // Cria a explosão na altura onde o projétil termina
			}
	});
}

// Cria uma explosão de partículas
function createBurst(x, y) {
	const numLetters = 15; // Quantidade de letras na explosão
	const numSparkles = 50; // Quantidade de brilhos na explosão para um efeito mais dramático

	// Cria as letras
	for (let i = 0; i < numLetters; i++) {
			createParticle(x, y, false);  // Cria uma partícula (letra)
	}

	// Cria os brilhos
	for (let i = 0; i < numSparkles; i++) {
			createParticle(x, y, true);  // Cria uma partícula (brilho)
	}
}

// Cria uma única partícula (letra ou brilho)
function createParticle(x, y, isSparkle) {
	const el = document.createElement("div");  // Cria um elemento div
	el.classList.add(isSparkle ? "sparkle" : "particule");  // Adiciona a classe 'sparkle' ou 'particule'
	const instruction = document.querySelector('.instructions').style.display = 'none';  // Esconde as instruções após o clique

	if (!isSparkle) {
			el.textContent = getRandomLetter();  // Define a letra para a partícula
			el.style.color = colors[Math.floor(Math.random() * colors.length)];  // Escolhe uma cor aleatória para a letra
	} else {
			el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];  // Escolhe uma cor aleatória para o brilho
	}

	el.style.left = `${x}px`;  // Define a posição horizontal da partícula
	el.style.top = `${y}px`;  // Define a posição vertical da partícula
	document.body.appendChild(el);  // Adiciona a partícula ao corpo da página

	animateParticle(el, isSparkle);  // Anima a partícula
}

// Anima uma partícula
function animateParticle(el, isSparkle) {
	const angle = Math.random() * Math.PI * 2;  // Define uma direção aleatória
	const distance = anime.random(100, 200);  // Define uma distância aleatória maior para espalhar mais
	const duration = anime.random(1200, 2000);  // Define uma duração aleatória mais longa
	const fallDistance = anime.random(20, 80);  // Define uma queda maior para mais realismo
	const scale = isSparkle ? Math.random() * 0.5 + 0.5 : Math.random() * 1 + 0.5;  // Escala diferente para brilhos e letras

	anime
			.timeline({
					targets: el,
					easing: "easeOutCubic",  // Suaviza a animação ao sair
					duration: duration,
					complete: () => el.remove()  // Remove o elemento após a animação
			})
			.add({
					translateX: Math.cos(angle) * distance,  // Move na direção definida
					translateY: Math.sin(angle) * distance,
					scale: [0, scale],  // Faz a partícula crescer do nada
					opacity: [1, 0.9]  // Diminui a opacidade levemente
			})
			.add({
					translateY: `+=${fallDistance}px`,  // Adiciona efeito de queda
					opacity: [0.9, 0],  // Faz a partícula desaparecer
					easing: "easeInCubic",  // Suaviza a animação ao entrar
					duration: duration / 2
			});
}

// Adiciona um evento de clique para criar fogos de artifício e tocar o som
const FireworkSound = new Audio('musica.mp3'); // Substitua pelo caminho do arquivo MP3
fireworkSound.volume = 0.0; // Ajuste o volume (0.0 a 1.0, sendo 1.0 o volume máximo)

document.addEventListener("click", (e) => {
    createFirework(e.clientX, e.clientY);
    fireworkSound.play();
});


// // Dispara automaticamente um fogo de artifício quando a página é carregada
// window.onload = function () {
// 	const centerX = window.innerWidth / 2;
// 	const centerY = window.innerHeight / 2;
// 	createFirework(centerX, centerY);
// };
