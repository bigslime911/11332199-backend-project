# backend-project
Register Patients:

Endpoint: POST /patients/register
Usage: Empowers front-desk executives to seamlessly enroll new patients by inputting their comprehensive details into the system.
Description:
This endpoint allows the front-desk executive to register a new patient by providing essential information such as patient ID, surname, other names, gender, phone number, residential address, and emergency contact details. The collected information forms a patient profile within the system, enabling efficient management of patient records.
Start an Encounter:

Endpoint: POST /encounters/start
Usage: Facilitates front-desk executives in initializing patient encounters, capturing essential details such as date, time, and the type of visitation.
Description:
This endpoint empowers front-desk executives to commence patient encounters, recording crucial details including the date, time, and type of visitation (Emergency/OPD/Specialist Care). By leveraging this endpoint, the system ensures a structured and comprehensive record of each patient's visit, contributing to a holistic Electronic Medical Record (EMR).
Submit Patient Vitals:

Endpoint: POST /nurse/vitals
Usage: Authorizes nurses to effortlessly record and store critical patient vitals, including blood pressure, temperature, pulse, and spo2.
Description:
This endpoint empowers authorized nursing staff to efficiently record and store vital signs of patients. Nurses can input essential health metrics such as blood pressure, temperature, pulse, and spO2, ensuring accurate and detailed patient records within the Electronic Medical Record System.
View List of Patients:

Endpoint: GET /doctor/patients
Usage: Grants doctors the ability to efficiently access a compiled list of all enrolled patients for comprehensive overview and management.
This endpoint empowers authorized medical doctors to access a compiled list of all patients enrolled in the Electronic Medical Record System. By querying this endpoint, doctors can efficiently gather an overview of patients under their care, supporting informed decision-making and streamlined patient management.
View Patient Details:

Endpoint: GET /doctor/patients/:patientId
Usage: Enables doctors to gain profound insights into the health history and specifics of an individual patient using their unique identifier.
Description:
This endpoint facilitates doctors in retrieving comprehensive details about a specific patient identified by their unique patient ID. By querying this endpoint, doctors can access profound insights into the health history, encounters, and vitals of an individual patient. This functionality supports personalized and informed medical care.
