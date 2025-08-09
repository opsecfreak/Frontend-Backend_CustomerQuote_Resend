import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Function to create HTML email content
function createEmailHTML(data: any, submissionId: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0ea5e9; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f8f9fa; padding: 20px; border: 1px solid #dee2e6; }
            .summary { background-color: #e3f2fd; padding: 15px; border-left: 4px solid #0ea5e9; margin: 20px 0; }
            .client-info { background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; color: #495057; }
            .value { margin-left: 10px; color: #6c757d; }
            .footer { background-color: #6c757d; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 New AI Services Quote Request</h1>
                <p>Submission ID: ${submissionId}</p>
                <p>Date: ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="content">
                <div class="summary">
                    <h2>📋 Summary</h2>
                    <p>Quote request from <strong>${data.companyName || data.contactPerson || 'a potential client'}</strong> for AI solutions to boost company revenue, productivity, and workflow.</p>
                </div>
                
                <div class="client-info">
                    <h2>👤 Client Information</h2>
                    
                    <div class="field">
                        <span class="label">📧 Email:</span>
                        <span class="value">${data.fromemail || 'Not provided'}</span>
                    </div>
                    
                    <div class="field">
                        <span class="label">👨‍💼 Contact Person:</span>
                        <span class="value">${data.contactPerson || 'Not provided'}</span>
                    </div>
                    
                    <div class="field">
                        <span class="label">🏢 Company:</span>
                        <span class="value">${data.companyName || 'Not provided'}</span>
                    </div>
                    
                    <div class="field">
                        <span class="label">🌐 Website:</span>
                        <span class="value">${data.companyWebsite || 'Not provided'}</span>
                    </div>
                    
                    <div class="field">
                        <span class="label">📱 Phone:</span>
                        <span class="value">${data.phoneNumber || 'Not provided'}</span>
                    </div>
                    
                    <div class="field">
                        <span class="label">🏷️ Brand:</span>
                        <span class="value">${data.brandName || 'Not provided'}</span>
                    </div>
                    
                    <div class="field">
                        <span class="label">💰 Budget:</span>
                        <span class="value">${data.budget || 'Not provided'}</span>
                    </div>
                    
                    <div class="field">
                        <span class="label">⏰ Urgency:</span>
                        <span class="value">${data.urgency || 'Not provided'}</span>
                    </div>
                </div>
                
                <div class="client-info">
                    <h2>📝 Project Details</h2>
                    
                    <div class="field">
                        <span class="label">✅ Requirements:</span>
                        <div class="value" style="margin-top: 5px; white-space: pre-wrap;">${data.requirements || 'Not provided'}</div>
                    </div>
                    
                    <div class="field">
                        <span class="label">❓ Questions:</span>
                        <div class="value" style="margin-top: 5px; white-space: pre-wrap;">${data.questions || 'Not provided'}</div>
                    </div>
                    
                    <div class="field">
                        <span class="label">ℹ️ Additional Info:</span>
                        <div class="value" style="margin-top: 5px; white-space: pre-wrap;">${data.additionalInfo || 'Not provided'}</div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>This is an automated email from your AI Services quote request system.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

// Function to send email notification
async function sendEmailNotification(data: any, submissionId: string): Promise<void> {
  try {
    const emailHTML = createEmailHTML(data, submissionId);
    
    await resend.emails.send({
      from: 'AI Services <onboarding@resend.dev>', // Using Resend's default domain
      to: ['mobiletechspecialists@gmail.com'],
      subject: `🚀 New AI Services Quote Request from ${data.companyName || data.contactPerson || 'Client'}`,
      html: emailHTML,
    });
    
    console.log(`Email notification sent for submission: ${submissionId}`);
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't throw here - we don't want email failures to break form submission
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body) {
      return NextResponse.json(
        { error: "Form data is required" },
        { status: 400 }
      );
    }

    // Validate email is provided
    if (!body.fromemail) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Prepare data for database
    const dbData = {
      summary: `Quote request from ${body.companyName || body.contactPerson || 'customer'} for AI solutions`,
      fromemail: body.fromemail,
      brandName: body.brandName || '',
      companyName: body.companyName || '',
      companyWebsite: body.companyWebsite || '',
      contactPerson: body.contactPerson || '',
      phoneNumber: body.phoneNumber || '',
      budget: body.budget || '',
      urgency: body.urgency || '',
      questions: body.questions || '',
      requirements: body.requirements || '',
      additionalInfo: body.additionalInfo || ''
    };

    // Save to database
    const record = await prisma.formSubmission.create({
      data: dbData
    });

    // Send email notification
    await sendEmailNotification(body, record.id);

    return NextResponse.json({
      success: true,
      data: record
    }, { status: 200 });

  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}