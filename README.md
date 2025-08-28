# Ilmo - LMS  
### Learn, Engage, and Grow with a Modern Learning Management System

## Introduction / Overview  

Ilmo is a **Learning Management System (LMS)** built using **Next.js** for client-side rendering, ensuring SEO friendliness and a smooth user experience, combined with a strong **Node.js/Express** backend for handling core services.  

The platform enables an admin to create and publish courses that users can purchase and enroll in. Learners can watch course videos directly on the platform through an integrated video player, access supporting materials via a dedicated resources section for each video, and actively engage by posting questions related to specific sections.  

Additionally, users can share feedback through course reviews, fostering a collaborative and interactive learning environment.  

## Goals of the Project  

- Build a platform similar to Udemy on a smaller scale where courses can be sold directly, giving the admin full control.  
- Enable the admin to manage and track all users, orders, questions, and reviews efficiently.  
- Provide learners with an intuitive and interactive experience, minimizing the steps required to get started.  
- Ensure instant access to courses, payments, questions, and reviews to keep the learning process seamless.

## Architecture Overview  

The Ilmo platform is structured into four main layers: **Frontend, Backend, Database, and Real-Time Layer**.  

### Frontend  
- Built with **Next.js** (using built-in routing).  
- Protected routes for both logged-in users and admin-only areas.  
- **Tailwind CSS v4** for responsive styling and modern design.  
- **Cookies** used for handling authentication and storing tokens securely.  
- **React Icons** for UI icons.  
- Custom CSS classes for loaders.  
- **Material UI** for datagrids, boxes, and modals.  
- **ReCharts** to display dynamic data in the form of charts.  

### Backend  
- Developed using **Node.js + Express.js**.  
- Modular architecture with separate folders for `utils`, `middleware`, `models`, `routes`, `controllers`, and `services`.  
- **Authentication**: JWT-based for token verification and secure access.  
- **NodeMailer** integrated with custom EJS templates for sending emails (account creation, Q&A responses, purchase confirmations).  
- **Global error handlers** for API endpoint errors and async error handling.  
- **Services layer** to implement business logic separately for improved clarity and maintainability.  

### Database  
- **MongoDB** with **Mongoose ODM**.  
- **Schemas/Models**:  
  - **Users** (roles: user, admin, moderator).  
  - **Courses** schema (referencing multiple related schemas).  
  - **Layout** schema (dynamic layouts like Hero Section, FAQs, Categories).  
  - **Orders** for tracking purchases.  
  - **Notifications** for real-time updates.  
- **Redis** for caching frequently accessed data and active users to improve performance.  

### Real-Time Layer  
Implemented using **Socket.IO** for real-time communication.  

**Events and their purpose:**  
- `notification` → Sent from frontend to server when a new notification is created.  
- `newNotification` → Broadcasted from server to all connected admins when a new notification arrives.  
- `connection` → Triggered when a user connects to the socket server.  
- `disconnect` → Triggered when a user disconnects.

## Architecture Overview

