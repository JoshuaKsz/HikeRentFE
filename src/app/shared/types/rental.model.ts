
export interface RentalDetailRequest {
  gearItemId: number;
  quantity: number;
}

export interface RentalRequest {
  customerId: number;
  plannedStartDate: string;
  plannedReturnDate: string;
  details: RentalDetailRequest[];
}

export interface RentalDetailResponse {
  rentalDetailId: number;
  gearItemId: number;
  gearName: string;
  quantity: number;
  dailyPrice: number;
  replacementPrice: number;
  rentalDays: number;
  subtotal: number;
}

export interface RentalResponse {
  rentalId: number;
  customerId: number;
  customerName: string;
  rentalCode: string;
  rentalDate: string;
  plannedStartDate: string;
  plannedReturnDate: string;
  status: string;
  totalRentalFee: number;
  totalLateFee: number;
  totalDamageFee: number;
  totalLostItemFee: number;
  grandTotal: number;
  paymentStatus: string;
  createdAt: string;
  details: RentalDetailResponse[];
}

export interface RentalApiResponse<T> {
  status: string;
  message: string;
  data: T;
}
