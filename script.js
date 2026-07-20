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
// CONTROLE DE ÁUDIO NATIVO (MP3)
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

// Função chamada automaticamente pelo YouTube quando a API carrega
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player', {
        height: '200',
        width: '200',
        videoId: 'OJ62RzJkYUo',
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': 'OJ62RzJkYUo',
            'controls': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
};

function onPlayerReady(event) {
    playerReady = true;
}

// Controle do botão de música integrado
musicToggleBtn.addEventListener('click', () => {
    // Se o player do YouTube ainda estiver carregando, evita erros
    if (!playerReady || !player) {
        console.log("O player ainda está carregando, aguarde um segundo...");
        return;
    }

    const estado = player.getPlayerState();

    if (estado === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        musicToggleBtn.classList.remove('music-playing');
        isPlaying = false;
    } else {
        player.playVideo();
        musicToggleBtn.classList.add('music-playing');
        isPlaying = true;
    }
});