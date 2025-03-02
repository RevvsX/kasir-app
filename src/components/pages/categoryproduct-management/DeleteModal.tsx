import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";

export default function DeleteModal({id}: {id:number}) {
  const { toast } = useToast();
    const router = useRouter()
    const ConfirmDelete = async () => {
  
      const deleteData = await fetch(`http://localhost:3000/api/crud/category-management/delete/${id}`, {method: "DELETE"})
  
      const response = await deleteData.json()
  
      if(!deleteData.ok){
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
        duration: 5000,
      });
  
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query },
        },
      );
    };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            category product
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={ConfirmDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
