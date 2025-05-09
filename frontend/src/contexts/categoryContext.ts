import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
interface Category {
    id: string;
    name: string;
    description?: string;
    // Add other properties as needed
}

interface CategoryContextType {
    categories: Category[] | null;
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    createCategory: (category: Omit<Category, "id">) => Promise<void>;
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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
            setCategories(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while fetching categories');
            console.error('Error fetching categories:', err);
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (category: Omit<Category, "id">) => {
        try {
            setError(null);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/categories`, category);
            setCategories((prevCategories) => [...prevCategories, response.data]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while creating category');
            console.error('Error creating category:', err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <CategoryContext.
      value= {{
        categories,
            loading,
            error,
            fetchCategories,
            createCategory,
    }
}>
    { children }
    </CategoryContext.>
    );
    
};

export function useCategory() {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
}