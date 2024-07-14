import { CreateCategoriesParams, UpdateCategoriesParams } from "@/api/categoriesApi";

export type UseCategories = {
    GetCategories: () => Promise<void>;
    handleUpDateCategories: (
        body: UpdateCategoriesParams
    ) => Promise<void>;
    handleCreateCategories: (body: CreateCategoriesParams) => Promise<void>;
    handleDeleteCategories: (id: string) => Promise<void>;
};
