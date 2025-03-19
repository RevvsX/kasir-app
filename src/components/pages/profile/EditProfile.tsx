import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod'


export const editFormSchema = z.object({
    full_name: z.string().trim().min(1, "Full name is required"),
    username: z
        .string()
        .trim()
        .min(4, { message: "Username must be at least 4 characters" }),
    address: z.string().trim().optional(),
    role: z.string(),
    phone_number: z
        .string()
        .trim()
        .optional(),
});

const EditProfile = () => {
    const { data, update } = useSession()
    const form = useForm<z.infer<typeof editFormSchema>>({
        resolver: zodResolver(editFormSchema),
        defaultValues: {
            full_name: data?.user.full_name,
            username: data?.user.username,
            address: data?.user.address,
            role: data?.user.role,
            phone_number: data?.user.phone_number,
        },
    });

    useEffect(() => {
        form.setValue("full_name", data?.user.full_name as string)
        form.setValue("username", data?.user.username as string)
        form.setValue("address", data?.user.address)
        form.setValue("phone_number", data?.user.phone_number)
        form.setValue("role", data?.user.role as string)
    }, [data, form])


    const { toast } = useToast()
    const router = useRouter()
    const onSubmit = async (values: z.infer<typeof editFormSchema>) => {
        const editData = await fetch(`http://localhost:3000/api/profile/edit/${data?.user.id}`, {
            method: "PUT",
            body: JSON.stringify(values)
        })

        const response = await editData.json()

        if (!editData.ok) {
            toast({
                title: "Error!",
                description: JSON.stringify(response.message),
                duration: 5000
            })

            return
        }

        await update()



        toast({
            title: "Success!",
            description: JSON.stringify(response.message),
            duration: 5000
        })


        router.replace(
            {
                pathname: router.pathname,
                query: { ...router.query },
            },
        );
    };
    return (
        <Card>
            <CardHeader>
                <h1 className='font-bold text-xl'>Edit profile</h1>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <div className="flex flex-col md:flex-row gap-2">
                            <FormField
                                control={form.control}
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Full name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Username <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default EditProfile