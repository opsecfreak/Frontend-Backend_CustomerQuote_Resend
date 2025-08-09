# AI Services Quote Request System - Full Stack Solution

This repository contains a complete AI-powered quote request system with two main applications:

1. **Frontend Form Application** (`my-next-app`) - Customer-facing quote request form
2. **Admin Dashboard** (`backend-analytics-form-view`) - Administrative interface for viewing submissions

## 🏗️ Repository Structure

```
nextjs-outbound-api/
├── my-next-app/                          # Frontend Quote Request Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/form/submit/          # Form submission API
│   │   │   ├── components/form.tsx       # Quote request form
│   │   │   └── page.tsx                  # Landing page
│   │   └── lib/prisma.ts                 # Database connection
│   ├── prisma/schema.prisma              # Database schema
│   └── .env                              # Environment variables
│
└── backend-analytics-form-view/          # Admin Dashboard Application
    ├── src/
    │   ├── app/
    │   │   ├── api/                      # Admin API routes
    │   │   ├── dashboard/                # Dashboard page
    │   │   └── page.tsx                  # Login page
    │   ├── components/                   # Dashboard components
    │   └── lib/prisma.ts                 # Database connection
    ├── prisma/schema.prisma              # Database schema (same as frontend)
    └── .env                              # Environment variables
```

---

# 🌐 Part 1: Frontend Quote Request System (`my-next-app`)

A modern Next.js application that allows potential clients to request quotes for AI solutions to boost company revenue, productivity, and workflow.

## 🚀 Frontend Features

- **Professional Quote Request Form** - User-friendly interface with validation
- **AI-Powered Analysis** - OpenAI integration for intelligent form processing
- **Database Integration** - Prisma ORM with PostgreSQL for data persistence
- **Email Notifications** - Automated HTML email alerts via Resend API
- **Real-time Validation** - Form validation using React Hook Form + Zod
- **Responsive Design** - Modern UI with Tailwind CSS
- **TypeScript** - Full type safety throughout the application

## 🛠️ Frontend Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Email Service**: Resend API
- **AI Processing**: OpenAI GPT-4o-mini
- **Form Handling**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## � Frontend Installation & Setup

### 1. Navigate to Frontend Directory
```bash
cd my-next-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `my-next-app` directory:

```env
# OpenAI API (for AI form processing)
OPENAI_API_KEY=your_openai_api_key_here

# Database Connection
DATABASE_URL="your_postgresql_connection_string"

# Email Service
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push database schema (creates tables)
npx prisma db push

# Optional: View data in Prisma Studio
npx prisma studio
```

### 5. Start Frontend Development Server

```bash
npm run dev
```

Frontend will be available at [http://localhost:3000](http://localhost:3000)

## 🔑 Frontend API Keys Setup

### OpenAI Configuration
1. Go to [https://platform.openai.com/](https://platform.openai.com/)
2. Create an API key
3. Add to `.env`: `OPENAI_API_KEY=sk-...`

### Resend API Configuration
1. Go to [https://resend.com/](https://resend.com/)
2. Sign up and get API key
3. Add to `.env`: `RESEND_API_KEY=re_...`
4. Default recipient: `mobiletechspecialists@gmail.com` (hardcoded)

---

# 🔧 Part 2: Admin Dashboard (`backend-analytics-form-view`)

A comprehensive administrative interface for viewing, searching, and managing form submissions with AI-powered insights.

## 🚀 Admin Dashboard Features

- **🔐 Password Authentication** - Simple admin login protection
- **📊 Submissions Dashboard** - Card-based layout with all form data
- **🔍 Advanced Search** - Search by email, company, contact person, or summary
- **🤖 AI Summary Display** - Shows AI-generated business insights
- **📋 Detailed View Modal** - Full submission details in popup
- **📱 Responsive Design** - Works perfectly on all devices
- **⚡ Real-time Data** - Live updates from the database
- **📄 Pagination** - Handle large numbers of submissions efficiently

## 🛠️ Admin Dashboard Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM (shared with frontend)
- **UI Components**: Custom React components
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Cookie-based sessions

## 🔧 Admin Dashboard Installation & Setup

### 1. Navigate to Admin Directory
```bash
cd backend-analytics-form-view
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend-analytics-form-view` directory:

```env
# Database Connection (Same as frontend)
DATABASE_URL="your_postgresql_connection_string"

