# TrustNet

TrustNet is a mobile-based personal safety application developed using React, TypeScript, Firebase Authentication, and Cloud Firestore. The application enables users to create trusted contact networks, share live locations, and trigger SOS alerts during emergencies.
Features
 Secure Phone Number Authentication

TrustNet uses Firebase Authentication with OTP-based phone verification, eliminating the need for passwords while ensuring that every registered user is verified before accessing the platform.

Implemented Features
Phone number registration and login
OTP verification using Firebase Authentication
Invisible Google reCAPTCHA integration
Secure session management
Automatic user profile creation in Firestore
Logout functionality
Persistent authentication state
Benefits
Password-free authentication
Reduced risk of credential theft
Faster onboarding process
Trusted and verified users
👥 Trust Relationship Management

One of the core functionalities of TrustNet is its Trust Network, allowing users to create a reliable circle of trusted contacts.

Implemented Features
Search users using their registered phone number
Send trust requests
Accept incoming trust requests
Reject trust requests
Retrieve accepted trusted contacts
Maintain trust relationship status
Prevent duplicate trust requests
Prevent self-requests
Firestore Collection
trust_relationships

Stores

User A
User B
Request Status
Timestamp
Benefits

Instead of relying only on emergency contacts saved in the phone, TrustNet creates a dynamic and secure trust network where relationships are verified within the application.

📍 Real-Time Location Sharing

TrustNet supports secure location sharing among trusted contacts during emergencies.

Implemented Features
Update user's current location
Store geographical coordinates using Firestore GeoPoint
Enable or disable location sharing
Retrieve trusted users' live locations
Timestamp every location update
Firestore Collection
user_locations

Stores

User ID
GeoPoint
Timestamp
Sharing Status
Benefits
Real-time emergency tracking
Location history support
Efficient emergency response
 Multi-Layer SOS System

TrustNet provides a structured emergency alert mechanism instead of sending alerts to everyone simultaneously.

Implemented Features
Trigger SOS session
Create unique SOS records
Maintain SOS status
Escalation layer tracking
SOS cancellation
SOS resolution
Real-time SOS monitoring using Firestore listeners
Track acknowledgement status
SOS States
Active
Cancelled
Resolved
Firestore Collection
sos_sessions

Stores

Session ID
Triggered By
Active Layer
Status
Start Time
End Time
Alerted Contacts
Acknowledged Contact
Benefits
Structured emergency response
Reduced notification spam
Layer-wise escalation
Real-time synchronization
🔔 Notification System

TrustNet includes a notification module to inform users about important events.

Implemented Features
Send notifications
Store notifications in Firestore
Retrieve notifications
Mark notifications as read
Timestamp every notification
Supported Notifications
Trust Requests
Trust Accepted
SOS Alerts
System Notifications
Firestore Collection
notifications

Stores

Sender
Receiver
Title
Message
Notification Type
Read Status
Timestamp
☁ Firebase Cloud Integration

The project is completely integrated with Firebase services.

Firebase Services Used
Firebase Authentication
Cloud Firestore
Firebase SDK
Server Timestamp
Firestore GeoPoint
Advantages
Fully managed backend
Real-time synchronization
Scalable architecture
Secure authentication
Cloud-hosted database
🧩 Modular Service-Based Architecture

The project follows a clean separation of concerns by organizing business logic into dedicated service modules.

Implemented Service Modules
Authentication Service

Location Service

SOS Service

Trust Service

Notification Service

Each module handles a single responsibility, making the application easier to maintain, extend, and test.

📂 Strong Type Safety

The project is written using TypeScript, providing strict typing across the application.

Implemented Models
User

TrustRelationship

SOSSession

UserLocation

Benefits include:

Better IDE support
Early error detection
Improved maintainability
Cleaner codebase
✅ Input Validation

Utility functions are implemented to validate user inputs before interacting with Firebase.

Current Validations
Phone number validation
Helper utility functions
Application constants
SOS status constants
Trust request status constants
🛠 Technology Stack
Category	Technologies Used
Frontend	React.js
Language	TypeScript
Build Tool	Vite
Styling	CSS3
Authentication	Firebase Authentication
Database	Cloud Firestore
Backend Services	Firebase SDK
Location Storage	Firestore GeoPoint
State Management	React Hooks
Version Control	Git
Package Manager	npm
Linting	ESLint
