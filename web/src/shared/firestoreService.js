import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import * as firestoreHelpers from 'firebase/firestore';
import { createFirestoreService } from 'shared/firestoreServiceFactory';
import { firebaseConfig } from 'shared/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
