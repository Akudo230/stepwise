// Global variables
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Hide loading overlay after a short delay
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }, 1000);

    // Initialize navigation
    initializeNavigation();
    
    // Initialize calendar
    initializeCalendar();
    
    // Initialize chatbot
    initializeChatbot();
    
    // Initialize FAQ
    initializeFAQ();
    
    // Initialize expert filters
    initializeExpertFilters();
    
    // Initialize quick actions
    initializeQuickActions();
}

// Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                showPage(targetPage);
                setActiveNavLink(this);
            }
        });
    });

    // Handle button clicks that navigate to pages
    document.addEventListener('click', function(e) {
        if (e.target.hasAttribute('data-page') || e.target.closest('[data-page]')) {
            e.preventDefault();
            const element = e.target.hasAttribute('data-page') ? e.target : e.target.closest('[data-page]');
            const targetPage = element.getAttribute('data-page');
            if (targetPage) {
                showPage(targetPage);
                updateNavigation(targetPage);
            }
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

function setActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateNavigation(pageId) {
    const navLink = document.querySelector(`[data-page="${pageId}"]`);
    if (navLink && navLink.classList.contains('nav-link')) {
        setActiveNavLink(navLink);
    }
}

// Calendar System
function initializeCalendar() {
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', () => changeMonth(-1));
        nextMonthBtn.addEventListener('click', () => changeMonth(1));
    }

    generateCalendar();
    generateTimeSlots();
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    generateCalendar();
}

function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    
    if (!calendarGrid || !currentMonthElement) return;

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    currentMonthElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    calendarGrid.innerHTML = '';

    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const dayElement = document.createElement('div');
        dayElement.textContent = date.getDate();
        dayElement.className = 'calendar-day';

        if (date.getMonth() !== currentDate.getMonth()) {
            dayElement.style.opacity = '0.3';
            dayElement.style.pointerEvents = 'none';
        } else if (date < new Date().setHours(0, 0, 0, 0)) {
            dayElement.style.opacity = '0.5';
            dayElement.style.pointerEvents = 'none';
        } else {
            dayElement.addEventListener('click', () => selectDate(date, dayElement));
        }

        calendarGrid.appendChild(dayElement);
    }
}

function selectDate(date, element) {
    // Remove previous selection
    const prevSelected = document.querySelector('.calendar-day.selected');
    if (prevSelected) {
        prevSelected.classList.remove('selected');
    }

    // Add selection to clicked date
    element.classList.add('selected');
    selectedDate = new Date(date);

    // Update selected date display
    const selectedDateElement = document.getElementById('selectedDate');
    if (selectedDateElement) {
        selectedDateElement.textContent = selectedDate.toDateString();
    }

    updateBookingInfo();
}

function generateTimeSlots() {
    const timeSlotsContainer = document.getElementById('timeSlots');
    if (!timeSlotsContainer) return;

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
    ];

    timeSlotsContainer.innerHTML = '';

    timeSlots.forEach(time => {
        const slotElement = document.createElement('div');
        slotElement.className = 'slot';
        slotElement.textContent = time;
        slotElement.addEventListener('click', () => selectTime(time, slotElement));
        timeSlotsContainer.appendChild(slotElement);
    });
}

function selectTime(time, element) {
    // Remove previous selection
    const prevSelected = document.querySelector('.slot.selected');
    if (prevSelected) {
        prevSelected.classList.remove('selected');
    }

    // Add selection to clicked time
    element.classList.add('selected');
    selectedTime = time;

    // Update selected time display
    const selectedTimeElement = document.getElementById('selectedTime');
    if (selectedTimeElement) {
        selectedTimeElement.textContent = selectedTime;
    }

    updateBookingInfo();
}

function updateBookingInfo() {
    const selectedInfo = document.getElementById('selectedInfo');
    const confirmBooking = document.getElementById('confirmBooking');

    if (selectedDate && selectedTime) {
        selectedInfo.style.display = 'block';
        confirmBooking.disabled = false;
    } else {
        selectedInfo.style.display = 'none';
        confirmBooking.disabled = true;
    }

    if (confirmBooking) {
        confirmBooking.addEventListener('click', handleBookingConfirmation);
    }
}

function handleBookingConfirmation() {
    if (selectedDate && selectedTime) {
        alert(`Booking confirmed for ${selectedDate.toDateString()} at ${selectedTime}. You will receive a confirmation email shortly.`);
        
        // Reset selections
        selectedDate = null;
        selectedTime = null;
        
        // Reset UI
        const selectedElements = document.querySelectorAll('.selected');
        selectedElements.forEach(el => el.classList.remove('selected'));
        
        const selectedInfo = document.getElementById('selectedInfo');
        const confirmBooking = document.getElementById('confirmBooking');
        
        if (selectedInfo) selectedInfo.style.display = 'none';
        if (confirmBooking) confirmBooking.disabled = true;
    }
}

// Chatbot System
function initializeChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');

    if (chatInput && sendButton) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        sendButton.addEventListener('click', sendMessage);
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatInput || !chatMessages) return;

    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage('user', message);

    // Clear input
    chatInput.value = '';

    // Simulate AI response after a delay
    setTimeout(() => {
        const response = generateAIResponse(message);
        addMessage('bot', response);
    }, 1000);
}

