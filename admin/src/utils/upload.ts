import { storage } from "@/configs/firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadImage = async (
    image: File,
    path: string
): Promise<string | null> => {
    if (!image) {
        const errorMessage = "Avatar is required";
        throw errorMessage;
    }

    try {
        const imageRef = ref(storage, path + image.name);
        const uploadTask = uploadBytesResumable(imageRef, image, {
            contentType: "image/jpeg",
        });

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    console.log("Error: ", error);
                    reject(error.message);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    } catch (error: any) {
                        reject(error.message);
                    }
                }
            );
        });
    } catch (error : any) {
        console.log("Error: ", error);
        return error.message;
    }
};
