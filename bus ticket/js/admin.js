document.addEventListener('DOMContentLoaded', function() {
    // Admin Menu Navigation
    const adminMenuItems = document.querySelectorAll('.admin-menu li');
    
    adminMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            adminMenuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the section ID from the href
            const sectionId = this.querySelector('a').getAttribute('href').substring(1);
            
            // Hide all admin sections
            document.querySelectorAll('.admin-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the selected section
            if (sectionId === 'dashboard') {
                document.querySelectorAll('.admin-section').forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                document.getElementById(sectionId).style.display = 'block';
            }
        });
    });
    
    // Admin Table Row Actions
    document.querySelectorAll('.admin-table .btn-outline').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('i').className.includes('edit') ? 'edit' : 'delete';
            const row = this.closest('tr');
            const id = row.querySelector('td:first-child').textContent;
            
            if (action === 'edit') {
                // Show edit modal with form
                showEditModal(row);
            } else {
                // Confirm deletion
                if (confirm(`Are you sure you want to delete item with ID: ${id}?`)) {
                    // Simulate API call
                    showLoading();
                    setTimeout(() => {
                        row.remove();
                        showNotification('Item deleted successfully', 'success');
                        hideLoading();
                    }, 1000);
                }
            }
        });
    });
    
    // Show edit modal with row data
    function showEditModal(row) {
        const cells = row.querySelectorAll('td');
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'admin-modal-overlay';
        
        // Create modal content based on which table we're editing
        const tableType = row.closest('table').querySelector('th:first-child').textContent;
        let modalContent = '';
        
        if (tableType === 'Booking ID') {
            // Booking edit modal
            modalContent = `
                <div class="admin-modal-header">
                    <h3>Edit Booking</h3>
                    <span class="admin-modal-close">&times;</span>
                </div>
                <div class="admin-modal-body">
                    <form id="editBookingForm">
                        <div class="form-group">
                            <label>Booking ID</label>
                            <input type="text" value="${cells[0].textContent}" readonly>
                        </div>
                        <div class="form-group">
                            <label>Customer</label>
                            <input type="text" value="${cells[1].textContent}" required>
                        </div>
                        <div class="form-group">
                            <label>Bus</label>
                            <input type="text" value="${cells[2].textContent}" required>
                        </div>
                        <div class="form-group">
                            <label>Route</label>
                            <input type="text" value="${cells[3].textContent}" required>
                        </div>
                        <div class="form-group">
                            <label>Date</label>
                            <input type="date" value="${formatDateForInput(cells[4].textContent)}" required>
                        </div>
                        <div class="form-group">
                            <label>Seats</label>
                            <input type="text" value="${cells[5].textContent}" required>
                        </div>
                        <div class="form-group">
                            <label>Amount</label>
                            <input type="number" value="${cells[6].textContent.replace('₹', '')}" required>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <select required>
                                <option value="confirmed" ${cells[7].textContent === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                                <option value="pending" ${cells[7].textContent === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="cancelled" ${cells[7].textContent === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline cancel-btn">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            `;
        } else if (tableType === 'Bus') {
            // Bus schedule edit modal
            modalContent = `
                <div class="admin-modal-header">
                    <h3>Edit Bus Schedule</h3>
                    <span class="admin-modal-close">&times;</span>
                </div>
                <div class="admin-modal-body">
                    <form id="editScheduleForm">
                        <div class="form-group">
                            <label>Bus</label>
                            <input type="text" value="${cells[0].textContent}" required>
                        </div>
                        <div class="form-group">
                            <label>Operator</label>
                            <input type="text" value="${cells[1].textContent}" required>
                        </div>
                        <div class="form-group">
                            <label>Route</label>
                            <input type="text" value="${cells[2].textContent}" required>
                        </div>
                        <div class="form-group-row">
                            <div class="form-group">
                                <label>Departure</label>
                                <input type="datetime-local" value="${formatDateTimeForInput(cells[3].textContent)}" required>
                            </div>
                            <div class="form-group">
                                <label>Arrival</label>
                                <input type="datetime-local" value="${formatDateTimeForInput(cells[4].textContent)}" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Fare</label>
                            <input type="number" value="${cells[5].textContent.replace('₹', '')}" required>
                        </div>
                        <div class="form-group">
                            <label>Seats</label>
                            <input type="text" value="${cells[6].textContent}" required>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <select required>
                                <option value="active" ${cells[7].textContent === 'Active' ? 'selected' : ''}>Active</option>
                                <option value="inactive" ${cells[7].textContent === 'Inactive' ? 'selected' : ''}>Inactive</option>
                                <option value="completed" ${cells[7].textContent === 'Completed' ? 'selected' : ''}>Completed</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline cancel-btn">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            `;
        }
        
        modalOverlay.innerHTML = modalContent;
        document.body.appendChild(modalOverlay);
        document.body.style.overflow = 'hidden';
        
        // Close modal
        modalOverlay.querySelector('.admin-modal-close').addEventListener('click', function() {
            modalOverlay.remove();
            document.body.style.overflow = 'auto';
        });
        
        modalOverlay.querySelector('.cancel-btn').addEventListener('click', function() {
            modalOverlay.remove();
            document.body.style.overflow = 'auto';
        });
        
        // Form submission
        const formId = tableType === 'Booking ID' ? 'editBookingForm' : 'editScheduleForm';
        modalOverlay.querySelector(`#${formId}`).addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }
            
            // Show loading
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                modalOverlay.remove();
                document.body.style.overflow = 'auto';
                showNotification('Changes saved successfully', 'success');
                
                // In a real app, you would update the row with the new data
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Format date for input field (15 Dec 2023 => 2023-12-15)
    function formatDateForInput(dateString) {
        const months = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
            Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        const parts = dateString.split(' ');
        return `${parts[2]}-${months[parts[1]]}-${parts[0].padStart(2, '0')}`;
    }
    
    // Format date and time for input field (15 Dec, 22:30 => 2023-12-15T22:30)
    function formatDateTimeForInput(dateTimeString) {
        const [datePart, timePart] = dateTimeString.split(', ');
        const date = formatDateForInput(datePart);
        return `${date}T${timePart}`;
    }
    
    // Admin User Dropdown
    const adminUser = document.querySelector('.admin-user');
    
    if (adminUser) {
        adminUser.addEventListener('click', function() {
            // Create dropdown menu if it doesn't exist
            let dropdown = document.querySelector('.admin-user-dropdown');
            
            if (!dropdown) {
                dropdown = document.createElement('div');
                dropdown.className = 'admin-user-dropdown';
                dropdown.innerHTML = `
                    <ul>
                        <li><a href="#"><i class="fas fa-user"></i> Profile</a></li>
                        <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
                        <li><a href="#" id="adminLogout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                    </ul>
                `;
                this.appendChild(dropdown);
                
                // Add logout functionality
                document.getElementById('adminLogout').addEventListener('click', function(e) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to logout?')) {
                        document.getElementById('adminDashboard').style.display = 'none';
                        document.body.style.overflow = 'auto';
                        showNotification('Logged out successfully', 'success');
                    }
                });
            } else {
                dropdown.remove();
            }
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.admin-user')) {
            const dropdown = document.querySelector('.admin-user-dropdown');
            if (dropdown) dropdown.remove();
        }
    });
    
    // Admin Search
    const adminSearch = document.querySelector('.admin-search input');
    
    if (adminSearch) {
        adminSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Get the currently active table
            const activeSection = document.querySelector('.admin-section[style="display: block;"]') || 
                                 document.querySelector('.admin-section');
            const table = activeSection.querySelector('.admin-table');
            
            if (!table) return;
            
            // Search functionality
            table.querySelectorAll('tbody tr').forEach(row => {
                const rowText = row.textContent.toLowerCase();
                row.style.display = rowText.includes(searchTerm) ? '' : 'none';
            });
        });
    }
    
    // Add New Schedule Button
    document.querySelector('.admin-section .btn-primary')?.addEventListener('click', function() {
        showAddScheduleModal();
    });
    
    // Show add schedule modal
    function showAddScheduleModal() {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'admin-modal-overlay';
        
        modalOverlay.innerHTML = `
            <div class="admin-modal-header">
                <h3>Add New Bus Schedule</h3>
                <span class="admin-modal-close">&times;</span>
            </div>
            <div class="admin-modal-body">
                <form id="addScheduleForm">
                    <div class="form-group">
                        <label for="busOperator">Bus Operator</label>
                        <select id="busOperator" required>
                            <option value="">Select Operator</option>
                            <option value="Sharma Travels">Sharma Travels</option>
                            <option value="Neeta Travels">Neeta Travels</option>
                            <option value="VRL Travels">VRL Travels</option>
                            <option value="Orange Travels">Orange Travels</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="busType">Bus Type</label>
                        <select id="busType" required>
                            <option value="">Select Type</option>
                            <option value="AC Sleeper">AC Sleeper</option>
                            <option value="Non-AC Seater">Non-AC Seater</option>
                            <option value="AC Seater">AC Seater</option>
                            <option value="Volvo Multi-Axle">Volvo Multi-Axle</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="routeFrom">From</label>
                        <input type="text" id="routeFrom" required>
                    </div>
                    <div class="form-group">
                        <label for="routeTo">To</label>
                        <input type="text" id="routeTo" required>
                    </div>
                    <div class="form-group-row">
                        <div class="form-group">
                            <label for="departureTime">Departure Date & Time</label>
                            <input type="datetime-local" id="departureTime" required>
                        </div>
                        <div class="form-group">
                            <label for="arrivalTime">Arrival Date & Time</label>
                            <input type="datetime-local" id="arrivalTime" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="busFare">Fare (₹)</label>
                        <input type="number" id="busFare" min="0" required>
                    </div>
                    <div class="form-group">
                        <label for="totalSeats">Total Seats</label>
                        <input type="number" id="totalSeats" min="1" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-outline cancel-btn">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Schedule</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modalOverlay);
        document.body.style.overflow = 'hidden';
        
        // Set default departure time to next hour
        const now = new Date();
        now.setHours(now.getHours() + 1);
        now.setMinutes(0);
        document.getElementById('departureTime').value = now.toISOString().slice(0, 16);
        
        // Set default arrival time to departure + 6 hours
        const arrival = new Date(now);
        arrival.setHours(arrival.getHours() + 6);
        document.getElementById('arrivalTime').value = arrival.toISOString().slice(0, 16);
        
        // Close modal
        modalOverlay.querySelector('.admin-modal-close').addEventListener('click', function() {
            modalOverlay.remove();
            document.body.style.overflow = 'auto';
        });
        
        modalOverlay.querySelector('.cancel-btn').addEventListener('click', function() {
            modalOverlay.remove();
            document.body.style.overflow = 'auto';
        });
        
        // Form submission
        document.getElementById('addScheduleForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }
            
            // Show loading
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
            submitButton.disabled = true;
            
            // Get form data
            const formData = {
                operator: document.getElementById('busOperator').value,
                type: document.getElementById('busType').value,
                from: document.getElementById('routeFrom').value,
                to: document.getElementById('routeTo').value,
                departure: document.getElementById('departureTime').value,
                arrival: document.getElementById('arrivalTime').value,
                fare: document.getElementById('busFare').value,
                seats: document.getElementById('totalSeats').value
            };
            
            // Simulate API call
            setTimeout(() => {
                modalOverlay.remove();
                document.body.style.overflow = 'auto';
                showNotification('Schedule added successfully', 'success');
                
                // In a real app, you would add the new row to the table
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // For demo purposes, reload the page
                setTimeout(() => location.reload(), 1000);
            }, 1500);
        });
    }
    
    // Show loading overlay
    function showLoading() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'admin-loading-overlay';
        loadingOverlay.innerHTML = '<div class="admin-loading-spinner"><i class="fas fa-spinner fa-spin"></i></div>';
        document.body.appendChild(loadingOverlay);
    }
    
    // Hide loading overlay
    function hideLoading() {
        const loadingOverlay = document.querySelector('.admin-loading-overlay');
        if (loadingOverlay) loadingOverlay.remove();
    }
    
    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Initialize dashboard
    document.querySelector('.admin-menu li.active a')?.click();
});