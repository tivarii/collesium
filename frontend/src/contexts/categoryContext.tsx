"use client"

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
interface Category {
    id?: string;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    // Add other properties as needed
}

interface CategoryContextType {
    categories: Category[] | null;
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    createCategory: (data: Omit<Category, "id">) => Promise<void>;
}
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log("response:", response.data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch categories');
            }
            setCategories(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while fetching categories');
            console.error('Error fetching categories:', err);
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (data: Omit<Category, "id">) => {
        const token = localStorage.getItem('access_token');
        try {
            setError(null);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/`, 
                JSON.stringify(data), 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("response to create:", response.data);
            setCategories((prevCategories) => [...prevCategories, response.data]);
            return response;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while creating category');
            console.error('Error creating category:', err);
            return err;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    
    return (
        <CategoryContext.Provider
          value={{
            categories,
            loading,
            error,
            fetchCategories,
            createCategory,
          }}
        >
          {children}
        </CategoryContext.Provider>
    );
}

export function useCategory() {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
}