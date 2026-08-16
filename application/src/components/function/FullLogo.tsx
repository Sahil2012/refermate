import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface FullLogoProps {
  to?: string;
  className?: string;
  size?: "default" | "sm";
}

const FullLogo = ({ to, className, size = "default" }: FullLogoProps) => {
  const wrapperClass = cn(
    "flex items-center gap-3 font-bold text-xl",
    className,
  );
  const squareClass = cn(
    "overflow-hidden",
    size === "sm" ? "h-5 max-h-5" : "h-10 max-h-10 pt-1.5 mb-1.5",
  );
  const wordmarkClass = cn(
    "overflow-hidden",
    size === "sm" ? "h-5 max-h-5" : "h-10 max-h-10 p-1 mb-1.5",
  );

  const logo = (
    <>
      <div className={squareClass}>
        <img className="h-full w-auto" src="/refer-mate-square.png" />
      </div>
      <div className={wordmarkClass}>
        <img className="h-full w-auto" src="/refer-mate-full.png" />
      </div>
    </>
  );

  if (!to) {
    return <div className={wrapperClass}>{logo}</div>;
  }

  return (
    <Link to={to} className={wrapperClass}>
      {logo}
    </Link>
  );
};

export default FullLogo;
