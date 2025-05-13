"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface ProductInterface {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    subcategoryId: string;
    image: string | null;
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductContextType {
    products: ProductInterface[] | null;
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    createProduct: (data: Omit<ProductInterface, "id" | "createdAt" | "updatedAt">) => Promise<void>;
    updateProduct: (id: string, data: Partial<ProductInterface>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    getProductById: (id: string) => ProductInterface | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<ProductInterface[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response in products:", response.data);
            
            // Map the backend response to your ProductInterface
            const formattedData = response.data.map((item: any) => ({
                id: item.id.toString(),
                name: item.name,
                description: item.description || "",
                price: parseFloat(item.price),
                categoryId: item.category.toString(),
                subcategoryId: item.subcategory.toString(),
                image: item.image,
                inStock: item.stocks > 0,
                createdAt: new Date(item.created_at),
                updatedAt: new Date(item.updated_at),
            }));
            
            setProducts(formattedData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
            console.log('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const createProduct = async (data: Omit<ProductInterface, "id" | "createdAt" | "updatedAt">) => {
        const token = localStorage.getItem('access_token');
        try {
            setError(null);
            
            // Transform frontend data to match backend expectations
            const backendData = {
                name: data.name,
                description: data.description,
                price: data.price.toString(),
                stocks: data.inStock ? 1 : 0, // Default to 1 if in stock
                category: parseInt(data.categoryId),
                subcategory: parseInt(data.subcategoryId),
                image: data.image
            };
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(backendData),
            });
            
            if (!response.ok) {
                throw new Error('Failed to create product');
            }
            
            const newProductData = await response.json();
            
            // Transform the response back to our frontend format
            const newProduct: ProductInterface = {
                id: newProductData.id.toString(),
                name: newProductData.name,
                description: newProductData.description || "",
                price: parseFloat(newProductData.price),
                categoryId: newProductData.category.toString(),
                subcategoryId: newProductData.subcategory.toString(),
                image: newProductData.image,
                inStock: newProductData.stocks > 0,
                createdAt: new Date(newProductData.created_at),
                updatedAt: new Date(newProductData.updated_at),
            };
            
            setProducts((prev) => [...prev, newProduct]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while creating product');
            console.error('Error creating product:', err);
        }
    };

    const updateProduct = async (id: string, data: Partial<ProductInterface>) => {
        const token = localStorage.getItem('access_token');
        try {
            setError(null);
            
            // Transform frontend data to match backend expectations
            const backendData: any = {};
            
            if (data.name !== undefined) backendData.name = data.name;
            if (data.description !== undefined) backendData.description = data.description;
            if (data.price !== undefined) backendData.price = data.price.toString();
            if (data.categoryId !== undefined) backendData.category = parseInt(data.categoryId);
            if (data.subcategoryId !== undefined) backendData.subcategory = parseInt(data.subcategoryId);
            if (data.image !== undefined) backendData.image = data.image;
            if (data.inStock !== undefined) backendData.stocks = data.inStock ? 1 : 0;
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(backendData),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            
            const updatedProductData = await response.json();
            
            // Transform the response back to our frontend format
            const updatedProduct: ProductInterface = {
                id: updatedProductData.id.toString(),
                name: updatedProductData.name,
                description: updatedProductData.description || "",
                price: parseFloat(updatedProductData.price),
                categoryId: updatedProductData.category.toString(),
                subcategoryId: updatedProductData.subcategory.toString(),
                image: updatedProductData.image,
                inStock: updatedProductData.stocks > 0,
                createdAt: new Date(updatedProductData.created_at),
                updatedAt: new Date(updatedProductData.updated_at),
            };
            
            setProducts((prev) =>
                prev.map((product) => (product.id === id ? updatedProduct : product))
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while updating product');
            console.error('Error updating product:', err);
        }
    };

    const deleteProduct = async (id: string) => {
        const token = localStorage.getItem('access_token');
        try {
            setError(null);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while deleting product');
            console.error('Error deleting product:', err);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                fetchProducts,
                createProduct,
                updateProduct,
                deleteProduct,
                getProductById: (id: string) => products.find((product) => product.id === id) || null,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
}