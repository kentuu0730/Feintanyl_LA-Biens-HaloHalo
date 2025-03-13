// Simple tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.form-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        contents[index].classList.add('active');
      });
    });
    
    // Checkbox functionality to enable/disable quantity inputs
    const checkboxes = document.querySelectorAll('.ingredient-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const quantityInput = this.closest('.ingredient-item').querySelector('.ingredient-quantity');
        quantityInput.disabled = !this.checked;
        if (!this.checked) {
          quantityInput.value = '';
        }
      });
    });
    
    // Initialize quantity inputs as disabled
    document.querySelectorAll('.ingredient-quantity').forEach(input => {
      input.disabled = true;
    });
  });

document.getElementById('cancelButton').addEventListener('click', () => {
  window.location.href = "/dashboard";
});