# Admin Authentication
ADMIN_PASSWORD=admin12345
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Schema should already exist from frontend setup
npx prisma db push
```

### 5. Start Admin Dashboard
```bash
npm run dev
```

Admin dashboard will be available at [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Dashboard Access

### Default Login Credentials
- **Password**: `admin12345`
- **Access**: Login at the homepage
- **Session**: 24-hour cookie-based authentication

### Security Notes
- Change the default password in production
- Consider implementing proper user management for multiple admins
- Use HTTPS in production environments

---

# 🗄️ Shared Database Schema

Both applications use the same PostgreSQL database with the following schema:

```prisma
model FormSubmission {
  id             String   @id @default(cuid())
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  
  // AI-Generated Summary
  aiSummary      String?  // AI-generated detailed analysis
  
  // Basic summary
  summary        String   // Simple summary for display
  
  // Client Information
  fromemail      String   // Client email (required)
  brandName      String?  // Client's brand name
  companyName    String?  // Company name
  companyWebsite String?  // Company website
  contactPerson  String?  // Contact person name
  phoneNumber    String?  // Phone number
  budget         String?  // Project budget
  urgency        String?  // Urgency level
  questions      String?  // Client questions
  requirements   String?  // Project requirements
  additionalInfo String?  // Additional information
}
```

## 🤖 AI Summary Feature

The system automatically generates intelligent summaries using OpenAI:

- **Automatic Analysis**: Each form submission is analyzed for key insights
- **Business Context**: AI extracts business needs and potential value
- **Professional Summaries**: 2-3 sentence summaries for quick review
- **Email Integration**: AI summaries included in email notifications
- **Dashboard Display**: Prominently featured in admin interface

---

# 🚦 Running Both Applications

## Development Environment

### Option 1: Run Both Simultaneously (Different Ports)
```bash
# Terminal 1 - Frontend (Port 3000)
cd my-next-app
npm run dev

# Terminal 2 - Admin Dashboard (Port 3001)
cd backend-analytics-form-view
npm run dev -- --port 3001
```

### Option 2: Run Individually
```bash
# Run only frontend
cd my-next-app && npm run dev

# Run only admin dashboard
cd backend-analytics-form-view && npm run dev
```

## Production Deployment

### Frontend Application
- Deploy `my-next-app` to your main domain
- Configure environment variables
- Set up database connection

### Admin Dashboard
- Deploy `backend-analytics-form-view` to admin subdomain
- Use same database as frontend
- Secure with proper authentication

---

# 📧 Email System Workflow

1. **Customer submits form** → Frontend processes submission
2. **AI analyzes data** → OpenAI generates business insights
3. **Data saved to database** → Both basic and AI summaries stored
4. **Email notification sent** → HTML email to `mobiletechspecialists@gmail.com`
5. **Admin views submission** → Real-time data in admin dashboard

---

# 🔍 Troubleshooting

## Common Issues

### Database Connection
- Ensure both apps use the same `DATABASE_URL`
- Run `npx prisma db push` in both directories
- Check PostgreSQL is running

### Port Conflicts
- Frontend default: `http://localhost:3000`
- Admin default: `http://localhost:3000`
- Use `--port` flag to change ports when running both

### Authentication Issues
- Check `ADMIN_PASSWORD` in admin `.env`
- Clear browser cookies if login fails
- Verify cookie settings in production

### VS Code File Conflicts
- Close and restart VS Code when switching between projects
- Use separate VS Code windows for each application

---

# 📞 Support & Documentation

## Project Structure
- **Frontend**: Customer-facing quote request system
- **Backend**: Administrative dashboard for form management
- **Shared Database**: PostgreSQL with Prisma ORM
- **AI Integration**: OpenAI for intelligent form analysis

## Quick Start Summary
1. Set up database and environment variables
2. Install dependencies for both applications
3. Run `npx prisma generate` and `npx prisma db push` in both directories
4. Start frontend for customers, admin dashboard for management
5. Login to admin with password: `admin12345`

---

**Last Updated**: August 2025  
**Repository**: nextjs-outbound-api  
**Applications**: Frontend Quote System + Admin Dashboard
OPENAI_API_KEY=your_openai_api_key_here

# Database Connection
DATABASE_URL="your_postgresql_connection_string"

# Email Service
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Database Setup

Generate Prisma client and set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Push database schema (creates tables)
npx prisma db push

# Optional: View data in Prisma Studio
npx prisma studio
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔑 API Keys Setup

### Resend API Configuration

