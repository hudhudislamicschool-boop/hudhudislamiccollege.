// Add these functions to your existing JavaScript file

// Update Application Fee
function updateApplicationFee() {
  const programSelect = document.getElementById('program');
  const feeDisplay = document.getElementById('application-fee');
  
  if (programSelect.selectedIndex > 0) {
    const selectedOption = programSelect.options[programSelect.selectedIndex];
    const fee = selectedOption.getAttribute('data-fee') || '0';
    feeDisplay.textContent = `ETB ${fee}`;
  } else {
    feeDisplay.textContent = 'ETB 0';
  }
}

// Process Payment
function processPayment() {
  const programSelect = document.getElementById('program');
  const emailInput = document.getElementById('email');
  
  if (programSelect.selectedIndex === 0) {
    alert('Please select a program first.');
    return;
  }
  
  if (!emailInput.value) {
    alert('Please enter your email address first.');
    return;
  }
  
  const selectedOption = programSelect.options[programSelect.selectedIndex];
  const fee = selectedOption.getAttribute('data-fee') || '0';
  
  // Store payment information
  sessionStorage.setItem('paymentAmount', fee);
  sessionStorage.setItem('paymentProgram', selectedOption.text);
  sessionStorage.setItem('paymentEmail', emailInput.value);
  
  // Show payment options
  openModal('paymentModal');
  
  // Update amount displays
  document.getElementById('ebirr-amount').textContent = `ETB ${fee}`;
  document.getElementById('telebirr-amount').textContent = `ETB ${fee}`;
}

// Select Payment Method
function selectPayment(method) {
  // Hide all payment details
  document.querySelectorAll('.payment-details').forEach(el => {
    el.style.display = 'none';
  });
  
  // Show selected payment method
  document.getElementById(`${method}-payment`).style.display = 'block';
}

// Simulate Payment
function simulatePayment(method) {
  showLoading();
  
  // Simulate payment processing
  setTimeout(() => {
    hideLoading();
    closeModal('paymentModal');
    
    // Generate random transaction ID
    const transactionId = 'TX' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const amount = sessionStorage.getItem('paymentAmount');
    const program = sessionStorage.getItem('paymentProgram');
    const email = sessionStorage.getItem('paymentEmail');
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Update success modal
    document.getElementById('transaction-id').textContent = transactionId;
    document.getElementById('amount-paid').textContent = `ETB ${amount}`;
    document.getElementById('payment-date').textContent = date;
    
    // Show success modal
    openModal('paymentSuccessModal');
    
    // Send invoice email (simulated)
    sendInvoiceEmail(email, transactionId, amount, program, date, method);
  }, 2000);
}

// Send Invoice Email
function sendInvoiceEmail(email, transactionId, amount, program, date, method) {
  // In a real application, this would connect to a backend service
  console.log(`Invoice sent to ${email}:`);
  console.log(`Transaction ID: ${transactionId}`);
  console.log(`Amount: ETB ${amount}`);
  console.log(`Program: ${program}`);
  console.log(`Date: ${date}`);
  console.log(`Payment Method: ${method}`);
  
  // Simulate email sending
  setTimeout(() => {
    alert(`Invoice has been sent to ${email}`);
  }, 1000);
}

// Download Invoice
function downloadInvoice() {
  showLoading();
  
  // Simulate invoice generation and download
  setTimeout(() => {
    hideLoading();
    
    const transactionId = document.getElementById('transaction-id').textContent;
    const amount = document.getElementById('amount-paid').textContent;
    const date = document.getElementById('payment-date').textContent;
    const program = sessionStorage.getItem('paymentProgram');
    
    // Create a simple invoice PDF (in a real app, this would be a proper PDF generation)
    const invoiceContent = `
      HUDHUD ISLAMIC COLLEGE
      ======================
      
      INVOICE
      ---------
      Transaction ID: ${transactionId}
      Date: ${date}
      
      Item: Application Fee - ${program}
      Amount: ${amount}
      
      Payment Status: Paid
      
      Thank you for your payment!
      
      Contact Information:
      HUDHUD ISLAMIC COLLEGE
      Dire Dawa, Addis Ababa, Ethiopia
      Phone: +251 933 322 685
      Email: hudhudislamicschool@gmail.com
    `;
    
    // Create download link
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Invoice downloaded successfully!');
  }, 1500);
}

// Initialize payment functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Update application fee when program selection changes
  const programSelect = document.getElementById('program');
  if (programSelect) {
    programSelect.addEventListener('change', updateApplicationFee);
  }
  
  // ... rest of existing initialization code ...
});


// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initSlider();
  initProgramTabs();
  initDocumentCategories();
  initPortalTabs();
  initAuthTabs();
  initChatbot();
  initMusicPlayer();
  initFileUpload();
  initForms();
  initStatsCounter();
  updateTimeZones();
  setInterval(updateTimeZones, 1000);
  
  // Check if user is logged in (for demo purposes)
  checkAuthStatus();
});

// Initialize Hero Slider
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  
  // Function to show a specific slide
  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('current'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[n].classList.add('current');
    dots[n].classList.add('active');
    currentSlide = n;
  }
  
  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Auto advance slides
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

// Initialize Program Tabs
function initProgramTabs() {
  const programTabs = document.querySelectorAll('.program-tab');
  const programContents = document.querySelectorAll('.program-content');
  
  programTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const program = tab.getAttribute('data-program');
      
      // Update active tab
      programTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show selected content
      programContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === program) {
          content.classList.add('active');
        }
      });
    });
  });
}

// Initialize Document Categories
function initDocumentCategories() {
  const categories = document.querySelectorAll('.document-category');
  const contents = document.querySelectorAll('.document-content');
  
  categories.forEach(category => {
    category.addEventListener('click', () => {
      const categoryType = category.getAttribute('data-category');
      
      // Update active category
      categories.forEach(c => c.classList.remove('active'));
      category.classList.add('active');
      
      // Show selected content
      contents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${categoryType}-content`) {
          content.classList.add('active');
        }
      });
    });
  });
}

// Initialize Portal Tabs
function initPortalTabs() {
  const portalTabs = document.querySelectorAll('.portal-tab');
  const portalContents = document.querySelectorAll('.portal-content');
  
  portalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      
      // Update active tab
      portalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show selected content
      portalContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${tabName}-content`) {
          content.classList.add('active');
        }
      });
    });
  });
}

// Initialize Auth Tabs
function initAuthTabs() {
  const authTabs = document.querySelectorAll('.auth-tab');
  const authContents = document.querySelectorAll('.auth-content');
  
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      
      // Update active tab
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show selected content
      authContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${tabName}-content`) {
          content.classList.add('active');
        }
      });
    });
  });
}

// Initialize Chatbot
function initChatbot() {
  const chatbot = document.getElementById('hudhud-chatbot');
  const openBtn = document.getElementById('open-chatbot');
  const closeBtn = document.getElementById('close-chatbot');
  const sendBtn = document.getElementById('send-message');
  const inputField = document.getElementById('chatbot-input');
  const messagesContainer = document.querySelector('.chatbot-messages');
  
  // Toggle chatbot visibility
  openBtn.addEventListener('click', () => {
    chatbot.classList.toggle('open');
  });
  
  closeBtn.addEventListener('click', () => {
    chatbot.classList.remove('open');
  });
  
  // Send message function
  function sendMessage() {
    const message = inputField.value.trim();
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    inputField.value = '';
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let response = "I'm sorry, I didn't understand that. How can I help you with information about Hudhud Islamic College?";
      
      // Simple response logic
      if (message.toLowerCase().includes('admission') || message.toLowerCase().includes('apply')) {
        response = "For admissions, please visit our Apply section or contact us at +251 933 322 685. Would you like me to take you to the application form?";
      } else if (message.toLowerCase().includes('program') || message.toLowerCase().includes('course')) {
        response = "We offer certificate, diploma and degree programs in Islamic Studies, Quran Memorization, Arabic Language, and more. Check our Programs section for details.";
      } else if (message.toLowerCase().includes('fee') || message.toLowerCase().includes('cost')) {
        response = "Our fees vary by program. Please contact us at +251 933 322 685 for detailed fee structure information.";
      } else if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('where')) {
        response = "We're located in Addis Ababa, Ethiopia. You can reach us at +251 933 322 685 or info@hudhudcollege.edu.et.";
      }
      
      addMessage(response, 'bot');
    }, 1000);
  }
  
  // Add message to chat
  function addMessage(text, sender) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', `${sender}-message`);
    
    const p = document.createElement('p');
    p.textContent = text;
    
    messageEl.appendChild(p);
    messagesContainer.appendChild(messageEl);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Event listeners
  sendBtn.addEventListener('click', sendMessage);
  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

// Initialize Music Player
function initMusicPlayer() {
  const playPauseBtn = document.getElementById('play-pause');
  const prevBtn = document.getElementById('prev-song');
  const nextBtn = document.getElementById('next-song');
  const muteBtn = document.getElementById('mute-unmute');
  const uploadBtn = document.getElementById('upload-music');
  const uploadInput = document.getElementById('music-upload');
  const progressBar = document.querySelector('.progress-bar .progress');
  const trackTitle = document.getElementById('track-title');
  
  let audio = new Audio();
  let isPlaying = false;
  let currentTrack = 0;
  let tracks = [];
  
  // Default nasheed (can be replaced with actual files)
  tracks.push({
    title: 'Islamic Nasheed',
    src: 'https://example.com/path/to/nasheed.mp3' // Replace with actual file
  });
  
  // Load first track
  loadTrack(currentTrack);
  
  // Play/Pause functionality
  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  });
  
  // Previous track
  prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    playAudio();
  });
  
  // Next track
  nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    playAudio();
  });
  
  // Mute/Unmute
  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.innerHTML = audio.muted ? 
      '<i class="fas fa-volume-mute"></i>' : 
      '<i class="fas fa-volume-up"></i>';
  });
  
  // Progress bar click
  document.querySelector('.progress-bar').addEventListener('click', (e) => {
    const width = e.target.clientWidth || e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  });
  
  // Upload music
  uploadBtn.addEventListener('click', () => {
    uploadInput.click();
  });
  
  uploadInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      tracks = [];
      for (let i = 0; i < files.length; i++) {
        tracks.push({
          title: files[i].name,
          src: URL.createObjectURL(files[i])
        });
      }
      currentTrack = 0;
      loadTrack(currentTrack);
      playAudio();
    }
  });
  
  // Load track
  function loadTrack(index) {
    audio.src = tracks[index].src;
    audio.load();
    trackTitle.textContent = tracks[index].title;
  }
  
  // Play audio
  function playAudio() {
    audio.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  
  // Pause audio
  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
  
  // Update progress bar
  audio.addEventListener('timeupdate', () => {
    const value = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = value + '%';
  });
  
  // Auto-play next track
  audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    playAudio();
  });
}

// Initialize File Upload
function initFileUpload() {
  const fileInput = document.getElementById('doc-files');
  const fileList = document.getElementById('file-list');
  
  fileInput.addEventListener('change', () => {
    fileList.innerHTML = '';
    
    for (let i = 0; i < fileInput.files.length; i++) {
      const file = fileInput.files[i];
      const fileItem = document.createElement('div');
      fileItem.classList.add('file-item');
      
      fileItem.innerHTML = `
        <span>${file.name}</span>
        <button type="button" onclick="removeFile(${i})">&times;</button>
      `;
      
      fileList.appendChild(fileItem);
    }
  });
}

// Remove file from upload list
function removeFile(index) {
  const dt = new DataTransfer();
  const input = document.getElementById('doc-files');
  const { files } = input;
  
  for (let i = 0; i < files.length; i++) {
    if (index !== i) {
      dt.items.add(files[i]);
    }
  }
  
  input.files = dt.files;
  initFileUpload(); // Refresh the file list
}

// Initialize Forms
function initForms() {
  // Application form
  const applicationForm = document.getElementById('applicationForm');
  if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showLoading();
      
      // Simulate form submission
      setTimeout(() => {
        hideLoading();
        alert('Application submitted successfully! We will contact you soon.');
        applicationForm.reset();
        document.getElementById('file-list').innerHTML = '';
      }, 2000);
    });
  }
  
  // Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      // Simple validation
      if (email && password) {
        showLoading();
        
        // Simulate login process
        setTimeout(() => {
          hideLoading();
          closeModal('authModal');
          loginUser(email);
        }, 1500);
      }
    });
  }
  
  // Registration form
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirmPassword').value;
      
      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      showLoading();
      
      // Simulate registration process
      setTimeout(() => {
        hideLoading();
        closeModal('authModal');
        loginUser(email);
        alert('Registration successful! You are now logged in.');
      }, 1500);
    });
  }
  
  // Document order form
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showLoading();
      
      // Simulate order submission
      setTimeout(() => {
        hideLoading();
        closeModal('orderModal');
        alert('Your order has been received! We will contact you shortly with details.');
        orderForm.reset();
      }, 1500);
    });
  }
}

// Initialize Stats Counter
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-item h3');
  const speed = 200;
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = Math.ceil(target / speed);
    
    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(() => initStatsCounter(), 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Update Time Zones
function updateTimeZones() {
  const now = new Date();
  
  // Current time
  document.getElementById('current-time').innerHTML = 
    `<i class="fas fa-clock"></i> Local: ${now.toLocaleTimeString()}`;
  
  // Current date
  document.getElementById('current-date').innerHTML = 
    `<i class="fas fa-calendar"></i> ${now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}`;
  
  // Ethiopian date (approximation)
  const ethiopianDate = getEthiopianDate(now);
  document.getElementById('ethiopian-date').innerHTML = 
    `<i class="fas fa-calendar-alt"></i> Ethiopian: ${ethiopianDate}`;
  
  // Makkah time (approximation - UTC+3)
  const meccaTime = new Date(now.getTime() + (3 * 60 * 60 * 1000)); // Add 3 hours for UTC+3
  document.getElementById('makkah-time').innerHTML = 
    `<i class="fas fa-mosque"></i> Makkah: ${meccaTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  
  // Islamic date (approximation)
  const islamicDate = getIslamicDate(now);
  document.getElementById('islamic-date').innerHTML = 
    `<i class="fas fa-star-and-crescent"></i> Hijri: ${islamicDate}`;
}

// Get Ethiopian date (approximation)
function getEthiopianDate(date) {
  // This is a simplified approximation
  const ethiopianMonths = ['Meskerem', 'Tikimit', 'Hidar', 'Tahesas', 'Tir', 'Yekatit', 'Megabit', 'Miazia', 'Meskerem', 'Tikimit', 'Hidar', 'Tahesas', 'Tir', 'Yekatit', 'Megabit', 'Miazia', 'Sene', 'Hamle', 'Nehase', 'Pagume'];
  const month = date.getMonth();
  const year = date.getFullYear() - 7; // Ethiopian year is 7-8 years behind
  
  return `${ethiopianMonths[month]} ${year}`;
}

// Get Islamic date (approximation)
function getIslamicDate(date) {
  // This is a simplified approximation - for accurate dates use a proper library
  const islamicMonths = ['Muharram', 'Safar', 'Rabiʻ I', 'Rabiʻ II', 'Jumada I', 'Jumada II', 'Rajab', 'Shaʻban', 'Rabiʻ I', 'Rabiʻ II', 'Jumada I', 'Jumada II', 'Rajab', 'Shaʻban', 'Shawwal', 'Dhuʻl-Qiʻdah', 'Dhuʻl-Hijjah'];
  const month = date.getMonth();
  const year = date.getFullYear() - 578; // Hijri year is approximately 579 years behind
  
  return `${islamicMonths[month]} ${year} AH`;
}

// Check Authentication Status
function checkAuthStatus() {
  // For demo purposes, check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');
  
  if (isLoggedIn && userEmail) {
    loginUser(userEmail);
  }
}

// Login User
function loginUser(email) {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', email);
  
  document.getElementById('authBtnLabel').textContent = 'Logout';
  document.getElementById('student-name').textContent = email.split('@')[0];
  
  // Show private content, hide public content
  document.getElementById('public-content').style.display = 'none';
  document.getElementById('private-content').style.display = 'block';
  
  // Update live classes section
  document.getElementById('live-classes-login-message').style.display = 'none';
  document.getElementById('live-classes-content').style.display = 'grid';
  
  // Change auth button to logout
  const authBtn = document.getElementById('openAuth');
  authBtn.onclick = logoutUser;
}

// Logout User
function logoutUser() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  
  document.getElementById('authBtnLabel').textContent = 'Register / Login';
  
  // Show public content, hide private content
  document.getElementById('public-content').style.display = 'block';
  document.getElementById('private-content').style.display = 'none';
  
  // Update live classes section
  document.getElementById('live-classes-login-message').style.display = 'block';
  document.getElementById('live-classes-content').style.display = 'none';
  
  // Change auth button back to login
  const authBtn = document.getElementById('openAuth');
  authBtn.onclick = () => openModal('authModal');
}

