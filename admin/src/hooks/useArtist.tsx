"use client";
import {
    UpdateArtistParams,
    createArtistAPI,
    deleteArtistAPI,
    getAllArtist,
    updateArtist,
} from "@/api/artistApi";
import {
    Artist,
    DeleteArtist,
    NewArtist,
    UpdateArtist,
    loadArtist,
} from "@/store/artist";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UseArtist } from "./types/useArtistTypes";

const useArtist = (): UseArtist => {
    const dispatch = useDispatch();

    const GetArtists = async () => {
        try {
            const data = await getAllArtist();
            const artist: Artist[] = data.data;
            dispatch(loadArtist(artist));
        } catch (error) {
            console.log("error loading artist , ", error);
        }
    };

    const handleUpDateArtists = async (
        id: string,
        body: UpdateArtistParams
    ) => {
        try {
            const data = await updateArtist(id, body);
            dispatch(UpdateArtist(data));
        } catch (error) {
            console.log("error updating artist , ", error);
        }
    };
    const handleCreateArtists = async (body: UpdateArtistParams) => {
        try {
            const data = await createArtistAPI(body);
            dispatch(NewArtist(data));
        } catch (error) {
            console.log("error updating artist , ", error);
        }
    };
    const handleDeleteArtists = async (id: string) => {
        try {
            const data = await deleteArtistAPI(id);
            console.log("dataa deleted", data);
            dispatch(DeleteArtist(parseInt(id)));
        } catch (error) {
            console.log("error updating artist , ", error);
        }
    };

    useEffect(() => {
        // GetArtists();
    }, []);

    return {
        GetArtists,
        handleUpDateArtists,
        handleCreateArtists,
        handleDeleteArtists,
    };
};

export default useArtist;
