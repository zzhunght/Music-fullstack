import axios from "axios";

export async function uploadImage(formData: any) {
    const url = await axios
        .post(`https://api.cloudinary.com/v1_1/ddyzaaz9k/upload`, formData)
        .then((res) => {
            console.log(res.data.secure_url);
            return res.data.secure_url;
        })
        .catch((err) => console.error(err));
    return url;
}
