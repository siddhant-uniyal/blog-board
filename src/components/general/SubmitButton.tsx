"use client"
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: { children?: React.ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-fit" type="submit" disabled={pending}>
      {pending ? (children ? `Processing...` : "Processing...") : children || "Submit"}
    </Button>
  );
};

export default SubmitButton;
