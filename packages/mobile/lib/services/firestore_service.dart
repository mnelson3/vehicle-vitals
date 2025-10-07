import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/vehicle.dart';
import '../models/maintenance.dart';

class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Get current user ID or throw error
  String get _userId {
    final user = _auth.currentUser;
    if (user == null) throw Exception('Not authenticated');
    return user.uid;
  }

  // Get vehicles collection reference
  CollectionReference get _vehiclesCollection =>
      _db.collection('users').doc(_userId).collection('vehicles');

  // Get all vehicles for current user
  Future<List<Vehicle>> getVehicles() async {
    try {
      final snapshot = await _vehiclesCollection.get();
      return snapshot.docs
          .map((doc) => Vehicle.fromMap(doc.data() as Map<String, dynamic>))
          .toList();
    } catch (e) {
      // Return empty list if not authenticated
      return [];
    }
  }

  // Add or update a vehicle
  Future<void> addOrUpdateVehicle(Vehicle vehicle) async {
    final now = FieldValue.serverTimestamp();
    final vehicleData = vehicle.toMap();

    if (vehicle.createdAt == null) {
      vehicleData['createdAt'] = now;
    }
    vehicleData['updatedAt'] = now;

    await _vehiclesCollection
        .doc(vehicle.vin)
        .set(vehicleData, SetOptions(merge: true));
  }

  // Delete a vehicle
  Future<void> deleteVehicle(String vin) async {
    await _vehiclesCollection.doc(vin).delete();
  }

  // Get a specific vehicle by VIN
  Future<Vehicle?> getVehicle(String vin) async {
    try {
      final doc = await _vehiclesCollection.doc(vin).get();
      if (doc.exists) {
        return Vehicle.fromMap(doc.data() as Map<String, dynamic>);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  // Stream vehicles for real-time updates
  Stream<List<Vehicle>> getVehiclesStream() {
    try {
      return _vehiclesCollection.snapshots().map(
        (snapshot) => snapshot.docs
            .map((doc) => Vehicle.fromMap(doc.data() as Map<String, dynamic>))
            .toList(),
      );
    } catch (e) {
      // Return empty stream if not authenticated
      return Stream.value([]);
    }
  }

  // Get maintenance entries for a vehicle
  Future<List<Maintenance>> getMaintenanceEntries(String vin) async {
    try {
      final snapshot = await _vehiclesCollection
          .doc(vin)
          .collection('maintenance')
          .orderBy('date', descending: true)
          .get();

      return snapshot.docs
          .map((doc) => Maintenance.fromMap(doc.data(), doc.id))
          .toList();
    } catch (e) {
      return [];
    }
  }

  // Add maintenance entry
  Future<void> addMaintenanceEntry(String vin, Maintenance entry) async {
    final now = FieldValue.serverTimestamp();
    final entryData = entry.toMap();
    entryData['createdAt'] = now;
    entryData['updatedAt'] = now;

    await _vehiclesCollection.doc(vin).collection('maintenance').add(entryData);
  }

  // Get a specific maintenance entry
  Future<Maintenance?> getMaintenanceEntry(String vin, String entryId) async {
    try {
      final doc = await _vehiclesCollection
          .doc(vin)
          .collection('maintenance')
          .doc(entryId)
          .get();

      if (doc.exists) {
        return Maintenance.fromMap(doc.data() as Map<String, dynamic>, doc.id);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  // Update maintenance entry
  Future<void> updateMaintenanceEntry(
    String vin,
    String entryId,
    Maintenance entry,
  ) async {
    final now = FieldValue.serverTimestamp();
    final entryData = entry.toMap();
    entryData['updatedAt'] = now;

    await _vehiclesCollection
        .doc(vin)
        .collection('maintenance')
        .doc(entryId)
        .update(entryData);
  }

  // Delete maintenance entry
  Future<void> deleteMaintenanceEntry(String vin, String entryId) async {
    await _vehiclesCollection
        .doc(vin)
        .collection('maintenance')
        .doc(entryId)
        .delete();
  }
}
