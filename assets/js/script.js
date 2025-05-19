document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--danger-color)';
          
          // Add error message if not exists
          if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-msg')) {
            const errorMsg = document.createElement('small');
            errorMsg.classList.add('error-msg');
            errorMsg.style.color = 'var(--danger-color)';
            errorMsg.textContent = 'This field is required';
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
          }
        } else {
          field.style.borderColor = '#ddd';
          // Remove error message if exists
          if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-msg')) {
            field.nextElementSibling.remove();
          }
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  // Set active nav link
  const currentPage = location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(item => {
    const itemHref = item.getAttribute('href');
    if (itemHref === currentPage) {
      item.classList.add('active');
      item.style.color = 'var(--primary-color)';
    }
  });
});