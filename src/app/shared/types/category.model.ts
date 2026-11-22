
export interface Category {
  categoryId: number;
  categoryName: string;
  description: string | null;
}

export interface CategoryRequest {
  categoryName: string;
  description: string | null;
}
