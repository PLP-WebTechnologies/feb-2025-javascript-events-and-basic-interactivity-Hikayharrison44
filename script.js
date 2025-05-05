// Wait for the DOM to fully load before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ===============================================
    // 1. EVENT HANDLING - BUTTON CLICKS
    // ===============================================
    
    // Color changing button
    const colorButton = document.getElementById('color-changer');
    const colors = ['#6a5acd', '#e91e63', '#4caf50', '#ff9800', '#2196f3'];
    let colorIndex = 0;
    
    colorButton.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
    });
    
    // Text changing button
    const textButton = document.getElementById('text-changer');
    const texts = [
        'Change My Text', 
        'Click Me Again!', 
        'Getting Exciting!', 
        'Almost There!', 
        'Back to Start!'
    ];
    let textIndex = 0;
    
    textButton.addEventListener('click', function() {
        textIndex = (textIndex + 1) % texts.length;
        this.textContent = texts[textIndex];
    });
    
    // Secret button (double-click detection)
    const secretButton = document.getElementById('secret-button');
    const secretMessage = document.getElementById('secret-message');
    
    secretButton.addEventListener('dblclick', function() {
        // Show secret message
        secretMessage.classList.remove('hidden');
        
        // Hide it after animation completes
        setTimeout(() => {
            secretMessage.classList.add('hidden');
        }, 3000);
    });
    
    // ===============================================
    // 2. HOVER EFFECTS
    // ===============================================
    const hoverElement = document.querySelector('.hover-me');
    
    hoverElement.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#e91e63';
        this.style.color = 'white';
        this.textContent = 'Magic happening!';
    });
    
    hoverElement.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.color = 'var(--dark-color)';
        this.textContent = 'Hover over me for a surprise!';
    });
    
    // ===============================================
    // 3. KEYPRESS DETECTION
    // ===============================================
    const keyDisplay = document.getElementById('key-display');
    
    document.addEventListener('keydown', function(event) {
        keyDisplay.textContent = event.key;
        
        // Add a temporary highlight effect
        keyDisplay.style.fontSize = '1.2rem';
        keyDisplay.style.color = '#e91e63';
        
        setTimeout(() => {
            keyDisplay.style.fontSize = '1rem';
            keyDisplay.style.color = 'var(--accent-color)';
        }, 500);
    });
    
    // ===============================================
    // 4. IMAGE GALLERY / SLIDESHOW
    // ===============================================
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const images = document.querySelectorAll('.gallery-image');
    const dotsContainer = document.getElementById('dots');
    let currentImageIndex = 0;
    
    // Create dots for each image
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        // Add click event to each dot
        dot.addEventListener('click', () => {
            showImage(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    // Get all dots
    const dots = document.querySelectorAll('.dot');
    
    // Function to show a specific image
    function showImage(index) {
        // Hide all images
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the selected image
        images[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current index
        currentImageIndex = index;
    }
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        let newIndex = currentImageIndex - 1;
        if (newIndex < 0) newIndex = images.length - 1;
        showImage(newIndex);
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        let newIndex = (currentImageIndex + 1) % images.length;
        showImage(newIndex);
    });
    
    // Auto-advance slideshow every 5 seconds
    setInterval(() => {
        let newIndex = (currentImageIndex + 1) % images.length;
        showImage(newIndex);
    }, 5000);
    
    // ===============================================
    // 5. TABS / ACCORDION CONTENT
    // ===============================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ===============================================
    // 6. FORM VALIDATION
    // ===============================================
    const form = document.getElementById('magic-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const formMessage = document.getElementById('form-message');
    
    // Validation message elements
    const usernameValidation = document.getElementById('username-validation');
    const emailValidation = document.getElementById('email-validation');
    const passwordValidation = document.getElementById('password-validation');
    const confirmValidation = document.getElementById('confirm-validation');
    
    // Password strength elements
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    // Username validation
    username.addEventListener('input', () => {
        if (username.value.length < 3) {
            usernameValidation.textContent = 'Username must be at least 3 characters long';
            usernameValidation.className = 'validation-message error';
            username.classList.remove('valid');
            username.classList.add('invalid');
        } else {
            usernameValidation.textContent = 'Username looks good!';
            usernameValidation.className = 'validation-message success';
            username.classList.remove('invalid');
            username.classList.add('valid');
        }
    });
    
    // Email validation
    email.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email.value)) {
            emailValidation.textContent = 'Please enter a valid email address';
            emailValidation.className = 'validation-message error';
            email.classList.remove('valid');
            email.classList.add('invalid');
        } else {
            emailValidation.textContent = 'Email looks good!';
            emailValidation.className = 'validation-message success';
            email.classList.remove('invalid');
            email.classList.add('valid');
        }
    });
    
    // Password validation and strength
    password.addEventListener('input', () => {
        const value = password.value;
        let strength = 0;
        let feedback = '';
        
        // Check password length
        if (value.length < 8) {
            feedback = 'Password must be at least 8 characters long';
            passwordValidation.className = 'validation-message error';
            password.classList.remove('valid');
            password.classList.add('invalid');
        } else {
            strength += 1;
            
            // Check for mixed case
            if (/[a-z]/.test(value) && /[A-Z]/.test(value)) {
                strength += 1;
            }
            
            // Check for numbers
            if (/\d/.test(value)) {
                strength += 1;
            }
            
            // Check for special characters
            if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
                strength += 1;
            }
            
            // Set feedback based on strength
            if (strength <= 2) {
                feedback = 'Password is weak';
                passwordValidation.className = 'validation-message error';
                password.classList.remove('valid');
                password.classList.add('invalid');
            } else if (strength === 3) {
                feedback = 'Password is medium';
                passwordValidation.className = 'validation-message success';
                password.classList.remove('invalid');
                password.classList.add('valid');
            } else {
                feedback = 'Password is strong';
                passwordValidation.className = 'validation-message success';
                password.classList.remove('invalid');
                password.classList.add('valid');
            }
        }
        
        // Update password validation message
        passwordValidation.textContent = feedback;
        
        // Update strength bar
        const percentage = (strength / 4) * 100;
        strengthBar.style.width = `${percentage}%`;
        
        // Set color based on strength
        if (strength <= 2) {
            strengthBar.style.backgroundColor = 'var(--error-color)';
        } else if (strength === 3) {
            strengthBar.style.backgroundColor = 'var(--warning-color)';
        } else {
            strengthBar.style.backgroundColor = 'var(--success-color)';
        }
        
        // Update strength text
        strengthText.textContent = `Password strength: ${feedback}`;
        
        // Check password confirmation if it has a value
        if (confirmPassword.value) {
            checkPasswordMatch();
        }
    });
    
    // Confirm password validation
    confirmPassword.addEventListener('input', checkPasswordMatch);
    
    function checkPasswordMatch() {
        if (password.value !== confirmPassword.value) {
            confirmValidation.textContent = 'Passwords do not match';
            confirmValidation.className = 'validation-message error';
            confirmPassword.classList.remove('valid');
            confirmPassword.classList.add('invalid');
        } else {
            confirmValidation.textContent = 'Passwords match!';
            confirmValidation.className = 'validation-message success';
            confirmPassword.classList.remove('invalid');
            confirmPassword.classList.add('valid');
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check all validations
        let isValid = true;
        
        // Check username
        if (username.value.length < 3) {
            isValid = false;
        }
        
        // Check email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            isValid = false;
        }
        
        // Check password
        if (password.value.length < 8) {
            isValid = false;
        }
        
        // Check password confirmation
        if (password.value !== confirmPassword.value) {
            isValid = false;
        }
        
        // Display appropriate message
        if (isValid) {
            formMessage.textContent = 'Registration successful! Welcome to the Magic Kingdom!';
            formMessage.className = 'success';
            formMessage.classList.remove('hidden');
            
            // Reset form after successful submission
            setTimeout(() => {
                form.reset();
                formMessage.classList.add('hidden');
                
                // Reset validation UI
                document.querySelectorAll('input').forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
                
                document.querySelectorAll('.validation-message').forEach(msg => {
                    msg.textContent = '';
                });
                
                strengthBar.style.width = '0%';
                strengthText.textContent = 'Password strength';
                
            }, 3000);
        } else {
            formMessage.textContent = 'Please fix the errors in the form and try again.';
            formMessage.className = 'error';
            formMessage.classList.remove('hidden');
            
            // Hide error message after a few seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 3000);
        }
    });
    
    // Bonus: Secret long-press feature
    let pressTimer;
    secretButton.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            this.style.transform = 'scale(1.2)';
            this.style.backgroundColor = 'var(--accent-color)';
            this.textContent = 'Magic Activated!';
            
            // Show secret message
            secretMessage.classList.remove('hidden');
            secretMessage.textContent = '🔮 You found the long-press secret! 🔮';
            
            // Hide it after animation completes
            setTimeout(() => {
                secretMessage.classList.add('hidden');
                this.style.transform = '';
                this.style.backgroundColor = '';
                this.textContent = 'Double-Click Me';
            }, 3000);
        }, 1000); // 1 second hold
    });
    
    secretButton.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretButton.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
});