1. **Create Resend Account**:
   - Go to [https://resend.com/](https://resend.com/)
   - Sign up for a free account
   - Verify your email address

2. **Get API Key**:
   - Navigate to the Resend dashboard
   - Go to "API Keys" section
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Add to Environment**:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

4. **Email Configuration**:
   - Default sender: `onboarding@resend.dev` (works immediately)
   - Recipient: `mobiletechspecialists@gmail.com` (hardcoded)
   - For custom domains: verify your domain in Resend dashboard

### Database Configuration

#### Option 1: Prisma Postgres (Recommended)
```bash
# Login to Prisma
npx prisma platform login

# Create database
npx prisma postgres create my-ai-services-db
```

#### Option 2: Custom PostgreSQL
Update `DATABASE_URL` with your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── form/
│   │       └── submit/
│   │           └── route.ts          # Form submission API endpoint
│   ├── components/
│   │   └── form.tsx                  # Main quote request form
│   ├── lib/
│   │   └── prisma.ts                 # Prisma client configuration
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
├── agents/
│   └── system-prompts/
│       └── submit-form.ts            # AI prompt templates (future use)
prisma/
└── schema.prisma                     # Database schema
```

## 🗄️ Database Schema

The application uses a `FormSubmission` model with the following fields:

```prisma
model FormSubmission {
  id             String   @id @default(cuid())
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  
  // AI-Generated Summary
  aiSummary      String?  // AI-generated detailed analysis of the submission
  
  // Basic summary (fallback)
  summary        String   // Simple summary for display
  
  // Client Information
  fromemail      String   // Client email (required)
  brandName      String?  // Client's brand name
  companyName    String?  // Company name
  companyWebsite String?  // Company website
  contactPerson  String?  // Contact person name
  phoneNumber    String?  // Phone number
  budget         String?  // Project budget
  urgency        String?  // Urgency level
  questions      String?  // Client questions
  requirements   String?  // Project requirements
  additionalInfo String?  // Additional information
}
```

### AI Summary Feature

The system now automatically generates intelligent summaries using OpenAI's GPT-4o-mini model:

- **Automatic Analysis**: Each form submission is analyzed by AI to extract key insights
- **Professional Summaries**: AI provides 2-3 sentence summaries capturing business context, needs, and potential value
- **Fallback Handling**: If AI processing fails, a simple fallback summary is generated
- **Email Integration**: AI summaries are included in email notifications for quick review

## 📧 Email System

### How It Works

1. **Form Submission**: User fills out the quote request form
2. **Validation**: Data is validated using Zod schemas
3. **AI Analysis**: OpenAI generates intelligent summary of the request
4. **Database Storage**: Form data and AI summary are saved to PostgreSQL
5. **Email Notification**: HTML email with AI insights sent to `mobiletechspecialists@gmail.com`

### Email Template Features

- **Professional HTML Design** with modern styling
- **AI-Powered Insights**: Intelligent summary section with business analysis
- **Organized Sections**:
  - Header with submission ID and timestamp
  - AI-generated summary and analysis
  - Complete client information
  - Project details and requirements
- **Responsive Design** that works on all devices
- **Emoji Icons** for visual appeal

### Customizing Email Recipients

To change the recipient email, update the `sendEmailNotification` function in:
`src/app/api/form/submit/route.ts`

```typescript
to: ['your-new-email@example.com'],
```

## 🚦 Usage

### Running the Application

1. **Development**:
   ```bash
   npm run dev
   ```

2. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

3. **Linting**:
   ```bash
   npm run lint
   ```

### Testing the Form

1. Navigate to `http://localhost:3000`
2. Fill out the quote request form
3. Submit the form
4. Check the recipient email for the notification
5. Verify data in database (use `npx prisma studio`)

## 🔍 Troubleshooting

### Common Issues

1. **Resend Email Not Sending**:
   - Verify API key is correct in `.env`
   - Check sender email domain is verified
   - Review console logs for error messages

2. **Database Connection Issues**:
   - Ensure PostgreSQL is running
   - Verify `DATABASE_URL` format is correct
   - Run `npx prisma db push` to sync schema

3. **Form Validation Errors**:
   - Check browser console for detailed error messages
   - Ensure all required fields are properly filled
   - Verify email format is valid

### Development Tips

- Use `npx prisma studio` to view and manage database data
- Check browser Network tab for API request/response details
- Monitor console logs for debugging information
- Test email delivery in Resend dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 📞 Support

For questions or issues, contact the development team or check the project documentation.

---

**Last Updated**: August 2025
