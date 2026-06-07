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
    if (!timeElement) return;
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

  // --- Form Validation Helpers ---
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
      
      currentUserName = userName;
      renderWelcomeScreen();
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
      currentUserName = userName;
      renderWelcomeScreen();
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
  let currentUserName = "Usuário";
  let attachedFile = null;

  const chatInput = document.getElementById('chatInput');
  const btnSendMessage = document.getElementById('btnSendMessage');
  const chatHistory = document.getElementById('chatHistory');

  // Chat Actions elements
  const btnNewChat = document.getElementById('btnNewChat');
  const btnAttachDoc = document.getElementById('btnAttachDoc');
  const fileAttach = document.getElementById('fileAttach');
  const attachmentPreview = document.getElementById('attachmentPreview');
  const attachmentName = document.getElementById('attachmentName');
  const btnRemoveAttachment = document.getElementById('btnRemoveAttachment');

  function renderWelcomeScreen() {
    chatHistory.innerHTML = `
      <div class="chat-intro" id="chatIntro">
        <div class="intro-welcome-card">
          <h2 class="welcome-title">Olá, ${currentUserName}!</h2>
        </div>
        
        <div class="suggestion-grid-container">
          <div class="suggestion-scroll">
            <div class="suggestion-chip" data-prompt="O que é CAT?">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M12 8v4"/>
                <path d="M12 16h.01"/>
              </svg>
              <span>O que é CAT?</span>
            </div>
            <div class="suggestion-chip" data-prompt="Como emitir uma ART?">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
              </svg>
              <span>Como emitir uma ART?</span>
            </div>
            <div class="suggestion-chip" data-prompt="Analisar edital">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Analisar edital</span>
            </div>
            <div class="suggestion-chip" data-prompt="Dúvida sobre CREA">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>Dúvida sobre CREA</span>
            </div>
            <div class="suggestion-chip" data-prompt="Organizar acervo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>Organizar acervo</span>
            </div>
            <div class="suggestion-chip" data-prompt="Habilitação técnica">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Habilitação técnica</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Initialize welcome layout
  renderWelcomeScreen();

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    
    if (sender === 'assistant') {
      msgDiv.innerHTML = `
        <div class="message-avatar">
          <img src="logo-AGA.png" alt="Lorena" style="width: 76%; height: 76%; object-fit: contain;">
        </div>
        <div class="message-container">
          <span class="message-sender-name">Lorena</span>
          <div class="message-bubble">
            <p>${text}</p>
          </div>
        </div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="message-container">
          <span class="message-sender-name">Você</span>
          <div class="message-bubble">
            <p>${text}</p>
          </div>
        </div>
      `;
    }
    
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function sendTechnicalMessage(text) {
    const isIntro = chatHistory.querySelector('.chat-intro');
    if (isIntro) {
      chatHistory.innerHTML = '';
    }

    // Append user message
    appendMessage(text, 'user');

    // Handle file name reference if attached
    const fileName = attachedFile ? attachedFile.name : null;
    
    // Reset attachment status visually and logic-wise
    if (attachedFile) {
      attachedFile = null;
      fileAttach.value = '';
      attachmentPreview.classList.add('hidden');
    }

    // Simulate Assistant Typing / Thinking
    setTimeout(() => {
      let reply = "";
      const lowerText = text.toLowerCase();

      if (fileName) {
        reply = `Analisei o documento **"${fileName}"** que você anexou. Como sua especialista de engenharia Lorena, identifiquei o seguinte: `;
      }

      if (lowerText.includes('o que é cat') || lowerText.includes('o que e cat') || (lowerText.includes('cat') && !lowerText.includes('art'))) {
        reply += "A Certidão de Acervo Técnico (CAT) é o documento oficial emitido pelo CREA que certifica as atividades desenvolvidas pelo profissional registrado. Ela constitui o acervo técnico do profissional e é exigida em licitações para comprovar aptidão técnica.";
      } else if (lowerText.includes('emitir') && lowerText.includes('art') || lowerText.includes('como emitir') || (lowerText.includes('art') && !lowerText.includes('cat'))) {
        reply += "Para emitir uma Anotação de Responsabilidade Técnica (ART), você deve acessar o sistema online do CREA da sua jurisdição (CREA-Net), preencher o formulário eletrônico detalhando o contrato e os serviços de engenharia prestados, assinar o documento e recolher a respectiva taxa bancária.";
      } else if (lowerText.includes('edital') || lowerText.includes('licita')) {
        reply += "Entendido. Para analisar as cláusulas técnicas do edital, por favor, me informe os critérios exigidos ou anexe o documento (clicando no botão '+'). Posso verificar as exigências de CAT, índices orçamentários ou qualificações específicas.";
      } else if (lowerText.includes('dúvida sobre crea') || lowerText.includes('duvida sobre crea') || lowerText.includes('crea') || lowerText.includes('confea')) {
        reply += "O CREA e o CONFEA regulam o exercício profissional da engenharia. Caso precise tirar dúvidas sobre vistos de atuação regional em outros estados, taxas de ART, anuidades ou atribuições específicas de cada modalidade, pergunte-me!";
      } else if (lowerText.includes('organizar acervo') || lowerText.includes('organizar') || lowerText.includes('acervo')) {
        reply += "Organizar o seu acervo técnico envolve classificar suas CATs e atestados por complexidade técnica e volume (ex: m² de área construída, kW de potência, etc.). Recomendo manter uma planilha integrada para cruzar com editais de licitação.";
      } else if (lowerText.includes('habilitação técnica') || lowerText.includes('habilitação') || lowerText.includes('habilitacao')) {
        reply += "A habilitação técnica em licitações (regida pela Lei 14.133/2021) é comprovada por meio de atestados de capacidade técnica devidamente registrados no CREA e consolidados em uma CAT. Quer que eu faça um checklist dos documentos necessários?";
      } else if (lowerText.includes('olá') || lowerText.includes('oi') || lowerText.includes('bom dia') || lowerText.includes('boa tarde')) {
        reply = "Olá! Sou a Lorena, sua assistente virtual especialista em engenharia da AGA. Como posso ajudar com CAT, ART, CREA ou documentação técnica hoje?";
      } else {
        reply += "Compreendi sua dúvida técnica. Como Lorena, estou cruzando essa questão com as diretrizes do Sistema CONFEA/CREA e normas técnicas vigentes da ABNT. Gostaria de focar nos requisitos da ART, CAT ou nas exigências de edital?";
      }
      
      appendMessage(reply, 'assistant');
    }, 1000);
  }

  function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    sendTechnicalMessage(text);
    chatInput.value = '';
  }

  btnSendMessage.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });

  // Welcome chips click delegator
  chatHistory.addEventListener('click', (e) => {
    const chip = e.target.closest('.suggestion-chip');
    if (chip) {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        sendTechnicalMessage(prompt);
      }
    }
  });

  // Actions bar event listeners
  btnNewChat.addEventListener('click', () => {
    renderWelcomeScreen();
    // Reset file uploads
    attachedFile = null;
    attachmentPreview.classList.add('hidden');
    fileAttach.value = '';
    showToast('Novo chat com a Lorena iniciado.', 'info');
  });

  btnAttachDoc.addEventListener('click', () => {
    fileAttach.click();
  });

  fileAttach.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      attachedFile = e.target.files[0];
      attachmentName.textContent = attachedFile.name;
      attachmentPreview.classList.remove('hidden');
      showToast(`Documento "${attachedFile.name}" anexado com sucesso para análise técnica.`, 'success');
    }
  });

  btnRemoveAttachment.addEventListener('click', () => {
    attachedFile = null;
    fileAttach.value = '';
    attachmentPreview.classList.add('hidden');
    showToast('Documento removido.', 'info');
  });

  // --- Left Menu Drawer Logic ---
  const btnMenuHamburger = document.querySelector('.btn-menu-hamburger');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const menuDrawer = document.getElementById('menuDrawer');
  const drawerItems = document.querySelectorAll('.drawer-item');
  const chatTitle = document.querySelector('.chat-title');
  const chatSubtitle = document.querySelector('.chat-subtitle');

  function openDrawer() {
    drawerBackdrop.classList.add('active');
    menuDrawer.classList.add('active');
  }

  function closeDrawer() {
    drawerBackdrop.classList.remove('active');
    menuDrawer.classList.remove('active');
  }

  btnMenuHamburger.addEventListener('click', openDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);

  // View Switching
  const chatBody = document.getElementById('chatHistory');
  const chatFooter = document.getElementById('chatFooter');
  const licitacoesBody = document.getElementById('licitacoesBody');
  const acervoBody = document.getElementById('acervoBody');

  drawerItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const target = item.getAttribute('data-target');
      if (!target) return; // For logout link

      // Update active state in drawer
      drawerItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Hide all bodies/footers
      chatBody.classList.add('hidden');
      chatFooter.classList.add('hidden');
      licitacoesBody.classList.add('hidden');
      acervoBody.classList.add('hidden');

      // Show targeted elements
      if (target === 'chat') {
        chatBody.classList.remove('hidden');
        chatFooter.classList.remove('hidden');
        chatTitle.textContent = 'CHAT ENG';
        chatSubtitle.textContent = 'Inteligência da Engenharia';
      } else if (target === 'licitacoes') {
        licitacoesBody.classList.remove('hidden');
        chatTitle.textContent = 'Licitações';
        chatSubtitle.textContent = 'Painel de Controle';

        // Reset sub-tabs to default (Dashboard)
        document.querySelectorAll('.lic-sub-tab').forEach(tab => tab.classList.remove('active'));
        const defaultTab = document.querySelector('.lic-sub-tab[data-tab="dashboard"]');
        if (defaultTab) defaultTab.classList.add('active');

        document.querySelectorAll('.lic-tab-panel').forEach(p => p.classList.add('hidden'));
        const defaultPanel = document.getElementById('licTabDashboard');
        if (defaultPanel) defaultPanel.classList.remove('hidden');
      } else if (target === 'acervo') {
        acervoBody.classList.remove('hidden');
        chatTitle.textContent = 'Acervo Técnico';
        chatSubtitle.textContent = 'Meu Portfólio';

        // Reset sub-tabs to default (Meu Acervo)
        document.querySelectorAll('.acervo-sub-tab').forEach(tab => tab.classList.remove('active'));
        const defaultTab = document.querySelector('.acervo-sub-tab[data-tab="meu"]');
        if (defaultTab) defaultTab.classList.add('active');

        document.querySelectorAll('.acervo-tab-panel').forEach(p => p.classList.add('hidden'));
        const defaultPanel = document.getElementById('acervoTabMeu');
        if (defaultPanel) defaultPanel.classList.remove('hidden');
      }

      closeDrawer();
    });
  });

  // Modal Open/Close Logic Helper
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    void modal.offsetWidth; // Force reflow
    modal.classList.add('active');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    // Wait for the transition to finish before adding hidden back
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        modal.classList.add('hidden');
      }
    }, 350);
  }

  // Bind Open/Close for Licitações Modal
  const btnOpenAddLicitacao = document.getElementById('btnOpenAddLicitacao');
  const btnCloseLicitacaoModal = document.getElementById('btnCloseLicitacaoModal');
  const overlayLicitacao = document.getElementById('overlayLicitacao');

  btnOpenAddLicitacao.addEventListener('click', () => openModal('modalAddLicitacao'));
  btnCloseLicitacaoModal.addEventListener('click', () => closeModal('modalAddLicitacao'));
  overlayLicitacao.addEventListener('click', () => closeModal('modalAddLicitacao'));



  // Form Add Licitação
  const formAddLicitacao = document.getElementById('formAddLicitacao');
  const licitacoesList = document.getElementById('licitacoesList');
  const statsLicitacoesTotal = document.getElementById('statsLicitacoesTotal');

  formAddLicitacao.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('licitacaoTitle').value.trim();
    const org = document.getElementById('licitacaoOrg').value.trim();
    const dateInput = document.getElementById('licitacaoDate').value;
    const tagsVal = document.getElementById('licitacaoTags').value.trim();

    if (!title || !org || !dateInput) {
      showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    // Format date from YYYY-MM-DD to DD/MM/YYYY
    const dateParts = dateInput.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    const tags = tagsVal ? tagsVal : 'Engenharia';

    // Create card
    const card = document.createElement('div');
    card.className = 'dashboard-card licitacao-card';
    card.setAttribute('data-org', org);
    card.innerHTML = `
      <div class="card-header-row">
        <span class="card-org">${org}</span>
        <span class="badge badge-success">Apto (100%)</span>
      </div>
      <h3 class="card-title">${title}</h3>
      <div class="card-details">
        <span class="detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Limite: ${formattedDate}
        </span>
        <span class="detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          ${tags}
        </span>
      </div>
      <div class="card-actions-row">
        <button class="btn-card-action btn-analisar-ia" data-prompt="Gere uma análise técnica detalhada do edital da ${org} para ${title}. Quais as exigências de CAT, ART e capacidade técnica?">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
          Analisar com Lorena
        </button>
      </div>
    `;

    licitacoesList.insertBefore(card, licitacoesList.firstChild);
    
    // Update stats dynamically
    updateLicitacoesStats();

    // Refresh recommendations list
    updateRecommendations();

    closeModal('modalAddLicitacao');
    formAddLicitacao.reset();
    showToast('Licitação cadastrada com sucesso!', 'success');
  });

  // Form Add Acervo Inline
  const formAddAcervoInline = document.getElementById('formAddAcervoInline');
  const acervoList = document.getElementById('acervoList');
  const statsCatsElement = document.getElementById('statsCats');
  const statsArtsElement = document.getElementById('statsArts');

  formAddAcervoInline.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('acervoTitleInline').value.trim();
    const num = document.getElementById('acervoNumInline').value.trim();
    const resp = document.getElementById('acervoRespInline').value.trim();
    const crea = document.getElementById('acervoCreaInline').value.trim();

    if (!title || !num || !resp || !crea) {
      showToast('Por favor, preencha todos os campos.', 'error');
      return;
    }

    // Create card
    const card = document.createElement('div');
    card.className = 'dashboard-card acervo-card';
    card.innerHTML = `
      <div class="card-header-row">
        <span class="card-type font-weight-bold">${num}</span>
        <span class="badge badge-success">Aprovada e Ativa</span>
      </div>
      <h3 class="card-title">${title}</h3>
      <div class="card-details">
        <span class="detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Responsável: ${resp}
        </span>
        <span class="detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          ${crea}
        </span>
      </div>
    `;

    acervoList.insertBefore(card, acervoList.firstChild);

    // Update stats dynamically
    updateAcervoStats();

    formAddAcervoInline.reset();
    showToast('Documento registrado no acervo com sucesso!', 'success');

    // Redirect view back to "Meu Acervo" tab
    document.querySelectorAll('.acervo-sub-tab').forEach(t => t.classList.remove('active'));
    const meuTab = document.querySelector('.acervo-sub-tab[data-tab="meu"]');
    if (meuTab) meuTab.classList.add('active');

    document.querySelectorAll('.acervo-tab-panel').forEach(p => p.classList.add('hidden'));
    const meuPanel = document.getElementById('acervoTabMeu');
    if (meuPanel) meuPanel.classList.remove('hidden');
  });

  // --- Acervo Sub-Tabs View Routing ---
  const acervoSubTabs = document.querySelectorAll('.acervo-sub-tab');
  const acervoTabPanels = document.querySelectorAll('.acervo-tab-panel');

  acervoSubTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      if (!targetTab) return;

      acervoSubTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      acervoTabPanels.forEach(p => p.classList.add('hidden'));
      const activePanel = document.getElementById(`acervoTab${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`);
      if (activePanel) activePanel.classList.remove('hidden');
    });
  });

  // --- Biddings Sub-Tabs View Routing ---
  const subTabs = document.querySelectorAll('.lic-sub-tab');
  const tabPanels = document.querySelectorAll('.lic-tab-panel');

  subTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      if (!targetTab) return;

      subTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabPanels.forEach(p => p.classList.add('hidden'));
      const activePanel = document.getElementById(`licTab${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`);
      if (activePanel) activePanel.classList.remove('hidden');
    });
  });

  // --- Search Filtering (Licitações) ---
  const searchLicitacoes = document.getElementById('searchLicitacoes');
  searchLicitacoes.addEventListener('input', () => {
    const filter = searchLicitacoes.value.toLowerCase();
    const cards = licitacoesList.querySelectorAll('.licitacao-card');
    
    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const org = card.querySelector('.card-org').textContent.toLowerCase();
      if (title.includes(filter) || org.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });

  // --- Search Filtering (Acervo) ---
  const searchAcervo = document.getElementById('searchAcervo');
  searchAcervo.addEventListener('input', () => {
    const filter = searchAcervo.value.toLowerCase();
    const cards = acervoList.querySelectorAll('.acervo-card');
    
    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const num = card.querySelector('.card-type').textContent.toLowerCase();
      const details = card.querySelector('.card-details').textContent.toLowerCase();
      
      if (title.includes(filter) || num.includes(filter) || details.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });

  // --- Filter Manager CRUD ---
  const formAddFilter = document.getElementById('formAddFilter');
  const filterChipsList = document.getElementById('filterChipsList');
  const statsLicitacoesRecomendadas = document.getElementById('statsLicitacoesRecomendadas');
  const recomendadasList = document.getElementById('recomendadasList');

  formAddFilter.addEventListener('submit', (e) => {
    e.preventDefault();
    const keywordInput = document.getElementById('filterKeyword');
    const keyword = keywordInput.value.trim();
    if (!keyword) return;

    // Check if chip already exists
    const existingChips = Array.from(filterChipsList.querySelectorAll('.filter-chip span'));
    const duplicate = existingChips.some(c => c.textContent.toLowerCase() === keyword.toLowerCase());
    
    if (duplicate) {
      showToast('Este filtro já está cadastrado.', 'error');
      keywordInput.value = '';
      return;
    }

    // Create Tag Chip
    const chip = document.createElement('div');
    chip.className = 'filter-chip';
    chip.setAttribute('data-val', keyword.toLowerCase());
    chip.innerHTML = `
      <span>${keyword}</span>
      <button type="button" class="btn-remove-filter">&times;</button>
    `;

    filterChipsList.appendChild(chip);
    keywordInput.value = '';
    showToast(`Filtro "${keyword}" salvo com sucesso!`, 'success');
    
    updateRecommendations();
  });

  // Tag chip delete listener (delegated)
  filterChipsList.addEventListener('click', (e) => {
    const btnRemove = e.target.closest('.btn-remove-filter');
    if (btnRemove) {
      const chip = btnRemove.closest('.filter-chip');
      const val = chip.querySelector('span').textContent;
      chip.remove();
      showToast(`Filtro "${val}" removido.`, 'info');
      updateRecommendations();
    }
  });

  // Recommendations Update Engine
  function updateRecommendations() {
    recomendadasList.innerHTML = '';
    
    // Get all filter keywords
    const chips = filterChipsList.querySelectorAll('.filter-chip span');
    const keywords = Array.from(chips).map(c => c.textContent.toLowerCase().trim());
    
    if (keywords.length === 0) {
      recomendadasList.innerHTML = `
        <div class="tab-panel-intro" style="font-size: 13px; color: #64748b; font-weight: 500; text-align: center; padding: 20px 0; text-shadow: none;">
          Nenhum filtro cadastrado. Vá até a aba "Filtros" para salvar suas áreas de interesse.
        </div>
      `;
      statsLicitacoesRecomendadas.textContent = '0';
      return;
    }

    // Find matches in master list
    const cards = licitacoesList.querySelectorAll('.licitacao-card');
    let matchCount = 0;

    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const org = card.querySelector('.card-org').textContent.toLowerCase();
      const details = card.querySelector('.card-details').textContent.toLowerCase();
      
      const isMatch = keywords.some(kw => title.includes(kw) || org.includes(kw) || details.includes(kw));

      if (isMatch) {
        matchCount++;
        const clone = card.cloneNode(true);
        // Replace Analysis badge to say 95% Match
        const badge = clone.querySelector('.badge');
        if (badge) {
          badge.textContent = '95% Match';
          badge.className = 'badge';
          badge.style.background = 'rgba(3, 37, 140, 0.08)';
          badge.style.color = '#03258C';
          badge.style.fontWeight = '800';
        }
        
        recomendadasList.appendChild(clone);
      }
    });

    statsLicitacoesRecomendadas.textContent = matchCount;

    if (matchCount === 0) {
      recomendadasList.innerHTML = `
        <div class="tab-panel-intro" style="font-size: 13px; color: #64748b; font-weight: 500; text-align: center; padding: 20px 0; text-shadow: none;">
          Nenhuma licitação correspondente aos filtros ativos foi encontrada.
        </div>
      `;
    }
  }

  // Bind Open/Close for Reports Viewer Modal
  const btnCloseReportModal = document.getElementById('btnCloseReportModal');
  const overlayViewReport = document.getElementById('overlayViewReport');

  btnCloseReportModal.addEventListener('click', () => closeModal('modalViewReport'));
  overlayViewReport.addEventListener('click', () => closeModal('modalViewReport'));

  // Reports details view click delegator
  const relatoriosList = document.getElementById('relatoriosList');
  relatoriosList.addEventListener('click', (e) => {
    const btnView = e.target.closest('.btn-view-report');
    if (btnView) {
      const title = btnView.getAttribute('data-report-title');
      const content = btnView.getAttribute('data-report-content');
      
      document.getElementById('modalReportTitle').textContent = title;
      document.getElementById('modalReportBody').innerHTML = content;
      
      openModal('modalViewReport');
    }
  });

  // --- Analisar com Lorena / Audit Engine ---
  licitacoesBody.addEventListener('click', (e) => {
    const btnAnalisar = e.target.closest('.btn-analisar-ia');
    if (btnAnalisar) {
      const prompt = btnAnalisar.getAttribute('data-prompt');
      const card = btnAnalisar.closest('.licitacao-card');
      const title = card.querySelector('.card-title').textContent;
      const org = card.querySelector('.card-org').textContent;
      const dateText = new Date().toLocaleDateString('pt-BR');

      // 1. Generate new report dynamically inside "Meus Relatórios" history panel
      const reportHtml = `
        <div class="dashboard-card relatorio-card" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; padding: 14px 16px; border-left: 4px solid #03258C;">
          <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; padding-right: 10px;">
            <span class="card-org" style="font-size: 10.5px;">${org}</span>
            <h3 class="card-title" style="font-size: 14.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; text-shadow: none;">Análise de Edital - ${title}</h3>
            <span style="font-size: 11px; color: #64748b; font-weight: 500;">Gerado em ${dateText}</span>
          </div>
          <button class="btn-card-action btn-view-report" data-report-title="${org} - ${title}" data-report-content="### Relatório de Auditoria Técnica - ${org} <br><br>**1. Requisitos de Habilitação Encontrados:** <br>- Exigência de acervo e ART no CREA correspondente a obras de infraestrutura / engenharia.<br>- Validação de visto cadastral ativo do engenheiro responsável.<br><br>**2. Avaliação de Aptidão da Empresa:**<br>- **Situação:** APTO. O portfólio cadastrado contém acervos técnicos aprovados compatíveis com a execução da obra.<br><br>**3. Recomendações:**<br>- Anexar a CAT nº 2390/2025 emitida pelo CREA-SP ao envelope de documentação técnica.<br>- Garantir assinatura das ARTs correlatas de execução." style="flex-shrink: 0; padding: 8px 12px;">
            Ver PDF
          </button>
        </div>
      `;

      // Check if this report already exists in list to avoid duplicates
      const reports = relatoriosList.querySelectorAll('.relatorio-card h3');
      const alreadyExists = Array.from(reports).some(r => r.textContent.includes(title));
      if (!alreadyExists) {
        relatoriosList.insertAdjacentHTML('afterbegin', reportHtml);
      }

      // 2. Router redirect back to Chat
      const chatItem = Array.from(drawerItems).find(item => item.getAttribute('data-target') === 'chat');
      if (chatItem) {
        drawerItems.forEach(i => i.classList.remove('active'));
        chatItem.classList.add('active');
      }

      // Toggle views
      licitacoesBody.classList.add('hidden');
      chatBody.classList.remove('hidden');
      chatFooter.classList.remove('hidden');

      // Update header info labels
      chatTitle.textContent = 'CHAT ENG';
      chatSubtitle.textContent = 'Inteligência da Engenharia';

      // Send the query
      sendTechnicalMessage(prompt);
    }
  });

  // Modify drawer logout to trigger drawer closing as well
  const btnDrawerLogout = document.getElementById('btnDrawerLogout');
  btnDrawerLogout.addEventListener('click', (e) => {
    e.preventDefault();
    closeDrawer();
    btnLogout.click(); // reuse existing logout flow
  });

  // --- Logout ---
  btnLogout.addEventListener('click', () => {
    navigateTo(screenChat, screenLanding, 'backward');
    currentUserName = "Usuário";
    renderWelcomeScreen();
    // Reset file uploads
    attachedFile = null;
    attachmentPreview.classList.add('hidden');
    fileAttach.value = '';

    // Switch active drawer item back to chat and reset view visibility
    drawerItems.forEach(i => i.classList.remove('active'));
    const chatItem = Array.from(drawerItems).find(item => item.getAttribute('data-target') === 'chat');
    if (chatItem) chatItem.classList.add('active');

    chatBody.classList.remove('hidden');
    chatFooter.classList.remove('hidden');
    licitacoesBody.classList.add('hidden');
    acervoBody.classList.add('hidden');
    chatTitle.textContent = 'CHAT ENG';
    chatSubtitle.textContent = 'Inteligência da Engenharia';

    showToast('Sessão encerrada com sucesso.', 'info');
  });

  // --- Acervo & CREA stats synchronization ---
  const statsEngsElement = document.getElementById('statsEngs');

  function updateAcervoStats() {
    const cards = acervoList.querySelectorAll('.acervo-card');
    let catCount = 0;
    let artCount = 0;
    const engineers = new Set();
    const creaCounts = {};

    cards.forEach(card => {
      // 1. Count CAT vs ART
      const typeText = card.querySelector('.card-type').textContent.toUpperCase();
      if (typeText.includes('CAT')) {
        catCount++;
      } else if (typeText.includes('ART')) {
        artCount++;
      }

      // 2. Scan responsible engineer and CREA state
      const detailItems = card.querySelectorAll('.detail-item');
      detailItems.forEach(item => {
        const txt = item.textContent.trim();
        if (txt.includes('Responsável:')) {
          const engName = txt.replace('Responsável:', '').trim();
          if (engName) engineers.add(engName);
        }
        if (txt.toUpperCase().includes('CREA')) {
          const creaName = txt.toUpperCase();
          creaCounts[creaName] = (creaCounts[creaName] || 0) + 1;
        }
      });
    });

    // Update counters in DOM
    if (statsCatsElement) statsCatsElement.textContent = catCount;
    if (statsArtsElement) statsArtsElement.textContent = artCount;
    if (statsEngsElement) statsEngsElement.textContent = engineers.size;

    // Render CREA Regional progress bars dynamically
    const container = document.getElementById('creaStatsContainer');
    if (container) {
      container.innerHTML = '';
      const total = cards.length;
      if (total > 0) {
        // Sort CREAs descending by document count
        const sortedCreas = Object.keys(creaCounts).sort((a, b) => creaCounts[b] - creaCounts[a]);
        
        sortedCreas.forEach(crea => {
          const count = creaCounts[crea];
          const pct = Math.round((count / total) * 100);
          
          let bg = '#03258C';
          if (crea.includes('SC')) bg = '#056CF2';
          else if (crea.includes('RJ')) bg = '#22c55e';
          else if (crea.includes('MG')) bg = '#eab308';
          
          const row = document.createElement('div');
          row.className = 'progress-container-row';
          row.style.marginBottom = '12px';
          row.innerHTML = `
            <div class="progress-bar-label-row" style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 4px; text-shadow: none;">
              <span>${crea}</span>
              <span>${pct}%</span>
            </div>
            <div class="progress-bar-bg" style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
              <div class="progress-bar-fill" style="width: ${pct}%; height: 100%; background: ${bg}; border-radius: 4px;"></div>
            </div>
          `;
          container.appendChild(row);
        });
      }
    }
  }

  // --- Biddings stats synchronization ---
  const statsLicitacoesAptas = document.getElementById('statsLicitacoesAptas');

  function updateLicitacoesStats() {
    const totalCards = licitacoesList.querySelectorAll('.licitacao-card');
    if (statsLicitacoesTotal) statsLicitacoesTotal.textContent = totalCards.length;

    let aptasCount = 0;
    totalCards.forEach(card => {
      const badge = card.querySelector('.badge');
      if (badge && (badge.textContent.includes('Apto') || badge.textContent.includes('100%'))) {
        aptasCount++;
      }
    });
    if (statsLicitacoesAptas) statsLicitacoesAptas.textContent = aptasCount;
  }

  // --- Initialize on load ---
  updateRecommendations();
  updateLicitacoesStats();
  updateAcervoStats();
});
