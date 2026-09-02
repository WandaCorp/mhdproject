import { createFileRoute } from "@tanstack/react-router";
import { FeedHome } from "@/components/feed/FeedHome";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <FeedHome />;
}
