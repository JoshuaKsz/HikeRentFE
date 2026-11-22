
export interface PaymentResponse {
  paymentId: number;
  paymentCode: string;
  rentalId: number;
  rentalCode: string;
  customerName: string;
  amount: number;
  grandTotal: number;
  paymentMethod: string;
  paymentDate: string;
  paymentStatus: string;
}

export interface PaymentRequest {
  paymentMethod: string;
}

export interface PaymentApiResponse<T> {
  status: string;
  message: string;
  data: T;
}
