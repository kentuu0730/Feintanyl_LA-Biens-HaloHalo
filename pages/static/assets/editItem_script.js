// Simple tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.form-tab');
    const contents = document.querySelectorAll('.tab-content');

    const categoryMap = {
      "Desserts": "1",
      "Pica-Pica": "2",
      "Pizza": "3",
      "Flavored Fries": "4",
      "Rice Toppings": "5"
    };

    // Loading Data
    let productId = localStorage.getItem('productId');

    try {
        fetch(`/endpoints/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('product-name').value = data.name;
                document.getElementById('category').value = categoryMap[data.category];
                document.getElementById('product-price').value = data.price;
                document.getElementById('quantity').value = data.quantity;
                const expirationDate = new Date(data.expiration_date);
                const formattedDate = expirationDate.toISOString().split('T')[0];
                document.getElementById('expiration-date').value = formattedDate;
                console.log(data.expiration_date)
                document.getElementById('product-id').value = data.product_id;
                document.getElementById('inventory-id').value = data.product_id;

            });
    } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product.');
    }
    
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

    document.querySelector('.save-btn').addEventListener('click', async function () {
      const productName = document.getElementById('product-name').value;
      const categoryBox = document.getElementById('category');
      const category = categoryBox.options[categoryBox.selectedIndex].text;
      const price = document.getElementById('product-price').value;
      const quantity = document.getElementById('quantity').value;
      let expirationDate = document.getElementById('expiration-date').value;
      console.log(productName + " " + category + " " + price + " " + quantity + " " + expirationDate);

      if (!productName || !category || !price || !quantity) {
          alert('Please fill in all required fields.');
          return;
      }

      const newProduct = {
          category,
          name: productName,
          price: parseFloat(price),
          quantity: parseInt(quantity, 10),
          expiration_date: expirationDate
      };

      try {
          const response = await fetch('/endpoints/products/' + productId, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newProduct)
          });

          const result = await response.json();
          if (response.ok) {
              alert('Product updated successfully!');
              window.location.href = '/dashboard';
          } else {
              alert('Error: ' + result.error);
          }
      } catch (error) {
          console.error('Error adding product:', error);
          alert('Failed to add product.');
      }
  });
});



document.getElementById('cancelButton').addEventListener('click', () => {
  window.location.href = "/dashboard";
});