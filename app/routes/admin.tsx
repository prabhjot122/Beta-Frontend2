import { useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import AdminLogin from "~/components/AdminLogin";
import AdminDashboard from "~/components/AdminDashboard";
import { useAuth } from "~/lib/hooks";

export const meta: MetaFunction = () => {
  return [
    { title: "LawVriksh Admin - Dashboard" },
    { name: "description", content: "LawVriksh Admin Dashboard - Manage user registrations and feedback" },
    { name: "robots", content: "noindex, nofollow" }, // Prevent search engine indexing
  ];
};

export default function Admin() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, verifyToken } = useAuth();

  // Verify token on component mount
  useEffect(() => {
    if (isAuthenticated) {
      verifyToken();
    }
  }, [isAuthenticated, verifyToken]);

  const handleAdminLogout = () => {
    logout();
    // Optionally redirect to home page
    // navigate('/');
  };

  return (
    <>
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleAdminLogout} />
      ) : (
        <AdminLogin />
      )}
    </>
  );
}
