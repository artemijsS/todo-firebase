import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getErrorMessage(obj: any, fallback?: string): string {
    return obj.message && typeof obj.message === "string" ? obj.message : obj.error && typeof obj.error === "string" ? obj.error : fallback || "Unknown error"
}
