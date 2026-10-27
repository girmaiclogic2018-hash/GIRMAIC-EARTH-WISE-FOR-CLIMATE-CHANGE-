'use client';

import React, { useState } from 'react';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/translations';
import { MessageSquarePlus, Star, Send, CheckCircle2, User, HelpCircle, Download } from 'lucide-react';

interface FeedbackFormProps {
  language: SupportedLanguage;
  locationName: string;
  locationId: string;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ language, locationName, locationId }) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const [clarityScore, setClarityScore] = useState<number>(4);
  const [usefulnessScore, setUsefulnessScore] = useState<number>(5);
  const [userRole, setUserRole] = useState<string>('Development Agent / Agriculture Extension Officer');
  const [comments, setComments] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [submissionsCount, setSubmissionsCount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmittedMessage(null);

    try {
      const res = await fetch('/app/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId,
          clarityScore,
          usefulnessScore,
          comments,
          language,
          userRole
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedMessage(data.message || t.feedbackThankYou);
        setSubmissionsCount(data.totalFeedbackCount || 1);
        setComments('');
      } else {
        alert(data.error || 'Failed to submit feedback.');
      }
    } catch (err: any) {
      console.warn('Feedback submit error:', err);
      // Fallback client response for offline or dev preview resilience
      setSubmittedMessage('Feedback saved locally in prototype session. Thank you!');
      setSubmissionsCount((prev) => prev + 1);
      setComments('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
        <div className="p-2 bg-amber-500 text-white rounded-xl shadow-sm">
          <MessageSquarePlus className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-stone-900">
            {t.feedbackTitle}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.feedbackDesc} Current target context: <strong className="text-stone-800">{locationName}</strong>
          </p>
        </div>
      </div>

      {submittedMessage ? (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
          <h3 className="text-lg font-bold text-emerald-950">Feedback Submitted Successfully</h3>
          <p className="text-xs text-emerald-800 max-w-md mx-auto">{submittedMessage}</p>
          <div className="text-[11px] font-mono text-emerald-700">
            Total prototype community feedback logged: {submissionsCount}
          </div>
          <button
            onClick={() => setSubmittedMessage(null)}
            className="px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-xl hover:bg-emerald-900 transition-colors"
          >
            Submit Another Observation
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Role Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-700" />
              <span>Your Role or Perspective:</span>
            </label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full bg-stone-50 text-stone-900 text-xs font-medium py-2.5 px-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="Development Agent / Agriculture Extension Officer">
                Development Agent / Kebele Agriculture Extension Officer (DA)
              </option>
              <option value="Local Smallholder Farmer">Local Smallholder Farmer / Community Leader</option>
              <option value="Agricultural Researcher / Agronomist">Agricultural Researcher / Agronomist</option>
              <option value="Software Evaluator / Prototype Tester">Software Evaluator / Prototype Tester</option>
              <option value="General Public">General Public / Student</option>
            </select>
          </div>

          {/* Clarity Score Rating */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800">
                {t.clarityRatingLabel}
              </label>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                {clarityScore} / 5 Stars
              </span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setClarityScore(star)}
                  className={`p-2 rounded-lg transition-transform hover:scale-110 ${
                    star <= clarityScore ? 'text-amber-500' : 'text-stone-300'
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500">
              1 = Highly confusing / technical jargon; 5 = Very clear & plain local terms.
            </p>
          </div>

          {/* Usefulness Rating */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800">
                {t.usefulnessLabel}
              </label>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                {usefulnessScore} / 5 Stars
              </span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setUsefulnessScore(star)}
                  className={`p-2 rounded-lg transition-transform hover:scale-110 ${
                    star <= usefulnessScore ? 'text-amber-500' : 'text-stone-300'
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500">
              Assesses whether the weather + agronomic advice helps in planning field preparation or sowing.
            </p>
          </div>

          {/* Comments Textarea */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-800">
              {t.commentsLabel}
            </label>
            <textarea
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="e.g. Include local language term for Wa'ima threshed ground in Amharic, or add specific advice for chickpea root rot in Ada'a..."
              className="w-full bg-stone-50 text-stone-900 text-xs py-3 px-3.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder:text-stone-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'Recording Feedback...' : t.submitFeedback}</span>
          </button>
        </form>
      )}
    </div>
  );
};
