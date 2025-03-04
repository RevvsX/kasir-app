import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import formschema from "./formschema";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { DialogClose } from "@radix-ui/react-dialog";

const EditModal = ({
  name,
  address,
  phone_number,
  id
}: {
  name: string;
  address: string;
  phone_number: string;
  id: string
}) => {
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      name: name,
      address: address,
      phone_number: phone_number,
    },
  });

  useEffect(() => {
    form.setValue("name", name)
    form.setValue("address", address)
    form.setValue("phone_number", phone_number)
  }, [name, address, phone_number, form])

  const { toast } = useToast()
  const router = useRouter()
  const onSubmit = async (values: z.infer<typeof formschema>) => {
    const editData = await fetch(`http://localhost:3000/api/crud/member-management/edit/${id}`, {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit member</DialogTitle>
          <DialogDescription>Edit a member</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter member Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" type="text" {...field} />
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
                  <FormLabel>
                    Phone number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
