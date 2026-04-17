import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email'),
  contact: z.string().max(30).optional(),
  pieceOfInterest: z.string().max(200).optional(),
  message: z.string().min(5, 'Please include a message').max(2000),
});

export const videoCallSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email'),
  pieceOfInterest: z.string().max(200).optional(),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
  platform: z.enum(['zoom', 'google-meet', 'messenger']),
  message: z.string().max(1000).optional(),
});

export const emailSignupSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type VideoCallInput = z.infer<typeof videoCallSchema>;
export type EmailSignupInput = z.infer<typeof emailSignupSchema>;
