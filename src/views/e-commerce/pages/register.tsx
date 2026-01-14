import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../services/firebase/firebase";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import {
    registerSchema,
    type RegisterFormValues,
} from "../schemas/register-scheme";

const Register: React.FC = () => {
    const navigate = useNavigate();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(userCredential.user, {
                displayName: `${data.firstName} ${data.lastName}`,
            });

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("An error occurred during registration.");
        }
    };

    return (
        <div
            className="w-full flex items-center justify-center px-4 bg-gray-200 
            dark:bg-black"
            style={{ minHeight: "calc(100vh - 302px)" }}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-md bg-gray-900 text-white rounded-xl p-8 shadow-lg space-y-6"
                >
                    <h2 className="text-3xl font-bold text-center">Create Account</h2>

                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your first name" {...field} />
                                </FormControl>
                                {/* {!field.value && (
                                    <FormDescription>Enter a firstname.</FormDescription>
                                )} */}
                                {field.value && (

                                    <FormMessage />
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your last name" {...field} />
                                </FormControl>
                                {/* {!field.value && (
                                    <FormDescription>Enter a lastname.</FormDescription>
                                )} */}
                                {field.value && (

                                    <FormMessage />
                                )}
                            </FormItem>
                        )}
                    />

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
                        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold transition disabled:opacity-50 
                        dark:bg-orange-500 dark:hover:bg-orange-500"
                    >
                        {form.formState.isSubmitting ? "Registering..." : "Register"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Register;
