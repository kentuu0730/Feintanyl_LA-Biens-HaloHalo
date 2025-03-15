
document.getElementById('addNewItem_button').addEventListener('click', () => {
    window.location.href = "/pages/add_item";
});


document.addEventListener("DOMContentLoaded", function () {

    document.querySelector('.suppliers-button').addEventListener('click', () => {
        window.location.href = "/dashboard/suppliers";
    });

    document.querySelector('.logout-button').addEventListener('click', () => {
        window.location.href = "/";
    });

    let item = 1;
    const tbody = document.querySelector("tbody");
    fetch("/endpoints/products")
    .then(response => response.json())
    .then(data => {
    
    tbody.innerHTML = ""; // Clear existing rows

    let statusLowCount = 0;
    let statusCriticalCount = 0;
    let totalItemCount = 0;
    let totalStockedCount = 0;
    
    data.forEach(product => {
        totalItemCount++;
        let statusClass = "status-in-stock";
        let statusText = "In Stock";

        if (product.quantity <= 5) {
        statusClass = "status-critical";
        statusText = "Critical";
        statusCriticalCount++;
        } else if (product.quantity <= 10) {
        statusClass = "status-low";
        statusText = "Low";
        statusLowCount++;
        }
        if (product.quantity >= 0) {
            totalStockedCount++;
        }

        let itemIcon = "fas fa-box";

        if (product.category == "Dessert") {
            itemIcon = "fas fa-ice-cream";
        } else if (product.category == "Pica-Pica") {
            itemIcon = "fas fa-burrito";
        } else if (product.category == "Pizza") {
            itemIcon = "fas fa-pizza-slice";
        } else if (product.category == "Flavoured Fries") {
            itemIcon = "fas fa-french-fries";
        } else if (product.category == "Rice Toppings") {
            itemIcon = "fas fa-bowl-food";
        }

        const row = `
        <tr>
            <td>
            <div class="item-name">
                <div class="item-icon">
                <i class="${itemIcon}"></i>
                </div>
                <div class="item-details">
                <h4>${product.name}</h4>
                <p>${product.category}</p>
                </div>
            </div>
            </td>
            <td>${product.category}</td>
            <td>INV-${String(product.product_id).padStart(3, '0')}</td>
            <td>${product.quantity}</td>
            <td>Units</td>
            <td>₱${parseFloat(product.price).toFixed(2)}</td>
            <td><span class="status ${statusClass}">${statusText}</span></td>
            <td>${new Date(product.expiration_date).toLocaleDateString()}</td>
            <td>
            <div class="action-cell">
                <div class="btn-icon btn-edit edit-btn" data-id="${product.product_id}"><i class="fas fa-edit"></i></div>
                <div class="btn-icon btn-delete delete-btn" data-id="${product.product_id}"><i class="fas fa-trash"></i></div>
            </div>
            </td>
        </tr>
        `;
        item++;

        tbody.innerHTML += row;
    });
    document.getElementById("totalItemCount").textContent = totalItemCount;
    document.getElementById("statusLowCount").textContent = statusLowCount;
    document.getElementById("statusCriticalCount").textContent = statusCriticalCount;
    document.getElementById("totalStockedCount").textContent = totalStockedCount;


    })
    .catch(error => console.error("Error fetching products:", error));

    // Use event delegation to listen for delete button clicks
    tbody.addEventListener("click", async function (event) {
        if (event.target.closest(".delete-btn")) {
            const deleteButton = event.target.closest(".delete-btn");
            const productId = deleteButton.getAttribute("data-id");

            if (confirm("Are you sure you want to delete this product?")) {
                try {
                    const response = await fetch(`/endpoints/products/${productId}`, {
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
                    console.error("Error deleting product:", error);
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

