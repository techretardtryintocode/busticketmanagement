document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Modal Handling
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Date picker - set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
    
    // Sample bus data
    const sampleBuses = [
        {
            id: 1,
            name: 'Sharma Travels AC Sleeper',
            type: 'AC Sleeper',
            departureTime: '22:30',
            arrivalTime: '16:00',
            from: 'Mumbai',
            to: 'Delhi',
            duration: '17h 30m',
            price: 1200,
            rating: 4.5,
            amenities: ['AC', 'Sleeper', 'Charging Point', 'Water Bottle', 'Blanket'],
            seats: [
                { number: 'A1', booked: false, ladies: false },
                { number: 'A2', booked: false, ladies: false },
                { number: 'A3', booked: true, ladies: false },
                { number: 'A4', booked: false, ladies: true },
                { number: 'B1', booked: false, ladies: false },
                { number: 'B2', booked: false, ladies: false },
                { number: 'B3', booked: true, ladies: false },
                { number: 'B4', booked: false, ladies: true },
                { number: 'C1', booked: false, ladies: false },
                { number: 'C2', booked: false, ladies: false },
                { number: 'C3', booked: false, ladies: false },
                { number: 'C4', booked: false, ladies: true },
            ]
        },
        {
            id: 2,
            name: 'Neeta Travels Multi Axle',
            type: 'Non-AC Seater',
            departureTime: '23:00',
            arrivalTime: '06:30',
            from: 'Bangalore',
            to: 'Chennai',
            duration: '7h 30m',
            price: 900,
            rating: 4.2,
            amenities: ['Non-AC', 'Seater', 'Charging Point'],
            seats: [
                { number: 'A1', booked: false, ladies: false },
                { number: 'A2', booked: false, ladies: false },
                { number: 'A3', booked: true, ladies: false },
                { number: 'A4', booked: false, ladies: true },
                { number: 'B1', booked: false, ladies: false },
                { number: 'B2', booked: false, ladies: false },
                { number: 'B3', booked: true, ladies: false },
                { number: 'B4', booked: false, ladies: true },
            ]
        },
        {
            id: 3,
            name: 'VRL Travels Sleeper',
            type: 'AC Sleeper',
            departureTime: '21:00',
            arrivalTime: '08:00',
            from: 'Pune',
            to: 'Hyderabad',
            duration: '11h',
            price: 1100,
            rating: 4.3,
            amenities: ['AC', 'Sleeper', 'Water Bottle'],
            seats: [
                { number: 'A1', booked: false, ladies: false },
                { number: 'A2', booked: false, ladies: false },
                { number: 'A3', booked: true, ladies: false },
                { number: 'A4', booked: false, ladies: true },
                { number: 'B1', booked: false, ladies: false },
                { number: 'B2', booked: false, ladies: false },
            ]
        },
        {
            id: 4,
            name: 'Orange Travels AC Seater',
            type: 'AC Seater',
            departureTime: '18:00',
            arrivalTime: '23:30',
            from: 'Delhi',
            to: 'Jaipur',
            duration: '5h 30m',
            price: 1200,
            rating: 4.1,
            amenities: ['AC', 'Seater', 'Charging Point', 'Snacks'],
            seats: [
                { number: 'A1', booked: false, ladies: false },
                { number: 'A2', booked: false, ladies: false },
                { number: 'A3', booked: true, ladies: false },
                { number: 'A4', booked: false, ladies: true },
                { number: 'B1', booked: false, ladies: false },
                { number: 'B2', booked: false, ladies: false },
                { number: 'B3', booked: true, ladies: false },
                { number: 'B4', booked: false, ladies: true },
                { number: 'C1', booked: false, ladies: false },
                { number: 'C2', booked: false, ladies: false },
            ]
        }
    ];
    
    // Search Form Submission
    const searchForm = document.getElementById('searchForm');
    const availableBusesSection = document.getElementById('availableBuses');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const date = document.getElementById('date').value;
        const passengers = document.getElementById('passengers').value;
        
        if (!from || !to || !date) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show loading state
        const busResults = document.getElementById('busResults');
        busResults.innerHTML = '<div class="loading">Searching for buses...</div>';
        
        // Show available buses section
        availableBusesSection.style.display = 'block';
        
        // Scroll to results
        availableBusesSection.scrollIntoView({ behavior: 'smooth' });
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Filter buses based on search criteria (simplified for demo)
            const filteredBuses = sampleBuses.filter(bus => 
                bus.from.toLowerCase().includes(from.toLowerCase()) && 
                bus.to.toLowerCase().includes(to.toLowerCase())
            );
            
            displayBuses(filteredBuses);
        }, 1000);
    });
    
    // Display buses in the results
    function displayBuses(buses) {
        const busResults = document.getElementById('busResults');
        busResults.innerHTML = '';
        
        if (buses.length === 0) {
            busResults.innerHTML = '<div class="no-results">No buses found for this route. Try different dates or cities.</div>';
            return;
        }
        
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
                <div class="bus-footer">
                    <div class="price">₹${bus.price} <span>per seat</span></div>
                    <button class="view-seats-btn" data-bus-id="${bus.id}">View Seats</button>
                </div>
            `;
            busResults.appendChild(busCard);
        });
        
        // Add event listeners to view seats buttons
        document.querySelectorAll('.view-seats-btn').forEach(button => {
            button.addEventListener('click', function() {
                const busId = parseInt(this.getAttribute('data-bus-id'));
                const selectedBus = buses.find(bus => bus.id === busId);
                showBusDetails(selectedBus);
            });
        });
    }
    
    // Show bus details modal
    function showBusDetails(bus) {
        const modal = document.getElementById('busDetailsModal');
        const content = document.getElementById('busDetailsContent');
        
        // Generate amenities list
        const amenitiesList = bus.amenities.map(amenity => `
            <div class="amenity">
                <i class="fas fa-check"></i>
                <span>${amenity}</span>
            </div>
        `).join('');
        
        content.innerHTML = `
            <div class="bus-details-header">
                <div class="bus-details-name">${bus.name}</div>
                <div class="bus-details-rating">
                    <i class="fas fa-star"></i>
                    ${bus.rating}/5
                </div>
            </div>
            <div class="bus-details-info">
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
            <div class="bus-details-amenities">
                <div class="amenities-title">Amenities</div>
                <div class="amenities-list">
                    ${amenitiesList}
                </div>
            </div>
            <div class="bus-details-footer">
                <div class="price">₹${bus.price} <span>per seat</span></div>
                <button class="select-seats-btn" data-bus-id="${bus.id}">Select Seats</button>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add event listener to select seats button
        document.querySelector('.select-seats-btn').addEventListener('click', function() {
            modal.style.display = 'none';
            showSeatSelection(bus);
        });
    }
    
    // Show seat selection modal
    function showSeatSelection(bus) {
        const modal = document.getElementById('seatSelectionModal');
        const seatMap = document.getElementById('seatMap');
        
        // Generate seat map
        seatMap.innerHTML = '';
        
        bus.seats.forEach(seat => {
            const seatElement = document.createElement('div');
            seatElement.className = 'seat';
            seatElement.textContent = seat.number;
            
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
            
            seatMap.appendChild(seatElement);
        });
        
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
        
        if (selectedSeats.length === 0) {
            selectedSeatsList.innerHTML = '<p>No seats selected</p>';
            baseFareElement.textContent = '₹0';
            taxesElement.textContent = '₹0';
            totalPriceElement.textContent = '₹0';
            proceedBtn.disabled = true;
            return;
        }
        
        const seatsText = Array.from(selectedSeats).map(seat => seat.textContent).join(', ');
        selectedSeatsList.innerHTML = `<p><strong>Selected:</strong> ${seatsText}</p>`;
        
        const baseFare = bus.price * selectedSeats.length;
        const taxes = Math.round(baseFare * 0.18); // 18% GST
        const totalPrice = baseFare + taxes;
        
        baseFareElement.textContent = `₹${baseFare}`;
        taxesElement.textContent = `₹${taxes}`;
        totalPriceElement.textContent = `₹${totalPrice}`;
        
        proceedBtn.disabled = false;
        
        // Add event listener to proceed to payment button
        proceedBtn.onclick = function() {
            document.getElementById('seatSelectionModal').style.display = 'none';
            showPaymentModal(
                bus, 
                Array.from(selectedSeats).map(seat => seat.textContent), 
                totalPrice,
                document.getElementById('date').value
            );
        };
    }
    
    // Show payment modal
    function showPaymentModal(bus, selectedSeats, totalPrice, travelDate) {
        const modal = document.getElementById('paymentModal');
        modal.style.display = 'block';
        
        // Store booking data for confirmation
        modal.dataset.busName = bus.name;
        modal.dataset.from = bus.from;
        modal.dataset.to = bus.to;
        modal.dataset.departureTime = bus.departureTime;
        modal.dataset.date = travelDate;
        modal.dataset.seats = selectedSeats.join(', ');
        modal.dataset.amount = totalPrice;
    }
    
    // Payment form submissions
    document.getElementById('cardPaymentForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment('card');
    });
    
    document.getElementById('payWithWallet')?.addEventListener('click', function() {
        const selectedWallet = document.querySelector('input[name="wallet"]:checked').value;
        processPayment(selectedWallet);
    });
    
    document.getElementById('payWithUPI')?.addEventListener('click', function() {
        const upiId = document.getElementById('upiId').value;
        if (!upiId) {
            alert('Please enter your UPI ID');
            return;
        }
        const selectedUPI = document.querySelector('input[name="upi"]:checked').value;
        processPayment(selectedUPI);
    });
    
    document.getElementById('confirmCashPayment')?.addEventListener('click', function() {
        processPayment('cash');
    });
    
    // Process payment and show confirmation
    function processPayment(method) {
        const paymentModal = document.getElementById('paymentModal');
        
        // Show processing state
        const paymentButton = document.querySelector(`#${method === 'cash' ? 'confirmCashPayment' : 
                                                    method === 'card' ? 'cardPaymentForm button[type="submit"]' : 
                                                    method === 'upi' ? 'payWithUPI' : 'payWithWallet'}`);
        const originalText = paymentButton.innerHTML;
        paymentButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        paymentButton.disabled = true;
        
        // In a real app, you would process payment here
        console.log(`Processing ${method} payment...`);
        
        // Simulate payment processing
        setTimeout(() => {
            paymentButton.innerHTML = originalText;
            paymentButton.disabled = false;
            
            paymentModal.style.display = 'none';
            showConfirmationModal(
                paymentModal.dataset.busName,
                paymentModal.dataset.from,
                paymentModal.dataset.to,
                paymentModal.dataset.departureTime,
                paymentModal.dataset.date,
                paymentModal.dataset.seats,
                paymentModal.dataset.amount
            );
        }, 2000);
    }
    
    // Show confirmation modal
    function showConfirmationModal(busName, from, to, departureTime, date, seats, amount) {
        const modal = document.getElementById('confirmationModal');
        
        // Generate random booking ID
        const bookingId = 'SWB' + Math.floor(10000000 + Math.random() * 90000000);
        
        // Format date and time
        const departureDate = new Date(`${date}T${departureTime}`);
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDeparture = departureDate.toLocaleDateString('en-IN', options);
        
        // Set confirmation details
        document.getElementById('bookingId').textContent = bookingId;
        document.getElementById('confirmationBusName').textContent = busName;
        document.getElementById('confirmationFrom').textContent = from;
        document.getElementById('confirmationTo').textContent = to;
        document.getElementById('confirmationDeparture').textContent = formattedDeparture;
        document.getElementById('confirmationSeats').textContent = seats;
        document.getElementById('confirmationAmount').textContent = '₹' + amount;
        
        modal.style.display = 'block';
        
        // Add event listeners to confirmation buttons
        document.getElementById('downloadTicket').addEventListener('click', function() {
            // Generate ticket content
            const ticketContent = `
                <html>
                <head>
                    <title>Bus Ticket - ${bookingId}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .ticket { border: 1px solid #ddd; padding: 20px; max-width: 500px; margin: 0 auto; }
                        .header { text-align: center; margin-bottom: 20px; }
                        .details { margin-bottom: 20px; }
                        .detail-row { display: flex; margin-bottom: 10px; }
                        .detail-label { font-weight: bold; width: 150px; }
                        .barcode { text-align: center; margin: 20px 0; }
                        .footer { text-align: center; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="ticket">
                        <div class="header">
                            <h2>SwiftBus Ticket</h2>
                            <p>Booking ID: ${bookingId}</p>
                        </div>
                        <div class="details">
                            <div class="detail-row">
                                <div class="detail-label">Bus Name:</div>
                                <div>${busName}</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Route:</div>
                                <div>${from} to ${to}</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Departure:</div>
                                <div>${formattedDeparture}</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Seats:</div>
                                <div>${seats}</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Amount Paid:</div>
                                <div>₹${amount}</div>
                            </div>
                        </div>
                        <div class="barcode">
                            <div>Scan this barcode at boarding</div>
                            <div style="font-family: 'Libre Barcode 128', cursive; font-size: 48px;">*${bookingId}*</div>
                        </div>
                        <div class="footer">
                            <p>Thank you for booking with SwiftBus</p>
                            <p>For any queries, contact support@swiftbus.com</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            // Create a blob and download it
            const blob = new Blob([ticketContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `SwiftBus_Ticket_${bookingId}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
        
        document.getElementById('viewBooking').addEventListener('click', function() {
            // In a real app, this would redirect to the booking details page
            alert('Booking details would be shown here in a real app');
            modal.style.display = 'none';
        });
    }
    
    // Track bus functionality
    document.getElementById('trackBusBtn')?.addEventListener('click', function() {
        const trackBookingId = document.getElementById('trackBookingId').value;
        
        if (!trackBookingId) {
            alert('Please enter your booking ID or mobile number');
            return;
        }
        
        // Show loading state
        const trackingResult = document.getElementById('trackingResult');
        trackingResult.innerHTML = '<div class="loading">Tracking your bus...</div>';
        
        // Simulate API call
        setTimeout(() => {
            trackingResult.style.display = 'grid';
            
            // In a real app, you would update these with actual data from API
            document.getElementById('trackBusName').textContent = 'Sharma Travels AC Sleeper';
            document.getElementById('trackFrom').textContent = 'Mumbai';
            document.getElementById('trackTo').textContent = 'Delhi';
            document.getElementById('trackDeparture').textContent = '15 Dec 2023, 22:30';
            document.getElementById('trackArrival').textContent = '16 Dec 2023, 16:00';
            document.getElementById('currentLocation').textContent = 'Near Vashi Toll Plaza, Mumbai-Pune Expressway';
            document.getElementById('nextStop').textContent = 'Next Stop: Lonavala (ETA: 00:45)';
            
            // Update status indicator
            const statusCircles = document.querySelectorAll('.status-circle');
            const statusLines = document.querySelectorAll('.status-line');
            const statusLabels = document.querySelectorAll('.status-label');
            
            // First status is active (departed)
            statusCircles[0].classList.add('active');
            statusLabels[0].classList.add('active');
            
            // Simulate progress
            setTimeout(() => {
                statusLines[0].classList.add('active');
                statusCircles[1].classList.add('active');
                statusLabels[1].classList.add('active');
                document.getElementById('currentLocation').textContent = 'Near Khandala, Mumbai-Pune Expressway';
            }, 3000);
            
            // Scroll to tracking result
            trackingResult.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    });
    
    // Login/Signup Modal Switching
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const switchToLogin = document.getElementById('switchToLogin');
    const switchToSignup = document.getElementById('switchToSignup');
    
    if (loginBtn) loginBtn.addEventListener('click', () => showModal('loginModal'));
    if (signupBtn) signupBtn.addEventListener('click', () => showModal('signupModal'));
    if (switchToLogin) switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthModal('loginModal');
    });
    if (switchToSignup) switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthModal('signupModal');
    });
    
    function showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
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
    
    // Guest Checkout
    document.getElementById('guestForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('guestName').value;
        const email = document.getElementById('guestEmail').value;
        const phone = document.getElementById('guestPhone').value;
        
        if (!name || !email || !phone) {
            alert('Please fill in all fields');
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
        
        // In a real app, you would store guest info and proceed to payment
        document.getElementById('guestCheckoutModal').style.display = 'none';
        
        // Get the current booking data from the payment modal
        const paymentModal = document.getElementById('paymentModal');
        showPaymentModal(
            { 
                name: paymentModal.dataset.busName,
                from: paymentModal.dataset.from,
                to: paymentModal.dataset.to,
                departureTime: paymentModal.dataset.departureTime
            },
            paymentModal.dataset.seats.split(', '),
            paymentModal.dataset.amount,
            paymentModal.dataset.date
        );
    });
    
    // Sort buses
    document.querySelectorAll('.sort-btn').forEach(button => {
        button.addEventListener('click', function() {
            const sortBy = this.getAttribute('data-sort');
            
            // Remove active class from all buttons
            document.querySelectorAll('.sort-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get current buses from the DOM
            const busCards = document.querySelectorAll('.bus-card');
            if (busCards.length === 0) return;
            
            // Convert NodeList to array for sorting
            const busesArray = Array.from(busCards).map(card => {
                return {
                    element: card,
                    departureTime: card.querySelector('.departure-info .time').textContent,
                    arrivalTime: card.querySelector('.arrival-info .time').textContent,
                    price: parseInt(card.querySelector('.price').textContent.replace('₹', '').replace(' per seat', '')),
                    rating: parseFloat(card.querySelector('.bus-details-rating')?.textContent || 0)
                };
            });
            
            // Sort buses based on selected criteria
            let sortedBuses;
            switch (sortBy) {
                case 'departure':
                    sortedBuses = busesArray.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
                    break;
                case 'arrival':
                    sortedBuses = busesArray.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));
                    break;
                case 'price':
                    sortedBuses = busesArray.sort((a, b) => a.price - b.price);
                    break;
                case 'rating':
                    sortedBuses = busesArray.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    sortedBuses = busesArray;
            }
            
            // Re-append sorted buses to the DOM
            const busResults = document.getElementById('busResults');
            busResults.innerHTML = '';
            sortedBuses.forEach(bus => {
                busResults.appendChild(bus.element);
            });
            
            // Re-attach event listeners to view seats buttons
            document.querySelectorAll('.view-seats-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const busId = parseInt(this.getAttribute('data-bus-id'));
                    const selectedBus = sampleBuses.find(bus => bus.id === busId);
                    showBusDetails(selectedBus);
                });
            });
        });
    });
    
    // Admin Dashboard Toggle (for demo purposes)
    const adminToggle = document.createElement('button');
    adminToggle.textContent = 'Admin Dashboard';
    adminToggle.style.position = 'fixed';
    adminToggle.style.bottom = '20px';
    adminToggle.style.right = '20px';
    adminToggle.style.zIndex = '1000';
    adminToggle.className = 'btn btn-primary';
    adminToggle.addEventListener('click', function() {
        document.getElementById('adminDashboard').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    document.body.appendChild(adminToggle);
    
    // Close admin dashboard
    document.querySelector('.admin-dashboard .close-modal')?.addEventListener('click', function() {
        document.getElementById('adminDashboard').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});