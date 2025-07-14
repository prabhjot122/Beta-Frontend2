import { useState, useEffect } from 'react';
import type { AdminDashboardProps } from '~/lib/types';
import { DataTable } from './ui/DataTable';
import { useAdminData, useHealthCheck } from '~/lib/hooks';
import { api } from '~/lib/api';

type TabType = 'user-responses' | 'feedback-responses' | 'analytics' | 'data-export';
type UserSubTab = 'user' | 'creator' | 'not-interested';

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('user-responses');
  const [activeUserSubTab, setActiveUserSubTab] = useState<UserSubTab>('user');

  // Use real API data hooks
  const {
    users,
    creators,
    feedback,
    notInterested,
    userAnalytics,
    feedbackAnalytics,
    stats: apiStats,
    fetchAllData
  } = useAdminData();

  const { isHealthy, checkHealth } = useHealthCheck();

  // Load data on component mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Calculate stats from real data
  const stats = {
    totalUsers: users.data?.length || 0,
    totalCreators: creators.data?.length || 0,
    totalNotInterested: notInterested.data?.length || 0,
    totalFeedback: feedback.data?.length || 0
  };

  // Use real data arrays
  const userData = users.data || [];
  const creatorData = creators.data || [];
  const notInterestedData: any[] = notInterested.data || [];
  const feedbackData = feedback.data || [];

  const isLoading = users.loading || creators.loading || feedback.loading;

  const handleLogout = () => {
    console.log('Admin logout');
    onLogout();
  };

  const handleRefresh = async () => {
    await fetchAllData();
    await checkHealth();
  };

  const handleDataExport = async (format: 'json') => {
    try {
      const response = await api.exportDataJson();
      if (response.success && response.data) {
        // Create and download file
        const blob = new Blob([JSON.stringify(response.data, null, 2)], {
          type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lawvriksh-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleDownloadData = async () => {
    try {
      const response = await api.downloadData();
      if (response.success && response.data) {
        // Create and download file
        const blob = new Blob([JSON.stringify(response.data, null, 2)], {
          type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lawvriksh-complete-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <img src="/logo.png" alt="LawVriksh" className="h-6 sm:h-8 w-auto" />
              <h1 className="ml-2 sm:ml-4 text-lg sm:text-xl font-semibold text-gray-900 hidden sm:block">
                Admin Dashboard
              </h1>
              <h1 className="ml-2 text-base font-semibold text-gray-900 sm:hidden">
                Admin
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={handleRefresh}
                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-law-gold"
                disabled={isLoading}
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                onClick={handleLogout}
                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">U</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalUsers}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">C</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Creators
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalCreators}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">N</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Not Interested
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalNotInterested}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">F</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Feedback
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalFeedback}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('user-responses')}
                className={`py-2 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'user-responses'
                    ? 'border-law-gold text-law-gold'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                User Responses
              </button>
              <button
                onClick={() => setActiveTab('feedback-responses')}
                className={`py-2 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'feedback-responses'
                    ? 'border-law-gold text-law-gold'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Feedback Responses
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'analytics'
                    ? 'border-law-gold text-law-gold'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('data-export')}
                className={`py-2 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'data-export'
                    ? 'border-law-gold text-law-gold'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Data Export
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'user-responses' && (
              <div>
                {/* Sub-tabs for user responses */}
                <div className="mb-4">
                  <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
                    <button
                      onClick={() => setActiveUserSubTab('user')}
                      className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                        activeUserSubTab === 'user'
                          ? 'border-law-gold text-law-gold'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Users ({stats.totalUsers})
                    </button>
                    <button
                      onClick={() => setActiveUserSubTab('creator')}
                      className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                        activeUserSubTab === 'creator'
                          ? 'border-law-gold text-law-gold'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Creators ({stats.totalCreators})
                    </button>
                    <button
                      onClick={() => setActiveUserSubTab('not-interested')}
                      className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                        activeUserSubTab === 'not-interested'
                          ? 'border-law-gold text-law-gold'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Not Interested ({stats.totalNotInterested})
                    </button>
                  </nav>
                </div>

                {/* Data Tables */}
                {activeUserSubTab === 'user' && (
                  <DataTable
                    data={userData}
                    type="users"
                    isLoading={isLoading}
                  />
                )}
                {activeUserSubTab === 'creator' && (
                  <DataTable
                    data={creatorData}
                    type="creators"
                    isLoading={isLoading}
                  />
                )}
                {activeUserSubTab === 'not-interested' && (
                  <DataTable
                    data={notInterestedData}
                    type="not-interested"
                    isLoading={isLoading}
                  />
                )}
              </div>
            )}

            {activeTab === 'feedback-responses' && (
              <DataTable
                data={feedbackData}
                type="feedback"
                isLoading={isLoading}
              />
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Analytics Dashboard</h3>

                {/* User Analytics Section */}
                <div className="mb-8">
                  <h4 className="text-md font-medium text-gray-800 mb-4">User Analytics</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      User analytics data would be displayed here, including:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                      <li>Registration trends over time</li>
                      <li>User vs Creator distribution</li>
                      <li>Geographic distribution</li>
                      <li>Profession breakdown</li>
                    </ul>
                  </div>
                </div>

                {/* Feedback Analytics Section */}
                <div className="mb-8">
                  <h4 className="text-md font-medium text-gray-800 mb-4">Feedback Analytics</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Feedback analytics data would be displayed here, including:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                      <li>Average ratings for UI/UX components</li>
                      <li>Common feedback themes</li>
                      <li>Response rates and completion statistics</li>
                      <li>Follow-up consent rates</li>
                    </ul>
                  </div>
                </div>

                {/* Comprehensive Stats */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 mb-4">Comprehensive Statistics</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Comprehensive statistics would be displayed here from the /api/data/stats endpoint.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data-export' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Data Export & Download</h3>

                <div className="space-y-6">
                  {/* Export Options */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-md font-medium text-gray-800 mb-4">Export Data</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Export all data in various formats for analysis or backup purposes.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleDataExport('json')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Export as JSON
                      </button>
                    </div>
                  </div>

                  {/* Download All Data */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-md font-medium text-gray-800 mb-4">Download All Data</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a comprehensive dataset including all users, creators, feedback, and analytics.
                    </p>
                    <button
                      onClick={handleDownloadData}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Download All Data
                    </button>
                  </div>

                  {/* API Endpoints Reference */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-md font-medium text-gray-800 mb-4">Available API Endpoints</h4>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p><code className="bg-gray-200 px-2 py-1 rounded">POST /api/data/downloaddata</code> - Download all data</p>
                      <p><code className="bg-gray-200 px-2 py-1 rounded">GET /api/data/export/json</code> - Export as JSON file</p>
                      <p><code className="bg-gray-200 px-2 py-1 rounded">GET /api/data/stats</code> - Get comprehensive statistics</p>
                      <p><code className="bg-gray-200 px-2 py-1 rounded">GET /api/users/analytics</code> - User analytics</p>
                      <p><code className="bg-gray-200 px-2 py-1 rounded">GET /api/feedback/analytics</code> - Feedback analytics</p>
                      <p><code className="bg-gray-200 px-2 py-1 rounded">GET /api/feedback/summary</code> - Feedback summary</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
