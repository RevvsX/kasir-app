import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const DynamicBreadcrumb = () => {
  const path = usePathname();
  const pathName = path?.split("/")?.filter(Boolean) || [];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathName.map((item, index) => {
          if (index == pathName.length - 1) {
            return;
          }
          return (
            <div className="flex items-center gap-2" key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{item}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          );
        })}
        <BreadcrumbItem>
          <BreadcrumbPage>{pathName[pathName.length - 1]}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
