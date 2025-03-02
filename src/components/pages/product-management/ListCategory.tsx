import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Column } from "../categoryproduct-management/columns";


const CategoryProductContext = createContext<Column[]>([])


export const useCategoryProductContext = () => useContext(CategoryProductContext)


export const CategoryProductContextProvider = ({ children }: PropsWithChildren) => {
    const [data, setData] = useState<Column[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const getData = await fetch(`http://localhost:3000/api/crud/category-management/get_all`,
                {
                  method: "GET",
                  headers: {
                    accept: "application/json"
                  }
                }
              )
            const result = await getData.json();
            setData(result.data);
        };

        fetchData();
    }, []);

    return(
        <CategoryProductContext.Provider value={data}>{children}</CategoryProductContext.Provider>
    )
}