function addMessage(type, content) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.textContent = type === 'user' ? 'You' : 'AI';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const messageText = document.createElement('p');
    messageText.textContent = content;

    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    contentDiv.appendChild(messageText);
    contentDiv.appendChild(timeDiv);

    if (type === 'user') {
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(avatarDiv);
        messageDiv.style.flexDirection = 'row-reverse';
        contentDiv.style.backgroundColor = '#007BFF';
        contentDiv.style.color = 'white';
    } else {
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    const responses = {
        'help me choose a career path': 'I\'d be happy to help you choose a career path! Let\'s start by discussing your interests, skills, and values. What activities make you feel most energized and engaged?',
        'review my resume': 'I can help you improve your resume! While I can\'t see your current resume here, I can give you key tips: ensure it\'s tailored to each job, use action verbs, quantify achievements, and keep it concise. Would you like specific advice for any particular section?',
        'prepare for job interview': 'Great! Interview preparation is crucial. Here are key areas to focus on: research the company thoroughly, practice common questions, prepare specific examples using the STAR method, and prepare thoughtful questions to ask. What type of role are you interviewing for?',
        'salary negotiation tips': 'Here are essential salary negotiation tips: research market rates, document your achievements, practice your pitch, consider the entire package (not just salary), and be prepared to walk away. What\'s your current situation - new job offer or seeking a raise?'
    };

    const lowerMessage = userMessage.toLowerCase();
    
    for (const key in responses) {
        if (lowerMessage.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerMessage)) {
            return responses[key];
        }
    }

    // Default responses for common keywords
    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
        return 'I\'m here to help with your career questions! Could you be more specific about what you\'d like guidance on? I can help with career planning, job search strategies, resume tips, interview preparation, and more.';
    }
    
    if (lowerMessage.includes('resume')) {
        return 'For resume advice, I recommend focusing on: clear formatting, relevant keywords, quantified achievements, and tailoring it to each application. What specific aspect of your resume would you like help with?';
    }
    
    if (lowerMessage.includes('interview')) {
        return 'Interview success comes from preparation! Research the company, practice common questions, prepare examples of your achievements, and plan questions to ask them. What type of interview are you preparing for?';
    }

    return 'Thank you for your question! I\'m here to help with career guidance, job search strategies, resume tips, interview preparation, and career planning. Could you tell me more about what specific area you\'d like assistance with?';
}

function initializeQuickActions() {
    const quickActionButtons = document.querySelectorAll('.quick-action');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            if (message) {
                // Add user message
                addMessage('user', message);
                
                // Generate and add AI response
                setTimeout(() => {
                    const response = generateAIResponse(message);
                    addMessage('bot', response);
                }, 1000);
            }
        });
    });
}

// FAQ System
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSearch = document.getElementById('faqSearch');
    const faqCategories = document.querySelectorAll('.faq-category');

    // FAQ item toggles
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            item.classList.toggle('active');
            
            // Update icon
            const icon = question.querySelector('.faq-icon');
            if (item.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // FAQ search
    if (faqSearch) {
        faqSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            faqItems.forEach(item => {
                const questionText = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // FAQ category filters
    faqCategories.forEach(category => {
        category.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active category
            faqCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // Filter FAQ items
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Expert Filter System
function initializeExpertFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const expertCards = document.querySelectorAll('.expert-card-detailed');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter expert cards
            expertCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Mobile responsiveness
function handleResize() {
    const navMenu = document.getElementById('navMenu');
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);

// Form validation and enhancement
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            input.style.borderColor = '#ced4da';
        }
    });

    return isValid;
}

// Local storage for user preferences (Note: using variables instead of localStorage for Claude.ai compatibility)
let userPreferences = {
    preferredExpert: null,
    preferredTime: null,
    chatHistory: []
};

function saveUserPreference(key, value) {
    userPreferences[key] = value;
}

function getUserPreference(key) {
    return userPreferences[key];
}

// Animation utilities
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = performance.now();
    
    function animate(timestamp) {
        let elapsed = timestamp - start;
        let progress = elapsed / duration;
        
        if (progress < 1) {
            element.style.opacity = progress;
            requestAnimationFrame(animate);
        } else {
            element.style.opacity = '1';
        }
    }
    
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
    let start = performance.now();
    
    function animate(timestamp) {
        let elapsed = timestamp - start;
        let progress = elapsed / duration;
        
        if (progress < 1) {
            element.style.opacity = 1 - progress;
            requestAnimationFrame(animate);
        } else {
            element.style.opacity = '0';
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    // Set background color based on type
    // const colors = {
    //     info: '#007BFF',
    //     success: '#28a745',
    //     warning: '#ffc107',
    //     // error: '#dc3545'
    // };
    // notification.style.backgroundColor = colors[type] || colors.info;
    
    // document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => notification.style.opacity = '1', 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Initialize tooltips and interactive elements
function initializeTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[title]');
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                document.body.removeChild(this._tooltip);
                this._tooltip = null;
            }
        });
    });
}

// Call initialization functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeTooltips();
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('An error occurred. Please refresh the page if problems persist.', 'error');
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        }, 0);
    });
}

