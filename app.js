// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define patient schema
const patientSchema = new mongoose.Schema({
  patientID: { type: String, required: true },
  surname: { type: String, required: true },
  otherNames: { type: String },
  gender: { type: String, required: true },
  phoneNumber: { type: String },
  residentialAddress: { type: String },
  emergencyContact: {
    name: { type: String },
    contact: { type: String },
    relationship: { type: String }
  },
  encounters: [
    {
      date: { type: Date, default: Date.now },
      time: { type: String },
      type: { type: String, enum: ['Emergency', 'OPD', 'Specialist Care'] },
      vitals: {
        bloodPressure: { type: String },
        temperature: { type: String },
        pulse: { type: String },
        spO2: { type: String }
      }
    }
  ]
});

const Patient = mongoose.model('Patient', patientSchema);

app.use(bodyParser.json());

// Register a new patient
app.post('/patients', async (req, res) => {
  const {
    patientID,
    surname,
    otherNames,
    gender,
    phoneNumber,
    residentialAddress,
    emergencyContact
  } = req.body;

  try {
    const patient = new Patient({
      patientID,
      surname,
      otherNames,
      gender,
      phoneNumber,
      residentialAddress,
      emergencyContact
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start a new encounter for a patient
app.post('/encounters/:patientID', async (req, res) => {
  const { time, type, vitals } = req.body;
  const patientID = req.params.patientID;

  try {
    const patient = await Patient.findOne({ patientID });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    patient.encounters.push({ time, type, vitals });
    await patient.save();

    res.status(201).json(patient.encounters[patient.encounters.length - 1]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a list of all patients
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get details for a specific patient by ID
app.get('/patients/:patientID', async (req, res) => {
  const patientID = req.params.patientID;

  try {
    const patient = await Patient.findOne({ patientID });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
