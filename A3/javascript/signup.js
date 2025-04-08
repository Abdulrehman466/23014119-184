document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('form');
    
    if (signupForm) {
        // Add password strength meter
        const passwordInput = signupForm.querySelector('input[type="password"]');
        const confirmPasswordInput = signupForm.querySelectorAll('input[type="password"]')[1];
        
        // Create strength meter elements
        const strengthMeter = document.createElement('div');
        strengthMeter.className = 'w-full bg-gray-700 h-1 mt-1 mb-3 rounded overflow-hidden';
        
        const strengthBar = document.createElement('div');
        strengthBar.className = 'h-full transition-all duration-300';
        strengthMeter.appendChild(strengthBar);
        
        const strengthText = document.createElement('div');
        strengthText.className = 'text-xs text-left mb-3';
        
        // Insert after password input
        passwordInput.parentNode.insertBefore(strengthMeter, passwordInput.nextSibling);
        passwordInput.parentNode.insertBefore(strengthText, strengthMeter.nextSibling);
        
        // Password strength checker
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let feedback = [];
            
            // Length check
            if (password.length >= 8) {
                strength += 25;
            } else {
                feedback.push('At least 8 characters');
            }
            
            // Uppercase check
            if (/[A-Z]/.test(password)) {
                strength += 25;
            } else {
                feedback.push('At least one uppercase letter');
            }
            
            // Lowercase check
            if (/[a-z]/.test(password)) {
                strength += 25;
            } else {
                feedback.push('At least one lowercase letter');
            }
            
            // Number/special char check
            if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
                strength += 25;
            } else {
                feedback.push('At least one number or special character');
            }
            
            // Update strength bar
            strengthBar.style.width = strength + '%';
            
            // Update color based on strength
            if (strength < 50) {
                strengthBar.className = 'h-full bg-red-500';
                strengthText.textContent = 'Weak password';
                strengthText.className = 'text-xs text-red-500 text-left mb-3';
            } else if (strength < 75) {
                strengthBar.className = 'h-full bg-yellow-500';
                strengthText.textContent = 'Medium password';
                strengthText.className = 'text-xs text-yellow-500 text-left mb-3';
            } else {
                strengthBar.className = 'h-full bg-green-500';
                strengthText.textContent = 'Strong password';
                strengthText.className = 'text-xs text-green-500 text-left mb-3';
            }
            
            // Add feedback if needed
            if (feedback.length > 0 && password.length > 0) {
                strengthText.textContent += ': ' + feedback.join(', ');
            }
        });
        
        // Handle form submission
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = signupForm.querySelector('input[type="text"]').value;
            const email = signupForm.querySelector('input[type="email"]').value;
            const username = signupForm.querySelectorAll('input[type="text"]')[1].value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // Form validation
            let isValid = true;
            let errorMessages = [];
            
            if (!fullName.trim()) {
                errorMessages.push('Full name is required');
                isValid = false;
            }
            
            if (!email.trim()) {
                errorMessages.push('Email is required');
                isValid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                errorMessages.push('Please enter a valid email address');
                isValid = false;
            }
            
            if (!username.trim()) {
                errorMessages.push('Username is required');
                isValid = false;
            } else if (username.length < 4) {
                errorMessages.push('Username must be at least 4 characters');
                isValid = false;
            }
            
            if (!password) {
                errorMessages.push('Password is required');
                isValid = false;
            } else if (password.length < 8) {
                errorMessages.push('Password must be at least 8 characters');
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                errorMessages.push('Passwords do not match');
                isValid = false;
            }
            
            // Handle validation results
            let errorContainer = document.getElementById('signup-errors');
            if (!errorContainer) {
                errorContainer = document.createElement('div');
                errorContainer.id = 'signup-errors';
                errorContainer.className = 'text-red-500 text-sm mt-3 mb-3';
                signupForm.insertBefore(errorContainer, signupForm.querySelector('button'));
            }
            
            if (!isValid) {
                // Display errors
                errorContainer.innerHTML = errorMessages.map(msg => `<p>• ${msg}</p>`).join('');
                
                // Shake animation for feedback
                signupForm.parentElement.classList.add('shake-animation');
                setTimeout(() => {
                    signupForm.parentElement.classList.remove('shake-animation');
                }, 500);
            } else {
                // Success handling - normally would connect to backend
                errorContainer.innerHTML = '';
                
                // Show success message overlay
                const successOverlay = document.createElement('div');
                successOverlay.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                successOverlay.innerHTML = `
                    <div class="bg-form p-8 rounded-xl text-center max-w-md">
                        <i class="fas fa-check-circle text-green-500 text-5xl mb-4"></i>
                        <h3 class="text-2xl font-bold text-white mb-2">Account Created!</h3>
                        <p class="text-gray-300 mb-6">Welcome to our Coffee Shop, ${fullName}!</p>
                        <div class="flex gap-4">
                            <a href="login.html" class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-lg font-bold flex-1">Login Now</a>
                            <a href="index.html" class="bg-gray-700 text-white px-6 py-3 rounded-lg font-bold flex-1">Home</a>
                        </div>
                    </div>
                `;
                document.body.appendChild(successOverlay);
                
                // Clear form
                signupForm.reset();
            }
        });
        
        // Add shake animation style if not already added
        if (!document.getElementById('shake-animation-style')) {
            const style = document.createElement('style');
            style.id = 'shake-animation-style';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .shake-animation {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
            `;
            document.head.appendChild(style);
        }
    }
});