// Modal Functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Open Document Order Modal
function openOrderModal(docType) {
  document.getElementById('document-type').textContent = docType;
  openModal('orderModal');
}

// Download Sample (simulated)
function downloadSample(type) {
  showLoading();
  
  // Simulate download
  setTimeout(() => {
    hideLoading();
    alert(`Thank you! Your ${type} sample download will begin shortly.`);
  }, 1500);
}

// Set Class Reminder
function setClassReminder(className) {
  if (Notification.permission === 'granted') {
    new Notification(`Reminder set for ${className}`, {
      body: 'You will be notified when the class is about to start.'
    });
    alert(`Reminder set for ${className}!`);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(`Reminder set for ${className}`, {
          body: 'You will be notified when the class is about to start.'
        });
        alert(`Reminder set for ${className}!`);
      }
    });
  }
}

// Send Application to Email
function sendAppToEmail() {
  const form = document.getElementById('applicationForm');
  const email = document.getElementById('email').value;
  
  if (!email) {
    alert('Please enter your email address first.');
    return;
  }
  
  showLoading();
  
  // Simulate email sending
  setTimeout(() => {
    hideLoading();
    alert(`Application details have been sent to ${email}.`);
  }, 1500);
}

// Show Loading Overlay
function showLoading() {
  document.getElementById('loading').style.display = 'flex';
}

// Hide Loading Overlay
function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

// Scroll to Section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Mobile Menu Toggle
document.getElementById('mobileMenuToggle').addEventListener('click', function() {
  document.getElementById('mainNav').classList.toggle('open');
});

// Close modals when clicking outside
window.addEventListener('click', function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Initialize Exam Tabs
function initExamTabs() {
  const examTabs = document.querySelectorAll('.exam-tab');
  const examContents = document.querySelectorAll('.exam-content');
  
  examTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const examType = tab.getAttribute('data-exam');
      
      // Update active tab
      examTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show selected content
      examContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${examType}-exams`) {
          content.classList.add('active');
        }
      });
    });
  });
}

// Initialize Calendar
function initCalendar() {
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const monthDisplay = document.getElementById('current-month');
  const daysContainer = document.getElementById('calendar-days');
  
  let currentDate = new Date();
  
  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Display month and year
    monthDisplay.textContent = new Date(year, month, 1).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Clear previous days
    daysContainer.innerHTML = '';
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('calendar-day', 'empty');
      daysContainer.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('calendar-day');
      
      const dateElement = document.createElement('div');
      dateElement.classList.add('date');
      dateElement.textContent = i;
      
      dayElement.appendChild(dateElement);
      
      // Simulate attendance status (in real app, this would come from database)
      if (i % 7 === 0) {
        dayElement.classList.add('absent');
        const statusElement = document.createElement('div');
        statusElement.classList.add('attendance-status');
        statusElement.textContent = 'Absent';
        dayElement.appendChild(statusElement);
      } else if (i % 3 === 0) {
        dayElement.classList.add('present');
        const statusElement = document.createElement('div');
        statusElement.classList.add('attendance-status');
        statusElement.textContent = 'Present';
        dayElement.appendChild(statusElement);
      }
      
      daysContainer.appendChild(dayElement);
    }
  }
  
  // Event listeners for prev/next buttons
  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });
  
  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });
  
  // Initial render
  renderCalendar();
}

// Join Exam Function
function joinExam(examName) {
  showLoading();
  
  // Simulate exam joining process
  setTimeout(() => {
    hideLoading();
    
    // In a real application, this would redirect to the exam interface
    const examWindow = window.open('', '_blank');
    examWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${examName} - HUDHUD ISLAMIC COLLEGE</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 50px; 
            background-color: #f5f5f5;
          }
          .exam-container { 
            background: white; 
            padding: 30px; 
            border-radius: 10px; 
            box-shadow: 0 0 10px rgba(0,0,0,0.1); 
            max-width: 600px; 
            margin: 0 auto;
          }
          h1 { color: #2E7D32; }
          .timer { 
            font-size: 24px; 
            color: #D4AF37; 
            margin: 20px 0;
          }
          .question { 
            text-align: left; 
            margin: 20px 0; 
            padding: 15px; 
            border: 1px solid #ddd; 
            border-radius: 5px;
          }
          .options { 
            text-align: left; 
            margin-left: 20px;
          }
          .option { 
            margin: 10px 0;
          }
          button { 
            background: #2E7D32; 
            color: white; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 5px; 
            cursor: pointer; 
            margin: 10px;
          }
        </style>
      </head>
      <body>
        <div class="exam-container">
          <h1>${examName}</h1>
          <div class="timer">Time Remaining: <span id="time">60:00</span></div>
          
          <div class="question">
            <p>1. What is the first Surah in the Quran?</p>
            <div class="options">
              <div class="option"><input type="radio" name="q1" id="q1a"> <label for="q1a">Al-Fatiha</label></div>
              <div class="option"><input type="radio" name="q1" id="q1b"> <label for="q1b">Al-Baqarah</label></div>
              <div class="option"><input type="radio" name="q1" id="q1c"> <label for="q1c">Al-Ikhlas</label></div>
              <div class="option"><input type="radio" name="q1" id="q1d"> <label for="q1d">An-Nas</label></div>
            </div>
          </div>
          
          <div class="question">
            <p>2. Explain the importance of Salah in Islam.</p>
            <textarea rows="4" style="width: 100%; margin-top: 10px;"></textarea>
          </div>
          
          <button onclick="alert('Exam submitted successfully!')">Submit Exam</button>
        </div>
        
        <script>
          // Timer countdown simulation
          let timeLeft = 60 * 60; // 60 minutes
          const timerElement = document.getElementById('time');
          
          function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = \`\${minutes}:\${seconds < 10 ? '0' : ''}\${seconds}\`;
            
            if (timeLeft > 0) {
              timeLeft--;
              setTimeout(updateTimer, 1000);
            } else {
              alert('Time is up! Your exam will be submitted automatically.');
            }
          }
          
          updateTimer();
        </script>
      </body>
      </html>
    `);
  }, 1500);
}

// View Exam Instructions
function viewExamInstructions(examName) {
  alert(`Instructions for ${examName}:\n\n1. Ensure you have a stable internet connection\n2. Do not refresh the page during the exam\n3. You have one attempt only\n4. The exam will auto-submit when time expires\n5. No external resources allowed`);
}

// View Exam Results
function viewExamResults(examName) {
  alert(`Results for ${examName}:\n\nScore: 87/100 (A-)\n\nFeedback: Excellent understanding of the subject matter. Good work on the essay questions.`);
}

// Download Certificate
function downloadCertificate(courseName) {
  showLoading();
  
  // Simulate certificate download
  setTimeout(() => {
    hideLoading();
    alert(`Certificate for ${courseName} downloaded successfully!`);
  }, 1500);
}

// Update DOMContentLoaded to initialize new features
document.addEventListener('DOMContentLoaded', function() {
  // ... existing initialization code ...
  
  // Initialize new features
  initExamTabs();
  initCalendar();
  
  // ... rest of existing code ...
});

