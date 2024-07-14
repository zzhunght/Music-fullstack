"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import CreateCategorySheet from "@/components/sheet/categories/createCategorySheet";
import { useGetCategoriesQuery } from "@/api/categoriesApi";
import CategorySheet from "@/components/sheet/categories/categoriesSheet";

export type Song = {
    id: number;
    name: string;
    thumbnail: string;
    artists: Artist[];
    duration: number;
    releaseDate: string;
};

type Artist = {
    id: number;
    name: string;
    avatar_url: string;
};
export function TableCategories() {
    // const categories = useSelector((state: RootState) => state.categories.categories)
    const {data: categories} = useGetCategoriesQuery()
    const [search, setSearch] = React.useState("")


    return (
        <div className="w-full">
            <div className="flex justify-between">
                <Input
                    placeholder="Tên danh mục"
                    className="w-[300px] my-[20px]"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <CreateCategorySheet />
            </div>
            
            <motion.div className="flex flex-row flex-wrap gap-[15px]" layoutScroll layoutRoot>
                {categories?.map((category) => (
                    <motion.div key={category.id}
                        layout="position"
                        layoutId={category.id.toString()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { ease: "linear" },
                            layout: { duration: 0.3 }
                        }}
                    >
                        <CategorySheet category={category} key={category.id.toString()} />
                    </motion.div>

                ))}
            </motion.div>

        </div>
    );
}
