'use client';

import { useState, useEffect } from 'react';
import { FormSubmission, PaginationData } from '@/types';
import { formatDate } from '@/lib/utils';
import { Search, Eye, Mail, Building, User, Calendar, DollarSign, Clock } from 'lucide-react';

interface SubmissionsResponse {
  submissions: FormSubmission[];
  pagination: PaginationData;
}

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search: search,
      });
      
      const response = await fetch(`/api/submissions?${params}`);
      if (response.ok) {
        const data: SubmissionsResponse = await response.json();
        setSubmissions(data.submissions);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [page, search]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  if (loading && submissions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Form Submissions Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by email, company, contact person..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {pagination && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {submissions.length} of {pagination.total} submissions
            </div>
          )}
        </div>

        {/* Submissions Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedSubmission(submission)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold text-gray-900 truncate">
                    {submission.companyName || 'No Company'}
                  </h3>
                </div>
                <Eye className="h-4 w-4 text-gray-400" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 truncate">{submission.fromemail}</span>
                </div>
                
                {submission.contactPerson && (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 truncate">{submission.contactPerson}</span>
                  </div>
                )}

                {submission.budget && (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{submission.budget}</span>
                  </div>
                )}

                {submission.urgency && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                      submission.urgency === 'high' ? 'bg-red-100 text-red-800' :
                      submission.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {submission.urgency}
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{formatDate(submission.createdAt)}</span>
                </div>
              </div>

              {submission.aiSummary && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="text-xs font-medium text-blue-700">🤖 AI Summary</span>
                  </div>
                  <p className="text-xs text-blue-800 line-clamp-2">
                    {submission.aiSummary}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <span className="px-3 py-2 text-sm text-gray-700">
              Page {page} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Detailed View Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Submission Details</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">Contact Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{selectedSubmission.fromemail}</p>
                    </div>
                    
                    {selectedSubmission.contactPerson && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                        <p className="text-gray-900">{selectedSubmission.contactPerson}</p>
                      </div>
                    )}
                    
                    {selectedSubmission.companyName && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <p className="text-gray-900">{selectedSubmission.companyName}</p>
                      </div>
                    )}
                    
                    {selectedSubmission.companyWebsite && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Website</label>
                        <a 
                          href={selectedSubmission.companyWebsite} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          {selectedSubmission.companyWebsite}
                        </a>
                      </div>
                    )}
                    
                    {selectedSubmission.phoneNumber && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-gray-900">{selectedSubmission.phoneNumber}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">Project Details</h3>
                  
                  <div className="space-y-3">
                    {selectedSubmission.budget && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Budget</label>
                        <p className="text-gray-900">{selectedSubmission.budget}</p>
                      </div>
                    )}
                    
                    {selectedSubmission.urgency && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Urgency</label>
                        <span className={`capitalize px-2 py-1 rounded-full text-sm ${
                          selectedSubmission.urgency === 'high' ? 'bg-red-100 text-red-800' :
                          selectedSubmission.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {selectedSubmission.urgency}
                        </span>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Submitted</label>
                      <p className="text-gray-900">{formatDate(selectedSubmission.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedSubmission.aiSummary && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">🤖 AI Analysis</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-900">{selectedSubmission.aiSummary}</p>
                  </div>
                </div>
              )}

              {selectedSubmission.requirements && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Requirements</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.requirements}</p>
                  </div>
                </div>
              )}

              {selectedSubmission.questions && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Questions</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.questions}</p>
                  </div>
                </div>
              )}

              {selectedSubmission.additionalInfo && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Additional Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.additionalInfo}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
