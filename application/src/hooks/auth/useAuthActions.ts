import { useHandleReverification } from "@/providers/ReverificationProvider";
import { useSignIn, useSignUp, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGoogle } from "./useGoogleData";
import { ROUTES } from "@/lib/consts/routesConsts";
import {
  isClerkAPIResponseError,
  isClerkRuntimeError,
  isReverificationCancelledError,
} from "@clerk/clerk-react/errors";
import { useNavigate, useLocation } from "react-router";

interface UpdatePasswordVariables {
  newPassword: string;
  currentPassword?: string;
}

interface EmailAndPasswordVariables {
  email: string;
  password: string;
}

interface VerifySignUpWithCodeVariables {
  code: string;
}

export const useAuthActions = () => {
  const { user } = useUser();
  const { account, isConnectedToGoogle } = useGoogle();
  const { signIn, setActive: setActiveFromSignIn } = useSignIn();
  const { signUp, setActive: setActiveFromSignUp } = useSignUp();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { func: authorizeGoogleWithVerification } = useHandleReverification(
    async () => {
      const params = {
        redirectUrl: globalThis.location.href,
        additionalScopes: [
          "https://www.googleapis.com/auth/gmail.send",
          "https://www.googleapis.com/auth/gmail.readonly",
        ],
        oidcPrompt: "consent",
        access_type: "offline",
      };

      let res;
      if (isConnectedToGoogle) {
        res = await account?.reauthorize(params);
      } else {
        res = await user?.createExternalAccount({
          ...params,
          strategy: "oauth_google",
        });
      }

      if (res?.verification?.externalVerificationRedirectURL) {
        globalThis.location.href =
          res.verification.externalVerificationRedirectURL.href;
      }
    },
  );

  const authorizeGoogleWithEmailScope = useMutation({
    mutationFn: () => {
      return authorizeGoogleWithVerification();
    },
    onSuccess: () => {
      toast.success("Authorization successfull");
    },
    onError: (err) => {
      if (isClerkRuntimeError(err) && isReverificationCancelledError(err)) {
        console.error("User cancelled reverification");
        toast.error("Please verify to authorize with google.");
      } else {
        console.error("Reauthorization Error:", err);
        console.log("Reauthorization error details: ", (err as any).errors);
        toast.error("Could not authorize with google. Please try again later.");
      }
    },
  });

  const { func: updatePasswordWithVerification } = useHandleReverification(
    async ({ newPassword, currentPassword }: UpdatePasswordVariables) => {
      if (user?.passwordEnabled) {
        await user.updatePassword({ currentPassword, newPassword });
      } else {
        await user?.updatePassword({ newPassword });
      }
    },
  );

  const updatePassword = useMutation({
    mutationFn: (vars: UpdatePasswordVariables) => {
      return updatePasswordWithVerification(vars);
    },
    onMutate: () => {
      return user?.passwordEnabled;
    },
    onSuccess: (_, __, userHadPassword) => {
      if (userHadPassword) {
        toast.success("Password updated successfully");
      } else {
        toast.success("Password set successfully");
      }
    },
    onError: (err) => {
      if (isClerkRuntimeError(err) && isReverificationCancelledError(err)) {
        console.error("User cancelled reverification");
        toast.error("Please verify to update your password.");
      } else {
        console.error("Update password Error:", err);
        console.log("Update password error details: ", (err as any).errors);
        toast.error("Could not update password.");
      }
    },
  });

  const signInWithGoogle = useMutation({
    mutationFn: async () => {
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: ROUTES.SSO_CALLBACK.fullPath,
        redirectUrlComplete: ROUTES.DASHBOARD.fullPath,
      });
    },
    onError: (err) => {
      console.error("Failed to sign in with google", err);
      toast.error("Could not sign in with Google. Please try again later");
    },
  });

  const signInWithPassword = useMutation({
    mutationFn: async ({ email, password }: EmailAndPasswordVariables) => {
      const signInResult = await signIn?.create({
        identifier: email,
        password,
      });

      if (signInResult?.status !== "complete") {
        throw new Error("Could not sign in. Please try again later.");
      }

      await setActiveFromSignIn?.({ session: signInResult.createdSessionId });
    },
    onSuccess: () => {
      toast.success("Sign in successfull");
      navigate(state?.appRedirectUrl || ROUTES.DASHBOARD.fullPath);
    },
    onError: (err) => {
      console.error("Failed to sign in", err);
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === "strategy_for_user_invalid") {
          toast.error(
            "Password is not set for this account. Please use a different method to sign in",
          );
        } else {
          toast.error(err.errors[0].longMessage || err.message);
        }
      } else {
        toast.error("Could not sign in. Please try again later.");
      }
    },
  });

  const startSignUpWithPassword = useMutation({
    mutationFn: async ({ email, password }: EmailAndPasswordVariables) => {
      await signUp?.create({ emailAddress: email, password });
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
    },
    onSuccess: () => {
      toast.success("Verification code has been sent to your email");
    },
    onError: (err) => {
      console.error("Failed to start Signup process", err);
      if (isClerkAPIResponseError(err) && (err.longMessage || err.message)) {
        toast.error(err.longMessage || err.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    },
  });

  const verifySignUpWithCode = useMutation({
    mutationFn: async ({ code }: VerifySignUpWithCodeVariables) => {
      const signUpResult = await signUp?.attemptEmailAddressVerification({
        code,
      });

      if (signUpResult?.status !== "complete") {
        throw new Error("Could not sign up. Please try again later");
      }

      await setActiveFromSignUp?.({ session: signUpResult.createdSessionId });
    },
    onSuccess: () => {
      navigate(ROUTES.DASHBOARD.fullPath);
    },
    onError: (err) => {
      console.error("Failed to sign up", err);
      if (isClerkAPIResponseError(err) && (err.longMessage || err.message)) {
        toast.error(err.longMessage || err.message || "Invalid verification code");
      } else {
        toast.error(
          "We are unable to verify you at the moment. Please try again later.",
        );
      }
    },
  });

  return {
    authorizeGoogleWithEmailScope,
    signInWithGoogle,
    updatePassword,
    signInWithPassword,
    startSignUpWithPassword,
    verifySignUpWithCode,
  };
};
