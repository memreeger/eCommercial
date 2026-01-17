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
import { useTranslation } from "react-i18next";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
            alert(`${t("registerPage.errors.generic")}`);
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
                    <h2 className="text-3xl font-bold text-center">{t("registerPage.title")}</h2>

                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("registerPage.fields.firstName.label")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("registerPage.fields.firstName.placeholder")} {...field} />
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
                                <FormLabel>{t("registerPage.fields.lastName.label")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("registerPage.fields.lastName.placeholder")}{...field} />
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
                                    <FormLabel>{t("registerPage.fields.email.label")}</FormLabel>
                                    <FormControl>
                                        <Input onChange={(e) => field.onChange(e)} placeholder={t("registerPage.fields.email.placeholder")} />
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
                                <FormLabel>{t("registerPage.fields.password.label")}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder={t("registerPage.fields.password.placeholder")} {...field} />
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
                        {form.formState.isSubmitting ? `${t("registerPage.buttons.registering")}` : `${t("registerPage.buttons.register")}`}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Register;
