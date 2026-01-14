import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase/firebase";
import { Input } from "../../../components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { loginSchema, type LoginFormValues } from "../schemas/login-schema";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        // mode: "onTouched", // inputtan çıkınca çalışır
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Giriş sırasında bir hata oluştu. Email ve şifreni kontrol et.");
        }
    };

    return (
        <div className="w-full flex items-center justify-center px-4 bg-gray-200
        dark:bg-black dark:text-white" style={{ height: "calc(100vh - 302px)" }}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-md bg-gray-900 text-white rounded-xl p-8 shadow-lg space-y-6"
                >
                    <h2 className="text-3xl font-bold text-center ">Login</h2>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>E-Posta *</FormLabel>
                                    <FormControl>
                                        <Input onChange={(e) => field.onChange(e)} placeholder="E-Mail" />
                                    </FormControl>
                                    {/* {!field.value && (
                                        <FormDescription>Enter an e-mail.</FormDescription>
                                    )} */}
                                    {field.value && (

                                        <FormMessage />
                                    )}
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password *</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                {/* {!field.value && (
                                    <FormDescription>Enter a password.</FormDescription>
                                )} */}
                                {field.value && (

                                    <FormMessage />
                                )}
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="
                        w-full h-11
                        text-base font-semibold
                        bg-blue-600 hover:bg-blue-700
                        active:scale-[0.98] transition
                        disabled:opacity-60
                        disabled:pointer-events-none
                        flex items-center justify-center gap-2
                        dark:bg-orange-500 dark:hover:bg-orange-600"
                    >
                        {form.formState.isSubmitting && (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        )}
                        {form.formState.isSubmitting ? "Logging in..." : "Login"}
                    </Button>

                    <div className="mt-4 text-sm text-gray-300">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Click to Register
                        </Link>
                    </div>
                    <div className="mt-2 text-sm text-gray-300">
                        <Link to="/reset-password" className="text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default Login;
