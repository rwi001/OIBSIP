(function(){
    const formTitle = document.getElementById('form-title');
    const authForm = document.getElementById('authForm');
    const usernameInput = authForm.username;
    const passwordInput = authForm.password;
    const submitBtn = document.getElementById('submitBtn');
    const messageEl = document.getElementById('message');
    const toggleLink = document.getElementById('toggleLink');
    const welcomeSection = document.getElementById('welcomeSection');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutBtn = document.getElementById('logoutBtn');
  
    let isLogin = true; // true for login form, false for sign-up form
  
    // Get users from localStorage or return empty object
    function getUsers() {
      return JSON.parse(localStorage.getItem('users') || '{}');
    }
  
    // Save users object to localStorage
    function saveUsers(users) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  
    // Show login or signup form
    function showForm() {
      welcomeSection.style.display = 'none';
      authForm.style.display = 'block';
      toggleLink.style.display = 'block';
      messageEl.textContent = '';
      messageEl.className = 'message';
      formTitle.textContent = isLogin ? 'Login' : 'Sign Up';
      submitBtn.textContent = isLogin ? 'Log In' : 'Register';
      toggleLink.textContent = isLogin 
        ? "Don't have an account? Sign Up"
        : "Already have an account? Log In";
      usernameInput.value = '';
      passwordInput.value = '';
      usernameInput.focus();
    }
  
    // Show welcome screen with username
    function showWelcome(username) {
      authForm.style.display = 'none';
      toggleLink.style.display = 'none';
      messageEl.textContent = '';
      messageEl.className = 'message';
      welcomeMessage.textContent = `Welcome, ${username}!`;
      welcomeSection.style.display = 'flex';
    }
  
    // Validate email format
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    // Handle toggle link click or key press
    function toggleForm() {
      isLogin = !isLogin;
      showForm();
    }
  
    authForm.addEventListener('submit', function(e){
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
  
      messageEl.textContent = '';
      messageEl.className = 'message';
  
      if (!username || !password) {
        messageEl.textContent = 'Please enter both username and password.';
        messageEl.classList.add('error');
        return;
      }
  
      if (!isValidEmail(username)) {
        messageEl.textContent = 'Please enter a valid email address.';
        messageEl.classList.add('error');
        return;
      }
  
      const users = getUsers();
  
      if (isLogin) {
        // Login flow
        if (!(username in users)) {
          messageEl.textContent = 'Username does not exist. Please sign up.';
          messageEl.classList.add('error');
          return;
        }
        if (users[username] !== password) {
          messageEl.textContent = 'Incorrect password.';
          messageEl.classList.add('error');
          return;
        }
        showWelcome(username);
      } else {
        // Sign up flow
        if (username in users) {
          messageEl.textContent = 'Username already exists. Please log in.';
          messageEl.classList.add('error');
          return;
        }
        if (password.length < 6) {
          messageEl.textContent = 'Password must be at least 6 characters.';
          messageEl.classList.add('error');
          return;
        }
        users[username] = password;
        saveUsers(users);
        messageEl.textContent = 'Registered successfully! You can now log in.';
        messageEl.classList.add('success');
        setTimeout(() => {
          isLogin = true;
          showForm();
        }, 1500);
      }
    });
  
    toggleLink.addEventListener('click', toggleForm);
    toggleLink.addEventListener('keypress', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleForm();
      }
    });
  
    logoutBtn.addEventListener('click', function(){
      showForm();
    });
  
    // Initialize to login form on page load
    showForm();
  })();