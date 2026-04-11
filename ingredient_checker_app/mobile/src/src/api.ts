// api.ts
// Centralized API client for backend communication
import Constants from 'expo-constants';

const API_BASE_URL = Constants?.expoConfig?.extra?.API_BASE_URL || 'http://localhost:8000';

export async function scanBarcode(barcode: string) {
  const response = await fetch(`${API_BASE_URL}/api/scan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ barcode }),
  });
  if (!response.ok) {
    throw new Error('Failed to scan barcode');
  }
  return response.json();
}

// Add more API methods as needed (e.g., feedback, history, etc.)
