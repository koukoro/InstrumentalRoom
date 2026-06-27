import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        totalAmount: 2000
    }),
    getters: {
        itemCount: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
        favoritesCount: () => 0,
        compareCount: () => 0
    },
    actions: {
        addToCart(product) {
            const existing = this.items.find(i => i.id === product.id)
            if (existing) {
                existing.qty++
            } else {
                this.items.push({ ...product, qty: 1 })
            }
            this.totalAmount += product.price
        }
    }
})