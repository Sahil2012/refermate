import SigninWithGoogle from "@/components/function/signin-with-google-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "@/hooks/auth/useAuthActions";
import { useState } from "react";
import { Link } from "react-router";
import AuthOptionsDivider from "../AuthOptionsDivider";
import SignupWithPasswordForm from "./SignupWithPasswordForm";
import VerifySignUpCodeForm from "./VerifySignUpCodeForm";
import { ROUTES } from "@/lib/consts/routesConsts";

export default function SignupPage() {
  const [pendingVerification, setPendingVerification] = useState(false);
  const { startSignUpWithPassword } = useAuthActions();

  if (pendingVerification) {
    return (
      <Card>
        <CardHeader className="mb-2 text-center">
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a verification code to{" "}
            {startSignUpWithPassword.variables?.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifySignUpCodeForm />
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            onClick={() => setPendingVerification(false)}
            className="text-sm text-muted-foreground"
          >
            Back to sign up
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="mb-2 text-center">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupWithPasswordForm
          onChangePendingVerification={(val: boolean) =>
            setPendingVerification(val)
          }
        />
        <AuthOptionsDivider />
        <SigninWithGoogle />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to={ROUTES.LOGIN.fullPath}
            className="text-primary font-semibold hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
