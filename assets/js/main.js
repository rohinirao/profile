/**
 * Main JavaScript file for Rohini Ramakrishna's Portfolio
 * Author: Rohini Ramakrishna
 * Version: 1.0
 */
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkVisibility() {
        timelineItems.forEach(item => {
            const position = item.getBoundingClientRect();
            
            // Check if item is in viewport
            if(position.top < window.innerHeight && position.bottom >= 0) {
                item.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.classList.add('scroll-down');
            } else {
                header.classList.remove('scroll-down');
            }
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // Navigation Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle) {
      menuToggle.addEventListener('click', function() {
          navMenu.classList.toggle('active');
          
          // Change icon based on menu state
          const icon = menuToggle.querySelector('i');
          if (navMenu.classList.contains('active')) {
              icon.classList.remove('fa-bars');
              icon.classList.add('fa-times');
          } else {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          }
      });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
      if (!event.target.closest('#nav-menu') && 
          !event.target.closest('.menu-toggle') && 
          navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          
          const icon = menuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
      }
  });
  
  // Active Navigation Link
  const currentLocation = location.href;
  const menuItems = document.querySelectorAll('#nav-menu a');
  
  menuItems.forEach(item => {
      if (item.href === currentLocation) {
          item.classList.add('active');
      }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              if (navMenu.classList.contains('active')) {
                  navMenu.classList.remove('active');
                  const icon = menuToggle.querySelector('i');
                  icon.classList.remove('fa-times');
                  icon.classList.add('fa-bars');
              }
          }
      });
  });
  
  // Add scroll event for header
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
          header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
          header.style.padding = '10px 0';
      } else {
          header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          header.style.padding = '15px 0';
      }
  });
  
  // Animation on scroll (simple implementation)
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const checkIfInView = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      animatedElements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top + scrollY;
          
          if (scrollY > elementPosition - windowHeight + 100) {
              element.classList.add('animated');
          }
      });
  };
  
  window.addEventListener('scroll', checkIfInView);
  checkIfInView(); // Check on page load
});