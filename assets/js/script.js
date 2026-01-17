
    document.addEventListener('DOMContentLoaded', function() {
      // DOM Elements
      const menuBtn = document.getElementById('menuBtn');
      const navLinks = document.getElementById('navLinks');
      const themeToggle = document.getElementById('themeToggle');
      const themeIcon = themeToggle.querySelector('i');
      const navItems = document.querySelectorAll('.nav-link');
      const pageContents = document.querySelectorAll('.page-content');
      const contactForm = document.getElementById('contactForm');
      const formSuccess = document.getElementById('formSuccess');
      
      // Check for saved theme preference or default to light
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
      
      // Theme toggle functionality
      themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
          localStorage.setItem('theme', 'dark');
        } else {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
          localStorage.setItem('theme', 'light');
        }
      });
      
      // Mobile menu toggle
      menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('fa-bars');
        menuBtn.querySelector('i').classList.toggle('fa-times');
      });
      
      // Page navigation
      navItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Get target page
          const targetPage = this.getAttribute('data-page');
          
          // Update active nav item
          navItems.forEach(navItem => navItem.classList.remove('active'));
          this.classList.add('active');
          
          // Show target page
          pageContents.forEach(page => page.classList.remove('active'));
          document.getElementById(`${targetPage}-page`).classList.add('active');
          
          // Close mobile menu if open
          navLinks.classList.remove('active');
          menuBtn.querySelector('i').classList.remove('fa-times');
          menuBtn.querySelector('i').classList.add('fa-bars');
          
          // Scroll to top of page
          window.scrollTo(0, 0);
        });
      });
      
      // Form validation and submission
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Reset previous errors
          document.querySelectorAll('.error-msg').forEach(error => {
            error.style.display = 'none';
          });
          
          document.querySelectorAll('.form-control').forEach(input => {
            input.style.borderColor = '';
          });
          
          formSuccess.style.display = 'none';
          
          // Get form values
          const name = document.getElementById('name').value.trim();
          const email = document.getElementById('email').value.trim();
          const message = document.getElementById('message').value.trim();
          
          let isValid = true;
          
          // Validate name
          if (!name) {
            document.getElementById('nameError').style.display = 'block';
            document.getElementById('name').style.borderColor = 'var(--danger-color)';
            isValid = false;
          }
          
          // Validate email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!email || !emailRegex.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            document.getElementById('email').style.borderColor = 'var(--danger-color)';
            isValid = false;
          }
          
          // Validate message
          if (!message) {
            document.getElementById('messageError').style.display = 'block';
            document.getElementById('message').style.borderColor = 'var(--danger-color)';
            isValid = false;
          }
          
          // If form is valid, show success message
          if (isValid) {
            formSuccess.style.display = 'flex';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
              formSuccess.style.display = 'none';
            }, 5000);
          }
        });
      }
      
      // Add real-time validation for form fields
      const formFields = document.querySelectorAll('.form-control');
      formFields.forEach(field => {
        field.addEventListener('input', function() {
          this.style.borderColor = '';
          const errorId = this.id + 'Error';
          const errorElement = document.getElementById(errorId);
          if (errorElement) {
            errorElement.style.display = 'none';
          }
        });
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links') && !e.target.closest('.menu-btn') && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuBtn.querySelector('i').classList.remove('fa-times');
          menuBtn.querySelector('i').classList.add('fa-bars');
        }
      });
    });
  