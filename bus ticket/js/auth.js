document.addEventListener('DOMContentLoaded', function() {
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitButton.disabled = true;
            
            // Simulate login API call
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Check for demo credentials
                if ((email === 'admin@swiftbus.com' && password === 'admin123') || 
                    (email === 'user@example.com' && password === 'password123')) {
                    alert('Login successful! Redirecting to dashboard...');
                    document.getElementById('loginModal').style.display = 'none';
                    
                    // Update UI for logged in user
                    const authButtons = document.querySelector('.auth-buttons');
                    if (authButtons) {
                        authButtons.innerHTML = `
                            <div class="user-avatar">
                                <img src="images/user-avatar.jpg" alt="User">
                            </div>
                            <div class="user-dropdown">
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        `;
                        
                        // Add dropdown functionality
                        const userDropdown = document.querySelector('.user-dropdown');
                        userDropdown.addEventListener('click', function() {
                            // In a real app, show a dropdown menu with options
                            if (confirm('Do you want to logout?')) {
                                authButtons.innerHTML = `
                                    <button id="loginBtn" class="btn btn-outline">Login</button>
                                    <button id="signupBtn" class="btn btn-primary">Sign Up</button>
                                `;
                                
                                // Re-attach event listeners to new buttons
                                document.getElementById('loginBtn').addEventListener('click', () => 
                                    document.getElementById('loginModal').style.display = 'block');
                                document.getElementById('signupBtn').addEventListener('click', () => 
                                    document.getElementById('signupModal').style.display = 'block');
                            }
                        });
                    }
                } else {
                    alert('Invalid email or password');
                }
            }, 1500);
        });
    }
    
    // Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            if (!name || !email || !phone || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            if (!document.getElementById('agreeTerms').checked) {
                alert('Please agree to the terms and conditions');
                return;
            }
            
            // Validate email format
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Validate phone number (Indian format)
            if (!/^[6-9]\d{9}$/.test(phone)) {
                alert('Please enter a valid 10-digit Indian phone number');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            submitButton.disabled = true;
            
            // Simulate signup API call
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                alert('Account created successfully! Please login.');
                switchAuthModal('loginModal');
                
                // Clear form
                this.reset();
            }, 1500);
        });
    }
    
    // Social Login Buttons
    document.querySelectorAll('.btn-social.google').forEach(button => {
        button.addEventListener('click', function() {
            // Simulate Google login
            console.log('Google login clicked');
            // In a real app, you would implement Google OAuth here
            alert('Google login would be implemented here');
        });
    });
    
    document.querySelectorAll('.btn-social.facebook').forEach(button => {
        button.addEventListener('click', function() {
            // Simulate Facebook login
            console.log('Facebook login clicked');
            // In a real app, you would implement Facebook OAuth here
            alert('Facebook login would be implemented here');
        });
    });
    
    function switchAuthModal(modalToShow) {
        const modals = ['loginModal', 'signupModal', 'guestCheckoutModal'];
        
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modalId === modalToShow) {
                modal.style.display = 'block';
            } else {
                modal.style.display = 'none';
            }
        });
    }
});