// YouTube API loading
let youtubePlayer;
function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Initialize YouTube Player
function onYouTubeIframeAPIReady() {
  youtubePlayer = new YT.Player('youtube-player', {
    height: '100%',
    width: '100%',
    playerVars: {
      'playsinline': 1,
      'modestbranding': 1,
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  console.log('YouTube player ready');
}

function onPlayerStateChange(event) {
  // Handle player state changes if needed
}

// Initialize Streaming Section
function initStreaming() {
  const streamTabs = document.querySelectorAll('.stream-tab');
  const streamContents = document.querySelectorAll('.stream-content');
  const sourceButtons = document.querySelectorAll('.source-btn');
  const streamItems = document.querySelectorAll('.stream-item');
  const recordedItems = document.querySelectorAll('.recorded-item');
  
  // Stream tabs
  streamTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const streamType = tab.getAttribute('data-stream');
      
      streamTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      streamContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${streamType}-content`) {
          content.classList.add('active');
        }
      });
    });
  });
  
  // Source buttons
  sourceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const source = button.getAttribute('data-source');
      
      sourceButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show custom URL input if custom source selected
      if (source === 'custom') {
        showCustomUrlInput();
      }
    });
  });
  
  // Stream items
  streamItems.forEach(item => {
    item.addEventListener('click', () => {
      const type = item.getAttribute('data-type');
      const id = item.getAttribute('data-id');
      const title = item.getAttribute('data-title');
      
      playStream(type, id, title);
    });
  });
  
  // Recorded items
  recordedItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-category');
      const instructor = item.getAttribute('data-instructor');
      const title = item.querySelector('h4').textContent;
      
      // In a real app, this would fetch the actual video URL
      playRecordedVideo('youtube', 'dQw4w9WgXcQ', title);
    });
  });
  
  // Quality selector
  const qualitySelect = document.getElementById('quality-select');
  if (qualitySelect) {
    qualitySelect.addEventListener('change', function() {
      setPlaybackQuality(this.value);
    });
  }
  
  // Filter recorded videos
  const categoryFilter = document.getElementById('category-filter');
  const instructorFilter = document.getElementById('instructor-filter');
  
  if (categoryFilter && instructorFilter) {
    categoryFilter.addEventListener('change', filterRecordedVideos);
    instructorFilter.addEventListener('change', filterRecordedVideos);
  }
  
  // Load YouTube API
  loadYouTubeAPI();
}

// Play Stream Function
function playStream(type, id, title) {
  const playerContainer = document.getElementById('player-container');
  const placeholder = document.getElementById('player-placeholder');
  
  // Hide placeholder
  placeholder.style.display = 'none';
  
  if (type === 'youtube') {
    // Play YouTube video
    if (youtubePlayer) {
      youtubePlayer.loadVideoById(id);
      youtubePlayer.setSize('100%', '100%');
    } else {
      // Fallback to iframe if API isn't loaded
      playerContainer.innerHTML = `
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/${id}?autoplay=1" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    }
  } else if (type === 'google') {
    // For Google Meet, we can only show a link
    playerContainer.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:white; padding:20px; text-align:center;">
        <i class="fab fa-google" style="font-size:3rem; margin-bottom:20px;"></i>
        <h3>Google Meet Session</h3>
        <p>This is a live Google Meet session. Click the button below to join.</p>
        <a href="${id}" target="_blank" class="btn primary" style="margin-top:20px;">
          <i class="fas fa-external-link-alt"></i> Join Google Meet
        </a>
      </div>
    `;
  }
  
  // Update UI to show what's playing
  updateNowPlaying(title);
}

// Play Recorded Video
function playRecordedVideo(type, id, title) {
  // Switch to live tab to show the player
  document.querySelector('[data-stream="live"]').click();
  playStream(type, id, title);
}

// Set Playback Quality
function setPlaybackQuality(quality) {
  if (youtubePlayer) {
    // YouTube quality settings
    const qualityMap = {
      'hd': 'hd1080',
      'sd': 'large',
      'low': 'medium',
      'auto': 'default'
    };
    
    youtubePlayer.setPlaybackQuality(qualityMap[quality] || 'default');
  }
  // Note: Quality control for other sources would require their specific APIs
}

// Show Custom URL Input
function showCustomUrlInput() {
  const playerControls = document.querySelector('.player-controls');
  let urlContainer = document.querySelector('.url-input-container');
  
  if (!urlContainer) {
    urlContainer = document.createElement('div');
    urlContainer.className = 'url-input-container';
    urlContainer.innerHTML = `
      <input type="text" id="custom-stream-url" placeholder="Enter video URL (YouTube, Vimeo, etc.)">
      <button class="btn small" onclick="loadCustomStream()">Load Stream</button>
    `;
    playerControls.appendChild(urlContainer);
  } else {
    urlContainer.style.display = 'block';
  }
}

// Load Custom Stream
function loadCustomStream() {
  const urlInput = document.getElementById('custom-stream-url');
  const url = urlInput.value.trim();
  
  if (!url) {
    alert('Please enter a valid URL');
    return;
  }
  
  // Simple URL parsing to determine type
  let videoId;
  let type;
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    type = 'youtube';
    // Extract YouTube ID
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    videoId = match ? match[1] : null;
  } else if (url.includes('vimeo.com')) {
    type = 'vimeo';
    // Extract Vimeo ID
    const match = url.match(/(?:vimeo\.com\/)([0-9]+)/);
    videoId = match ? match[1] : null;
  } else {
    // Generic URL - we'll try to embed it directly
    type = 'generic';
    videoId = url;
  }
  
  if (videoId) {
    if (type === 'youtube') {
      playStream('youtube', videoId, 'Custom YouTube Video');
    } else if (type === 'vimeo') {
      loadVimeoVideo(videoId);
    } else {
      loadGenericVideo(url);
    }
  } else {
    alert('Could not parse video ID from URL');
  }
}

// Load Vimeo Video
function loadVimeoVideo(videoId) {
  const playerContainer = document.getElementById('player-container');
  const placeholder = document.getElementById('player-placeholder');
  
  placeholder.style.display = 'none';
  playerContainer.innerHTML = `
    <iframe 
      src="https://player.vimeo.com/video/${videoId}?autoplay=1" 
      width="100%" 
      height="100%" 
      frameborder="0" 
      allow="autoplay; fullscreen" 
      allowfullscreen>
    </iframe>
  `;
  
  updateNowPlaying('Vimeo Video');
}

// Load Generic Video
function loadGenericVideo(url) {
  const playerContainer = document.getElementById('player-container');
  const placeholder = document.getElementById('player-placeholder');
  
  placeholder.style.display = 'none';
  playerContainer.innerHTML = `
    <video controls autoplay style="width:100%; height:100%;">
      <source src="${url}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `;
  
  updateNowPlaying('Custom Video');
}

// Update Now Playing
function updateNowPlaying(title) {
  // Update UI to show what's currently playing
  const nowPlaying = document.createElement('div');
  nowPlaying.className = 'now-playing';
  nowPlaying.innerHTML = `<span>Now Playing:</span> ${title}`;
  
  // Remove existing now playing if any
  const existing = document.querySelector('.now-playing');
  if (existing) {
    existing.remove();
  }
  
  const playerControls = document.querySelector('.player-controls');
  playerControls.prepend(nowPlaying);
}

// Filter Recorded Videos
function filterRecordedVideos() {
  const category = document.getElementById('category-filter').value;
  const instructor = document.getElementById('instructor-filter').value;
  const videos = document.querySelectorAll('.recorded-item');
  
  videos.forEach(video => {
    const videoCategory = video.getAttribute('data-category');
    const videoInstructor = video.getAttribute('data-instructor');
    
    const categoryMatch = category === 'all' || category === videoCategory;
    const instructorMatch = instructor === 'all' || instructor === videoInstructor;
    
    if (categoryMatch && instructorMatch) {
      video.style.display = 'block';
    } else {
      video.style.display = 'none';
    }
  });
}

// Set Stream Reminder
function setStreamReminder(streamName) {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      scheduleReminder(streamName);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          scheduleReminder(streamName);
        }
      });
    }
  } else {
    alert(`Reminder set for ${streamName}! We'll notify you 15 minutes before it starts.`);
  }
}

function scheduleReminder(streamName) {
  // In a real app, this would use actual stream timing
  alert(`Reminder set for ${streamName}! You'll receive a notification 15 minutes before the stream starts.`);
  
  // Simulate setting a reminder
  const reminderTime = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now for demo
  
  setTimeout(() => {
    new Notification(`Hudhud Islamic College`, {
      body: `"${streamName}" is starting in 15 minutes!`,
      icon: 'hudhud new logo.png'
    });
  }, 2 * 60 * 1000); // 2 minutes for demo
}

// Toggle Fullscreen
function toggleFullscreen() {
  const playerContainer = document.getElementById('player-container');
  
  if (!document.fullscreenElement) {
    playerContainer.requestFullscreen().catch(err => {
      alert(`Error attempting to enable fullscreen: ${err.message}`);
    });
    playerContainer.classList.add('player-fullscreen');
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      playerContainer.classList.remove('player-fullscreen');
    }
  }
}

// Add to DOMContentLoaded function
document.addEventListener('DOMContentLoaded', function() {
  // ... existing initialization code ...
  
  // Initialize streaming functionality
  initStreaming();
  
  // ... rest of existing code ...
});

// YouTube Player API
let player;
let isPlaying = false;
let currentVideoId = '';
let currentStreamType = '';

// Initialize streaming functionality
function initStreaming() {
  loadYouTubeAPI();
  setupStreamTabs();
  setupPlayerControls();
  loadStreamContent();
  setupSearch();
  setupFilters();
}

// Load YouTube API
function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// YouTube API ready callback
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player-container', {
    height: '100%',
    width: '100%',
    playerVars: {
      'playsinline': 1,
      'modestbranding': 1,
      'rel': 0,
      'enablejsapi': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

// Player ready event
function onPlayerReady(event) {
  console.log('YouTube player ready');
  setupPlayerEventListeners();
}

// Player state change event
function onPlayerStateChange(event) {
  const playPauseBtn = document.getElementById('play-pause-btn');
  
  switch(event.data) {
    case YT.PlayerState.PLAYING:
      isPlaying = true;
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      updateTimeDisplay();
      break;
    case YT.PlayerState.PAUSED:
      isPlaying = false;
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      break;
    case YT.PlayerState.ENDED:
      isPlaying = false;
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      break;
  }
}

// Player error event
function onPlayerError(event) {
  console.error('YouTube player error:', event.data);
  alert('Error loading video. Please try another stream.');
}

// Setup player event listeners
function setupPlayerEventListeners() {
  // Play/Pause button
  document.getElementById('play-pause-btn').addEventListener('click', function() {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });
  
  // Mute button
  document.getElementById('mute-btn').addEventListener('click', function() {
    if (player.isMuted()) {
      player.unMute();
      this.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      player.mute();
      this.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  });
  
  // Volume slider
  const volumeSlider = document.getElementById('volume-slider');
  volumeSlider.addEventListener('input', function() {
    player.setVolume(this.value);
  });
  
  // Quality selector
  document.getElementById('quality-select').addEventListener('change', function() {
    setPlaybackQuality(this.value);
  });
  
  // Theater mode
  document.getElementById('theater-mode').addEventListener('click', function() {
    document.body.classList.toggle('theater-mode');
  });
  
  // Fullscreen button
  document.getElementById('fullscreen-btn').addEventListener('click', function() {
    toggleFullscreen();
  });
  
  // Toggle chat
  document.getElementById('toggle-chat').addEventListener('click', function() {
    document.getElementById('youtube-chat').style.display = 'none';
  });
}

// Update time display
function updateTimeDisplay() {
  if (!player || !isPlaying) return;
  
  const currentTime = formatTime(player.getCurrentTime());
  const duration = formatTime(player.getDuration());
  
  document.getElementById('current-time').textContent = currentTime;
  document.getElementById('duration').textContent = duration;
  
  if (isPlaying) {
    requestAnimationFrame(updateTimeDisplay);
  }
}

// Format time (seconds to MM:SS)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Set playback quality
function setPlaybackQuality(quality) {
  const qualityMap = {
    'hd': 'hd1080',
    'sd': 'large',
    'low': 'medium',
    'auto': 'default'
  };
  
  player.setPlaybackQuality(qualityMap[quality] || 'default');
}

// Toggle fullscreen
function toggleFullscreen() {
  const container = document.querySelector('.streaming-container');
  
  if (!document.fullscreenElement) {
    container.classList.add('fullscreen-mode');
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    container.classList.remove('fullscreen-mode');
  }
}

// Setup stream tabs
function setupStreamTabs() {
  const streamTabs = document.querySelectorAll('.stream-tab');
  
  streamTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const streamType = this.getAttribute('data-stream');
      
      // Update active tab
      streamTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show selected content
      document.querySelectorAll('.stream-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`${streamType}-content`).classList.add('active');
      
      // Load content for this tab
      loadStreamContent(streamType);
    });
  });
}

// Load stream content
function loadStreamContent(type = 'live') {
  switch(type) {
    case 'live':
      loadLiveStreams();
      break;
    case 'upcoming':
      loadUpcomingStreams();
      break;
    case 'recorded':
      loadRecordedVideos();
      break;
  }
}

// Load live streams (simulated data - replace with your actual data)
function loadLiveStreams() {
  const liveStreams = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Friday Khutbah Live',
      instructor: 'Sheikh Ahmed Mohammed',
      viewers: 245,
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
      id: 'abc123def456',
      title: 'Quran Class with Ustaz Ahmed',
      instructor: 'Ustaz Ahmed Ibrahim',
      viewers: 89,
      thumbnail: 'hudhud-1.jpg'
    }
  ];
  
  const container = document.getElementById('live-streams-list');
  container.innerHTML = '';
  
  if (liveStreams.length === 0) {
    container.innerHTML = '<div class="no-streams"><p>No live streams at the moment. Check back later!</p></div>';
    return;
  }
  
  liveStreams.forEach(stream => {
    const streamElement = document.createElement('div');
    streamElement.className = 'stream-item';
    streamElement.setAttribute('data-id', stream.id);
    streamElement.innerHTML = `
      <div class="stream-thumb">
        <img src="${stream.thumbnail}" alt="${stream.title}">
        <span class="live-badge">LIVE</span>
      </div>
      <div class="stream-info">
        <h4>${stream.title}</h4>
        <p><i class="fas fa-user"></i> ${stream.instructor}</p>
        <p><i class="fas fa-eye"></i> ${stream.viewers} watching</p>
      </div>
    `;
    
    streamElement.addEventListener('click', () => {
      playStream('youtube', stream.id, stream.title);
    });
    
    container.appendChild(streamElement);
  });
}

