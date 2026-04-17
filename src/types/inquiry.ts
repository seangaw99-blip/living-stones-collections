export interface InquiryFormData {
  name: string;
  email: string;
  contact?: string;
  pieceOfInterest?: string;
  message: string;
}

export interface VideoCallBooking {
  name: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  platform: 'zoom' | 'google-meet' | 'messenger';
  message?: string;
}
