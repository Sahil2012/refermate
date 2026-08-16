import { useUser } from "@clerk/clerk-react";

export const useGoogle = () => {
  const { user } = useUser();

  const googleAccount = user?.externalAccounts.find(
    (acc) => acc.provider === "google",
  );

  const requiredGmailScopes = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
  ];
  const hasGmailScope = requiredGmailScopes.every((scope) =>
    googleAccount?.approvedScopes?.includes(scope),
  );

  const isConnectedToGoogle = !!googleAccount;

  return {
    account: googleAccount,
    isConnectedToGoogle,
    hasGmailScope,
  };
};
