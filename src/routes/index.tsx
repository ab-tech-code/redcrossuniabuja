import { createFileRoute } from "@tanstack/react-router";
import { MembershipApp } from "@/components/MembershipApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Red Cross Club — University of Abuja Membership" },
      { name: "description", content: "Join the Red Cross Club at the University of Abuja. Volunteer, train, and serve your community through humanitarian action." },
      { property: "og:title", content: "Red Cross Club — University of Abuja" },
      { property: "og:description", content: "Become a member of the Red Cross Club at the University of Abuja." },
    ],
  }),
  component: Index,
});

function Index() {
  return <MembershipApp />;
}
