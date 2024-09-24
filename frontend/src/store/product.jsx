import { create } from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (product) => set({ product }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill in all the field"}
        }
        const response = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(newProduct)
            })
         const data = await response.json();
        set((state) => ( {products: [...state.products, data.data]}))
        return { success: true, message: "Product created successfully!"}
    }
}))