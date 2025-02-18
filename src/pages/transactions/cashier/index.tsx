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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/layout/AppLayout";
import { Minus, Plus, Search, Trash } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  totalprice: number;
  quantity: number;
};

const Index = () => {
  const { toast } = useToast();

  const ppn = 11;
  const diskon = 15;
  const [isMember, setIsMember] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [barcode, setBarcode] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);
  const [totalHargaFix, setTotalHargaFix] = useState(0);

  const productData: Product[] = [
    { id: 1, name: "Shampo", price: 3000, totalprice: 3000, quantity: 1 },
    { id: 2, name: "Sabun", price: 2500, totalprice: 2500, quantity: 1 },
  ];
  const memberData = {
    name: "Remmy shiranui",
    code: 67238,
  };

  const [member, setMember] = useState<{ name: string; code: number }[]>([]);

  const memberSearch = (e: FormEvent) => {
    e.preventDefault();

    setMember([memberData]);
  };

  const deleteMember = () => {
    setMember([]);
  };

  const addProductByBarcode = (e: FormEvent) => {
    e.preventDefault();

    const foundProduct = productData.find(
      (product) => product.id === parseInt(barcode)
    );

    if (!foundProduct)
      return toast({
        title: "Product not found",
      });

    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (p) => p.id === foundProduct.id
      );

      if (existingProduct) {
        return prevProducts.map((p) =>
          p.id === foundProduct.id
            ? {
                ...p,
                quantity: p.quantity + 1,
                totalprice: p.price * (p.quantity + 1),
              }
            : p
        );
      } else {
        return [...prevProducts, { ...foundProduct, quantity: 1 }];
      }
    });

    setBarcode("");
  };

  function deleteProduct(id: number){
    setProducts(products.filter((prev)=>{
      return prev.id != id
    }))
  }

  const increaseQuantity = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity: p.quantity + 1,
              totalprice: p.price * (p.quantity + 1),
            }
          : p
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts
        .map((p) =>
          p.id === id
            ? {
                ...p,
                quantity: Math.max(1, p.quantity - 1),
                totalprice: Math.max(p.price, p.price * (p.quantity - 1)),
              }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const countTotalPrice = useCallback(() => {
    let totalHarga = products.reduce(
      (prev, current) => prev + current.totalprice,
      0
    );

    setTotalHarga(Math.floor(totalHarga));

    if (isMember && member.length != 0) {
      totalHarga = totalHarga - totalHarga * (diskon / 100);
    }

    totalHarga = totalHarga + totalHarga * (ppn / 100);

    setTotalHargaFix(Math.floor(totalHarga));
  }, [products, isMember, member]);

  useEffect(() => {
    countTotalPrice();
  }, [countTotalPrice]);

  return (
    <AppLayout>
      <div className="flex gap-2 w-full">
        <div className="w-1/4 h-[85vh] shadow-md border flex flex-col p-4">
          <h1 className="font-bold">Total</h1>
          <div className="flex justify-between w-full text-sm items-center">
            <span>Harga</span>
            <Input
              className="border-none shadow-none text-end"
              disabled
              value={`Rp.${totalHarga.toLocaleString()},00`}
            />
          </div>
          <div className="flex justify-between w-full text-sm items-center">
            <span>Diskon</span>
            <Input
              className="border-none shadow-none text-end"
              disabled
              value={`${member.length != 0 && isMember ? diskon : "0"}%`}
            />
          </div>
          <div className="flex justify-between w-full text-sm items-center">
            <span>PPN</span>
            <Input
              className="border-none shadow-none text-end"
              disabled
              value={`${ppn}%`}
            />
          </div>
          <div className="flex justify-between w-full text-sm items-center">
            <span>Total</span>
            <Input
              className="border-none shadow-none text-end"
              disabled
              value={`Rp.${totalHargaFix.toLocaleString()},00`}
            />
          </div>
          <h1 className="font-bold">Payment</h1>
          <div className="flex justify-between w-full text-sm items-center">
            <span>Is member</span>
            <span>
              <Switch
                id="is-member"
                checked={isMember}
                onCheckedChange={setIsMember}
              />
            </span>
          </div>
          <div className="w-full border-t my-2"></div>
          <div
            className={`flex justify-between w-full text-sm items-center gap-2 my-2 ${
              isMember ? "" : "hidden"
            }`}
          >
            <span>Member</span>
            {member.length != 0 ? (
              <div className="flex items-end gap-2 flex-col">
                <span className="text-nowrap overflow-hidden text-ellipsis">
                  {member[0].name}
                </span>
                <Button onClick={deleteMember}>
                  <Trash />
                </Button>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"}>Select member</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Select member</DialogTitle>
                    <DialogDescription>
                      select a registered member
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <form
                      onSubmit={memberSearch}
                      className="flex gap-2 items-center w-full"
                    >
                      <Input
                        required
                        className="w-full"
                        placeholder="Member code..."
                      />
                      <Button type="submit">
                        <Search />
                      </Button>
                    </form>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="flex justify-between w-full text-sm items-center gap-3">
            <span>Paid</span>
            <Input className="text-end" placeholder="0" type="number" />
          </div>
          <div className="flex justify-between w-full text-sm items-center gap-3">
            <span>Change</span>
            <Input
              className="border-none shadow-none text-end"
              value={"0"}
              disabled
              type="number"
            />
          </div>
          <Button>Submit</Button>
        </div>
        <div className="w-3/4 h-[85vh] shadow-md border">
          <form
            className="flex items-center mb-4"
            onSubmit={addProductByBarcode}
          >
            <Input
              placeholder="Product barcode..."
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
            <Button type="submit">
              <Search />
            </Button>
          </form>
          <div className="p-2 flex flex-col gap-3 overflow-y-auto max-h-full">
            {products.map((product) => (
              <Card key={product.id} className="w-full">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{product.name}</span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your product in the cart.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button onClick={()=>deleteProduct(product.id)}>Confirm</Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      Rp.{product.totalprice.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => decreaseQuantity(product.id)}
                      >
                        <Minus />
                      </Button>
                      <span className="text-lg">{product.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => increaseQuantity(product.id)}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
