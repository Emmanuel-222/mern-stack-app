import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (product) => set({ product }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all the field" };
    }
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully!" };
  },
  fetchProducts: async () => {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();
    set({ products: data.data });
  },
  deleteProduct: async (productId) => {
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }));
    return { success: true, message: data.message };
  },
  editProduct: async (productId, updatedProduct) => {
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );
    const data = await response.json();
    if (!data.success) return { success: false, message: data.message };
    //updates the ui without refresh
    set((state) => ({
      products: state.products.map((product) =>
        product._id === productId ? data.data : product
      ),
    }));
    return { success: true, message: data.message };
  },
}));
