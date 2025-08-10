document.addEventListener('DOMContentLoaded', function() {
    // Initialize autocomplete for city inputs
    const cities = [
        'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
        'Kolkata', 'Pune', 'Jaipur', 'Ahmedabad', 'Surat'
    ];
    
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    // Create datalist for autocomplete
    const cityDataList = document.createElement('datalist');
    cityDataList.id = 'citiesList';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        cityDataList.appendChild(option);
    });
    document.body.appendChild(cityDataList);
    
    // Assign datalist to inputs
    fromInput.setAttribute('list', 'citiesList');
    toInput.setAttribute('list', 'citiesList');
    
    // Store selected booking data
    let currentBooking = {
        bus: null,
        seats: [],
        paymentMethod: '',
        user: null
    };
    
    // Search form validation
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const from = fromInput.value.trim();
        const to = toInput.value.trim();
        const date = document.getElementById('date').value;
        
        if (!from || !to || !date) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        if (from.toLowerCase() === to.toLowerCase()) {
            showAlert('Departure and arrival cities cannot be the same', 'error');
            return;
        }
        
        // Show loading state
        toggleLoading(true, 'Searching for buses...');
        
        // Simulate API call
        setTimeout(() => {
            toggleLoading(false);
            searchBuses(from, to, date);
        }, 1000);
    });
    
    // Search buses function
    function searchBuses(from, to, date) {
        // In a real app, this would be an API call
        const availableBusesSection = document.getElementById('availableBuses');
        const busResults = document.getElementById('busResults');
        
        // Filter sample buses based on route (simplified for demo)
        const filteredBuses = window.sampleBuses.filter(bus => 
            bus.from.toLowerCase().includes(from.toLowerCase()) && 
            bus.to.toLowerCase().includes(to.toLowerCase())
        );
        
        if (filteredBuses.length === 0) {
            busResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-bus-slash"></i>
                    <h3>No buses found</h3>
                    <p>We couldn't find any buses for your selected route and date.</p>
                    <button class="btn btn-outline" id="modifySearch">Modify Search</button>
                </div>
            `;
            
            document.getElementById('modifySearch').addEventListener('click', function() {
                availableBusesSection.style.display = 'none';
                searchForm.scrollIntoView({ behavior: 'smooth' });
            });
        } else {
            displayBuses(filteredBuses);
        }
        
        availableBusesSection.style.display = 'block';
        availableBusesSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Display buses in results
    function displayBuses(buses) {
        const busResults = document.getElementById('busResults');
        busResults.innerHTML = '';
        
        buses.forEach(bus => {
            const busCard = document.createElement('div');
            busCard.className = 'bus-card';
            busCard.innerHTML = `
                <div class="bus-header">
                    <div class="bus-name">${bus.name}</div>
                    <div class="bus-type">${bus.type}</div>
                </div>
                <div class="bus-details">
                    <div class="departure-info">
                        <div class="time">${bus.departureTime}</div>
                        <div class="place">${bus.from}</div>
                    </div>
                    <div class="duration-info">
                        <div class="duration">${bus.duration}</div>
                        <div class="duration-line"></div>
                    </div>
                    <div class="arrival-info">
                        <div class="time">${bus.arrivalTime}</div>
                        <div class="place">${bus.to}</div>
                    </div>
                </div>
                <div class="bus-amenities">
                    ${bus.amenities.map(amenity => `
                        <span class="amenity-badge" title="${amenity}">
                            <i class="fas ${getAmenityIcon(amenity)}"></i>
                        </span>
                    `).join('')}
                </div>
                <div class="bus-footer">
                    <div class="price-info">
                        <div class="price">₹${bus.price}</div>
                        <div class="per-seat">per seat</div>
                    </div>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        ${bus.rating}
                    </div>
                    <button class="view-seats-btn" data-bus-id="${bus.id}">
                        View Seats <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            `;
            busResults.appendChild(busCard);
        });
        
        // Add event listeners to view seats buttons
        document.querySelectorAll('.view-seats-btn').forEach(button => {
            button.addEventListener('click', function() {
                const busId = parseInt(this.getAttribute('data-bus-id'));
                const selectedBus = window.sampleBuses.find(bus => bus.id === busId);
                showBusDetails(selectedBus);
            });
        });
    }
    
    // Get amenity icon
    function getAmenityIcon(amenity) {
        const icons = {
            'AC': 'fa-snowflake',
            'Sleeper': 'fa-bed',
            'Seater': 'fa-chair',
            'Charging Point': 'fa-bolt',
            'Water Bottle': 'fa-bottle-water',
            'Blanket': 'fa-rug',
            'Snacks': 'fa-utensils',
            'Non-AC': 'fa-fan'
        };
        
        return icons[amenity] || 'fa-check';
    }
    
    // Show bus details modal
    function showBusDetails(bus) {
        currentBooking.bus = bus;
        
        const modal = document.getElementById('busDetailsModal');
        const content = document.getElementById('busDetailsContent');
        
        content.innerHTML = `
            <div class="bus-details-header">
                <div class="bus-details-name">${bus.name}</div>
                <div class="bus-details-rating">
                    <i class="fas fa-star"></i>
                    ${bus.rating}/5 (${Math.floor(Math.random() * 100) + 1} reviews)
                </div>
            </div>
            <div class="bus-details-info">
                <div class="departure-info">
                    <div class="time">${bus.departureTime}</div>
                    <div class="place">${bus.from}</div>
                    <div class="date">${formatDisplayDate(document.getElementById('date').value)}</div>
                </div>
                <div class="duration-info">
                    <div class="duration">${bus.duration}</div>
                    <div class="duration-line"></div>
                    <div class="stops">${Math.floor(Math.random() * 3) + 1} stops</div>
                </div>
                <div class="arrival-info">
                    <div class="time">${bus.arrivalTime}</div>
                    <div class="place">${bus.to}</div>
                    <div class="date">${formatArrivalDate(document.getElementById('date').value, bus.departureTime, bus.arrivalTime)}</div>
                </div>
            </div>
            <div class="bus-details-amenities">
                <h4>Amenities</h4>
                <div class="amenities-list">
                    ${bus.amenities.map(amenity => `
                        <div class="amenity-item">
                            <i class="fas ${getAmenityIcon(amenity)}"></i>
                            <span>${amenity}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="bus-details-footer">
                <div class="price-summary">
                    <div class="price-label">Total for ${document.getElementById('passengers').value} passenger(s)</div>
                    <div class="price">₹${bus.price * parseInt(document.getElementById('passengers').value)}</div>
                </div>
                <button class="select-seats-btn" id="proceedToSeatSelection">
                    Select Seats <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Proceed to seat selection
        document.getElementById('proceedToSeatSelection').addEventListener('click', function() {
            modal.style.display = 'none';
            showSeatSelection(bus);
        });
    }
    
    // Format date for display (YYYY-MM-DD => 15 Dec 2023)
    function formatDisplayDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    
    // Format arrival date based on departure and duration
    function formatArrivalDate(dateString, departureTime, arrivalTime) {
        const date = new Date(dateString);
        const [depHours, depMins] = departureTime.split(':').map(Number);
        const [arrHours, arrMins] = arrivalTime.split(':').map(Number);
        
        date.setHours(depHours, depMins);
        
        // If arrival is next day (based on time)
        if (arrHours < depHours || (arrHours === depHours && arrMins < depMins)) {
            date.setDate(date.getDate() + 1);
        }
        
        date.setHours(arrHours, arrMins);
        
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    
    // Show seat selection modal
    function showSeatSelection(bus) {
        const modal = document.getElementById('seatSelectionModal');
        const seatMap = document.getElementById('seatMap');
        
        // Clear previous selections
        currentBooking.seats = [];
        
        // Generate seat map
        seatMap.innerHTML = '';
        
        // Create seat layout based on bus type
        const isSleeper = bus.type.toLowerCase().includes('sleeper');
        const rows = isSleeper ? Math.ceil(bus.seats.length / 4) : Math.ceil(bus.seats.length / 5);
        
        for (let i = 0; i < rows; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'seat-row';
            
            const seatsInRow = isSleeper ? 
                bus.seats.slice(i * 4, (i + 1) * 4) : 
                bus.seats.slice(i * 5, (i + 1) * 5);
            
            seatsInRow.forEach(seat => {
                const seatElement = document.createElement('div');
                seatElement.className = 'seat';
                seatElement.textContent = seat.number;
                seatElement.dataset.seatNumber = seat.number;
                
                if (seat.booked) {
                    seatElement.classList.add('booked');
                    seatElement.title = 'Already booked';
                } else if (seat.ladies) {
                    seatElement.classList.add('ladies');
                    seatElement.title = 'Ladies seat';
                }
                
                seatElement.addEventListener('click', function() {
                    if (!seat.booked) {
                        this.classList.toggle('selected');
                        updateSelectedSeats(bus);
                    }
                });
                
                rowDiv.appendChild(seatElement);
            });
            
            seatMap.appendChild(rowDiv);
        }
        
        // Add driver's seat placeholder
        const driverSeat = document.createElement('div');
        driverSeat.className = 'driver-seat';
        driverSeat.innerHTML = '<i class="fas fa-steering-wheel"></i>';
        seatMap.insertBefore(driverSeat, seatMap.firstChild);
        
        // Initialize selected seats list
        updateSelectedSeats(bus);
        
        modal.style.display = 'block';
    }
    
    // Update selected seats list and price
    function updateSelectedSeats(bus) {
        const selectedSeatsList = document.getElementById('selectedSeatsList');
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const baseFareElement = document.getElementById('baseFare');
        const taxesElement = document.getElementById('taxes');
        const totalPriceElement = document.getElementById('totalPrice');
        const proceedBtn = document.getElementById('proceedToPayment');
        
        currentBooking.seats = Array.from(selectedSeats).map(seat => seat.dataset.seatNumber);
        
        if (selectedSeats.length === 0) {
            selectedSeatsList.innerHTML = '<div class="no-seats">No seats selected</div>';
            baseFareElement.textContent = '₹0';
            taxesElement.textContent = '₹0';
            totalPriceElement.textContent = '₹0';
            proceedBtn.disabled = true;
            return;
        }
        
        const seatsText = currentBooking.seats.join(', ');
        selectedSeatsList.innerHTML = `
            <div class="selected-seats-header">
                <span>Selected Seats</span>
                <span>${selectedSeats.length} seat(s)</span>
            </div>
            <div class="selected-seats-numbers">${seatsText}</div>
        `;
        
        const baseFare = bus.price * selectedSeats.length;
        const taxes = Math.round(baseFare * 0.18); // 18% GST
        const totalPrice = baseFare + taxes;
        
        baseFareElement.textContent = `₹${baseFare}`;
        taxesElement.textContent = `₹${taxes}`;
        totalPriceElement.textContent = `₹${totalPrice}`;
        
        proceedBtn.disabled = false;
        
        // Update current booking
        currentBooking.baseFare = baseFare;
        currentBooking.taxes = taxes;
        currentBooking.totalPrice = totalPrice;
        
        // Proceed to payment
        proceedBtn.onclick = function() {
            document.getElementById('seatSelectionModal').style.display = 'none';
            showPaymentModal();
        };
    }
    
    // Show payment modal
    function showPaymentModal() {
        const modal = document.getElementById('paymentModal');
        modal.style.display = 'block';
        
        // Check if user is logged in
        const isLoggedIn = document.querySelector('.auth-buttons .user-avatar');
        
        if (!isLoggedIn) {
            // Show guest checkout option prominently
            document.querySelector('.tab-btn[data-tab="cash"]').click();
            document.getElementById('guestCheckoutOption').style.display = 'block';
        } else {
            document.querySelector('.tab-btn[data-tab="card"]').click();
        }
    }
    
    // Payment method selection
    document.querySelectorAll('.payment-tabs .tab-btn').forEach(tab => {
        tab.addEventListener('click', function() {
            currentBooking.paymentMethod = this.getAttribute('data-tab');
        });
    });
    
    // Card payment form submission
    document.getElementById('cardPaymentForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!validateCardNumber(cardNumber)) {
            showAlert('Please enter a valid card number', 'error');
            return;
        }
        
        if (!validateExpiryDate(expiryDate)) {
            showAlert('Please enter a valid expiry date (MM/YY)', 'error');
            return;
        }
        
        if (!validateCVV(cvv)) {
            showAlert('Please enter a valid CVV (3 or 4 digits)', 'error');
            return;
        }
        
        processPayment('card');
    });
    
    // Wallet payment
    document.getElementById('payWithWallet')?.addEventListener('click', function() {
        const selectedWallet = document.querySelector('input[name="wallet"]:checked').value;
        processPayment(selectedWallet);
    });
    
    // UPI payment
    document.getElementById('payWithUPI')?.addEventListener('click', function() {
        const upiId = document.getElementById('upiId').value;
        
        if (!validateUPIId(upiId)) {
            showAlert('Please enter a valid UPI ID (e.g., name@upi)', 'error');
            return;
        }
        
        processPayment('upi');
    });
    
    // Cash payment
    document.getElementById('confirmCashPayment')?.addEventListener('click', function() {
        processPayment('cash');
    });
    
    // Validate card number
    function validateCardNumber(number) {
        return /^\d{16}$/.test(number.replace(/\s/g, ''));
    }
    
    // Validate expiry date
    function validateExpiryDate(date) {
        if (!/^\d{2}\/\d{2}$/.test(date)) return false;
        
        const [month, year] = date.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return false;
        }
        
        return month >= 1 && month <= 12;
    }
    
    // Validate CVV
    function validateCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }
    
    // Validate UPI ID
    function validateUPIId(upiId) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(upiId);
    }
    
    // Process payment
    function processPayment(method) {
        currentBooking.paymentMethod = method;
        
        // Show processing state
        const paymentButton = method === 'cash' ? document.getElementById('confirmCashPayment') :
                              method === 'card' ? document.getElementById('cardPaymentForm').querySelector('button[type="submit"]') :
                              method === 'upi' ? document.getElementById('payWithUPI') :
                              document.getElementById('payWithWallet');
        
        const originalText = paymentButton.innerHTML;
        paymentButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        paymentButton.disabled = true;
        
        // Simulate payment processing
        setTimeout(() => {
            paymentButton.innerHTML = originalText;
            paymentButton.disabled = false;
            
            // For demo purposes, assume payment is always successful
            completeBooking();
        }, 2000);
    }
    
    // Complete booking after successful payment
    function completeBooking() {
        // Hide payment modal
        document.getElementById('paymentModal').style.display = 'none';
        
        // Generate booking ID
        const bookingId = 'SWB' + Math.floor(10000000 + Math.random() * 90000000);
        
        // Format dates
        const departureDate = new Date(`${document.getElementById('date').value}T${currentBooking.bus.departureTime}`);
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDeparture = departureDate.toLocaleDateString('en-IN', options);
        
        // Set confirmation details
        document.getElementById('bookingId').textContent = bookingId;
        document.getElementById('confirmationBusName').textContent = currentBooking.bus.name;
        document.getElementById('confirmationFrom').textContent = currentBooking.bus.from;
        document.getElementById('confirmationTo').textContent = currentBooking.bus.to;
        document.getElementById('confirmationDeparture').textContent = formattedDeparture;
        document.getElementById('confirmationSeats').textContent = currentBooking.seats.join(', ');
        document.getElementById('confirmationAmount').textContent = `₹${currentBooking.totalPrice}`;
        
        // Show confirmation modal
        document.getElementById('confirmationModal').style.display = 'block';
        
        // Add event listeners to confirmation buttons
        document.getElementById('downloadTicket').addEventListener('click', downloadTicket);
        document.getElementById('viewBooking').addEventListener('click', viewBooking);
    }
    
    // Download ticket
    function downloadTicket() {
        const bookingId = document.getElementById('bookingId').textContent;
        const busName = document.getElementById('confirmationBusName').textContent;
        const from = document.getElementById('confirmationFrom').textContent;
        const to = document.getElementById('confirmationTo').textContent;
        const departure = document.getElementById('confirmationDeparture').textContent;
        const seats = document.getElementById('confirmationSeats').textContent;
        const amount = document.getElementById('confirmationAmount').textContent;
        
        // Create ticket content
        const ticketContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>SwiftBus Ticket - ${bookingId}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                    .ticket-container { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; }
                    .ticket-header { background-color: #4a6bff; color: white; padding: 20px; text-align: center; }
                    .ticket-header h1 { margin: 0; font-size: 24px; }
                    .ticket-header p { margin: 5px 0 0; font-size: 16px; }
                    .ticket-body { padding: 20px; }
                    .ticket-row { display: flex; margin-bottom: 15px; }
                    .ticket-label { font-weight: bold; width: 150px; color: #666; }
                    .ticket-value { flex: 1; }
                    .ticket-barcode { text-align: center; margin: 20px 0; font-family: 'Libre Barcode 128', cursive; font-size: 48px; }
                    .ticket-footer { background-color: #f5f7ff; padding: 15px; text-align: center; font-size: 14px; color: #666; }
                    .ticket-notes { margin-top: 20px; padding: 15px; background-color: #fff8e1; border-radius: 5px; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="ticket-container">
                    <div class="ticket-header">
                        <h1>SwiftBus Ticket</h1>
                        <p>Booking ID: ${bookingId}</p>
                    </div>
                    <div class="ticket-body">
                        <div class="ticket-row">
                            <div class="ticket-label">Passenger Name:</div>
                            <div class="ticket-value">${currentBooking.user?.name || 'Guest User'}</div>
                        </div>
                        <div class="ticket-row">
                            <div class="ticket-label">Bus Name:</div>
                            <div class="ticket-value">${busName}</div>
                        </div>
                        <div class="ticket-row">
                            <div class="ticket-label">Route:</div>
                            <div class="ticket-value">${from} to ${to}</div>
                        </div>
                        <div class="ticket-row">
                            <div class="ticket-label">Departure:</div>
                            <div class="ticket-value">${departure}</div>
                        </div>
                        <div class="ticket-row">
                            <div class="ticket-label">Seats:</div>
                            <div class="ticket-value">${seats}</div>
                        </div>
                        <div class="ticket-row">
                            <div class="ticket-label">Amount Paid:</div>
                            <div class="ticket-value">${amount}</div>
                        </div>
                        <div class="ticket-barcode">
                            *${bookingId}*
                        </div>
                        <div class="ticket-notes">
                            <p><strong>Important:</strong> Please arrive at the boarding point at least 30 minutes before departure. Carry a valid ID proof.</p>
                        </div>
                    </div>
                    <div class="ticket-footer">
                        <p>Thank you for choosing SwiftBus. Have a safe journey!</p>
                        <p>For any queries, contact support@swiftbus.com or call +91 9876543210</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        
        // Create blob and download
        const blob = new Blob([ticketContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SwiftBus_Ticket_${bookingId}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // View booking
    function viewBooking() {
        // In a real app, this would redirect to the booking details page
        alert('Booking details would be shown here in a real app');
        document.getElementById('confirmationModal').style.display = 'none';
    }
    
    // Track bus functionality
    document.getElementById('trackBusBtn')?.addEventListener('click', function() {
        const trackBookingId = document.getElementById('trackBookingId').value.trim();
        
        if (!trackBookingId) {
            showAlert('Please enter your booking ID or mobile number', 'error');
            return;
        }
        
        // Show loading state
        const trackingResult = document.getElementById('trackingResult');
        trackingResult.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Tracking your bus...</div>';
        
        // Simulate API call
        setTimeout(() => {
            trackingResult.style.display = 'grid';
            
            // Update tracking info
            document.getElementById('trackBusName').textContent = currentBooking.bus?.name || 'Sharma Travels AC Sleeper';
            document.getElementById('trackFrom').textContent = currentBooking.bus?.from || 'Mumbai';
            document.getElementById('trackTo').textContent = currentBooking.bus?.to || 'Delhi';
            
            // Set random status (for demo)
            const statusCircles = document.querySelectorAll('.status-circle');
            const statusLines = document.querySelectorAll('.status-line');
            const statusLabels = document.querySelectorAll('.status-label');
            
            // First status is always active (departed)
            statusCircles[0].classList.add('active');
            statusLabels[0].classList.add('active');
            
            // Randomly activate next status after delay
            setTimeout(() => {
                statusLines[0].classList.add('active');
                statusCircles[1].classList.add('active');
                statusLabels[1].classList.add('active');
                
                // Update location
                document.getElementById('currentLocation').textContent = 'Near Khandala, Mumbai-Pune Expressway';
                document.getElementById('nextStop').textContent = 'Next Stop: Lonavala (ETA: 00:45)';
            }, 2000);
            
            // Scroll to tracking result
            trackingResult.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });
    
    // Show alert
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
            <span>${message}</span>
            <i class="fas fa-times close-alert"></i>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            alertDiv.classList.add('fade-out');
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
        
        // Close button
        alertDiv.querySelector('.close-alert').addEventListener('click', function() {
            alertDiv.remove();
        });
    }
    
    // Toggle loading state
    function toggleLoading(show, message = '') {
        const loadingOverlay = document.getElementById('loadingOverlay');
        
        if (show) {
            if (!loadingOverlay) {
                const overlay = document.createElement('div');
                overlay.id = 'loadingOverlay';
                overlay.innerHTML = `
                    <div class="loading-content">
                        <i class="fas fa-spinner fa-spin"></i>
                        <span>${message}</span>
                    </div>
                `;
                document.body.appendChild(overlay);
            }
        } else {
            if (loadingOverlay) loadingOverlay.remove();
        }
    }
    
    // Initialize date picker with min date as today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('date').value = tomorrow.toISOString().split('T')[0];
});