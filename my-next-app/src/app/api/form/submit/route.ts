import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Simple function to create a summary from form data
function createSummary(data: any): string {
  const summary = `
=== FORM SUBMISSION SUMMARY ===
Date: ${new Date().toISOString()}
Email: ${data.fromemail || 'Not provided'}
Contact Person: ${data.contactPerson || 'Not provided'}
Company: ${data.companyName || 'Not provided'}
Website: ${data.companyWebsite || 'Not provided'}
Phone: ${data.phoneNumber || 'Not provided'}
Brand: ${data.brandName || 'Not provided'}
Budget: ${data.budget || 'Not provided'}
Urgency: ${data.urgency || 'Not provided'}

REQUIREMENTS:
${data.requirements || 'Not provided'}

QUESTIONS:
${data.questions || 'Not provided'}

ADDITIONAL INFO:
${data.additionalInfo || 'Not provided'}

=== END SUMMARY ===
  `.trim();
  
  return summary;
}

// Function to save summary to file
async function saveSummaryToFile(summary: string, submissionId: string): Promise<void> {
  try {
    const summariesDir = join(process.cwd(), 'src', 'app', 'api', 'form', 'summaries');
    
    // Ensure directory exists
    await mkdir(summariesDir, { recursive: true });
    
    const filename = `submission_${submissionId}_${Date.now()}.txt`;
    const filepath = join(summariesDir, filename);
    
    await writeFile(filepath, summary, 'utf8');
    console.log(`Summary saved to: ${filepath}`);
  } catch (error) {
    console.error('Error saving summary file:', error);
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

    // Create a simple summary
    const summaryText = createSummary(body);
    
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

    // Save summary to file
    await saveSummaryToFile(summaryText, record.id);

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