// Load upcoming streams (simulated data)
function loadUpcomingStreams() {
  const upcomingStreams = [
    {
      id: 'xyz789uvw012',
      title: 'Islamic History Lecture',
      instructor: 'Dr. Fatima Ali',
      date: '2023-09-15T14:00:00',
      location: 'Main Hall'
    },
    {
      id: 'ghi345jkl678',
      title: 'Arabic Language Workshop',
      instructor: 'Ustaz Mohammed Hassan',
      date: '2023-09-16T10:00:00',
      location: 'Room 5'
    }
  ];
  
  const container = document.getElementById('upcoming-list');
  container.innerHTML = '';
  
  if (upcomingStreams.length === 0) {
    container.innerHTML = '<div class="no-streams"><p>No upcoming streams scheduled.</p></div>';
    return;
  }
  
  upcomingStreams.forEach(stream => {
    const streamDate = new Date(stream.date);
    const now = new Date();
    const timeDiff = streamDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const hoursDiff = Math.ceil((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    
    const streamElement = document.createElement('div');
    streamElement.className = 'upcoming-item';
    streamElement.innerHTML = `
      <div class="upcoming-time">
        <span class="day">${streamDate.getDate()}</span>
        <span class="month">${streamDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
        <span class="hour">${streamDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div class="upcoming-details">
        <h4>${stream.title}</h4>
        <p>${stream.instructor} - ${stream.location}</p>
        <p>Starts in ${daysDiff} days ${hoursDiff} hours</p>
      </div>
      <button class="btn small" onclick="setStreamReminder('${stream.id}', '${stream.title}')">
        <i class="fas fa-bell"></i> Remind Me
      </button>
    `;
    
    container.appendChild(streamElement);
  });
}

// Load recorded videos (simulated data)
function loadRecordedVideos(page = 1) {
  const recordedVideos = [
    {
      id: 'Yz4u67SMKXNH1jQe',
      title: 'Introduction to Islamic Finance',
      instructor: 'Sheikh Ahmed Mohammed',
      category: 'lecture',
      date: '2023-09-05',
      views: 1200,
      duration: '1:24:16',
      thumbnail: 'hudhud-2.jpg'
    },
    {
      id: 'https://www.youtube.com/live/7-Qf3g-0xEI?si=Yz4u67SMKXNH1jQe',
      title: 'Tajweed Rules Part 1',
      instructor: 'Dr. Fatima Ali',
      category: 'quran',
      date: '2023-09-03',
      views: 894,
      duration: '45:32',
      thumbnail: 'hudhud-3.jpg'
    },
    // Add more videos as needed
  ];
  
  const container = document.getElementById('recorded-grid');
  container.innerHTML = '';
  
  if (recordedVideos.length === 0) {
    container.innerHTML = '<div class="no-videos"><p>No recorded videos available.</p></div>';
    return;
  }
  
  recordedVideos.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.className = 'recorded-item';
    videoElement.setAttribute('data-category', video.category);
    videoElement.setAttribute('data-instructor', video.instructor.toLowerCase().replace(/\s+/g, '-'));
    videoElement.innerHTML = `
      <div class="recorded-thumb">
        <img src="${video.thumbnail}" alt="${video.title}">
        <div class="play-overlay">
          <i class="fas fa-play"></i>
        </div>
        <span class="duration">${video.duration}</span>
      </div>
      <div class="recorded-info">
        <h4>${video.title}</h4>
        <p>${video.instructor}</p>
        <div class="recorded-meta">
          <span><i class="fas fa-calendar"></i> ${new Date(video.date).toLocaleDateString()}</span>
          <span><i class="fas fa-eye"></i> ${video.views} views</span>
        </div>
      </div>
    `;
    
    videoElement.addEventListener('click', () => {
      playStream('youtube', video.id, video.title);
    });
    
    container.appendChild(videoElement);
  });
  
  // Update pagination (simplified)
  updatePagination(page, 1); // Assuming 1 page for demo
}

// Update pagination
function updatePagination(currentPage, totalPages) {
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageInfo = document.querySelector('.page-info');
  
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= totalPages;
  
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  
  // Set up event listeners
  prevBtn.onclick = () => loadRecordedVideos(currentPage - 1);
  nextBtn.onclick = () => loadRecordedVideos(currentPage + 1);
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('stream-search');
  const searchBtn = document.querySelector('.search-btn');
  
  const performSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
      // In a real implementation, this would filter or search through content
      alert(`Searching for: ${query}`);
      // You would implement actual search/filter logic here
    }
  };
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

// Setup filters
function setupFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const instructorFilter = document.getElementById('instructor-filter');
  const sortFilter = document.getElementById('sort-filter');
  
  const applyFilters = () => {
    const category = categoryFilter.value;
    const instructor = instructorFilter.value;
    const sort = sortFilter.value;
    
    // In a real implementation, this would filter and sort the content
    loadRecordedVideos(); // Reload with filters applied
  };
  
  categoryFilter.addEventListener('change', applyFilters);
  instructorFilter.addEventListener('change', applyFilters);
  sortFilter.addEventListener('change', applyFilters);
}

// Play a stream
function playStream(type, id, title) {
  currentVideoId = id;
  currentStreamType = type;
  
  // Hide placeholder
  document.getElementById('player-placeholder').style.display = 'none';
  
  // Load the video
  if (type === 'youtube') {
    player.loadVideoById(id);
    player.playVideo();
    
    // Update chat iframe (simplified - would need actual chat ID)
    document.querySelector('.chat-messages').innerHTML = `
      <div class="chat-notice">
        <p>Live chat is only available during active streams</p>
      </div>
    `;
  }
  
  // Update UI to show what's playing
  document.querySelector('.stream-player h3').textContent = title;
}

// Set a reminder for a stream
function setStreamReminder(id, title) {
  if ('Notification' in window && Notification.permission === 'granted') {
    // Schedule notification
    alert(`Reminder set for: ${title}`);
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        alert(`Reminder set for: ${title}`);
      }
    });
  } else {
    alert(`We'll remind you about: ${title}`);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initStreaming();
});

// Handle fullscreen change
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
  if (!document.fullscreenElement && 
      !document.webkitFullscreenElement && 
      !document.mozFullScreenElement &&
      !document.msFullscreenElement) {
    document.querySelector('.streaming-container').classList.remove('fullscreen-mode');
  }
}


// Initialize Video Player
function initVideoPlayer() {
  const videoItems = document.querySelectorAll('.video-item');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let currentVideoIndex = 0;
  
  // Load YouTube API
  loadYouTubeAPI();
  
  // Add click events to video items
  videoItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      selectVideo(index);
    });
  });
  
  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    navigateVideos(-1);
  });
  
  nextBtn.addEventListener('click', () => {
    navigateVideos(1);
  });
  
  // Select the first video by default
  if (videoItems.length > 0) {
    selectVideo(0);
  }
}

// Load YouTube API
function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}


// YouTube API ready callback
function onYouTubeIframeAPIReady() {
  // Player will be created when a video is selected
}

// Create YouTube Player
function createYouTubePlayer(videoId) {
  const playerContainer = document.getElementById('main-video-player');
  playerContainer.innerHTML = ''; // Clear previous content
  
  youtubePlayer = new YT.Player('main-video-player', {
    height: '100%',
    width: '100%',
    videoId: videoId,
    playerVars: {
      'playsinline': 1,
      'modestbranding': 1,
      'rel': 0,
      'autoplay': 1,
      'enablejsapi': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Player ready event
function onPlayerReady(event) {
  console.log('YouTube player ready');
}

// Player state change event
function onPlayerStateChange(event) {
  // Handle player state changes if needed
}

// Select a video
function selectVideo(index) {
  const videoItems = document.querySelectorAll('.video-item');
  const videoItem = videoItems[index];
  
  if (!videoItem) return;
  
  // Update active class
  videoItems.forEach(item => item.classList.remove('active'));
  videoItem.classList.add('active');
  
  // Get video data
  const videoId = videoItem.getAttribute('data-video-id');
  const title = videoItem.getAttribute('data-title');
  const description = videoItem.getAttribute('data-desc');
  
  // Update video info
  document.getElementById('video-title').textContent = title;
  document.getElementById('video-description').textContent = description;
  
  // Create or update player
  if (youtubePlayer) {
    youtubePlayer.loadVideoById(videoId);
  } else {
    createYouTubePlayer(videoId);
  }
  
  // Update current index
  currentVideoIndex = index;
}

// Navigate videos
function navigateVideos(direction) {
  const videoItems = document.querySelectorAll('.video-item');
  let newIndex = currentVideoIndex + direction;
  
  // Wrap around if at beginning or end
  if (newIndex < 0) {
    newIndex = videoItems.length - 1;
  } else if (newIndex >= videoItems.length) {
    newIndex = 0;
  }
  
  selectVideo(newIndex);
}

// Add to DOMContentLoaded function
document.addEventListener('DOMContentLoaded', function() {
  // ... existing initialization code ...
  
  // Initialize video player
  initVideoPlayer();
  
  // ... rest of existing code ...
});

// News & Events functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize news image lightbox functionality
  initNewsLightbox();
  
  // Event registration handling
  setupEventRegistration();
  
  // News filtering by tags
  setupNewsFiltering();
});

// News image lightbox functionality
function initNewsLightbox() {
  const newsImages = document.querySelectorAll('.news-images img');
  
  newsImages.forEach(img => {
    img.addEventListener('click', function() {
      // Create lightbox overlay
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
      `;
      
      // Create lightbox image
      const lightboxImg = document.createElement('img');
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      `;
      
      // Add to DOM
      lightbox.appendChild(lightboxImg);
      document.body.appendChild(lightbox);
      
      // Close lightbox on click
      lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg) {
          document.body.removeChild(lightbox);
        }
      });
      
      // Close on ESC key
      document.addEventListener('keydown', function closeLightbox(e) {
        if (e.key === 'Escape') {
          document.body.removeChild(lightbox);
          document.removeEventListener('keydown', closeLightbox);
        }
      });
    });
  });
}

// Event registration handling
function setupEventRegistration() {
  const eventButtons = document.querySelectorAll('.event-card .btn');
  
  eventButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const eventCard = this.closest('.event-card');
      const eventTitle = eventCard.querySelector('h4').textContent;
      
      // Check if user is logged in
      if (!isUserLoggedIn()) {
        alert('Please login to register for events');
        openModal('authModal');
        return;
      }
      
      // Show registration form
      showEventRegistrationForm(eventTitle);
    });
  });
}

// Check if user is logged in (pseudo-code - implement based on your auth system)
function isUserLoggedIn() {
  // This should be replaced with your actual authentication check
  return localStorage.getItem('userLoggedIn') === 'true';
}

