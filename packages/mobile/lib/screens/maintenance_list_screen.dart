import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/firestore_service.dart';
import '../models/maintenance.dart';
import 'maintenance_detail_screen.dart';

class MaintenanceListScreen extends StatefulWidget {
  final String vin;

  const MaintenanceListScreen({super.key, required this.vin});

  @override
  State<MaintenanceListScreen> createState() => _MaintenanceListScreenState();
}

class _MaintenanceListScreenState extends State<MaintenanceListScreen> {
  final _titleController = TextEditingController();
  final _notesController = TextEditingController();
  final _costController = TextEditingController();
  List<Maintenance> _entries = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadEntries();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _notesController.dispose();
    _costController.dispose();
    super.dispose();
  }

  Future<void> _loadEntries() async {
    setState(() => _loading = true);
    try {
      final firestoreService = context.read<FirestoreService>();
      final entries = await firestoreService.getMaintenanceEntries(widget.vin);
      setState(() {
        _entries = entries;
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error loading maintenance entries: $e')),
        );
      }
    }
  }

  Future<void> _addEntry() async {
    if (_titleController.text.trim().isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Title is required')));
      return;
    }

    final costText = _costController.text.trim();
    double? cost;
    if (costText.isNotEmpty) {
      cost = double.tryParse(costText);
      if (cost == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Cost must be a valid number')),
        );
        return;
      }
    }

    try {
      final firestoreService = context.read<FirestoreService>();
      await firestoreService.addMaintenanceEntry(
        widget.vin,
        Maintenance(
          id: '', // Will be set by Firestore
          title: _titleController.text.trim(),
          notes: _notesController.text.trim(),
          cost: cost ?? 0.0,
          date: DateTime.now(),
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        ),
      );

      _titleController.clear();
      _notesController.clear();
      _costController.clear();

      await _loadEntries();

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Maintenance entry added')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Error adding entry: $e')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Maintenance - ${widget.vin}')),
      body: Column(
        children: [
          // Add new entry form
          Card(
            margin: const EdgeInsets.all(16),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Text(
                    'Add Maintenance Entry',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _titleController,
                    decoration: const InputDecoration(
                      labelText: 'Title *',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _notesController,
                    decoration: const InputDecoration(
                      labelText: 'Notes',
                      border: OutlineInputBorder(),
                    ),
                    maxLines: 3,
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _costController,
                    decoration: const InputDecoration(
                      labelText: 'Cost',
                      border: OutlineInputBorder(),
                      prefixText: '\$',
                    ),
                    keyboardType: TextInputType.number,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: _addEntry,
                    child: const Text('Add Entry'),
                  ),
                ],
              ),
            ),
          ),
          // Entries list
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : _entries.isEmpty
                ? const Center(
                    child: Text(
                      'No maintenance entries yet.\nAdd one using the form above.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 16, color: Colors.grey),
                    ),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: _entries.length,
                    itemBuilder: (context, index) {
                      final entry = _entries[index];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        child: ListTile(
                          title: Text(entry.title),
                          subtitle: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              if (entry.notes.isNotEmpty) Text(entry.notes),
                              const SizedBox(height: 4),
                              Text(
                                'Cost: \$${entry.cost.toStringAsFixed(2)} • ${entry.date.day}/${entry.date.month}/${entry.date.year}',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey[600],
                                ),
                              ),
                            ],
                          ),
                          onTap: () async {
                            final result = await Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => MaintenanceDetailScreen(
                                  vin: widget.vin,
                                  entryId: entry.id,
                                ),
                              ),
                            );
                            if (result == true) {
                              _loadEntries();
                            }
                          },
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
