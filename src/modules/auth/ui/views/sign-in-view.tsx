"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Poppins } from "next/font/google";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { loginSchema } from "../../schemas";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const SignInView = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const login = useMutation(trpc.auth.login.mutationOptions());

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login.mutate(data, {
      onSuccess: async (loginResponseData) => {
        const username = loginResponseData?.user?.username;
        toast.success(
          `Logged in successfully! Welcome back${username ? `, ${username}` : ""}!`
        );
        await queryClient.invalidateQueries({
          // queryClient.invalidateQueries(trpc.auth.session.queryFilter());!!!!!!!!!!!!!!!!!!
          queryKey: trpc.auth.session.queryKey(),
        });
        router.push("/");
        form.reset();
      },
      onError: (error) => {
        // console.log("Registration failed:", error);
        const errorMessage =
          (error as { shape?: { message?: string }; message?: string })?.shape
            ?.message ??
          (error as { shape?: { message?: string }; message?: string })
            .message ??
          "Failed to log in. Please try again later.";

        console.log("Login error:", error);

        form.setError("email", { message: " " });
        form.setError("password", { message: errorMessage });

        toast.error(errorMessage);

        setTimeout(() => {
          form.clearErrors(["email", "password"]);
        }, 3000);
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/">
                <span
                  className={cn("text-2xl font-semibold", poppins.className)}
                >
                  storenex
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                className="text-base border-none underline"
              >
                <Link prefetch href="/sign-up">
                  Sign up
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">Welcome back to Storenex</h1>
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <Eye className="h-5" />
                      ) : (
                        <EyeOff className="h-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              variant="elevated"
              className="bg-black text-white hover:bg-orange-400 hover:text-primary"
              disabled={!form.formState.isValid || login.isPending}
              aria-busy={login.isPending}
            >
              {login.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
            <p className="text-sm text-gray-500">
              By logging in, you agree to our{" "}
              <Link href="/terms" className="text-orange-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-orange-500 hover:underline">
                Privacy Policy
              </Link>
            </p>
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-orange-500 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
