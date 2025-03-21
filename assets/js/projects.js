/**
 * Projects JavaScript file for Rohini Ramakrishna's Portfolio
 * Handles filtering, sorting, and details for projects
 * Author: Rohini Ramakrishna
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('sort-projects');
  const projectsContainer = document.querySelector('.projects-container');
  const projectItems = document.querySelectorAll('.project-item');
  
  // Filter projects by category
  if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
          button.addEventListener('click', () => {
              // Remove active class from all buttons
              filterButtons.forEach(btn => btn.classList.remove('active'));
              
              // Add active class to clicked button
              button.classList.add('active');
              
              const filterValue = button.getAttribute('data-filter');
              
              // Show/hide projects based on filter
              projectItems.forEach(item => {
                  if (filterValue === 'all') {
                      item.style.display = 'block';
                  } else {
                      item.classList.contains(filterValue) 
                          ? item.style.display = 'block' 
                          : item.style.display = 'none';
                  }
              });
          });
      });
  }
  
  // Sort projects
  if (sortSelect) {
      sortSelect.addEventListener('change', () => {
          const sortValue = sortSelect.value;
          const projects = Array.from(projectItems);
          
          // Sort projects based on selected option
          if (sortValue === 'newest') {
              projects.sort((a, b) => {
                  return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
              });
          } else if (sortValue === 'oldest') {
              projects.sort((a, b) => {
                  return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
              });
          } else if (sortValue === 'name-asc') {
              projects.sort((a, b) => {
                  return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
              });
          } else if (sortValue === 'name-desc') {
              projects.sort((a, b) => {
                  return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'));
              });
          }
          
          // Append sorted projects to container
          projects.forEach(project => {
              projectsContainer.appendChild(project);
          });
      });
  }
  
  // Project Modal/Details
  const projectLinks = document.querySelectorAll('.project-details-link');
  const projectModal = document.getElementById('project-modal');
  const closeModal = document.querySelector('.close-modal');
  const modalContent = document.querySelector('.modal-content');
  
  if (projectLinks.length > 0 && projectModal) {
      projectLinks.forEach(link => {
          link.addEventListener('click', function(e) {
              e.preventDefault();
              
              // Get project details
              const projectId = this.getAttribute('data-project');
              const project = document.getElementById(projectId);
              
              if (project) {
                  const projectDetails = project.querySelector('.project-details');
                  
                  if (projectDetails) {
                      modalContent.innerHTML = projectDetails.innerHTML;
                      projectModal.style.display = 'flex';
                      document.body.style.overflow = 'hidden';
                  }
              }
          });
      });
      
      // Close modal
      if (closeModal) {
          closeModal.addEventListener('click', () => {
              projectModal.style.display = 'none';
              document.body.style.overflow = 'auto';
          });
      }
      
      // Close modal when clicking outside
      window.addEventListener('click', (e) => {
          if (e.target === projectModal) {
              projectModal.style.display = 'none';
              document.body.style.overflow = 'auto';
          }
      });
  }
  
  // URL hash for direct project access
  const checkProjectHash = () => {
      if (window.location.hash) {
          const projectId = window.location.hash.substring(1);
          const projectLink = document.querySelector(`[data-project="${projectId}"]`);
          
          if (projectLink) {
              setTimeout(() => {
                  projectLink.click();
              }, 500);
          }
      }
  };
  
  // Check for hash on page load
  checkProjectHash();
  
  // Listen for hash changes
  window.addEventListener('hashchange', checkProjectHash);
});