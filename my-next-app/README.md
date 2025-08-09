# AI Services Quote Request System

A modern Next.js application that allows potential clients to request quotes for AI solutions to boost company revenue, productivity, and workflow. The system includes form validation, database storage, and automated email notifications.

## 🚀 Features

- **Professional Quote Request Form** - User-friendly interface with validation
- **Database Integration** - Prisma ORM with PostgreSQL for data persistence
- **Email Notifications** - Automated HTML email alerts via Resend API
- **Real-time Validation** - Form validation using React Hook Form + Zod
- **Responsive Design** - Modern UI with Tailwind CSS
- **TypeScript** - Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Email Service**: Resend API
- **Form Handling**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- PostgreSQL database (or use Prisma Postgres)
- Resend account for email services
- Git for cloning the repository

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd my-next-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# OpenAI API (for future AI features)
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
