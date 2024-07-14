"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CreateCategoriesParams, UpdateCategoriesParams, createCategories, deleteCategories, getCategories, updateCategories } from "@/api/categoriesApi";
import { UseCategories } from "./types/useCategoriesTypes";
import { Category, DeleteCategories, NewCategories, UpdateCategories, loadCategories } from "@/store/categories";

const useCategories = (): UseCategories => {
    const dispatch = useDispatch();

    const GetCategories = async () => {
        try {
            const data = await getCategories();
            console.log("data  ctgr:", data)
            const categories: Category[] = data;
            dispatch(loadCategories(categories));
        } catch (error) {
            console.log("error loading artist , ", error);
        }
    };

    const handleUpDateCategories = async (
        body: UpdateCategoriesParams
    ) => {
        try {
            const data = await updateCategories(body);
            dispatch(UpdateCategories(data));
        } catch (error) {
            console.log("error updating artist , ", error);
        }
    };
    const handleCreateCategories = async (body: CreateCategoriesParams) => {
        try {
            const data = await createCategories(body);
            dispatch(NewCategories(data));
        } catch (error) {
            console.log("error updating artist , ", error);
        }
    };
    const handleDeleteCategories = async (id: string) => {
        try {
            const data = await deleteCategories(id);
            console.log("dataa deleted", data);
            dispatch(DeleteCategories(parseInt(id)));
        } catch (error) {
            console.log("error updating artist , ", error);
        }
    };

    useEffect(() => {
        // GetCategories();
    }, []);

    return {
        GetCategories,
        handleUpDateCategories,
        handleCreateCategories,
        handleDeleteCategories,
    };
};

export default useCategories;
