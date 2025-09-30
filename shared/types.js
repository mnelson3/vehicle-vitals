// -----------------------------
// File: shared/types.js
export const defaultVehicle = {
  make: '',
  model: '',
  year: '',
  vin: '',
  mileage: '',
  purchaseDate: '', // ISO date string (e.g., '2025-09-30')
  // Optional computed/scheduled fields for upcoming maintenance
  nextDueByMiles: '', // string to match existing patterns; store numeric miles as string
  nextDueByDate: '', // ISO date string for next due date
  services: []
};
