"use client";
import BreadCrumb from "@/components/breadCrumb";
import { TableCategories } from "@/components/ui/customs/dataTables/tableCategories";
import { AnimatePresence } from "framer-motion";
const CategoriesPage = () => {
    return (
        <AnimatePresence>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div>
                    <BreadCrumb path="categories" />
                </div>
                <TableCategories />
            </div>
        </AnimatePresence>
    );
};

export default CategoriesPage;
