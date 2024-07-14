import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../configs/firebase";

export async function uploadFileAudio(file: any) {
    try {
        const storageRef = ref(storage, `music/${file.name}`);
        await uploadBytes(storageRef, file);
        console.log("File uploaded successfully.");
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}

export async function downloadUrl(file: any) {
    const storageRef = ref(storage, `music/${file.name}`);
    const url = await getDownloadURL(storageRef);
    return url;
}
