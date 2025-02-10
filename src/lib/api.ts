import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  language: string;
}

export const fetchFAQs = async (lang?: string, id?: number): Promise<FAQ[]> => {
  try {
    let url = `${API_URL}/faqs/`;
    const params = new URLSearchParams();
    if (lang) params.append("lang", lang);
    if (id) params.append("id", id.toString());
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch FAQs");
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    toast.error("Failed to fetch FAQs");
    return [];
  }
};

export const createFAQ = async (faq: Partial<FAQ>): Promise<FAQ | null> => {
  try {
    const response = await fetch(`${API_URL}/faqs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faq),
    });
    if (!response.ok) throw new Error("Failed to create FAQ");
    const data = await response.json();
    toast.success("FAQ created successfully");
    return data;
  } catch (error) {
    console.error("Error creating FAQ:", error);
    toast.error("Failed to create FAQ");
    return null;
  }
};

export const updateFAQ = async (id: number, faq: Partial<FAQ>): Promise<FAQ | null> => {
  try {
    const response = await fetch(`${API_URL}/faqs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faq),
    });
    if (!response.ok) throw new Error("Failed to update FAQ");
    const data = await response.json();
    toast.success("FAQ updated successfully");
    return data;
  } catch (error) {
    console.error("Error updating FAQ:", error);
    toast.error("Failed to update FAQ");
    return null;
  }
};

export const deleteFAQ = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/faqs/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete FAQ");
    toast.success("FAQ deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    toast.error("Failed to delete FAQ");
    return false;
  }
};