// Show event registration form
function showEventRegistrationForm(eventTitle) {
  // Create registration form modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'eventRegistrationModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;
  
  modal.innerHTML = `
    <div class="modal-content" style="background: white; padding: 2rem; border-radius: 12px; max-width: 500px; width: 90%;">
      <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h2 style="margin: 0; color: #2E7D32;">Register for Event</h2>
        <button class="modal-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
      </div>
      <div class="modal-body">
        <p>You are registering for: <strong>${eventTitle}</strong></p>
        <form id="eventRegistrationForm" class="form">
          <div class="form-group">
            <label for="event-email">Email Address</label>
            <input id="event-email" type="email" required value="${localStorage.getItem('userEmail') || ''}">
          </div>
          <div class="form-group">
            <label for="event-participants">Number of Participants</label>
            <input id="event-participants" type="number" min="1" value="1" required>
          </div>
          <div class="form-group">
            <label for="event-notes">Special Requirements</label>
            <textarea id="event-notes" rows="3" placeholder="Any special requirements or notes..."></textarea>
          </div>
          <button type="submit" class="btn primary full-width">Confirm Registration</button>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close modal functionality
  modal.querySelector('.modal-close').addEventListener('click', function() {
    document.body.removeChild(modal);
  });
  
  // Form submission
  modal.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
      event: eventTitle,
      email: document.getElementById('event-email').value,
      participants: document.getElementById('event-participants').value,
      notes: document.getElementById('event-notes').value
    };
    
    registerForEvent(formData);
  });
}

// Register for event (pseudo-code - implement with your backend)
function registerForEvent(formData) {
  // Show loading state
  const submitBtn = document.querySelector('#eventRegistrationForm button');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Processing...';
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    // In a real application, you would make an API call here
    alert(`Successfully registered for ${formData.event}! Confirmation sent to ${formData.email}`);
    
    // Close modal
    const modal = document.getElementById('eventRegistrationModal');
    if (modal) document.body.removeChild(modal);
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
}

// News filtering by tags
function setupNewsFiltering() {
  // This would be implemented if you have a filter UI
  // For now, we'll just add click functionality to tags
  const tags = document.querySelectorAll('.tag');
  
  tags.forEach(tag => {
    tag.addEventListener('click', function() {
      const tagText = this.textContent;
      filterNewsByTag(tagText);
    });
  });
}

function filterNewsByTag(tag) {
  // This would filter news items based on the selected tag
  // Implementation depends on your specific requirements
  alert(`Filtering news by tag: ${tag}`);
  // You would typically show/hide news items based on the tag
}

// Exam variables
let examTimer;
let examTimeLeft = 60 * 60; // 60 minutes in seconds
let examActive = false;

// Start the final exam
function startFinalExam() {
  // Convert the PDF content to a data URL
  const pdfDataUrl = generateExamPDF();
  
  // Set the PDF in the iframe
  document.getElementById('exam-pdf').src = pdfDataUrl;
  
  // Reset form
  document.getElementById('exam-form').reset();
  
  // Show the exam modal
  openModal('examModal');
  
  // Start the timer
  startExamTimer();
}

// Generate the exam PDF from the provided content
function generateExamPDF() {
  // This would normally be a server-side process
  // For demonstration, we'll create a simple HTML representation
  const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        .question { margin-bottom: 10px; }
        .options { margin-left: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>بسم الله الرحمن الرحيم</h2>
        <h3>كلية هدهد الإسلامية في درى دوا الفدرا لية الإثيوبية</h3>
        <p>الإمتحان النهائي على مادة (( أساسيات في التربية الإسلامية)) لطالبات كلية هدهد </p>
        <p>الإسلامية , للعام الدراسي: ١٤٤٧هـ , الموافق: 2025مـ , الموافق: 2018 إثيوبي</p>
      </div>
      
      <div class="section">
        <h4>فقرة (أ): إختري الإجابات الصحيحة للأسئلة الآتية:</h4>
        <div class="question">1- الإيمان الجازم الذي لايتطرق إليه شك , يسمى:</div>
        <div class="options">- العقيدة<br>- العبادة<br>- العلم<br>- الإيمان</div>
        
        <div class="question">2- معرفة العبد ربه ودينه ونبيه محمدا (ص): يسمى</div>
        <div class="options">- الأصول الثلاثة<br>- التوحيد الثلاثة<br>- الإيمان الخالص<br>- الإحسان</div>
        
        <div class="question">3- ما معنى الإسلام ؟</div>
        <div class="options">- الإستسلام لله بالتوحيد<br>- الإنقياد له بالطاعة<br>- البراءة من الشرك وأهله<br>- الكل جواب </div>
        
        <div class="question">4- إفراد الله بالخلق والملك والتدبير, هو</div>
        <div class="options">- توحيد الألوهية<br>- توحيد الأسماء والصفات<br>- توحيد العبادة<br>- توحيد الربوبية</div>
        
        <div class="question">5- تسوية غيرالله بالله فيما هو من خصائص الله , هو</div>
        <div class="options">- النفاق<br>- الشرك الأكبر<br>- الكفر<br>- الكذب</div>
        
        <div class="question">6- ما اعظم حق بعد حق الله ورسوله ؟</div>
        <div class="options">- حق الجار<br>- حق الوالدين<br>- حق الزوج<br>- حق الأولاد</div>
        
        <div class="question">7- المؤمنون المتقون المتمسكون بالكتاب والسنة , هم</div>
        <div class="options">- أولياء الشيطان<br>- أولياء السلطان<br>- أولياء الرحمن<br>- أولياء الدينار</div>
        
        <div class="question">8- ما تجاوز به العبد حده من معبود أو متبوع أو مطاع , هو</div>
        <div class="options">- الطوفان<br>- الطاعون<br>- الطاووس<br>- الطاغوت </div>
        
        <div class="question">9- كل بعيد عن الخير قريب من الشر من جن أو إنس , هو</div>
        <div class="options">- الشيطان<br>- الشعبان<br>- الشيبان<br>- الشيراز</div>
        
        <div class="question">10- الفرقة المتمسكة بمنهاج الرسول (ص) وصحابته , تسمى</div>
        <div class="options">- التيجانية<br>- الماتوريدية<br>- الفرقة الناجية<br>- الشيعة الرافضة</div>
      </div>
      
      <div class="section">
        <h4>فقرة (ب): قارني بين الكلمات التالية مع ضدها:</h4>
        <div class="question">1- الصدق</div>
        <div class="question">2- الأمانة </div>
        <div class="question">3- العفاف</div>
        <div class="question">4- الحياء</div>
        <div class="question">5- الشجاعة</div>
        <div class="question">6- الكرم </div>
        <div class="question">7- الوفاء </div>
        <div class="question">8- حسن الجوار  </div>
      </div>
      
      <div class="section">
        <h4>فقرة (ج): أجيبي بـ( صحيح ) أو ( خطأ )</h4>
        <div class="question">1- المسلم يقول قبل الطعام: بسم الله</div>
        <div class="question">2- من آداب المجلس , أن لا تجالس إلا الصالحين وأهل الخير</div>
        <div class="question">3- من آداب الإستئذان , أن تدخل بيوت الناس بغير إذن</div>
        <div class="question">4- من آداب الطالب , أن لايحترم معلمه</div>
        <div class="question">5- المعاملة تُبْدَأُ بالسلام قبل التطرق لأي شيئ آخر</div>
        <div class="question">6- الطهارة: هي رفع الحدث وإزالة الخبث</div>
        <div class="question">7- الإستجمار: هو غسل السبيلين بالماء</div>
        <div class="question">8- نواقض الوضوء عشرة</div>
        <div class="question">9- شروط صحة التيمم خمسة</div>
        <div class="question">10- الصلاة: أقوال وأفعال مبتدأة بالتكبير مختتمة بالتسليم</div>
        <div class="question">11- من أركان الصلاة , قول: سمع الله لمن حمده</div>
        <div class="question">12- من واجبات الصلاة : قراءة الفاتحة</div>
      </div>
      
      <div class="footer">
        <p>اعداد وتقديم, مدرس المادة: محمداول عبدالرحمن (أبو خالد)</p>
      </div>
    </body>
    </html>
  `;
  
  // Create a Blob from the HTML content
  const blob = new Blob([pdfContent], { type: 'text/html' });
  return URL.createObjectURL(blob);
}

// Start the exam timer
function startExamTimer() {
  examActive = true;
  examTimeLeft = 60 * 60; // 60 minutes
  
  updateExamTimerDisplay();
  
  examTimer = setInterval(function() {
    examTimeLeft--;
    
    if (examTimeLeft <= 0) {
      clearInterval(examTimer);
      timeUp();
    } else {
      updateExamTimerDisplay();
    }
  }, 1000);
}

// Update the timer display
function updateExamTimerDisplay() {
  const minutes = Math.floor(examTimeLeft / 60);
  const seconds = examTimeLeft % 60;
  
  document.getElementById('exam-time').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Change color when less than 5 minutes remain
  if (minutes < 5) {
    document.getElementById('exam-time').parentElement.style.background = '#ff9800';
  }
  
  if (minutes < 1) {
    document.getElementById('exam-time').parentElement.style.background = '#f44336';
  }
}

// Time's up function
function timeUp() {
  examActive = false;
  document.getElementById('auto-submit-btn').style.display = 'block';
  
  // Auto-submit after 10 seconds
  setTimeout(function() {
    submitExam();
  }, 10000);
}

// Close the exam
function closeExam() {
  if (examActive) {
    const confirmClose = confirm("Are you sure you want to close the exam? Your progress will be lost.");
    if (confirmClose) {
      clearInterval(examTimer);
      examActive = false;
      closeModal('examModal');
    }
  } else {
    closeModal('examModal');
  }
}

