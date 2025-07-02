import { clsx, type ClassValue } from 'clsx';
import mongoose from 'mongoose';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}
