// Homepage = the membership flow (intro → form → payment → submit).
import { MembershipApp } from "@/components/MembershipApp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle(
    "Red Cross Club — University of Abuja Membership",
    "Join the Red Cross Club at the University of Abuja. Volunteer, train, and serve your community through humanitarian action.",
  );
  return <MembershipApp />;
}