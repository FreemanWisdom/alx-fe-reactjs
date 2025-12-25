import { useState } from "react";

export default function useAuth() {
  // Simulate logged in user; change to true to test
  const [isAuthenticated] = useState(false);
  return { isAuthenticated };
}
