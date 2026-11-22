
export interface GearItem {
  gearItemId: number;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  gearName: string;
  description: string | null;
  dailyPrice: number;
  replacementPrice: number;
  totalStock: number;
  damagedStock: number;
  availableStock: number;
  imageUrl: string | null;
  isActive: boolean;
}

export interface GearItemRequest {
  categoryId: number;
  brandId: number;
  gearName: string;
  description: string | null;
  dailyPrice: number;
  replacementPrice: number;
  totalStock: number;
  damagedStock: number;
  imageUrl: string | null;
  isActive: boolean;
}

export interface GearItemApiResponse<T> {
  status: string;
  message: string;
  data: T;
}
