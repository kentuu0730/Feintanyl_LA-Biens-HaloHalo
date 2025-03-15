// Simple tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('saveSupplierButton').addEventListener('click', async function() {
    // Get input values
    const supplierName = document.getElementById('supplier-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const supplierAddress = document.getElementById('supplier-address').value;
    const supplierEmail = document.getElementById('supplier-email').value;

    // Validate required fields
    if (!supplierName || !phoneNumber || !supplierAddress || !supplierEmail) {
      alert('All fields are required.');
      return;
    }

    // Create the supplier object
    const newSupplier = {
      name: supplierName,
      phone_number: phoneNumber,
      address: supplierAddress,
      email: supplierEmail
    };

    try {
      // Send data to backend
      const response = await fetch('/endpoints/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSupplier)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Supplier added successfully!');
        // Optionally, redirect back to suppliers page or update the table dynamically
        window.location.href = '/dashboard/suppliers'; // Or you could append this supplier to the table
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('An error occurred. Please try again later.');
    }
  });

  // Cancel button functionality
  document.getElementById('cancelButton').addEventListener('click', function() {
    window.location.href = '/dashboard/suppliers';
  });
});



document.getElementById('cancelButton').addEventListener('click', () => {
  window.location.href = "/dashboard";
});