// Submit the exam
function submitExam() {
  if (!examActive && examTimeLeft > 0) return;
  
  clearInterval(examTimer);
  examActive = false;
  
  const studentName = document.getElementById('student-name').value;
  const studentId = document.getElementById('student-id').value;
  const studentPhone = document.getElementById('student-phone').value;
  const answerFile = document.getElementById('answer-file').files[0];
  
 
  
  // Validate all required fields
  if (!validateForm()) {
    alert('Please answer all required questions');
    return;
  }
  
  // Collect all answers
  const answers = collectAnswers();
  
  // Show sending message
  const submitBtn = document.querySelector('#exam-form .btn');
  const originalText = submitBtn.textContent;
  submitBtn.innerHTML = 'Sending to WhatsApp <span class="whatsapp-sending"></span>';
  submitBtn.disabled = true;
  
  // Prepare WhatsApp message
  const whatsappMessage = formatAnswersForWhatsApp(studentName, studentId, studentPhone, answers);
  
  // Send to WhatsApp
  sendToWhatsApp(whatsappMessage, answerFile)
    .then(() => {
      alert('Exam submitted successfully! Your answers have been sent to +251933322685');
      closeModal('examModal');
    })
    .catch(error => {
      console.error('Error sending to WhatsApp:', error);
      alert('There was an error submitting your exam. Please try again or contact support.');
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}

// Validate all required form fields
function validateForm() {
  const requiredSelects = document.querySelectorAll('.mcq-select[required]');
  for (let select of requiredSelects) {
    if (!select.value) return false;
  }
  
  const requiredInputs = document.querySelectorAll('.matching-item input[required]');
  for (let input of requiredInputs) {
    if (!input.value) return false;
  }
  
  const requiredRadios = document.querySelectorAll('.tf-item input[required]');
  for (let radio of requiredRadios) {
    const name = radio.name;
    if (!document.querySelector(`input[name="${name}"]:checked`)) return false;
  }
  
  return true;
}

// Collect all answers from the form
function collectAnswers() {
  const answers = {
    sectionA: {},
    sectionB: {},
    sectionC: {}
  };
  
  // Section A: Multiple Choice
  for (let i = 1; i <= 10; i++) {
    const select = document.querySelector(`select[name="q${i}"]`);
    answers.sectionA[`q${i}`] = select.value;
  }
  
  // Section B: Matching
  for (let i = 1; i <= 8; i++) {
    const input = document.querySelector(`input[name="b${i}"]`);
    answers.sectionB[`q${i}`] = input.value;
  }
  
  // Section C: True/False
  for (let i = 1; i <= 12; i++) {
    const selected = document.querySelector(`input[name="c${i}"]:checked`);
    answers.sectionC[`q${i}`] = selected ? selected.value : '';
  }
  
  return answers;
}

// Format answers for WhatsApp
function formatAnswersForWhatsApp(name, id, phone, answers) {
  let message = `*Final Exam Submission - تنبيهات على أحكام تختص بالمؤمنات*
*Student Name:* ${name}
*Student ID:* ${id}
${phone ? `*Phone:* ${phone}\n` : ''}
*Submission Time:* ${new Date().toLocaleString()}
*Time Spent:* ${formatTimeSpent(60 * 60 - examTimeLeft)}

--- SECTION A: Multiple Choice Answers ---
`;

  // Section A
  for (let i = 1; i <= 10; i++) {
    message += `${i}. ${answers.sectionA[`q${i}`] || 'Not answered'}\n`;
  }
  
  message += "\n--- SECTION B: Matching Answers ---\n";
  // Section B
  for (let i = 1; i <= 8; i++) {
    message += `${i}. ${answers.sectionB[`q${i}`] || 'Not answered'}\n`;
  }
  
  message += "\n--- SECTION C: True/False Answers ---\n";
  // Section C
  for (let i = 1; i <= 12; i++) {
    message += `${i}. ${answers.sectionC[`q${i}`] || 'Not answered'}\n`;
  }
  
  return encodeURIComponent(message);
}

// Format time spent
function formatTimeSpent(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

// Send to WhatsApp
function sendToWhatsApp(message, file) {
  return new Promise((resolve, reject) => {
    try {
      const phoneNumber = "251933322685";
      let url = `https://wa.me/${phoneNumber}?text=${message}`;
      
      // Open WhatsApp in a new tab
      window.open(url, '_blank');
      
      // If there's a file, we can't directly send it via WhatsApp Web
      // So we'll just resolve and show a message
      if (file) {
        alert('Please manually send any attached files via WhatsApp');
      }
      
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

// Add this to your existing modal functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Student database with all the provided students
const studentDatabase = {
  "HHIC07/24": { 
    name: "Neima Mahamud Adem", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
"HHIC20/24": { 
    name: "Tasnim Abdulaziz Harun", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC02/24": { 
    name: "Ayan Dawid Mumed", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC08/24": { 
    name: "Hasanat Rashad Abdo", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC27/24": { 
    name: "Lensa Muhedin Mahamad", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC09/24": { 
    name: "Aisha Mohammed Adem", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC29/24": { 
    name: "Derartu Abdi Yusuf", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC35/24": { 
    name: "Hanan Ahmedin", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC26/24": { 
    name: "Dardaa Hussen Abdurahman", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC10/24": { 
    name: "Sumeya Khalid Mohammed", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC17/24": { 
    name: "Nejat Abdulfata", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC04/24": { 
    name: "Sumeya Ahmednewal Ibrahim", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC13/24": { 
    name: "Tureeza Abbas", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC24/24": { 
    name: "Sumeya Mohammed Umer", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC25/24": { 
    name: "Hasna Jemal Mohammed", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC05/24": { 
    name: "Hangatu Jibril Adem", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC18/24": { 
    name: "Yaasmin Abbaas Ahmed", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC06/24": { 
    name: "Sirkenan Mustefa", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC22/24": { 
    name: "Sabrina Siraj Ahmed", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC14/24": { 
    name: "Bahja Remedan Abdurahman", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
   "HHIC23/24": { 
    name: "Aklima Jamal Ahmed", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC11/24": { 
    name: "Alia Awel Hussein", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC03/24": { 
    name: "Hanan Mohammed Safi", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC15/24": { 
    name: "Sumeya Amir", 
   program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  },
  "HHIC01/24": { 
    name: "Hikma Sukar Ahmed", 
    program: "Bachelor of Arts in Islamic Studies",
    grades: [
      { code: "ISL101", name: "Islamic Studies I", credits: 3, grade: "A", points: 4.0 },
      { code: "ARB101", name: "Arabic Language I", credits: 3, grade: "A-", points: 3.7 },
      { code: "QUR101", name: "Quranic Studies", credits: 2, grade: "A", points: 4.0 },
      { code: "HIS101", name: "Islamic History", credits: 3, grade: "B+", points: 3.3 },
      { code: "ETH101", name: "Islamic Ethics", credits: 2, grade: "A", points: 4.0 }
    ],
    gpa: 3.85,
    cgpa: 3.82,
    standing: "Excellent Standing"
  }
};

// Exam Results functionality
document.addEventListener('DOMContentLoaded', function() {
  const resultsForm = document.getElementById('resultsForm');
  if (resultsForm) {
    resultsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      checkResults();
    });
  }
});

function checkResults() {
  const studentId = document.getElementById('student-id').value.trim().toUpperCase();
  const studentName = document.getElementById('student-name').value.trim();
  
  // Show loading state
  showLoading();
  
  // Simulate API call with timeout
  setTimeout(() => {
    hideLoading();
    
    // Validate ID format
    const idPattern = /^HHIC\d{2}\/\d{2}$/;
    if (!idPattern.test(studentId)) {
      showError("Invalid Student ID format. Please use HHICXX/YY format.");
      return;
    }
    
    // Check if student exists in database
    if (studentDatabase[studentId]) {
      const studentData = studentDatabase[studentId];
      
      // Check if name matches (case insensitive, first name only)
      const firstName = studentName.split(' ')[0].toLowerCase();
      const dbFirstName = studentData.name.split(' ')[0].toLowerCase();
      
      if (firstName === dbFirstName) {
        displayResults({
          id: studentId,
          name: studentData.name,
          program: studentData.program,
          year: "2024/2026",
          grades: studentData.grades,
          gpa: studentData.gpa,
          cgpa: studentData.cgpa,
          standing: studentData.standing
        });
        
        // Automatically download PDF after displaying results
        setTimeout(downloadResults, 1000);
      } else {
        showError("First name doesn't match our records for this Student ID.");
      }
    } else {
      showError("No results found for the provided Student ID.");
    }
  }, 1500);
}

function displayResults(data) {
  const resultsDisplay = document.getElementById('results-display');
  const resultsError = document.getElementById('results-error');
  const gradesBody = document.getElementById('grades-body');
  
  // Hide error, show results
  resultsError.style.display = 'none';
  resultsDisplay.style.display = 'block';
  
  // Populate student info
  document.getElementById('result-id').textContent = data.id;
  document.getElementById('result-name').textContent = data.name;
  document.getElementById('result-program').textContent = data.program;
  document.getElementById('result-year').textContent = data.year;
  document.getElementById('result-gpa').textContent = data.gpa;
  document.getElementById('result-cgpa').textContent = data.cgpa;
  document.getElementById('result-standing').textContent = data.standing;
  
  // Clear previous grades
  gradesBody.innerHTML = '';
  
  // Add grades to table
  data.grades.forEach(grade => {
    const row = document.createElement('tr');
    
    // Determine grade class for styling
    let gradeClass = '';
    if (grade.grade.startsWith('A')) gradeClass = 'grade-A';
    else if (grade.grade.startsWith('B')) gradeClass = 'grade-B';
    else if (grade.grade.startsWith('C')) gradeClass = 'grade-C';
    else if (grade.grade.startsWith('D')) gradeClass = 'grade-D';
    else if (grade.grade === 'F') gradeClass = 'grade-F';
    
    row.innerHTML = `
      <td>${grade.code}</td>
      <td>${grade.name}</td>
      <td>${grade.credits}</td>
      <td class="${gradeClass}">${grade.grade}</td>
      <td>${grade.points >= 2.0 ? 'Pass' : 'Fail'}</td>
    `;
    
    gradesBody.appendChild(row);
  });
  
  // Scroll to results
  resultsDisplay.scrollIntoView({ behavior: 'smooth' });
}

function showError(message) {
  const resultsDisplay = document.getElementById('results-display');
  const resultsError = document.getElementById('results-error');
  
  resultsDisplay.style.display = 'none';
  resultsError.style.display = 'block';
  
  // You could customize the error message further if needed
  resultsError.querySelector('p').textContent = message || "No results found for the provided information.";
}

function printResults() {
  // Create a print-friendly version
  const printContent = document.getElementById('results-display').cloneNode(true);
  const printWindow = window.open('', '_blank');
  
  // Add college header and footer for printing
  const printHeader = `
    <div class="print-header">
      <img src="hudhud new logo.png" alt="Hudhud Islamic College Logo">
      <h2>HUDHUD ISLAMIC COLLEGE</h2>
      <h3>Student Academic Transcript</h3>
    </div>
  `;
  
  const printFooter = `
    <div class="print-footer">
      <p> الْعِلْمُ يُؤْتَى وَلَا يَأْتِي</p>
      <p>Date: ${new Date().toLocaleDateString()}</p>
    </div>
  `;
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Academic Transcript - Hudhud Islamic College</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #000;
          }
          .print-header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          .print-header img {
            height: 80px;
          }
          .print-footer {
            text-align: center;
            margin-top: 30px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
            font-size: 10pt;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
          .student-info, .results-summary {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
          }
          .info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 1.1em;
          }
        </style>
      </head>
      <body>
        ${printHeader}
        ${printContent.innerHTML}
        ${printFooter}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  
  // Wait for content to load then print
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

function downloadResults() {
  // Create a PDF using jsPDF and html2canvas
  const { jsPDF } = window.jspdf;
  const resultsElement = document.getElementById('results-display');
  
  // Show loading state for PDF generation
  const downloadBtn = document.querySelector('[onclick="downloadResults()"]');
  const originalText = downloadBtn.innerHTML;
  downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
  downloadBtn.disabled = true;
  
  html2canvas(resultsElement, {
    scale: 2,
    useCORS: true,
    logging: false
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Add college header text
    pdf.setFontSize(16);
    pdf.setTextColor(40, 40, 40);
    pdf.text("HUDHUD ISLAMIC COLLEGE", 105, 15, { align: 'center' });
    pdf.setFontSize(12);
    pdf.text("Student Academic Transcript", 105, 22, { align: 'center' });
    
    // Add footer with date
    const date = new Date().toLocaleDateString();
    pdf.setFontSize(10);
    pdf.text(`Date: ${date}`, 105, 285, { align: 'center' });
    
    // Generate filename with student name and ID
    const studentName = document.getElementById('result-name').textContent;
    const studentId = document.getElementById('result-id').textContent;
    const fileName = `Transcript_${studentName.replace(/\s+/g, '_')}_${studentId}.pdf`;
    
    // Download the PDF
    pdf.save(fileName);
    
    // Restore button state
    downloadBtn.innerHTML = originalText;
    downloadBtn.disabled = false;
  }).catch(error => {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
    
    // Restore button state
    downloadBtn.innerHTML = originalText;
    downloadBtn.disabled = false;
  });
}

// Utility functions for loading states
function showLoading() {
  const submitBtn = document.querySelector('#resultsForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
  }
}

function hideLoading() {
  const submitBtn = document.querySelector('#resultsForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-search"></i> Check Results';
  }
}


// Student data
const students = [
  { id: "HHIC07/24", name: "Neima mahamud Adem" },
  { id: "HHIC27/24", name: "Lensa muhedin mahamad" },
  { id: "HHIc09/24", name: "Aisha mohammed Adem" },
  { id: "HHIC29/24", name: "Derartu Abdi Yusuf" },
  { id: "HHIC35/24", name: "Hanan Ahmedin" },
  { id: "HHIC26/24", name: "Dardaa hussen abdurahman" },
  { id: "HHIC10/24", name: "sumeya khalid mohammed" },
  { id: "HHIC17/24", name: "Nejat Abdulfata Abubeker" },
  { id: "HHIC04/24", name: "Sumeya Ahmednewal Ibrahim" },
  { id: "HHIC13/24", name: "Tureeza Abbas" },
  { id: "HHIC24/24", name: "Sumeya Mohammed Umer" },
  { id: "HHIC08/24", name: "Hasanat Rashad Abdo" },
  { id: "HHIC02/24", name: "Ayan Dawid Mumed" },
  { id: "HHIC25/24", name: "Hasna Jemal Mohammed" },
  { id: "HHIC05/24", name: "Hangatu Jibril Adem" },
  { id: "HHIC18/24", name: "Yaasmin Abbaas Ahmed" },
  { id: "HHIC20/24", name: "Tasnim Abdulaziz Harun" },
  { id: "HHIC06/24", name: "Sirkenan Mustefa-" },
  { id: "HHIC22/24", name: "Sabrina Siraj Ahmed" },
  { id: "HHIC14/24", name: "Bahja Remedan Abdurahman" },
  { id: "HHIC23/24", name: "Aklima Jamal Ahmed" },
  { id: "HHIC11/24", name: "Alia Awel Hussein" },
  { id: "HHIC03/24", name: "Hanan Mohammed Sani" },
  { id: "HHIC15/24", name: "Sumeya Amir" },
  { id: "HHIC01/24", name: "Hikma Sukar Ahmed" }
];

// Attendance system
let attendanceRecords = {};

// Initialize attendance system
function initAttendanceSystem() {
  loadAttendanceRecords();
  renderAttendanceList();
  setupAttendanceEventListeners();
  updateSummary();
}

// Load attendance records from localStorage
function loadAttendanceRecords() {
  const savedRecords = localStorage.getItem('attendanceRecords');
  if (savedRecords) {
    attendanceRecords = JSON.parse(savedRecords);
  }
}

// Save attendance records to localStorage
function saveAttendanceRecords() {
  localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  updateSummary();
}

// Render attendance list
function renderAttendanceList() {
  const classSelect = document.getElementById('class-select');
  const teacherInput = document.getElementById('teacher-name');
  const dateInput = document.getElementById('attendance-date');
  const timeInput = document.getElementById('class-time');
  const attendanceList = document.getElementById('attendance-list');
  
  const selectedClass = classSelect.value;
  const selectedDate = dateInput.value;
  
  // Clear the list
  attendanceList.innerHTML = '';
  
  // Generate a unique key for this class and date
  const recordKey = `${selectedClass}-${selectedDate}`;
  
  // Get existing record or create new one
  if (!attendanceRecords[recordKey]) {
    attendanceRecords[recordKey] = {
      class: selectedClass,
      teacher: teacherInput.value,
      date: selectedDate,
      time: timeInput.value,
      students: students.map(student => ({
        id: student.id,
        name: student.name,
        present: false,
        time: '',
        feedback: ''
      }))
    };
  } else {
    // Update teacher and time if record exists
    attendanceRecords[recordKey].teacher = teacherInput.value;
    attendanceRecords[recordKey].time = timeInput.value;
  }
  
  // Update teacher and time inputs with saved values
  teacherInput.value = attendanceRecords[recordKey].teacher || '';
  timeInput.value = attendanceRecords[recordKey].time || '09:00';
  
  // Render each student
  attendanceRecords[recordKey].students.forEach((student, index) => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>
        <span class="status-badge ${student.present ? 'status-present' : 'status-absent'}">
          ${student.present ? 'Present' : 'Absent'}
        </span>
      </td>
      <td>${student.time || '-'}</td>
      <td>
        <textarea class="feedback-textarea" data-index="${index}" 
                  placeholder="Enter feedback for ${student.name}" 
                  title="Feedback for ${student.name}">${student.feedback || ''}</textarea>
      </td>
      <td>
        <div class="table-actions">
          <label class="toggle-switch">
            <input type="checkbox" ${student.present ? 'checked' : ''} data-index="${index}">
            <span class="toggle-slider"></span>
          </label>
          <button class="btn small mark-time" data-index="${index}">Mark Time</button>
        </div>
      </td>
    `;
    
    attendanceList.appendChild(row);
  });
  
  // Add event listeners to toggle switches
  document.querySelectorAll('.toggle-switch input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const index = parseInt(this.dataset.index);
      attendanceRecords[recordKey].students[index].present = this.checked;
      if (!this.checked) {
        attendanceRecords[recordKey].students[index].time = '';
      }
      saveAttendanceRecords();
      renderAttendanceList(); // Refresh to update status badges
    });
  });
  
  // Add event listeners to time buttons
  document.querySelectorAll('.mark-time').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      
      attendanceRecords[recordKey].students[index].present = true;
      attendanceRecords[recordKey].students[index].time = timeString;
      
      // Check the corresponding checkbox
      const checkbox = document.querySelector(`.toggle-switch input[data-index="${index}"]`);
      if (checkbox) checkbox.checked = true;
      
      saveAttendanceRecords();
      renderAttendanceList(); // Refresh to update time and status
    });
  });
  
  // Add event listeners to feedback textareas
  document.querySelectorAll('.feedback-textarea').forEach(textarea => {
    textarea.addEventListener('change', function() {
      const index = parseInt(this.dataset.index);
      attendanceRecords[recordKey].students[index].feedback = this.value;
      saveAttendanceRecords();
    });
    
    // Auto-resize textarea
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Trigger initial resize
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
  });
  
  updateSummary();
}

// Update summary statistics
function updateSummary() {
  const classSelect = document.getElementById('class-select');
  const dateInput = document.getElementById('attendance-date');
  const recordKey = `${classSelect.value}-${dateInput.value}`;
  
  const totalStudents = document.getElementById('total-students');
  const presentCount = document.getElementById('present-count');
  const absentCount = document.getElementById('absent-count');
  const attendancePercentage = document.getElementById('attendance-percentage');
  
  if (attendanceRecords[recordKey]) {
    const records = attendanceRecords[recordKey];
    const present = records.students.filter(s => s.present).length;
    const total = records.students.length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    totalStudents.textContent = total;
    presentCount.textContent = present;
    absentCount.textContent = total - present;
    attendancePercentage.textContent = `${percentage}%`;
  } else {
    totalStudents.textContent = '0';
    presentCount.textContent = '0';
    absentCount.textContent = '0';
    attendancePercentage.textContent = '0%';
  }
}

// Set up event listeners for attendance system
function setupAttendanceEventListeners() {
  // Class and date change listeners
  document.getElementById('class-select').addEventListener('change', renderAttendanceList);
  document.getElementById('teacher-name').addEventListener('change', renderAttendanceList);
  document.getElementById('attendance-date').addEventListener('change', renderAttendanceList);
  document.getElementById('class-time').addEventListener('change', renderAttendanceList);
  
  // Mark all buttons
  document.getElementById('mark-all-present').addEventListener('click', function() {
    const classSelect = document.getElementById('class-select');
    const dateInput = document.getElementById('attendance-date');
    const recordKey = `${classSelect.value}-${dateInput.value}`;
    
    if (attendanceRecords[recordKey]) {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      
      attendanceRecords[recordKey].students.forEach(student => {
        student.present = true;
        student.time = timeString;
      });
      
      saveAttendanceRecords();
      renderAttendanceList();
    }
  });
  
  document.getElementById('mark-all-absent').addEventListener('click', function() {
    const classSelect = document.getElementById('class-select');
    const dateInput = document.getElementById('attendance-date');
    const recordKey = `${classSelect.value}-${dateInput.value}`;
    
    if (attendanceRecords[recordKey]) {
      attendanceRecords[recordKey].students.forEach(student => {
        student.present = false;
        student.time = '';
      });
      
      saveAttendanceRecords();
      renderAttendanceList();
    }
  });
  
  // Save attendance button
  document.getElementById('save-attendance').addEventListener('click', function() {
    saveAttendanceRecords();
    showNotification('Attendance saved successfully!', 'success');
  });
  
  // Export to CSV button
  document.getElementById('export-attendance').addEventListener('click', exportAttendanceToCSV);
  
  // Print button
  document.getElementById('print-attendance').addEventListener('click', function() {
    window.print();
  });
  
  // Send via WhatsApp button
  document.getElementById('send-attendance').addEventListener('click', sendAttendanceViaWhatsApp);
}

// Export attendance to CSV
function exportAttendanceToCSV() {
  const classSelect = document.getElementById('class-select');
  const dateInput = document.getElementById('attendance-date');
  const recordKey = `${classSelect.value}-${dateInput.value}`;
  
  if (!attendanceRecords[recordKey]) {
    showNotification('No attendance data to export', 'error');
    return;
  }
  
  const records = attendanceRecords[recordKey];
  let csvContent = "Student ID,Student Name,Status,Time,Feedback,Teacher,Class,Date\n";
  
  records.students.forEach(student => {
    const feedback = student.feedback ? `"${student.feedback.replace(/"/g, '""')}"` : '';
    csvContent += `${student.id},${student.name},${student.present ? 'Present' : 'Absent'},${student.time || ''},${feedback},${records.teacher},${records.class},${records.date}\n`;
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `attendance_${records.class}_${records.date}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showNotification('Attendance exported to CSV', 'success');
}

// Send attendance via WhatsApp
function sendAttendanceViaWhatsApp() {
  const classSelect = document.getElementById('class-select');
  const dateInput = document.getElementById('attendance-date');
  const teacherInput = document.getElementById('teacher-name');
  const timeInput = document.getElementById('class-time');
  const recordKey = `${classSelect.value}-${dateInput.value}`;
  const button = document.getElementById('send-attendance');
  
  if (!attendanceRecords[recordKey]) {
    showNotification('No attendance data to send', 'error');
    return;
  }
  
  const records = attendanceRecords[recordKey];
  let message = `*Attendance Report*\n\n`;
  message += `*Class:* ${records.class}\n`;
  message += `*Teacher:* ${records.teacher || 'Not specified'}\n`;
  message += `*Date:* ${records.date}\n`;
  message += `*Time:* ${records.time || 'Not specified'}\n\n`;
  
  // Count presents and absents
  const presentCount = records.students.filter(s => s.present).length;
  const absentCount = records.students.length - presentCount;
  const percentage = records.students.length > 0 ? Math.round((presentCount / records.students.length) * 100) : 0;
  
  message += `📊 *Summary:* ${presentCount} Present, ${absentCount} Absent (${percentage}% attendance)\n\n`;
  message += "*Present Students:*\n";
  
  records.students.filter(s => s.present).forEach(student => {
    message += `✅ ${student.name} (${student.id}) ${student.time ? '- ' + student.time : ''}\n`;
    if (student.feedback) {
      message += `   Feedback: ${student.feedback}\n`;
    }
  });
  
  message += "\n*Absent Students:*\n";
  
  records.students.filter(s => !s.present).forEach(student => {
    message += `❌ ${student.name} (${student.id})\n`;
  });
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "251933322685";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Show sending state
  button.classList.add('sending');
  button.disabled = true;
  
  // Open WhatsApp after a brief delay to show the sending animation
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    
    // Remove sending state after a moment
    setTimeout(() => {
      button.classList.remove('sending');
      button.disabled = false;
      showNotification('Attendance data prepared for WhatsApp', 'success');
    }, 1000);
  }, 800);
}

// Show notification
function showNotification(message, type = 'info') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize attendance system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initAttendanceSystem();
});


// Screen Recorder Functionality
let mediaRecorder;
let recordedChunks = [];
let recordingTimer;
let recordingStartTime;
let isRecording = false;
let isPaused = false;

// Check if device is mobile
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Check if browser supports screen recording
function checkScreenRecordingSupport() {
  if (isMobileDevice()) {
    // Mobile devices have limited screen recording support
    return navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
  } else {
    // Desktop browsers
    return navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
  }
}

// Initialize screen recorder
function initScreenRecorder() {
  const startBtn = document.getElementById('start-recording');
  const pauseBtn = document.getElementById('pause-recording');
  const stopBtn = document.getElementById('stop-recording');
  const saveBtn = document.getElementById('save-recording');
  const sendEmailBtn = document.getElementById('send-email');
  const sendWhatsappBtn = document.getElementById('send-whatsapp');
  const testMicBtn = document.getElementById('test-mic');
  
  // Add mobile-specific warnings and instructions
  if (isMobileDevice()) {
    addMobileRecorderInstructions();
  }
  
  startBtn.addEventListener('click', startRecording);
  pauseBtn.addEventListener('click', togglePauseRecording);
  stopBtn.addEventListener('click', stopRecording);
  saveBtn.addEventListener('click', saveRecording);
  sendEmailBtn.addEventListener('click', sendRecordingEmail);
  sendWhatsappBtn.addEventListener('click', sendRecordingWhatsapp);
  testMicBtn.addEventListener('click', testMicrophone);
  
  // Check for screen recording support
  if (!checkScreenRecordingSupport()) {
    showRecordingNotSupported();
  }
}

// Add mobile-specific instructions
function addMobileRecorderInstructions() {
  const recorderControls = document.querySelector('.recorder-controls');
  
  const warningDiv = document.createElement('div');
  warningDiv.className = 'mobile-recorder-warning';
  warningDiv.innerHTML = `
    <h4><i class="fas fa-exclamation-triangle"></i> Mobile Device Detected</h4>
    <p>Screen recording on mobile devices has limitations. You may need to use your device's built-in screen recording feature.</p>
  `;
  
  const instructionsDiv = document.createElement('div');
  instructionsDiv.className = 'mobile-recorder-instructions';
  instructionsDiv.innerHTML = `
    <h4><i class="fas fa-info-circle"></i> How to Record on Mobile</h4>
    <ol>
      <li>Use your device's built-in screen recorder (usually in quick settings)</li>
      <li>Record your screen while using this app</li>
      <li>Return here to save or share your recording</li>
    </ol>
  `;
  
  recorderControls.parentNode.insertBefore(warningDiv, recorderControls);
  recorderControls.parentNode.insertBefore(instructionsDiv, recorderControls);
}

// Show message if screen recording is not supported
function showRecordingNotSupported() {
  const previewContainer = document.getElementById('video-preview');
  previewContainer.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #ffc107; margin-bottom: 15px;"></i>
      <h3>Screen Recording Not Supported</h3>
      <p>Your browser or device does not support screen recording.</p>
      ${isMobileDevice() ? 
        '<p>Please use your device\'s built-in screen recording feature.</p>' : 
        '<p>Please try using Chrome, Firefox, or Edge browser.</p>'
      }
    </div>
  `;
  
  document.getElementById('start-recording').disabled = true;
}

// Start screen recording
async function startRecording() {
  try {
    // Get display media (screen)
    const displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: document.getElementById('system-audio').checked
    });
    
    // Get microphone audio if selected
    let audioStream = null;
    if (document.getElementById('mic-audio').checked) {
      try {
        audioStream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
          } 
        });
      } catch (err) {
        console.error('Error accessing microphone:', err);
        showNotification('Microphone access denied. Recording without audio.', 'warning');
      }
    }
    
    // Combine streams if both are available
    let combinedStream;
    if (audioStream) {
      const audioTracks = audioStream.getAudioTracks();
      const videoTracks = displayStream.getVideoTracks();
      combinedStream = new MediaStream([...videoTracks, ...audioTracks]);
    } else {
      combinedStream = displayStream;
    }
    
    // Set up media recorder
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: 'video/webm;codecs=vp9,opus',
      videoBitsPerSecond: 2500000
    });
    
    // Event handlers
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
        updateFileSize();
      }
    };
    
    mediaRecorder.onstop = () => {
      // Create video preview
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(blob);
      
      const previewContainer = document.getElementById('video-preview');
      previewContainer.innerHTML = `
        <video controls src="${videoUrl}"></video>
        <p>Recording preview</p>
      `;
      
      // Enable action buttons
      document.getElementById('save-recording').disabled = false;
      document.getElementById('send-email').disabled = false;
      document.getElementById('send-whatsapp').disabled = false;
      
      // Stop all tracks
      displayStream.getTracks().forEach(track => track.stop());
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
    };
    
    // Start recording
    mediaRecorder.start(1000); // Collect data every second
    
    // Update UI
    isRecording = true;
    document.getElementById('start-recording').style.display = 'none';
    document.getElementById('pause-recording').disabled = false;
    document.getElementById('stop-recording').disabled = false;
    document.querySelector('.recorder-modal').classList.add('recording-active');
    
    // Start timer
    recordingStartTime = Date.now();
    startRecordingTimer();
    
    // Handle when user stops sharing screen
    displayStream.getVideoTracks()[0].onended = () => {
      stopRecording();
    };
    
    showNotification('Screen recording started successfully!', 'success');
    
  } catch (err) {
    console.error('Error starting screen recording:', err);
    showNotification('Failed to start screen recording: ' + err.message, 'error');
  }
}

