export const products = [
  { id: 1, name: "Tomatoes",    category: "Vegetables", price: 30,  unit: "500g",   inStock: true  },
  { id: 2, name: "Spinach",     category: "Vegetables", price: 25,  unit: "250g",   inStock: true  },
  { id: 3, name: "Bananas",     category: "Fruits",     price: 45,  unit: "Dozen",  inStock: true  },
  { id: 4, name: "Apples",      category: "Fruits",     price: 120, unit: "1 kg",   inStock: true  },
  { id: 5, name: "Whole Milk",  category: "Dairy",      price: 60,  unit: "500 ml", inStock: true  },
  { id: 6, name: "Paneer",      category: "Dairy",      price: 90,  unit: "200g",   inStock: false },
  { id: 7, name: "Brown Eggs",  category: "Dairy",      price: 80,  unit: "6 pcs",  inStock: true  },
  { id: 8, name: "Coriander",   category: "Herbs",      price: 15,  unit: "Bunch",  inStock: true  },
];

export const categories = ["All", ...new Set(products.map(p => p.category))];

export const DELIVERY_CHARGE = 40;
