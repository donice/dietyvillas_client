import Link from "next/link";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="text-sm text-gray-500 mb-4 max-w-sm">
      By signing up you&#8217;re agreeing to our{" "}
      <Link href={"/signin"} className="text-amber-500 hover:underline">Terms &amp; Conditions</Link> and{" "}
      <Link href={"/signin"} className="text-amber-500 hover:underline">Privacy Policy</Link>.
    </div>
  );
};

export default TermsAndConditions;