// Toggle pause/resume recording
function togglePauseRecording() {
  if (!mediaRecorder) return;
  
  if (isPaused) {
    mediaRecorder.resume();
    document.getElementById('pause-recording').innerHTML = '<i class="fas fa-pause"></i> Pause';
    document.querySelector('.recorder-modal').classList.remove('recording-paused');
    isPaused = false;
    startRecordingTimer();
    showNotification('Recording resumed', 'info');
  } else {
    mediaRecorder.pause();
    document.getElementById('pause-recording').innerHTML = '<i class="fas fa-play"></i> Resume';
    document.querySelector('.recorder-modal').classList.add('recording-paused');
    isPaused = true;
    clearInterval(recordingTimer);
    showNotification('Recording paused', 'info');
  }
}

// Stop recording
function stopRecording() {
  if (!mediaRecorder || !isRecording) return;
  
  mediaRecorder.stop();
  isRecording = false;
  isPaused = false;
  
  // Update UI
  document.getElementById('start-recording').style.display = 'inline-block';
  document.getElementById('pause-recording').disabled = true;
  document.getElementById('stop-recording').disabled = true;
  document.querySelector('.recorder-modal').classList.remove('recording-active', 'recording-paused');
  
  // Stop timer
  clearInterval(recordingTimer);
  
  showNotification('Screen recording stopped', 'success');
}

