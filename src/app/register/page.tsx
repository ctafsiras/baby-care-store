import { RegisterForm } from "@/components/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Baby Care Store",
  description: "Register for an account",
};

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center border-2">
      <div className="border-2 px-4 py-8  rounded-md">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Create an account
        </h2>
        <p className="text-md mb-8">
          Enter your details below to create your account and get started
        </p>
        <div className="md:w-[400px] mx-auto">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
