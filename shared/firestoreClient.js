// shared/firestoreClient.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import * as firestoreHelpers from 'firebase/firestore';
import { createFirestoreService } from './firestoreServiceFactory';
import { firebaseConfig as _fc } from './firebaseConfig';

// initialize app using shared/firebaseConfig placeholders (mobile will use process.env)
const app = initializeApp(_fc);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const firestoreService = createFirestoreService({ db, auth, helpers: firestoreHelpers });

// Also export named methods for convenience/consistency with web wiring
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
} = firestoreService;
