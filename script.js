// =========================================================================
// 1. REVELAÇÃO DAS SEÇÕES AO ROLAR A PÁGINA
// =========================================================================
const secoesAnimadas = document.querySelectorAll('.section.animate');

const observerSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('in-view');
            observerSecoes.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

secoesAnimadas.forEach((secao) => observerSecoes.observe(secao));

// =========================================================================
// 2. EFEITO DE DIGITAÇÃO E APAGAMENTO EM LOOP NO BALÃO
// =========================================================================
const textoDigitado = document.getElementById('typed-text');
const fraseBalao = 'Sempre criando por aqui';

function iniciarLoopDigitacao(texto, elemento, velocidadeDigitacao = 90, velocidadeApagamento = 60, pausaEntreCiclos = 2000) {
    let indiceCaractere = 0;
    let apagando = false;

    function loop() {
        const textoAtual = texto.substring(0, indiceCaractere);
        elemento.textContent = textoAtual;

        if (!apagando) {
            indiceCaractere++;
            if (indiceCaractere > texto.length) {
                apagando = true;
                setTimeout(loop, pausaEntreCiclos);
                return;
            }
        } else {
            indiceCaractere--;
            if (indiceCaractere < 0) {
                apagando = false;
                setTimeout(loop, 500);
                return;
            }
        }

        setTimeout(loop, apagando ? velocidadeApagamento : velocidadeDigitacao);
    }

    loop();
}

if (textoDigitado) {
    iniciarLoopDigitacao(fraseBalao, textoDigitado);
}

// =========================================================================
// 3. MANIPULAÇÃO DO TEMA (CLARO/ESCURO)
// =========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// =========================================================================
// 4. CONTROLE DE ÁUDIO NATIVO (MP3)
// =========================================================================
const audio = document.getElementById('background-audio');
const musicToggleBtn = document.getElementById('music-toggle');
let isPlaying = false;

// Ajuste o volume se quiser (0.0 até 1.0)
audio.volume = 0.4; 

musicToggleBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicToggleBtn.classList.remove('music-playing');
        isPlaying = false;
    } else {
        audio.play().then(() => {
            musicToggleBtn.classList.add('music-playing');
            isPlaying = true;
        }).catch(error => {
            console.log("O navegador impediu a reprodução automática. Clique novamente.", error);
        });
    }
});

// =========================================================================
// 5. GERADOR AUTOMÁTICO DE BRILHOS NO FUNDO DA SEÇÃO SOBRE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const secaoSobre = document.getElementById("sobre");
    const container = document.querySelector(".sparkles-container");
    
    if (container && secaoSobre) {
        const quantidadeBrilhos = 30;

        for (let i = 0; i < quantidadeBrilhos; i++) {
            const sparkle = document.createElement("div");
            sparkle.classList.add("sparkle");

            // Distribui aleatoriamente usando a largura e altura exatas da seção sobre
            sparkle.style.left = Math.random() * secaoSobre.clientWidth + "px";
            sparkle.style.top = Math.random() * secaoSobre.clientHeight + "px";

            // Tamanho variado (entre 3px e 7px)
            const tamanho = Math.random() * 4 + 3;
            sparkle.style.width = tamanho + "px";
            sparkle.style.height = tamanho + "px";

            // Atraso e duração aleatórios
            sparkle.style.animationDuration = (Math.random() * 3 + 3) + "s";
            sparkle.style.animationDelay = (Math.random() * 5) + "s";

            container.appendChild(sparkle);
        }
    }
});