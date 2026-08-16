import SigninWithGoogle from "@/components/function/signin-with-google-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import AuthOptionsDivider from "../AuthOptionsDivider";
import LoginWithPasswordForm from "./LoginWithPasswordForm";
import { ROUTES } from "@/lib/consts/routesConsts";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="mb-2 text-center">
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Enter your email to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginWithPasswordForm />
        <AuthOptionsDivider />
        <SigninWithGoogle />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to={ROUTES.SIGNUP.fullPath}
            className="text-primary font-semibold hover:underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
