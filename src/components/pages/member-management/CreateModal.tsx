import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";

const CreateModal = () => {
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      name: "",
      address: "",
      phone_number: "",
    },
  });

  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formschema>) => {
    const createData = await fetch(`http://localhost:3000/api/crud/member-management/create`, {
      method: "POST",
      body: JSON.stringify(values)
    })

    const response = await createData.json()

    if (!createData.ok) {
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

    form.reset()

    router.replace(router.pathname)
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add new member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new member</DialogTitle>
          <DialogDescription>Add a member</DialogDescription>
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

export default CreateModal;
