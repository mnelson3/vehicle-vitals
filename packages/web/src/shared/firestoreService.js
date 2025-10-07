import * as firestoreHelpers from 'firebase/firestore';
import { createFirestoreService } from '@vehicle-vitals/shared/firestore';
import { auth, db } from './firebaseConfig';

const service = createFirestoreService({ db, auth, helpers: firestoreHelpers });

export const {
  addOrUpdateVehicle,
  getVehicles,
  getVehicle,
  addMaintenanceEntry,
  getMaintenanceEntries,
  getMaintenanceEntry,
  updateMaintenanceEntry,
  deleteMaintenanceEntry,
  updateVehicle,
  deleteVehicle,
  // reminder stubs
  addReminder,
  getReminders,
  completeReminder,
  snoozeReminder,
} = service;
