import type { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import HomePage from "~/components/HomePage";
import { useAnalytics } from "~/lib/useAnalytics";

export const meta: MetaFunction = () => {
  return [
    { title: "LawVriksh Beta - Join the Legal Revolution" },
    { name: "description", content: "Join the LawVriksh Beta: Be the First to Experience the future of legal knowledge sharing. Know your rights. Show your insights." },
    { name: "keywords", content: "law, legal, beta, lawvriksh, legal platform, legal knowledge" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export default function Index() {
  const { trackPage } = useAnalytics();

  useEffect(() => {
    trackPage('Home');
  }, [trackPage]);

  return <HomePage />;
}