![Ilmo Architecture](https://res.cloudinary.com/duxd5fq1t/image/upload/v1756382318/Mermaid_Chart_-_Create_complex_visual_diagrams_with_text._A_smarter_way_of_creating_diagrams.-2025-08-28-103406_aitsbl.png)

# Platform Features

## Learner Features
- Search for courses by title.  
- Browse the entire list of courses.  
- Filter courses by categories.  
- Purchase courses smoothly via **Stripe payment gateway** with multiple wallet options.  
- Access purchased courses with:  
  - Video sections (smooth playback, minimal distractions).  
  - Video-specific descriptions.  
  - Resource materials with external links.  
  - Q&A section (ask questions, reply by peers or admin).  
  - Ability to leave a review on the course.  
- Profile management:  
  - Change password and avatar.  
  - View purchased courses.  
  - Logout easily.  
- Seamless login/signup using **Google OAuth** or **GitHub OAuth**.  

## Admin Features
- **User & Course Management**  
  - Manage all users and courses.  
  - Create and update courses.  
  - Promote users to **admin** or **moderator**, giving them dashboard and course management access.  

- **Admin Dashboard**  
  - Real-time notifications (orders, questions, reviews) via **socket server** with sound alerts.  
  - Access invoices.  

- **Analytics & Insights**  
  - View analytics for **courses, orders, and users**.  
  - Monitor platform performance and growth.  

- **Community Engagement**  
  - Replies from admin are marked with a **special badge** to build trust.  

- **Platform Customization**  
  - Dynamically change **Hero section** (image, title, subtitle).  
  - Add and remove **FAQs**.  
  - Manage and update **categories**.  

## Tech Stack

### Frontend
- **Next.js** — React framework providing server-side rendering, routing, and optimized performance.  
- **Tailwind CSS v4** — Utility-first CSS framework for responsive, modern UI design.  
- **Redux Toolkit Query (RTK Query)** — For efficient data fetching, caching, and state synchronization.  
- **Redux Toolkit** — Centralized state management for predictable app behavior.  
- **Material UI (MUI)** — Pre-built, accessible UI components for a polished interface.  
- **ReCharts** — Charting library for visualizing analytics and reports.  

### Backend
- **Node.js & Express.js** — Backend runtime and framework for building REST APIs.  
- **Socket.io** — Enables real-time, bi-directional communication (e.g., notifications, chat).  
- **Mongoose** — ODM for managing MongoDB collections with schema validation.  
- **Stripe** — Handles secure payments, subscriptions, and wallet transactions.  
- **Cloudinary** — Cloud storage for images like course thumbnails, profile avatars, and hero banners.  
- **NodeMailer** — For sending automated emails such as confirmations, receipts, and password resets.  

### Database
- **MongoDB** — Primary NoSQL database for storing users, courses, orders, and reviews.  
- **Redis** — In-memory store for caching, improving speed of queries and sessions.  

### Authentication
- **JWT (JSON Web Tokens)** — Token-based authentication for secure session management.  
- **Google OAuth & GitHub OAuth via NextAuth** — Social login options for seamless access.  

### Deployment & DevOps
- **Vercel** — Deploys and hosts the Next.js frontend with CI/CD integration.  
- **Render** — Hosts the Node.js & Express backend with scalable infrastructure.  
- **MongoDB Atlas** — Managed cloud database service for reliable storage and backups.

## Database Entities and Attributes

| Entity | Attributes |
|--------|------------|
| **User** | _id, name, email, password, avatar (public_id, url), role, isVerified, courses (array of courseId), createdAt, updatedAt |
| **Course** | _id, name, description, category, price, estimatedPrice, thumbnail (public_id, url), tags, level, demoUrl, benefits (array), prerequisites (array), reviews (array of review objects), questions (array of comment objects), courseData (array of objects: title, description, videoUrl, videoSection, videoLength, videoPlayer, links array, suggestion, questions array), ratings, purchased, instructor (userId), createdAt, updatedAt |
| **Order** | _id, courseId, userId, payment_info (object), createdAt, updatedAt |
| **Notification** | _id, title, message, status (e.g. unread/read), userId (optional target), createdAt, updatedAt |
| **Layout** | _id, type, faq (array of {question, answer}), categories (array of {title}), banner (image public_id, image url, title, subTitle), createdAt, updatedAt |

## Entity Relationship Diagram (ERD)

![ERD](https://res.cloudinary.com/duxd5fq1t/image/upload/v1756384577/Mermaid_Chart_-_Create_complex_visual_diagrams_with_text._A_smarter_way_of_creating_diagrams.-2025-08-28-123608_qp6uil.png)

## User Journey/ Flow

**User/Learner Journey:**
Sign up/Login → Browse Courses → Open Course Preview → Buy Course → Open Course Access → Watch Course Videos → Ask Questions → Give Review

**Admin Journey:**
Login as Admin → Open Admin Dashboard → Update Layout → Create Course → View Analytics → Answer Questions on Courses → Reply to Reviews

![Flow Diagram](https://res.cloudinary.com/duxd5fq1t/image/upload/v1756385030/Mermaid_Chart_-_Create_complex_visual_diagrams_with_text._A_smarter_way_of_creating_diagrams.-2025-08-28-124340_gdnynv.png)

## Best Practices

- Modular backend structure (controllers, services, routes, models).  
- JWT & OAuth (Google/GitHub) for secure authentication.  
- Next.js with protected routes and responsive Tailwind CSS design.  
- Global error handling and services layer for clean APIs.  
- Real-time notifications via Socket.IO for admins.  
- MongoDB + Mongoose with Redis caching for performance.  
- Stripe integration for smooth payments; orders linked to users/courses.  
- Cloudinary for media, NodeMailer with EJS for emails.  
- Admin dashboard with ReCharts for analytics.  
- Reusable components and consistent coding conventions.

## Challenges & Solutions

- **Challenge:** Implement highly secure authentication system  
  **Solution:** Used a two-token approach with Access and Refresh tokens. The access token expires every 5 minutes, while the refresh token revalidates it, ensuring high security with minimal user friction.

- **Challenge:** Image Integration  
  **Solution:** Integrated Cloudinary to store images efficiently, organizing them into folders for easy updates and deletions.

- **Challenge:** Smooth queries without reloading  
  **Solution:** Implemented Redux Toolkit Query (RTK Query) to manage API requests and data fetching dynamically, allowing seamless updates without page reloads.

- **Challenge:** Cookie handling on deployment  
  **Solution:** Adjusted backend cookie configuration to support secure cookies over HTTPS and deployed networks.

- **Challenge:** NodeMailer EJS templates not available on production  
  **Solution:** Ensured the static Mail folder was included in the build by modifying the build command to copy it to the distribution folder after building.

## Conclusion

This project was an excellent learning experience, allowing me to get hands-on with Next.js and implement server-side rendering (SSR) for a more SEO-friendly platform. Working with video players, complex course schemas, and real-time functionality using Socket.IO enhanced my understanding of full-stack development. I also gained practical experience with secure authentication, payment integration, cloud media storage, and building intuitive user and admin dashboards. Overall, Ilmo LMS helped me strengthen both my technical skills and architectural design approach.

## Author

**Muhammad Ali Khan**
Full-Stack Developer | MERN Stack | Real-Time Systems | Scalable Web Apps

* LinkedIn: [linkedin.com/in/m-alikhan0616](https://www.linkedin.com/in/m-alikhan0616/)
* GitHub: [github.com/alikhan0616](https://github.com/alikhan0616)
* Email: [m.akhan0616@gmail.com](mailto:m.akhan0616@gmail.com)




