# TrustNet Backend

## Overview

TrustNet is a personal safety platform designed to provide real-time emergency assistance through a trusted network of contacts, verified guardian volunteers, and community safe spaces. This repository contains the backend implementation responsible for managing authentication, trust relationships, SOS sessions, live location updates, notifications, user management, guardian ratings, and safe space services using Firebase.

The backend is built using **TypeScript** and **Firebase Firestore**, with a service-oriented architecture that separates business logic into reusable modules.

---

# Features

## Authentication

- Firebase Authentication integration
- User registration and login support
- User profile creation after successful authentication
- Session management
- Current user retrieval
- Logout functionality

---

## Trust Circle Management

The Trust Circle module manages trusted relationships between users.

Implemented functionalities include:

- Search registered users by phone number
- Send trust requests
- Accept trust requests
- Reject trust requests
- Retrieve Layer-1 trusted contacts
- Fetch pending trust requests
- Remove trust relationships
- Retrieve user information

All trust relationships are stored in the Firestore collection:

```
trust_relationships
```

---

## SOS Management

The SOS module handles the complete emergency workflow.

Implemented functionalities include:

- Trigger SOS session
- Cancel SOS session
- End SOS session
- Acknowledge emergency requests
- Archive completed SOS sessions
- Retrieve SOS session details
- Listen for real-time SOS updates
- Register responders
- Update responder locations

Each SOS session stores:

- Triggered user
- Current status
- Active escalation layer
- Alerted contacts
- Responders
- Start and end timestamps

Collections used:

```
sos_sessions
sos_history
```

---

## Location Services

Real-time location services allow the application to track trusted users during emergencies.

Implemented features:

- Update user location
- Stop live location sharing
- Fetch locations of trusted contacts
- Store GeoPoint coordinates
- Maintain timestamp of latest update
- Manage sharing permissions

Firestore collection:

```
user_locations
```

---

## Notification Service

Notification services provide communication between users during emergency situations.

Implemented features:

- Send notifications
- Notify Layer-1 contacts
- Notify responders
- Retrieve user notifications

Notification types include:

- SOS Alert
- Emergency Ended
- Trust Request
- General Updates

Firestore collection:

```
notifications
```

---

## Guardian Rating System

Guardian volunteers can receive community feedback after responding to emergencies.

Implemented features:

- Submit guardian ratings
- Update average guardian rating
- Retrieve guardian rating history
- Calculate overall rating

Stored information includes:

- User ID
- Guardian ID
- Rating
- Comments
- Timestamp

Firestore collection:

```
ratings
```

---

## Safe Space Service

The Safe Space module helps users locate verified safe locations nearby.

Implemented functionalities include:

- Retrieve all verified safe spaces
- Search nearby safe spaces
- Calculate nearest safe space
- Estimate distance between user and safe spaces

Firestore collection:

```
safe_spaces
```

---

## User Service

Responsible for user profile management.

Implemented functionalities:

- Retrieve user profile
- Update profile information
- Update online/offline status
- Manage verification status

Firestore collection:

```
users
```

---

# Project Structure

```
src
│
├── firebase
│   └── firebase.ts
│
├── services
│   ├── authService.ts
│   ├── trustService.ts
│   ├── sosService.ts
│   ├── locationService.ts
│   ├── notificationService.ts
│   ├── userService.ts
│   ├── ratingService.ts
│   └── safeSpaceService.ts
│
├── types
│   ├── user.ts
│   ├── trust.ts
│   ├── sos.ts
│   └── location.ts
│
└── utils
    ├── constants.ts
    ├── helpers.ts
    └── validators.ts
```

---

# Firestore Collections

The backend uses the following Firestore collections:

```
users
trust_relationships
sos_sessions
sos_history
user_locations
notifications
ratings
safe_spaces
```

---

# Technologies Used

- TypeScript
- Firebase Authentication
- Firebase Firestore
- React
- Vite

---

# Backend Architecture

The backend follows a service-based architecture.

```
Frontend

      ↓

Service Layer

      ↓

Firebase Authentication

      ↓

Cloud Firestore
```

Each service is responsible for a single feature area, making the code modular, reusable, and easier to maintain.

---

# Firestore Security

The project includes custom Firestore Security Rules to ensure:

- Users can access only their own profile.
- Users can update only their own location.
- Authenticated users can access trust relationships.
- Authenticated users can interact with SOS sessions.
- Unauthorized database access is prevented.

---

# Future Improvements

The current implementation establishes the core backend functionality. Future enhancements may include:

- Layer-2 and Layer-3 emergency escalation
- Push notifications using Firebase Cloud Messaging
- Background location tracking
- Offline synchronization
- Image uploads using Firebase Storage
- Cloud Functions for automatic emergency escalation
- Analytics dashboard for emergency response

---

# Backend Responsibilities

This implementation focuses on the backend layer of TrustNet and includes:

- Firebase integration
- Firestore database operations
- Authentication services
- Trust circle management
- SOS lifecycle management
- Live location management
- Notification handling
- Guardian rating system
- Safe space management
- User profile management

The frontend interface consumes these services to provide a complete real-time emergency assistance platform.
