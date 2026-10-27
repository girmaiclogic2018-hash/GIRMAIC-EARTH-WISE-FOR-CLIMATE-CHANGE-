import { NextRequest, NextResponse } from "next/server";

export interface FeedbackSubmission {
  id: string;
  submittedAtIso: string;
  locationId: string;
  clarityScore: number;
  usefulnessScore: number;
  comments: string;
  language: string;
  userRole?: string;
}

// In-memory feedback collection for prototype v0.1
const feedbackStore: FeedbackSubmission[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { locationId, clarityScore, usefulnessScore, comments, language, userRole } = body;

    if (!clarityScore || !usefulnessScore) {
      return NextResponse.json(
        { error: "Please provide clarity and usefulness ratings." },
        { status: 400 }
      );
    }

    const newFeedback: FeedbackSubmission = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      submittedAtIso: new Date().toISOString(),
      locationId: locationId || 'unknown',
      clarityScore: Number(clarityScore),
      usefulnessScore: Number(usefulnessScore),
      comments: (comments || '').trim(),
      language: language || 'en',
      userRole: userRole || 'Evaluator / Community Member'
    };

    feedbackStore.push(newFeedback);

    return NextResponse.json({
      success: true,
      message: "Feedback recorded successfully. Thank you for helping refine GIRMAIC EarthWise AI.",
      feedbackId: newFeedback.id,
      totalFeedbackCount: feedbackStore.length
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to submit feedback.", details: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalCount: feedbackStore.length,
    recentSubmissions: feedbackStore.slice(-10).reverse()
  });
}
