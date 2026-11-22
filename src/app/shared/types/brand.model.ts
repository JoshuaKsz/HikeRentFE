
export interface Brand {
  brandId: number;
  brandName: string;
  description: string | null;
}

export interface BrandRequest {
  brandName: string;
  description: string | null;
}
