document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                menuTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all menu categories
                menuCategories.forEach(category => {
                    category.classList.remove('active');
                });
                
                // Show the selected category
                const categoryId = this.getAttribute('data-category');
                document.getElementById(categoryId).classList.add('active');
            });
        });
    }
    
    // Add menu items dynamically
    const menuData = {
        continental: [
            {
                name: 'Grilled Salmon',
                description: 'Fresh salmon fillet grilled to perfection with herbs and lemon',
                image: 'images/menu/salmon.jpg'
            },
            {
                name: 'Beef Wellington',
                description: 'Tender fillet of beef, wrapped in layers of mushroom duxelles, ham, and puff pastry',
                image: 'images/menu/beef-wellington.jpg'
            }
        ],
        desserts: [
            {
                name: 'Tiramisu',
                description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
                image: 'images/menu/tiramisu.jpg'
            },
            {
                name: 'Chocolate Fondant',
                description: 'Warm chocolate cake with a molten chocolate center, served with vanilla ice cream',
                image: 'images/menu/chocolate-fondant.jpg'
            }
        ],
        beverages: [
            {
                name: 'Tropical Fruit Punch',
                description: 'Refreshing blend of seasonal Kenyan fruits with a hint of mint',
                image: 'images/menu/fruit-punch.jpg'
            },
            {
                name: 'Kenyan Coffee',
                description: 'Premium Kenyan AA coffee, freshly brewed and served to your preference',
                image: 'images/menu/kenyan-coffee.jpg'
            }
        ]
    };
    
    // Populate menu categories
    Object.keys(menuData).forEach(category => {
        const categoryElement = document.getElementById(category);
        if (categoryElement) {
            menuData[category].forEach(item => {
                const menuItemHTML = `
                    <div class="menu-item">
                        <div class="menu-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="menu-item-info">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `;
                categoryElement.innerHTML += menuItemHTML;
            });
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const eventType = document.getElementById('event-type').value;
            const date = document.getElementById('date').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Format the message for WhatsApp
            const whatsappMessage = `*New Catering Inquiry*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Event Type:* ${eventType}%0A*Event Date:* ${date}%0A*Number of Guests:* ${guests}%0A*Additional Information:*%0A${message}`;
            
            // WhatsApp phone number - replace with your actual number
            const whatsappNumber = '254718946147';
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
            
            // Reset the form
            this.reset();
        });
    }
    
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server
            // For this demo, we'll just show a success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Highlight active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`nav ul li a[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`nav ul li a[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initialize the page
    highlightNavLink();
    
    // Hero image slideshow
    const heroImages = [
        'images/hero-bg-1.jpg',
        'images/hero-bg-2.jpg',
        'images/hero-bg-3.jpg'
    ];

    let currentHeroImage = 0;
    const heroSection = document.querySelector('.hero');

    function changeHeroBackground() {
        currentHeroImage = (currentHeroImage + 1) % heroImages.length;
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${heroImages[currentHeroImage]}')`;
    }

    // Change image every 5 seconds
    setInterval(changeHeroBackground, 5000);

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
