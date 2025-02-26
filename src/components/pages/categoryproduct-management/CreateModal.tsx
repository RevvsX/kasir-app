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
      category_name: "",
    },
  });

  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formschema>) => {
    const createData = await fetch(`http://localhost:3000/api/crud/category-management/create`, {
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
        <Button>Add new category product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new category product</DialogTitle>
          <DialogDescription>Make new category product</DialogDescription>
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

export default CreateModal;
