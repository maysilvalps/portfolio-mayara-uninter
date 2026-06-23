// =========================================================================
// 1. MANIPULAÇÃO DO TEMA (CLARO/ESCURO)
// =========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    // Altera dinamicamente as classes CSS do Body
    body.classList.toggle('dark-mode');
});

// =========================================================================
// 2. VALIDAÇÃO OBRIGATÓRIA DO FORMULÁRIO DE CONTATO (SEM FRAMEWORKS)
// =========================================================================
const formContato = document.getElementById('form-contato');

formContato.addEventListener('submit', (event) => {
    // Bloqueia o envio nativo que recarregaria a página do usuário
    event.preventDefault();

    // Captura os inputs removendo espaços desnecessários nas pontas (.trim())
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // REQUISITO: Verificar se todos os campos estão preenchidos antes de submeter
    if (nome === '' || email === '' || mensagem === '') {
        alert('Atenção: Todos os campos do formulário devem ser preenchidos!');
        return; // Bloqueia a execução do código abaixo
    }

    // REQUISITO: Verificar se o e-mail possui um formato aceitável (Expressão Regular)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um formato de e-mail válido (exemplo: usuario@dominio.com).');
        return; // Bloqueia o envio do formulário
    }

    // REQUISITO: Simulação do envio do formulário com mensagem de confirmação de sucesso
    alert(`Mensagem enviada com sucesso! Obrigado pelo contato, ${nome}.`);
    
    // Reseta visualmente todos os campos digitados no formulário
    formContato.reset();
});

// =========================================================================
// 3. ANIMAÇÃO INTERATIVA DO MASCOTE COGNITIVO
// =========================================================================
const pupilas = document.querySelectorAll('.pupila');
const mascoteBoca = document.getElementById('mascote-boca');
const camposFormulario = document.querySelectorAll('#form-contato input, #form-contato textarea');

// Faz as pupilas seguirem o cursor do mouse
document.addEventListener('mousemove', (evento) => {
    pupilas.forEach(pupila => {
        // Pega a posição geométrica do centro do olho do mascote
        const areaOlho = pupila.parentElement.getBoundingClientRect();
        const olhoX = areaOlho.left + areaOlho.width / 2;
        const olhoY = areaOlho.top + areaOlho.height / 2;
        
        // Calcula o ângulo entre o olho e a posição atual do mouse
        const angulo = Math.atan2(evento.clientY - olhoY, evento.clientX - olhoX);
        
        // Define o limite máximo que a pupila pode andar para não sair do olho (em pixels)
        const limiteMovimento = 6; 
        const x = Math.cos(angulo) * limiteMovimento;
        const y = Math.sin(angulo) * limiteMovimento;
        
        // Aplica o movimento na pupila usando CSS Translate
        pupila.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Faz a boca do mascote reagir quando o usuário clica/digita no formulário
camposFormulario.forEach(campo => {
    // Quando o usuário clica no campo para digitar
    campo.addEventListener('focus', () => {
        mascoteBoca.classList.add('surpreso');
    });

    // Quando o usuário clica fora do campo
    campo.addEventListener('blur', () => {
        mascoteBoca.classList.remove('surpreso');
    });
});