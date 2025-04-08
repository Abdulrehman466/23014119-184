

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    if (loginForm) {
        // Handle form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.querySelector('input[type="text"]').value;
            const password = document.querySelector('input[type="password"]').value;
            
            // Basic validation
            let isValid = true;
            let errorMessage = '';
            
            if (!username.trim()) {
                errorMessage = 'Username is required';
                isValid = false;
            } else if (!password) {
                errorMessage = 'Password is required';
                isValid = false;
            } else if (password.length < 6) {
                errorMessage = 'Password must be at least 6 characters';
                isValid = false;
            }
            
            // Check if error element exists, if not create it
            let errorElement = document.getElementById('login-error');
            if (!errorElement) {
                errorElement = document.createElement('p');
                errorElement.id = 'login-error';
                errorElement.className = 'text-red-500 text-sm mt-2';
                loginForm.appendChild(errorElement);
            }
            
            if (!isValid) {
                // Display error
                errorElement.textContent = errorMessage;
                // Shake the form to indicate error
                loginForm.parentElement.classList.add('shake-animation');
                setTimeout(() => {
                    loginForm.parentElement.classList.remove('shake-animation');
                }, 500);
            } else {
                // Success - normally this would connect to backend
                errorElement.textContent = '';
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40';
                successMsg.innerHTML = `
                    <div class="bg-[#2b2b3a] p-8 rounded-lg text-center transform transition-all">
                        <i class="fas fa-check-circle text-green-500 text-5xl mb-4"></i>
                        <h3 class="text-xl font-bold text-white mb-2">Login Successful!</h3>
                        <p class="text-gray-300 mb-4">Welcome back, ${username}!</p>
                        <a href="index.html" class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-lg font-bold">
                            Continue to Homepage
                        </a>
                    </div>
                `;
                document.body.appendChild(successMsg);
                
                // For demo purposes - redirect after 3 seconds
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
            }
        });
        
        // Add shake animation style
        const style = document.createElement('style');
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
        
        // Add input focus effects
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            // Create floating labels
            const inputParent = document.createElement('div');
            inputParent.className = 'relative';
            
            // Get the placeholder text
            const placeholderText = input.getAttribute('placeholder');
            
            // Create label element
            const label = document.createElement('label');
            label.textContent = placeholderText;
            label.className = 'absolute left-3 text-gray-500 transition-all duration-300 pointer-events-none';
            
            // Set initial position
            label.style.top = '50%';
            label.style.transform = 'translateY(-50%)';
            
            // Replace input in DOM
            input.parentNode.insertBefore(inputParent, input);
            inputParent.appendChild(input);
            inputParent.appendChild(label);
            
            // Event listeners for focus and blur
            input.addEventListener('focus', () => {
                label.style.top = '0';
                label.style.transform = 'translateY(-50%) scale(0.8)';
                label.style.color = '#d2911c';
                label.style.backgroundColor = '#2b2b3a';
                label.style.padding = '0 5px';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.top = '50%';
                    label.style.transform = 'translateY(-50%)';
                    label.style.color = '#9ca3af';
                }
            });
            
            // Keep label up if input has value
            if (input.value) {
                label.style.top = '0';
                label.style.transform = 'translateY(-50%) scale(0.8)';
                label.style.backgroundColor = '#2b2b3a';
                label.style.padding = '0 5px';
            }
        });
    }
});