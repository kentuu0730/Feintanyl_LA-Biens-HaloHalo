
document.getElementById('addNewItem_button').addEventListener('click', () => {
    window.location.href = "/pages/add_supplier";
});


document.addEventListener("DOMContentLoaded", function () {

    document.querySelector('.inventory-sidebar-button').addEventListener('click', () => {
        window.location.href = "/dashboard";
    });

    document.querySelector('.logout-button').addEventListener('click', () => {
        window.location.href = "/";
    });

    

    const supplierTable = document.querySelector('table tbody');

    // Fetch all suppliers asynchronously
    async function fetchSuppliers() {
        try {
            const response = await fetch('/endpoints/suppliers');
            const data = await response.json();
            supplierTable.innerHTML = ''; // Clear existing rows
            data.forEach(supplier => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${supplier.name}</td>
                    <td>${supplier.address}</td>
                    <td>${supplier.phone_number}</td>
                    <td>${supplier.email}</td>
                    <td>
                        <div class="action-cell">
                            <div class="btn-icon btn-edit" data-id=${supplier.supplier_id}>
                                <i class="fas fa-edit"></i>
                            </div>
                            <div class="btn-icon btn-delete delete-btn" data-id=${supplier.supplier_id}>
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    </td>
                `;
                supplierTable.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    }

    // Add a new supplier asynchronously
    document.getElementById('addNewItem_button').addEventListener('click', async () => {
        const name = prompt("Enter supplier name");
        const address = prompt("Enter supplier address");
        const phone_number = prompt("Enter supplier phone number");
        const email = prompt("Enter supplier email");

        try {
            const response = await fetch('/api/suppliers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, address, phone_number, email })
            });
            const data = await response.json();
            alert(data.message);
            fetchSuppliers(); // Refresh the list
        } catch (error) {
            console.error('Error adding supplier:', error);
        }
    });

    // Delete supplier asynchronously
    async function deleteSupplier(id) {
        if (confirm('Are you sure you want to delete this supplier?')) {
            try {
                const response = await fetch(`/api/suppliers/${id}`, { method: 'DELETE' });
                const data = await response.json();
                alert(data.message);
                fetchSuppliers(); // Refresh the list
            } catch (error) {
                console.error('Error deleting supplier:', error);
            }
        }
    }

    // Edit supplier asynchronously
    async function editSupplier(id) {
        const name = prompt("Enter new supplier name");
        const address = prompt("Enter new supplier address");
        const phone_number = prompt("Enter new supplier phone number");
        const email = prompt("Enter new supplier email");

        try {
            const response = await fetch(`/api/suppliers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, address, phone_number, email })
            });
            const data = await response.json();
            alert(data.message);
            fetchSuppliers(); // Refresh the list
        } catch (error) {
            console.error('Error editing supplier:', error);
        }
    }

    fetchSuppliers(); // Initial fetch

    supplierTable.addEventListener("click", async function (event) {
        if (event.target.closest(".delete-btn")) {
            const deleteButton = event.target.closest(".delete-btn");
            const supplierId = deleteButton.getAttribute("data-id");

            if (confirm("Are you sure you want to delete this supplier?")) {
                try {
                    const response = await fetch(`/endpoints/suppliers/${supplierId}`, {
                        method: "DELETE",
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert(data.message);
                        deleteButton.closest("tr").remove(); // Remove the row from the table
                    } else {
                        alert("Error: " + data.error);
                    }
                } catch (error) {
                    console.error("Error deleting supplier:", error);
                }
            }
        }

        if (event.target.closest(".edit-btn")) {
            const editButton = event.target.closest(".edit-btn");
            const productId = editButton.getAttribute("data-id");
            localStorage.setItem("productId", productId);
            window.location.href = "/pages/edit_item";
        }
    });
});