// Start recording timer
function startRecordingTimer() {
  clearInterval(recordingTimer);
  
  recordingTimer = setInterval(() => {
    const elapsed = Date.now() - recordingStartTime;
    const seconds = Math.floor(elapsed / 1000) % 60;
    const minutes = Math.floor(elapsed / (1000 * 60)) % 60;
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    
    document.getElementById('recording-time').textContent = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

// Update file size display
function updateFileSize() {
  const totalSize = recordedChunks.reduce((acc, chunk) => acc + chunk.size, 0);
  const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
  document.getElementById('recording-size').textContent = `${sizeInMB} MB`;
}

// Test microphone
function testMicrophone() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const levelBar = document.querySelector('.level-bar');
      
      function updateLevel() {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        const percentage = (average / 255) * 100;
        
        levelBar.style.width = `${percentage}%`;
        
        if (percentage > 70) {
          levelBar.style.background = '#f44336';
        } else if (percentage > 30) {
          levelBar.style.background = '#ff9800';
        } else {
          levelBar.style.background = '#2E7D32';
        }
        
        if (percentage > 5) { // If there's some audio activity
          requestAnimationFrame(updateLevel);
        }
      }
      
      updateLevel();
      
      // Stop after 5 seconds
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        levelBar.style.width = '0%';
      }, 5000);
    })
    .catch(err => {
      console.error('Error testing microphone:', err);
      showNotification('Microphone access denied or not available', 'error');
    });
}

// Save recording
function saveRecording() {
  if (recordedChunks.length === 0) {
    showNotification('No recording to save', 'warning');
    return;
  }
  
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `hudhud-recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  URL.revokeObjectURL(url);
  
  showNotification('Recording saved successfully!', 'success');
}

// Send recording via email
function sendRecordingEmail() {
  if (recordedChunks.length === 0) {
    showNotification('No recording to send', 'warning');
    return;
  }
  
  const teacher = document.getElementById('teacher-select').value;
  const subject = teacher ? `Screen Recording for ${teacher}` : 'Screen Recording from Hudhud Islamic College';
  
  // For mobile devices, we can't directly attach files to email
  if (isMobileDevice()) {
    const body = `Please find the screen recording attached.\n\nTeacher: ${teacher || 'Not specified'}\nDate: ${new Date().toLocaleString()}`;
    window.location.href = `mailto:hudhudislamicschool@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showNotification('Email client opened. Please attach the recording file manually.', 'info');
  } else {
    // For desktop, we could use a more sophisticated approach with server upload
    showNotification('Email functionality requires server integration', 'info');
  }
}

// Send recording via WhatsApp
function sendRecordingWhatsapp() {
  if (recordedChunks.length === 0) {
    showNotification('No recording to send', 'warning');
    return;
  }
  
  const teacher = document.getElementById('teacher-select').value;
  const message = `Screen recording from Hudhud Islamic College${teacher ? ` for ${teacher}` : ''}. Recorded on ${new Date().toLocaleString()}.`;
  
  // For mobile devices, we can use the WhatsApp API
  if (isMobileDevice()) {
    window.open(`whatsapp://send?text=${encodeURIComponent(message)}&phone=251933322685`);
    showNotification('WhatsApp opened. Please attach the recording file manually.', 'info');
  } else {
    // For desktop, open web WhatsApp
    window.open(`https://web.whatsapp.com/send?phone=251933322685&text=${encodeURIComponent(message)}`, '_blank');
    showNotification('WhatsApp Web opened. Please attach the recording file manually.', 'info');
  }
}

// Show notification
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.recorder-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.className = `recorder-notification recorder-notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">&times;</button>
  `;
  
  // Add styles if not already added
  if (!document.querySelector('#recorder-notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'recorder-notification-styles';
    styles.textContent = `
      .recorder-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
      }
      
      .recorder-notification button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
      }
      
      .recorder-notification-info {
        background: #2196F3;
      }
      
      .recorder-notification-success {
        background: #2E7D32;
      }
      
      .recorder-notification-warning {
        background: #FF9800;
      }
      
      .recorder-notification-error {
        background: #F44336;
      }
      
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @media (max-width: 768px) {
        .recorder-notification {
          top: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(styles);
  }
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize screen recorder if the modal exists
  if (document.getElementById('recorderModal')) {
    initScreenRecorder();
  }
  
  // Open recorder modal
  document.getElementById('open-recorder').addEventListener('click', function() {
    openModal('recorderModal');
  });
});

// Existing JavaScript functions remain the same
// (openModal, closeModal, etc.)


// Testimonials Slider Functionality
function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const slidesContainer = document.querySelector('.testimonial-slides');
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Function to update slides
  function updateSlide() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlide();
  }
  
  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlide();
  }
  
  // Go to specific slide
  function goToSlide(index) {
    currentSlide = index;
    updateSlide();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });
  
  // Auto slide every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause auto slide on hover
  const slider = document.querySelector('.testimonial-slider');
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
}

// Initialize testimonials slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonialsSlider);


// Screen Recorder Functionality
class ScreenRecorder {
    constructor() {
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isRecording = false;
        this.isPaused = false;
        this.startTime = null;
        this.timerInterval = null;
        this.currentStream = null;
        
        this.initializeElements();
        this.attachEventListeners();
    }
    
    initializeElements() {
        this.elements = {
            startBtn: document.getElementById('start-recording'),
            pauseBtn: document.getElementById('pause-recording'),
            stopBtn: document.getElementById('stop-recording'),
            timer: document.getElementById('recording-timer'),
            fileSize: document.getElementById('file-size'),
            audioStatus: document.getElementById('audio-status'),
            videoPreview: document.getElementById('video-preview'),
            previewPlaceholder: document.getElementById('preview-placeholder'),
            playPreview: document.getElementById('play-preview'),
            downloadBtn: document.getElementById('download-recording'),
            shareBtn: document.getElementById('share-recording'),
            deleteBtn: document.getElementById('delete-recording'),
            recordingIndicator: document.getElementById('recording-indicator'),
            microphoneAudio: document.getElementById('microphone-audio'),
            systemAudio: document.getElementById('system-audio')
        };
    }
    
    attachEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.startRecording());
        this.elements.pauseBtn.addEventListener('click', () => this.togglePause());
        this.elements.stopBtn.addEventListener('click', () => this.stopRecording());
        this.elements.playPreview.addEventListener('click', () => this.playPreview());
        this.elements.downloadBtn.addEventListener('click', () => this.downloadRecording());
        this.elements.shareBtn.addEventListener('click', () => this.shareRecording());
        this.elements.deleteBtn.addEventListener('click', () => this.deleteRecording());
        
        // Source selection
        document.querySelectorAll('.source-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.source-option').forEach(opt => opt.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });
    }
    
    async startRecording() {
        try {
            const constraints = this.getMediaConstraints();
            this.currentStream = await navigator.mediaDevices.getDisplayMedia(constraints);
            
            // Add audio tracks if selected
            if (this.elements.microphoneAudio.checked) {
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioStream.getAudioTracks().forEach(track => {
                    this.currentStream.addTrack(track);
                });
            }
            
            this.setupMediaRecorder();
            this.startTimer();
            this.updateUIForRecording(true);
            
            // Handle when user stops recording from browser dialog
            this.currentStream.getTracks().forEach(track => {
                track.onended = () => {
                    if (this.isRecording) {
                        this.stopRecording();
                    }
                };
            });
            
        } catch (error) {
            this.handleError('Failed to start recording: ' + error.message);
        }
    }
    
    getMediaConstraints() {
        const source = document.querySelector('.source-option.active').dataset.source;
        const constraints = {
            video: {
                cursor: 'always',
                displaySurface: 'browser'
            },
            audio: this.elements.systemAudio.checked
        };
        
        switch (source) {
            case 'window':
                constraints.video.displaySurface = 'window';
                break;
            case 'tab':
                constraints.video.displaySurface = 'browser';
                break;
            case 'camera':
                constraints.video = false;
                constraints.audio = this.elements.microphoneAudio.checked;
                break;
        }
        
        return constraints;
    }
    
    setupMediaRecorder() {
        const options = {
            mimeType: 'video/webm;codecs=vp9,opus',
            videoBitsPerSecond: this.getVideoBitrate()
        };
        
        this.mediaRecorder = new MediaRecorder(this.currentStream, options);
        this.recordedChunks = [];
        
        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
                this.updateFileSize();
            }
        };
        
        this.mediaRecorder.onstop = () => {
            this.finalizeRecording();
        };
        
        this.mediaRecorder.start(1000); // Collect data every second
    }
    
    getVideoBitrate() {
        const quality = document.getElementById('video-quality').value;
        switch (quality) {
            case '1080p': return 5000000;
            case '720p': return 2500000;
            case '480p': return 1000000;
            case '360p': return 500000;
            default: return 2500000;
        }
    }
    
    togglePause() {
        if (this.isPaused) {
            this.mediaRecorder.resume();
            this.elements.pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            this.startTimer();
        } else {
            this.mediaRecorder.pause();
            this.elements.pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
            clearInterval(this.timerInterval);
        }
        this.isPaused = !this.isPaused;
    }
    
    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.currentStream.getTracks().forEach(track => track.stop());
            this.stopTimer();
            this.updateUIForRecording(false);
        }
    }
    
    finalizeRecording() {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        this.elements.videoPreview.src = url;
        this.elements.videoPreview.style.display = 'block';
        this.elements.previewPlaceholder.style.display = 'none';
        
        this.enablePreviewControls();
        this.saveRecording(blob);
    }
    
    saveRecording(blob) {
        // Save to localStorage for persistence (limited to ~5MB)
        if (blob.size < 5 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = () => {
                localStorage.setItem('lastRecording', reader.result);
            };
            reader.readAsDataURL(blob);
        }
    }
    
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            this.elements.timer.textContent = this.formatTime(elapsed);
        }, 1000);
    }
    
    stopTimer() {
        clearInterval(this.timerInterval);
    }
    
    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    updateFileSize() {
        const totalSize = this.recordedChunks.reduce((acc, chunk) => acc + chunk.size, 0);
        const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
        this.elements.fileSize.textContent = `${sizeInMB} MB`;
    }
    
    updateUIForRecording(recording) {
        this.isRecording = recording;
        document.body.classList.toggle('recording', recording);
        
        this.elements.startBtn.disabled = recording;
        this.elements.pauseBtn.disabled = !recording;
        this.elements.stopBtn.disabled = !recording;
        
        this.elements.recordingIndicator.style.display = recording ? 'flex' : 'none';
        this.elements.audioStatus.textContent = `Mic: ${this.elements.microphoneAudio.checked ? 'On' : 'Off'}`;
    }
    
    enablePreviewControls() {
        this.elements.playPreview.disabled = false;
        this.elements.downloadBtn.disabled = false;
        this.elements.shareBtn.disabled = false;
        this.elements.deleteBtn.disabled = false;
    }
    
    playPreview() {
        this.elements.videoPreview.play();
    }
    
    downloadRecording() {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    async shareRecording() {
        try {
            if (navigator.share) {
                const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
                const file = new File([blob], 'recording.webm', { type: 'video/webm' });
                
                await navigator.share({
                    files: [file],
                    title: 'Screen Recording',
                    text: 'Check out this screen recording'
                });
            } else {
                this.showNotification('Sharing not supported in this browser', 'warning');
            }
        } catch (error) {
            this.handleError('Sharing failed: ' + error.message);
        }
    }
    
    deleteRecording() {
        this.recordedChunks = [];
        this.elements.videoPreview.src = '';
        this.elements.videoPreview.style.display = 'none';
        this.elements.previewPlaceholder.style.display = 'flex';
        
        this.elements.playPreview.disabled = true;
        this.elements.downloadBtn.disabled = true;
        this.elements.shareBtn.disabled = true;
        this.elements.deleteBtn.disabled = true;
        
        localStorage.removeItem('lastRecording');
        this.showNotification('Recording deleted successfully', 'success');
    }
    
    handleError(message) {
        console.error(message);
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('.notification')) {
            const style = document.createElement('style');
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem;
                    border-radius: 5px;
                    color: white;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                }
                .notification.success { background: #4CAF50; }
                .notification.error { background: #f44336; }
                .notification.warning { background: #ff9800; }
                .notification.info { background: #2196F3; }
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }
}

// Initialize screen recorder when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if browser supports screen recording
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        const recorderSection = document.getElementById('screen-recorder');
        if (recorderSection) {
            recorderSection.innerHTML = `
                <div class="container">
                    <div class="card" style="text-align: center; padding: 2rem;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ff9800; margin-bottom: 1rem;"></i>
                        <h3>Screen Recording Not Supported</h3>
                        <p>Your browser does not support screen recording. Please use Chrome, Edge, or Firefox for this feature.</p>
                        <p><small>Make sure you're using HTTPS connection</small></p>
                    </div>
                </div>
            `;
        }
        return;
    }
    
    // Initialize screen recorder
    window.screenRecorder = new ScreenRecorder();
});

// Mobile-specific enhancements
function setupMobileRecorder() {
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Adjust UI for mobile
        const recorderContainer = document.querySelector('.recorder-container');
        if (recorderContainer) {
            recorderContainer.style.padding = '1rem';
        }
        
        // Simplify controls for mobile
        const sourceOptions = document.querySelector('.source-options');
        if (sourceOptions) {
            sourceOptions.style.gridTemplateColumns = '1fr';
        }
    }
}

// Call mobile setup
document.addEventListener('DOMContentLoaded', setupMobileRecorder);