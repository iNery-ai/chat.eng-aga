// app.js - Login Mockup Interactivity and Mechanics

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation & Elements ---
  const screenLanding = document.getElementById('screenLanding');
  const screenLogin = document.getElementById('screenLogin');
  const screenRegister = document.getElementById('screenRegister');
  const screenForgotPassword = document.getElementById('screenForgotPassword');
  const screenChat = document.getElementById('screenChat');

  const btnGoToLogin = document.getElementById('btnGoToLogin');
  const btnGoToRegister = document.getElementById('btnGoToRegister');
  const btnForgotPassword = document.getElementById('btnForgotPassword');
  const linkForgotPasswordForm = document.getElementById('linkForgotPasswordForm');

  const btnBackToLandingFromLogin = document.getElementById('btnBackToLandingFromLogin');
  const btnBackToLandingFromRegister = document.getElementById('btnBackToLandingFromRegister');
  const btnBackToLandingFromForgot = document.getElementById('btnBackToLandingFromForgot');

  const formLogin = document.getElementById('formLogin');
  const formRegister = document.getElementById('formRegister');
  const formForgotPassword = document.getElementById('formForgotPassword');
  const btnLogout = document.getElementById('btnLogout');

  const linkRegisterFromLogin = document.getElementById('linkRegisterFromLogin');
  const linkLoginFromRegister = document.getElementById('linkLoginFromRegister');
  const linkLoginFromForgot = document.getElementById('linkLoginFromForgot');

  // --- Clock Sync ---
  function updateClock() {
    const timeElement = document.getElementById('currentTime');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // --- Toast Notification System ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Icon based on type
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `${iconSvg} <span>${message}</span>`;
    container.appendChild(toast);
    
    // Auto-remove toast after transition ends
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  // --- Screen Routing Transitions ---
  function navigateTo(fromScreen, toScreen, direction = 'forward') {
    fromScreen.classList.add('slide-out');
    fromScreen.classList.remove('active');

    // Wait for the slide-out of the old screen to be halfway before activating the new one
    setTimeout(() => {
      fromScreen.classList.remove('slide-out');
      toScreen.classList.add('active');
    }, 150);
  }

  btnGoToLogin.addEventListener('click', () => {
    navigateTo(screenLanding, screenLogin);
  });

  btnGoToRegister.addEventListener('click', () => {
    navigateTo(screenLanding, screenRegister);
  });

  btnBackToLandingFromLogin.addEventListener('click', () => {
    navigateTo(screenLogin, screenLanding, 'backward');
    clearValidationErrors(formLogin);
  });

  btnBackToLandingFromRegister.addEventListener('click', () => {
    navigateTo(screenRegister, screenLanding, 'backward');
    clearValidationErrors(formRegister);
  });

  btnBackToLandingFromForgot.addEventListener('click', () => {
    navigateTo(screenForgotPassword, screenLanding, 'backward');
    clearValidationErrors(formForgotPassword);
  });

  btnForgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(screenLanding, screenForgotPassword);
  });

  linkForgotPasswordForm.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(screenLogin, screenForgotPassword);
  });

  // Cross-navigation between forms
  linkRegisterFromLogin.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(screenLogin, screenRegister);
    clearValidationErrors(formLogin);
  });

  linkLoginFromRegister.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(screenRegister, screenLogin);
    clearValidationErrors(formRegister);
  });

  linkLoginFromForgot.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(screenForgotPassword, screenLogin);
    clearValidationErrors(formForgotPassword);
  });

  // --- Password Toggle Visibility ---
  document.querySelectorAll('.btn-toggle-password').forEach(button => {
    button.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      // Update eye icon state (open vs slashed)
      if (type === 'text') {
        this.innerHTML = `
          <svg class="eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>`;
      } else {
        this.innerHTML = `
          <svg class="eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>`;
      }
    });
  });

  // --- Form Validation Helpers ---
  function setError(inputElement, errorElement, message) {
    inputElement.parentElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }

  function clearError(inputElement, errorElement) {
    inputElement.parentElement.classList.remove('error');
    errorElement.classList.remove('visible');
    errorElement.textContent = '';
  }

  function clearValidationErrors(form) {
    form.querySelectorAll('.input-wrapper').forEach(wrapper => {
      wrapper.classList.remove('error');
    });
    form.querySelectorAll('.error-msg').forEach(msg => {
      msg.classList.remove('visible');
      msg.textContent = '';
    });
    form.reset();
  }

  // --- Login Form Submit ---
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const emailError = document.getElementById('errorLoginEmail');
    const passwordError = document.getElementById('errorLoginPassword');
    
    let isValid = true;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      setError(emailInput, emailError, 'Por favor, insira um e-mail corporativo válido.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Validate password
    if (passwordInput.value.length < 8) {
      setError(passwordInput, passwordError, 'A senha deve conter no mínimo 8 caracteres.');
      isValid = false;
    } else {
      clearError(passwordInput, passwordError);
    }

    if (!isValid) return;

    // Simulate login API call
    const submitBtn = formLogin.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

    submitBtn.disabled = true;
    btnText.style.opacity = '0.3';
    spinner.classList.remove('hidden');

    setTimeout(() => {
      // Complete mock log in
      submitBtn.disabled = false;
      btnText.style.opacity = '1';
      spinner.classList.add('hidden');

      const namePart = emailInput.value.split('@')[0];
      const userName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      
      document.getElementById('userNamePlaceholder').textContent = userName;
      showToast(`Bem-vindo de volta, ${userName}!`, 'success');
      
      navigateTo(screenLogin, screenChat);
      clearValidationErrors(formLogin);
    }, 1500);
  });

  // --- Register Form Submit ---
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');
    const passwordInput = document.getElementById('regPassword');
    const termsCheckbox = document.getElementById('regTerms');
    
    const nameError = document.getElementById('errorRegName');
    const emailError = document.getElementById('errorRegEmail');
    const passwordError = document.getElementById('errorRegPassword');
    
    let isValid = true;

    // Validate name
    if (nameInput.value.trim().length < 3) {
      setError(nameInput, nameError, 'O nome deve conter pelo menos 3 caracteres.');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      setError(emailInput, emailError, 'Por favor, insira um e-mail corporativo válido.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Validate password
    if (passwordInput.value.length < 8) {
      setError(passwordInput, passwordError, 'A senha deve conter no mínimo 8 caracteres.');
      isValid = false;
    } else {
      clearError(passwordInput, passwordError);
    }

    if (!termsCheckbox.checked) {
      showToast('Você precisa aceitar os Termos e Políticas para prosseguir.', 'error');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate Register API call
    const submitBtn = formRegister.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

    submitBtn.disabled = true;
    btnText.style.opacity = '0.3';
    spinner.classList.remove('hidden');

    setTimeout(() => {
      submitBtn.disabled = false;
      btnText.style.opacity = '1';
      spinner.classList.add('hidden');

      const userName = nameInput.value.split(' ')[0];
      document.getElementById('userNamePlaceholder').textContent = userName;
      showToast('Conta criada com sucesso!', 'success');
      
      navigateTo(screenRegister, screenChat);
      clearValidationErrors(formRegister);
    }, 1500);
  });

  // --- Forgot Password Form Submit ---
  formForgotPassword.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('forgotEmail');
    const emailError = document.getElementById('errorForgotEmail');
    
    let isValid = true;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      setError(emailInput, emailError, 'Por favor, insira um e-mail corporativo válido.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    if (!isValid) return;

    // Simulate recovery API call
    const submitBtn = formForgotPassword.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

    submitBtn.disabled = true;
    btnText.style.opacity = '0.3';
    spinner.classList.remove('hidden');

    setTimeout(() => {
      submitBtn.disabled = false;
      btnText.style.opacity = '1';
      spinner.classList.add('hidden');

      showToast('E-mail de recuperação enviado com sucesso!', 'success');
      
      // Navigate back to login screen
      navigateTo(screenForgotPassword, screenLogin);
      clearValidationErrors(formForgotPassword);
    }, 1500);
  });

  // --- Mock Chat Functionality ---
  const chatInput = document.getElementById('chatInput');
  const btnSendMessage = document.getElementById('btnSendMessage');
  const chatHistory = document.getElementById('chatHistory');

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = `
      <div class="message-bubble">
        <p>${text}</p>
      </div>
    `;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // User Message
    appendMessage(text, 'user');
    chatInput.value = '';

    // Simulate Assistant Typing / Thinking
    setTimeout(() => {
      let reply = "";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('edital') || lowerText.includes('licita') || lowerText.includes('concurso')) {
        reply = "Entendido. Analisei os editais recentes da base. Posso extrair os requisitos de qualificação técnica (Art. 30 da Lei 8.666 ou Art. 67 da Lei 14.133) ou resumir as exigências de acervo técnico. Qual edital específico deseja analisar?";
      } else if (lowerText.includes('acervo') || lowerText.includes('art') || lowerText.includes('crea')) {
        reply = "Com base no acervo técnico da sua empresa, identifiquei 14 Certidões de Acervo Técnico (CAT) ativas. Elas qualificam você para obras de infraestrutura urbana de até R$ 25 milhões. Deseja que eu gere uma planilha de compatibilidade?";
      } else if (lowerText.includes('olá') || lowerText.includes('oi') || lowerText.includes('bom dia') || lowerText.includes('boa tarde')) {
        reply = "Olá! Como posso ajudar você hoje? Você pode me enviar dúvidas sobre documentação de engenharia, editais de licitação, certidões de acervo técnico ou memoriais descritivos.";
      } else {
        reply = "Entendi o seu ponto técnico. Estou cruzando essa informação com a legislação de engenharia e os documentos carregados no sistema. Gostaria de focar na análise jurídica, orçamentária ou técnica?";
      }
      appendMessage(reply, 'assistant');
    }, 1000);
  }

  btnSendMessage.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });

  // --- Logout ---
  btnLogout.addEventListener('click', () => {
    navigateTo(screenChat, screenLanding, 'backward');
    chatHistory.innerHTML = `
      <div class="chat-message assistant">
        <div class="message-bubble">
          <p>Olá, <strong id="userNamePlaceholder">Usuário</strong>! Seja bem-vindo ao <strong>CHAT ENG</strong>. 👋</p>
        </div>
      </div>
      <div class="chat-message assistant">
        <div class="message-bubble">
          <p>Sou o seu assistente técnico de inteligência artificial. Como posso ajudar você a analisar editais, acervos técnicos ou documentos de engenharia hoje?</p>
        </div>
      </div>
    `;
    showToast('Sessão encerrada com sucesso.', 'info');
  });
});
