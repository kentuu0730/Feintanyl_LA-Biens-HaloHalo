import React, { useState } from 'react';

const SuppliersSection = () => {
  // Sample supplier data
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Fresh Dairy Products",
      contact: "Juan Dela Cruz",
      email: "juan@freshdairy.com",
      phone: "0917-555-1234",
      address: "123 Dairy Lane, Quezon City",
      products: [
        { id: 101, name: "Fresh Milk", unit: "Liters", price: 85.00, category: "Ingredients" },
        { id: 102, name: "Cream", unit: "Liters", price: 120.00, category: "Ingredients" },
        { id: 103, name: "Ice Cream Base", unit: "Liters", price: 150.00, category: "Desserts" }
      ]
    },
    {
      id: 2,
      name: "Manila Food Supplies",
      contact: "Maria Santos",
      email: "maria@manilafoods.ph",
      phone: "0918-555-5678",
      address: "456 Supply Road, Makati City",
      products: [
        { id: 201, name: "Cheese", unit: "Kg", price: 320.00, category: "Ingredients" },
        { id: 202, name: "Chicken Meat", unit: "Kg", price: 180.00, category: "Ingredients" },
        { id: 203, name: "Beef Ground", unit: "Kg", price: 220.00, category: "Ingredients" }
      ]
    },
    {
      id: 3,
      name: "Tropical Fruits Co.",
      contact: "Roberto Lim",
      email: "roberto@tropicalfruits.com",
      phone: "0919-555-9012",
      address: "789 Fruit Avenue, Davao City",
      products: [
        { id: 301, name: "Fresh Mangoes", unit: "Kg", price: 150.00, category: "Fruits" },
        { id: 302, name: "Ube", unit: "Kg", price: 180.00, category: "Ingredients" },
        { id: 303, name: "Coconut Meat", unit: "Kg", price: 120.00, category: "Ingredients" }
      ]
    },
    {
      id: 4,
      name: "Food Packaging Solutions",
      contact: "Ana Reyes",
      email: "ana@packagingsolutions.com",
      phone: "0920-555-3456",
      address: "321 Package Street, Pasig City",
      products: [
        { id: 401, name: "Cups (8oz)", unit: "Pack of 100", price: 280.00, category: "Packaging" },
        { id: 402, name: "Pizza Boxes", unit: "Pack of 50", price: 450.00, category: "Packaging" },
        { id: 403, name: "Plastic Utensils", unit: "Pack of 100", price: 150.00, category: "Packaging" }
      ]
    },
    {
      id: 5,
      name: "Premium Beverage Supplies",
      contact: "Carlos Tan",
      email: "carlos@premiumbev.com",
      phone: "0921-555-7890",
      address: "654 Beverage Road, Mandaluyong City",
      products: [
        { id: 501, name: "Soda Syrup", unit: "Liters", price: 350.00, category: "Drinks" },
        { id: 502, name: "Fruit Juice Concentrate", unit: "Liters", price: 280.00, category: "Drinks" },
        { id: 503, name: "Coffee Beans", unit: "Kg", price: 450.00, category: "Drinks" }
      ]
    }
  ]);

  // State for adding new suppliers
  const [isAddingSupplier, setIsAddingSupplier] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    products: []
  });

  // State for adding/editing products
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    unit: "",
    price: 0,
    category: "Ingredients"
  });

  // State for placing orders
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSupplier, setOrderSupplier] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [orderNote, setOrderNote] = useState("");

  // Categories for products
  const categories = ["Ingredients", "Desserts", "Fruits", "Pizza", "Drinks", "Packaging"];

  // Handle supplier selection
  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setIsAddingSupplier(false);
    setIsPlacingOrder(false);
  };

  // Handle adding a new supplier
  const handleAddSupplier = () => {
    setIsAddingSupplier(true);
    setSelectedSupplier(null);
    setIsPlacingOrder(false);
  };

  // Save new supplier
  const handleSaveSupplier = () => {
    const supplier = {
      ...newSupplier,
      id: suppliers.length + 1
    };
    setSuppliers([...suppliers, supplier]);
    setNewSupplier({
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      products: []
    });
    setIsAddingSupplier(false);
    setSelectedSupplier(supplier);
  };

  // Add new product to supplier
  const handleAddProduct = () => {
    setIsAddingProduct(true);
    setNewProduct({
      name: "",
      unit: "",
      price: 0,
      category: "Ingredients"
    });
  };

  // Save new product
  const handleSaveProduct = () => {
    if (selectedSupplier) {
      const product = {
        ...newProduct,
        id: selectedSupplier.products.length + 1000 + selectedSupplier.id
      };
      
      const updatedSupplier = {
        ...selectedSupplier,
        products: [...selectedSupplier.products, product]
      };
      
      setSuppliers(suppliers.map(s => 
        s.id === selectedSupplier.id ? updatedSupplier : s
      ));
      
      setSelectedSupplier(updatedSupplier);
      setIsAddingProduct(false);
    }
  };

  // Start placing an order
  const handlePlaceOrder = (supplier) => {
    setOrderSupplier(supplier);
    setIsPlacingOrder(true);
    setOrderItems([]);
    setOrderNote("");
    setSelectedSupplier(null);
    setIsAddingSupplier(false);
  };

  // Add item to order
  const handleAddToOrder = (product) => {
    const existingItem = orderItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setOrderItems(orderItems.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setOrderItems([...orderItems, { product, quantity: 1 }]);
    }
  };

  // Update order item quantity
  const handleUpdateOrderQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setOrderItems(orderItems.filter(item => item.product.id !== productId));
    } else {
      setOrderItems(orderItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      ));
    }
  };

  // Submit order
  const handleSubmitOrder = () => {
    alert(`Order placed successfully with ${orderSupplier.name}!\nItems: ${orderItems.length}\nTotal Amount: ₱${calculateOrderTotal().toFixed(2)}`);
    setIsPlacingOrder(false);
    setOrderSupplier(null);
    setOrderItems([]);
    setOrderNote("");
  };

  // Calculate order total
  const calculateOrderTotal = () => {
    return orderItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return '₱' + amount.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">La Bien's Halo Halo - Suppliers Management</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Suppliers List */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-lg p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-700">Suppliers</h3>
              <button 
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                onClick={handleAddSupplier}
              >
                Add New Supplier
              </button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {suppliers.map(supplier => (
                <div 
                  key={supplier.id} 
                  className={`p-3 rounded-md cursor-pointer hover:shadow-md transition duration-150 ${selectedSupplier?.id === supplier.id ? 'bg-indigo-100 border-l-4 border-indigo-500' : 'bg-white border border-gray-200'}`}
                  onClick={() => handleSelectSupplier(supplier)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-800">{supplier.name}</h4>
                    <button 
                      className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlaceOrder(supplier);
                      }}
                    >
                      Order
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">{supplier.contact}</p>
                  <p className="text-sm text-gray-500">{supplier.phone}</p>
                  <p className="text-xs text-gray-400 mt-1">{supplier.products.length} products</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="lg:w-2/3">
          {isAddingSupplier && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-700 mb-4">Add New Supplier</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newSupplier.contact}
                    onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newSupplier.address}
                    onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  onClick={() => setIsAddingSupplier(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={handleSaveSupplier}
                >
                  Save Supplier
                </button>
              </div>
            </div>
          )}
          
          {selectedSupplier && (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-xl text-gray-800">{selectedSupplier.name}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm"><span className="font-medium">Contact:</span> {selectedSupplier.contact}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {selectedSupplier.email}</p>
                    <p className="text-sm"><span className="font-medium">Phone:</span> {selectedSupplier.phone}</p>
                    <p className="text-sm"><span className="font-medium">Address:</span> {selectedSupplier.address}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                    onClick={() => handlePlaceOrder(selectedSupplier)}
                  >
                    Place Order
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-lg text-gray-700">Products</h4>
                  <button 
                    className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </button>
                </div>
                
                {isAddingProduct ? (
                  <div className="bg-white p-4 rounded-md border border-gray-200 mb-4">
                    <h5 className="font-medium text-gray-700 mb-3">Add New Product</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="e.g. Kg, Liters, Pack"
                          value={newProduct.unit}
                          onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                          type="number"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        onClick={() => setIsAddingProduct(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={handleSaveProduct}
                      >
                        Save Product
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedSupplier.products.map(product => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">{product.name}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{product.category}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{product.unit}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{formatCurrency(product.price)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <button
                                className="text-green-500 hover:text-green-700"
                                onClick={() => handleAddToOrder(product)}
                              >
                                Order
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {isPlacingOrder && orderSupplier && (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-800">Place Order</h3>
                  <p className="text-sm text-gray-600">Supplier: {orderSupplier.name}</p>
                </div>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsPlacingOrder(false)}
                >
                  Cancel
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product selection */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Available Products</h4>
                  <div className="bg-white rounded-md border border-gray-200 p-3 h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {orderSupplier.products.map(product => (
                        <div 
                          key={product.id} 
                          className="flex justify-between items-center p-2 border-b border-gray-100 hover:bg-gray-50"
                        >
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.unit} - {formatCurrency(product.price)}</p>
                          </div>
                          <button
                            className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                            onClick={() => handleAddToOrder(product)}
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Order details */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Order Items</h4>
                  <div className="bg-white rounded-md border border-gray-200 p-3 mb-3 h-48 overflow-y-auto">
                    {orderItems.length === 0 ? (
                      <div className="text-center text-gray-500 py-10">
                        No items added to this order
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {orderItems.map(item => (
                          <div 
                            key={item.product.id} 
                            className="flex justify-between items-center p-2 border-b border-gray-100"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-500">{formatCurrency(item.product.price)} per {item.product.unit}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                                onClick={() => handleUpdateOrderQuantity(item.product.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="w-6 text-center">{item.quantity}</span>
                              <button 
                                className="w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full"
                                onClick={() => handleUpdateOrderQuantity(item.product.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                            <div className="w-20 text-right font-medium">
                              {formatCurrency(item.product.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md h-20"
                      placeholder="Add any special instructions or notes for this order..."
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-md mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-medium">{orderItems.reduce((total, item) => total + item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-indigo-700">{formatCurrency(calculateOrderTotal())}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={orderItems.length === 0}
                    onClick={handleSubmitOrder}
                  >
                    Submit Order
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {!selectedSupplier && !isAddingSupplier && !isPlacingOrder && (
            <div className="bg-gray-50 rounded-lg p-10 flex flex-col items-center justify-center h-full">
              <div className="text-center">
                <div className="text-indigo-500 text-6xl mb-4">📦</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Manage Your Suppliers</h3>
                <p className="text-gray-500 mb-6">Select a supplier from the list or add a new one to view details and place orders.</p>
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={handleAddSupplier}
                >
                  Add New Supplier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuppliersSection;