"use client"

import { createContext,useContext,useEffect,useState } from "react";
import axios from "axios";

export interface SubCategoryInterface{
    id?: string;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    category: string;
}

export interface SubCategoryContextType {
    subcategories: SubCategoryInterface[] | null;
    loading: boolean;
    error: string | null;
    fetchSubcategories: () => Promise<void>;
    createSubcategory: (data: Omit<SubCategoryInterface, "id">) => Promise<void>;
    updateSubcategory: (id: string, data: Partial<SubCategoryInterface>) => Promise<void>;
    deleteSubcategory: (id: string) => Promise<void>;
    getSubcategoryById: (id: string) => SubCategoryInterface | null;
}

const SubCategoryContext = createContext<SubCategoryContextType | undefined>(undefined);
export function SubCategoryProvider({ children }: { children: React.ReactNode }) {
    const [subcategories, setSubcategories] = useState<SubCategoryInterface[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubcategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response in subcategory:", response.data);
            const formattedData = response.data.map((item: any) => ({
                id: item.id?.toString(),
                name: item.subCategoryname,
                description: item.subCategorydescription,
                created_at: item.created_at,
                updated_at: item.updated_at,
                category: item.category?.toString(),
            }));
            setSubcategories(formattedData);
        }
            catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching subcategories');
                console.log('Error fetching subcategories:', err);
            }finally{
                setLoading(false);
            }
    }
    useEffect(() => {
        fetchSubcategories();
    },[]);
    const createSubcategory = async (data: Omit<SubCategoryInterface, "id" | "created_at" | "updated_at">) => {
        const token = localStorage.getItem('access_token');
        try {
            setError(null);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subCategoryname: data.name,
                    subCategorydescription: data.description,
                    category: data.category,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create subcategory');
            }
            const newSubcategory = await response.json();
            console.log("new subcategory:", newSubcategory);
            setSubcategories([...subcategories, {
                id: newSubcategory.id?.toString(),
                name: newSubcategory.subCategoryname,
                description: newSubcategory.subCategorydescription,
                created_at: newSubcategory.created_at,
                updated_at: newSubcategory.updated_at,
                category: newSubcategory.category?.toString(),}]);
            // fetchSubcategories();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while creating subcategory');
            console.error('Error creating subcategory:', err);
        }
    }
    const updateSubcategory = async (id: string, data: Partial<SubCategoryInterface>) => {
        const token = localStorage.getItem('access_token');
        try {
            setError(null);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Failed to update subcategory');
            }
            const updatedSubcategory = await response.json();
            setSubcategories((prev) =>
                prev.map((subcategory) => (subcategory.id === id ? updatedSubcategory : subcategory))
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while updating subcategory');
            console.error('Error updating subcategory:', err);
        }
    }
    const deleteSubcategory = async (id: string) => {
        const token = localStorage.getItem('access_token');
        try {
            setError(null);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete subcategory');
            }
            setSubcategories((prev) => prev.filter((subcategory) => subcategory.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while deleting subcategory');
            console.error('Error deleting subcategory:', err);
        }
    }
    return (
        <SubCategoryContext.Provider
            value={{
                subcategories,
                loading,
                error,
                fetchSubcategories,
                createSubcategory,
                updateSubcategory,
                deleteSubcategory,
                getSubcategoryById: (id: string) => subcategories.find((subcategory) => subcategory.id === id) || null,
            }}>
            {children}
            </SubCategoryContext.Provider>
    )
};

export function useSubCategory() {
    const context = useContext(SubCategoryContext);
    if (context === undefined) {
        throw new Error('useSubCategory must be used within a SubCategoryProvider');
    }
    return context;
}