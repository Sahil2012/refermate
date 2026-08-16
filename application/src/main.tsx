import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router/dom";
import router from "./routes";
import { Toaster, toast } from "sonner";
import { ReverificationProvider } from "./providers/ReverificationProvider";
import { isRateLimitError, rateLimitAwareRetry, rateLimitAwareRetryDelay } from "./lib/queryRetry";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: rateLimitAwareRetry,
      retryDelay: rateLimitAwareRetryDelay,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (isRateLimitError(error)) {
        toast.error("Too many requests — please slow down and try again shortly.");
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <ReverificationProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ReverificationProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
);
