import React, { useState } from 'react';
import type { UserResponse, NotInterestedResponse, FeedbackResponse } from '~/lib/types';

interface DataTableProps {
  data: any[];
  type: 'users' | 'creators' | 'not-interested' | 'feedback';
  isLoading?: boolean;
}

export function DataTable({ data, type, isLoading = false }: DataTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderUserTable = (users: UserResponse[]) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone_number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.gender || 'Not specified'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.profession || 'Not specified'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.created_at)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900" onClick={() => setExpandedRow(expandedRow === user.id ? null : user.id)}>
                    {expandedRow === user.id ? 'Hide' : 'View Details'}
                  </button>
                </td>
              </tr>
              {expandedRow === user.id && (
                <tr>
                  <td colSpan={7} className="bg-gray-50 px-6 py-4 text-sm text-gray-700">
                    <div><b>Interest Reason:</b> {user.interest_reason || 'N/A'}</div>
                    <div><b>User Type:</b> {user.user_type || 'N/A'}</div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderNotInterestedTable = (responses: NotInterestedResponse[]) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggestions</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {responses.map((response) => (
            <React.Fragment key={response.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{response.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{response.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{response.not_interested_reason || 'Not specified'}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{response.improvement_suggestions || 'None provided'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(response.created_at)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900" onClick={() => setExpandedRow(expandedRow === response.id ? null : response.id)}>
                    {expandedRow === response.id ? 'Hide' : 'View Details'}
                  </button>
                </td>
              </tr>
              {expandedRow === response.id && (
                <tr>
                  <td colSpan={6} className="bg-gray-50 px-6 py-4 text-sm text-gray-700">
                    <div><b>Phone:</b> {response.phone_number || 'N/A'}</div>
                    <div><b>Gender:</b> {response.gender || 'N/A'}</div>
                    <div><b>Interest Reason:</b> {response.interest_reason || 'N/A'}</div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFeedbackTable = (feedback: FeedbackResponse[]) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {feedback.map((item) => (
            <React.Fragment key={item.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.user_email || 'Anonymous'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.created_at)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900" onClick={() => setExpandedRow(expandedRow === item.id ? null : item.id)}>
                    {expandedRow === item.id ? 'Hide' : 'View Details'}
                  </button>
                </td>
              </tr>
              {expandedRow === item.id && (
                <tr>
                  <td colSpan={4} className="bg-gray-50 px-6 py-4 text-sm text-gray-700">
                    <div><b>Digital Work Showcase Effectiveness:</b> {item.digital_work_showcase_effectiveness ?? 'N/A'}</div>
                    <div><b>Legal Persons Online Recognition:</b> {item.legal_persons_online_recognition ?? 'N/A'}</div>
                    <div><b>Digital Work Sharing Difficulty:</b> {item.digital_work_sharing_difficulty ?? 'N/A'}</div>
                    <div><b>Regular Blogging:</b> {item.regular_blogging ?? 'N/A'}</div>
                    <div><b>AI Tools Blogging Frequency:</b> {item.ai_tools_blogging_frequency ?? 'N/A'}</div>
                    <div><b>Blogging Tools Familiarity:</b> {item.blogging_tools_familiarity ?? 'N/A'}</div>
                    <div><b>Core Platform Features:</b> {item.core_platform_features ?? 'N/A'}</div>
                    <div><b>AI Research Opinion:</b> {item.ai_research_opinion ?? 'N/A'}</div>
                    <div><b>Ideal Reading Features:</b> {item.ideal_reading_features ?? 'N/A'}</div>
                    <div><b>Portfolio Presentation Preference:</b> {item.portfolio_presentation_preference ?? 'N/A'}</div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, data.length)}</span> of{' '}
              <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === currentPage
                      ? 'z-10 bg-law-gold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-law-gold'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm mt-2">
            {type === 'users' && 'No user registrations yet.'}
            {type === 'creators' && 'No creator registrations yet.'}
            {type === 'not-interested' && 'No "not interested" responses yet.'}
            {type === 'feedback' && 'No feedback submissions yet.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {type === 'users' && renderUserTable(currentData)}
      {type === 'creators' && renderUserTable(currentData)}
      {type === 'not-interested' && renderNotInterestedTable(currentData)}
      {type === 'feedback' && renderFeedbackTable(currentData)}
      {renderPagination()}
    </div>
  );
}

export default DataTable;
