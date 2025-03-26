import { useUser } from "@clerk/nextjs";
import React from "react";

function ReviewSessions() {
  const { user } = useUser();
  if (!user?.id) return;
  return <div>ReviewSessions</div>;
}

export default ReviewSessions;
