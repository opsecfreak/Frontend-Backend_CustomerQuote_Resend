# AI Services Quote Request System - Full Stack Repository

> **Complete AI-powered quote request solution with customer form and admin dashboard**

This repository contains a full-stack application for handling AI services quote requests, featuring intelligent form processing, automated email notifications, and a comprehensive admin dashboard.

## 🏗️ Repository Overview

This project consists of **two separate Next.js applications** that work together:

```
nextjs-outbound-api/
├── 📁 my-next-app/                    ← Customer-facing quote request form
├── 📁 backend-analytics-form-view/    ← Admin dashboard for managing submissions
└── 📄 README.md                       ← This file
```

## 🎯 How The System Works

### 1. **Customer Journey** (`my-next-app`)
```
Customer visits form → Fills out quote request → AI processes submission → Email sent to admin → Data stored in database
```

### 2. **Admin Journey** (`backend-analytics-form-view`)
```
Admin logs in → Views dashboard → Reviews AI summaries → Manages submissions → Responds to clients
```

### 3. **Shared Database**
Both applications use the same PostgreSQL database to ensure data consistency and real-time updates.

---

## 📚 Quick Start Guide

### 🔴 **IMPORTANT: Check Both Directories**

Each application has its own detailed README with specific setup instructions:

#### 🌐 **Frontend Application** 
📁 **`my-next-app/`** - Customer quote request form
- **Purpose**: Customer-facing form for AI services quotes
- **Features**: AI processing, email notifications, form validation
- **Port**: `http://localhost:3000`
- **Setup**: See [`my-next-app/README.md`](./my-next-app/README.md)

#### 🔧 **Admin Dashboard**
📁 **`backend-analytics-form-view/`** - Administrative interface
- **Purpose**: View and manage form submissions
- **Features**: Search, AI summaries, detailed views, analytics
- **Port**: `http://localhost:3000` (or 3001 if running both)
- **Default Login**: Password is `admin12345`
- **Setup**: See [`backend-analytics-form-view/README.md`](./backend-analytics-form-view/README.md)

---

## ⚡ Quick Commands

### Setup Both Applications:
```bash
# Clone repository
git clone <repository-url>
cd nextjs-outbound-api

# Setup Frontend
cd my-next-app
npm install
npx prisma generate
npx prisma db push
npm run dev

# Setup Admin Dashboard (new terminal)
cd ../backend-analytics-form-view
npm install
npx prisma generate
npm run dev -- --port 3001
```

### Access Applications:
- **Customer Form**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001 (login: `admin12345`)

---

## 🔑 Required Environment Variables

Both applications need environment configuration. Create `.env` files in each directory:

### Frontend (my-next-app/.env):
```env
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_postgresql_url
RESEND_API_KEY=your_resend_api_key
```

### Admin Dashboard (backend-analytics-form-view/.env):
```env
DATABASE_URL=your_postgresql_url
ADMIN_PASSWORD=admin12345
```

---

## 🎯 Application Features

| Feature | Frontend | Admin Dashboard |
|---------|----------|-----------------|
| Quote Request Form | ✅ | ❌ |
| AI Form Processing | ✅ | ❌ |
| Email Notifications | ✅ | ❌ |
| View Submissions | ❌ | ✅ |
| Search & Filter | ❌ | ✅ |
| AI Summary Display | ❌ | ✅ |
| Admin Authentication | ❌ | ✅ |
| Analytics Dashboard | ❌ | ✅ |

---

## 🚀 Technology Stack

### Shared Technologies:
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS

### Frontend Specific:
- **AI Processing**: OpenAI GPT-4o-mini
- **Email Service**: Resend API
- **Form Handling**: React Hook Form + Zod

### Admin Dashboard Specific:
- **Authentication**: Cookie-based sessions
- **UI Components**: Custom React components
- **Icons**: Lucide React

---

## 📊 Database Schema

Both applications share the same database schema for form submissions:

```typescript
FormSubmission {
  id: string              // Unique identifier
  createdAt: DateTime     // Submission timestamp
  updatedAt: DateTime     // Last update
  aiSummary: string?      // AI-generated business summary
  summary: string         // Basic summary
  fromemail: string       // Customer email
  companyName: string?    // Company information
  contactPerson: string?  // Contact details
  requirements: string?   // Project requirements
  // ... additional fields
}
```

---

## 🔧 Development Workflow

### 1. **Initial Setup**
```bash
# Setup database and environment variables
# Install dependencies for both applications
# Generate Prisma clients
```

### 2. **Development**
```bash
# Run frontend for customer testing
cd my-next-app && npm run dev

# Run admin dashboard for submission management
cd backend-analytics-form-view && npm run dev -- --port 3001
```

### 3. **Testing Flow**
1. Submit form via frontend (`localhost:3000`)
2. Check email notifications
3. View submission in admin dashboard (`localhost:3001`)
4. Review AI-generated summaries

---

## 📞 Support & Documentation

### 📖 **Detailed Documentation**
- **Frontend Setup**: [`my-next-app/README.md`](./my-next-app/README.md)
- **Admin Dashboard**: [`backend-analytics-form-view/README.md`](./backend-analytics-form-view/README.md)

### 🆘 **Common Issues**
- **Port Conflicts**: Use `--port` flag to run on different ports
- **Database Connection**: Ensure same `DATABASE_URL` in both `.env` files
- **Authentication**: Default admin password is `admin12345`
- **VS Code Issues**: Close and restart when switching between projects

### 🔗 **Prerequisites**
- Node.js 18+
- PostgreSQL database
- OpenAI API key (for AI processing)
- Resend API key (for emails)

---

## 🎯 Project Goals

This system enables businesses to:
- **Collect AI service inquiries** through a professional form
- **Process submissions intelligently** using AI analysis
- **Notify administrators immediately** via email
- **Manage submissions efficiently** through admin dashboard
- **Gain insights** from AI-powered business analysis

---

## 📋 Next Steps

1. **📁 Check [`my-next-app/README.md`](./my-next-app/README.md)** for frontend setup
2. **📁 Check [`backend-analytics-form-view/README.md`](./backend-analytics-form-view/README.md)** for admin setup
3. **🔧 Configure environment variables** for both applications
4. **🚀 Run both applications** for complete functionality

---

**Repository**: nextjs-outbound-api  
**Created**: August 2025  
**Applications**: Customer Form + Admin Dashboard  
**Database**: Shared PostgreSQL with Prisma ORM
