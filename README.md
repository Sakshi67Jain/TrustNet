# TrustNet

TrustNet is a mobile-based personal safety application developed using React, TypeScript, Firebase Authentication, and Cloud Firestore. The application enables users to create trusted contact networks, share live locations, and trigger SOS alerts during emergencies.
## Features

### Secure User Authentication

TrustNet implements a secure authentication system using Firebase Authentication with OTP-based phone verification. This passwordless approach ensures that every user is verified before accessing the platform while providing a seamless login experience.

**Key Features**
- Phone number registration and login
- One-Time Password (OTP) verification
- Firebase Authentication integration
- Invisible Google reCAPTCHA verification
- Persistent user sessions
- Automatic user profile creation in Firestore
- Secure logout functionality

---

### Trust Network Management

The core functionality of TrustNet revolves around creating a trusted network of contacts who can assist users during emergencies. The application enables users to build and manage trusted relationships securely.

**Key Features**
- Search users using registered phone numbers
- Send trust requests
- Accept or reject incoming trust requests
- View trusted contacts
- Prevent duplicate trust requests
- Prevent self-request generation
- Maintain trust relationship status in real time

---

### Real-Time Location Sharing

TrustNet enables users to securely share their live location with trusted contacts during emergencies. User locations are stored using Firestore GeoPoints, allowing accurate geographical tracking.

**Key Features**
- Update current user location
- Enable or disable location sharing
- Store location using Firestore GeoPoints
- Retrieve trusted contacts' locations
- Timestamp every location update
- Real-time location synchronization

---

### SOS Emergency System

The application provides a structured SOS mechanism that allows users to instantly trigger emergency alerts. Each SOS event is managed through dedicated Firestore sessions to ensure reliable communication with trusted contacts.

**Key Features**
- Create SOS sessions
- Trigger emergency alerts
- Track SOS session status
- Cancel active SOS sessions
- Resolve completed SOS sessions
- Maintain alert history
- Real-time SOS updates using Firestore listeners

---

### Notification Management

TrustNet includes a notification system to keep users informed about trust requests, emergency alerts, and important application events.

**Key Features**
- Generate notifications
- Retrieve user notifications
- Mark notifications as read
- Store notification history
- Timestamp every notification

**Supported Notification Types**
- Trust Requests
- Trust Request Accepted
- SOS Alerts
- General Notifications

---

### Firebase Cloud Integration

The project is fully integrated with Firebase services, providing a scalable cloud-based backend for authentication and data storage.

**Firebase Services Used**
- Firebase Authentication
- Cloud Firestore
- Firebase SDK
- Firestore GeoPoint
- Server Timestamp

---

### Modular Service-Based Architecture

The application follows a modular architecture where each major functionality is implemented as an independent service. This improves maintainability, scalability, and code reusability.

**Implemented Services**
- Authentication Service
- Trust Service
- SOS Service
- Location Service
- Notification Service

---

### Type-Safe Development

The entire application is developed using TypeScript, ensuring better code quality, improved maintainability, and enhanced developer experience.

**Implemented Models**
- User
- Trust Relationship
- SOS Session
- User Location

---

### Input Validation

The application validates user inputs before interacting with Firebase services, ensuring data consistency and minimizing invalid requests.

**Validation Features**
- Phone number validation
- Utility helper functions
- Centralized application constants
- SOS status validation
- Trust request status validation

---

## Technology Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React.js |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | CSS3 |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Backend Services | Firebase SDK |
| Location Services | Firestore GeoPoint |
| State Management | React Hooks |
| Package Manager | npm |
| Linting | ESLint |
| Version Control | Git |

---

## Project Architecture

The application follows a layered architecture that separates presentation, business logic, and data access, resulting in a clean, scalable, and maintainable codebase.

```
Presentation Layer
│
├── React Components
│
Business Logic Layer
│
├── Authentication Service
├── Trust Service
├── SOS Service
├── Notification Service
└── Location Service
│
Data Layer
│
├── Firebase Authentication
└── Cloud Firestore
```

---

## Project Structure

```
src/
│
├── assets/
│
├── firebase/
│   └── firebase.ts
│
├── services/
│   ├── authService.ts
│   ├── trustService.ts
│   ├── sosService.ts
│   ├── notificationService.ts
│   └── locationService.ts
│
├── types/
│   ├── user.ts
│   ├── trust.ts
│   ├── sos.ts
│   └── location.ts
│
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   └── validators.ts
│
├── App.tsx
├── main.tsx
└── testBackend.ts
```

---

## Security Features

- OTP-based phone authentication
- Firebase Authentication integration
- Passwordless login mechanism
- Verified user accounts
- Firestore server timestamps
- Secure trust relationship validation
- Prevention of duplicate trust requests
- Persistent authenticated sessions
- Input validation before database operations

---

## Scalability

The modular architecture allows the application to be easily extended with additional features such as:

- Push notifications
- AI-powered emergency detection
- Voice-activated SOS
- Live map integration
- Emergency service integration
- End-to-end encrypted messaging
- Wearable device support
- Offline emergency mode
- Analytics dashboard
- Multi-language support
- Administrative dashboard
