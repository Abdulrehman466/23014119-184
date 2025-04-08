document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        // Set date and time constraints
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');
        
        // Set minimum date to today
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        dateInput.setAttribute('min', formattedDate);
        
        // Set maximum date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        const formattedMaxDate = maxDate.toISOString().split('T')[0];
        dateInput.setAttribute('max', formattedMaxDate);
        
        // Set business hours (8 AM to 10 PM)
        timeInput.setAttribute('min', '08:00');
        timeInput.setAttribute('max', '22:00');
        
        // Form validation
        reservationForm.addEventListener('submit', function(e) {
            // Prevent default form submission and propagation
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = dateInput.value;
            const time = timeInput.value;
            const guests = document.getElementById('guests').value;
            const specialRequests = document.getElementById('special-requests').value;
            
            // Validation checks
            let isValid = true;
            let errorMessages = [];
            
            if (!name.trim()) {
                errorMessages.push('Name is required');
                isValid = false;
            }
            
            if (!email.trim()) {
                errorMessages.push('Email is required');
                isValid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                errorMessages.push('Please enter a valid email address');
                isValid = false;
            }
            
            if (!phone.trim()) {
                errorMessages.push('Phone number is required');
                isValid = false;
            } else if (!/^[0-9+\-() ]{10,15}$/.test(phone)) {
                errorMessages.push('Please enter a valid phone number');
                isValid = false;
            }
            
            if (!date) {
                errorMessages.push('Date is required');
                isValid = false;
            }
            
            if (!time) {
                errorMessages.push('Time is required');
                isValid = false;
            } else {
                // Validate time within business hours
                const selectedTime = time.split(':');
                const hour = parseInt(selectedTime[0]);
                if (hour < 8 || hour >= 22) {
                    errorMessages.push('Reservation time must be between 8:00 AM and 10:00 PM');
                    isValid = false;
                }
            }
            
            if (!guests || guests === "") {
                errorMessages.push('Number of guests is required');
                isValid = false;
            }
            
            // Check if reservation is at least 2 hours in advance
            const now = new Date();
            const reservationDateTime = new Date(`${date}T${time}`);
            const hoursDifference = (reservationDateTime - now) / (1000 * 60 * 60);
            
            if (hoursDifference < 2) {
                errorMessages.push('Reservations must be made at least 2 hours in advance');
                isValid = false;
            }
            
            // Handle validation results
            let errorContainer = document.getElementById('reservation-errors');
            if (!errorContainer) {
                errorContainer = document.createElement('div');
                errorContainer.id = 'reservation-errors';
                errorContainer.className = 'bg-red-900 bg-opacity-30 border border-red-500 text-red-100 p-4 rounded-lg my-4';
                reservationForm.insertBefore(errorContainer, reservationForm.querySelector('button'));
            }
            
            if (!isValid) {
                // Display errors
                errorContainer.innerHTML = `
                    <h4 class="font-bold mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>Please fix the following:</h4>
                    <ul class="list-disc pl-5">
                        ${errorMessages.map(msg => `<li>${msg}</li>`).join('')}
                    </ul>
                `;
                errorContainer.style.display = 'block';
                
                // Scroll to errors
                errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                // Success handling
                if (errorContainer) errorContainer.style.display = 'none';
                
                // Create confirmation
                const confirmationOverlay = document.createElement('div');
                confirmationOverlay.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
                
                // Format date nicely
                const reservationDate = new Date(date);
                const formattedReservationDate = reservationDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                // Format time nicely
                const timeComponents = time.split(':');
                const hours = parseInt(timeComponents[0]);
                const minutes = timeComponents[1];
                const period = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = hours % 12 || 12;
                const formattedTime = `${formattedHours}:${minutes} ${period}`;
                
                confirmationOverlay.innerHTML = `
                    <div class="bg-form p-8 rounded-xl text-white max-w-lg w-full">
                        <div class="flex justify-between items-start mb-6">
                            <h3 class="text-2xl font-bold text-gold">Reservation Confirmed!</h3>
                            <i class="fas fa-check-circle text-green-500 text-3xl"></i>
                        </div>
                        
                        <div class="border-t border-b border-gray-700 py-4 my-4">
                            <div class="grid grid-cols-3 gap-4 mb-3">
                                <div>
                                    <p class="text-gray-400 text-sm">Date</p>
                                    <p class="font-medium">${formattedReservationDate}</p>
                                </div>
                                <div>
                                    <p class="text-gray-400 text-sm">Time</p>
                                    <p class="font-medium">${formattedTime}</p>
                                </div>
                                <div>
                                    <p class="text-gray-400 text-sm">Party Size</p>
                                    <p class="font-medium">${guests} ${parseInt(guests) === 1 ? 'Guest' : 'Guests'}</p>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <p class="text-gray-400 text-sm">Reserved for</p>
                                <p class="font-medium">${name}</p>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-gray-400 text-sm">Email</p>
                                    <p class="font-medium">${email}</p>
                                </div>
                                <div>
                                    <p class="text-gray-400 text-sm">Phone</p>
                                    <p class="font-medium">${phone}</p>
                                </div>
                            </div>
                            
                            ${specialRequests ? `
                                <div class="mt-3">
                                    <p class="text-gray-400 text-sm">Special Requests</p>
                                    <p class="italic text-gray-300">"${specialRequests}"</p>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="text-center mt-6">
                            <p class="mb-4">We've sent the details to your email.</p>
                            <div class="flex gap-4 justify-center">
                                <button id="close-confirmation" class="bg-gradient-to-r from-yellow-600 to-amber-800 text-white px-6 py-3 rounded-lg font-bold">
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(confirmationOverlay);
                
                // Handle close button
                document.getElementById('close-confirmation').addEventListener('click', function() {
                    document.body.removeChild(confirmationOverlay);
                    // Optional: Reset the form if you want
                    // reservationForm.reset();
                });
            }
        });

        // Add event listener for guests selection to show table type recommendation
        const guestsSelect = document.getElementById('guests');
        if (guestsSelect) {
            guestsSelect.addEventListener('change', function() {
                const guests = parseInt(this.value);
                let tableRecommendation = '';
                
                const existingRecommendation = document.getElementById('table-recommendation');
                if (existingRecommendation) {
                    existingRecommendation.remove();
                }
                
                if (!isNaN(guests)) {
                    if (guests === 1 || guests === 2) {
                        tableRecommendation = 'Small intimate table for two by the window';
                    } else if (guests >= 3 && guests <= 4) {
                        tableRecommendation = 'Comfortable square table in the main area';
                    } else if (guests >= 5 && guests <= 6) {
                        tableRecommendation = 'Larger round table in the corner area';
                    } else {
                        tableRecommendation = 'Our large community table or combined tables';
                    }
                    
                    const recommendationDiv = document.createElement('div');
                    recommendationDiv.id = 'table-recommendation';
                    recommendationDiv.className = 'mt-2 p-3 bg-[#2d2d3f] rounded-lg border border-gold border-opacity-30';
                    recommendationDiv.innerHTML = `
                        <p class="flex items-center text-sm">
                            <i class="fas fa-chair text-gold mr-2"></i>
                            <span>Recommended: ${tableRecommendation}</span>
                        </p>
                    `;
                    
                    const guestsFormGroup = guestsSelect.closest('.form-group');
                    if (guestsFormGroup) {
                        guestsFormGroup.appendChild(recommendationDiv);
                    }
                }
            });
        }
    }
});