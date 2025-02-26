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

const EditModal = ({ category_name, id }: { category_name: string, id: number }) => {
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      category_name: category_name,
    },
  });

  useEffect(() => {
    form.setValue("category_name", category_name)
  }, [category_name, form])

  const { toast } = useToast()
  const router = useRouter()
  const onSubmit = async (values: z.infer<typeof formschema>) => {
    const editData = await fetch(`http://localhost:3000/api/crud/category-management/edit/${id}`, {
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
          <DialogTitle>Edit category product</DialogTitle>
          <DialogDescription>Edit a category product</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="category_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
