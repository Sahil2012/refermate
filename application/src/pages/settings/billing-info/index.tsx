import { useState } from "react";
import CreditDisplay from "./CreditDisplay";
import PlanInformation from "./PlanInformation";
// import RechargeDialog from "./recharge-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const BillingInfo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="border-b border-border/40 px-6">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <CardTitle>Billing Information</CardTitle>
          </div>
          <CardDescription>
            Manage your credits and recharge options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <CreditDisplay onOpenChange={(val) => setOpen(val)} />
          <PlanInformation />
        </CardContent>
      </Card>
      {/* <RechargeDialog open={open} onOpenChange={(val) => setOpen(val)} /> */}
    </>
  );
};

export default BillingInfo;
