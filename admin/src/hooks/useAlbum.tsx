"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UseAlbum } from "./types/useAlbumTypes";
import {
    AlbumParams,
    createAlbum,
    deleteAlbumById,
    getAllAlbum,
    updateAlbumById,
} from "@/api/albumApi";
import {
    Album,
    DeleteAlbum,
    NewAlbum,
    UpdateAlbum,
    loadAlbum,
} from "@/store/album";

const useAlbum = (): UseAlbum => {
    const dispatch = useDispatch();

    const GetAlbums = async () => {
        try {
            const res = await getAllAlbum();
            const newAlbums: Album[] = res.data.data.map((album: any) => ({
                id: album.id,
                name: album.name,
                thumbnail: album.thumbnail,
                artistId: album.artist_id,
                releaseDate: album.release_date,
            }));
            const albums: Album[] = newAlbums;
            dispatch(loadAlbum(albums));
        } catch (error) {
            console.log("error loading albums , ", error);
        }
    };

    const handleUpdateAlbum = async (id: number, body: AlbumParams) => {
        try {
            const res = await updateAlbumById(id, body);
            const data = res.data;
            const newAlbums: Album = {
                id: data.id,
                name: data.name,
                thumbnail: data.thumbnail,
                artistId: data.artists,
                releaseDate: data.release_date,
            };
            dispatch(UpdateAlbum(newAlbums));
            return res;
        } catch (error) {
            console.log("error updating artist , ", error);
        }
    };
    const handleCreateAlbum = async (body: AlbumParams) => {
        try {
            const res = await createAlbum(body);
            const data = res.data;
            const newAlbums: Album = {
                id: data.id,
                name: data.name,
                thumbnail: data.thumbnail,
                artistId: data.artist_id,
                releaseDate: data.release_date,
            };
            dispatch(NewAlbum(newAlbums));
            return res;
        } catch (error) {
            console.log("error updating artist , ", error);
        }
    };
    const handleDeleteAlbum = async (id: number) => {
        try {
            const res = await deleteAlbumById(id);
            console.log("dataa deleted", res);
            dispatch(DeleteAlbum(id));
            return res;
        } catch (error) {
            console.log("error updating artist , ", error);
        }
    };

    useEffect(() => {
        // GetAlbums();
    }, []);

    return {
        GetAlbums,
        handleUpdateAlbum,
        handleCreateAlbum,
        handleDeleteAlbum,
    };
};

export default useAlbum;
