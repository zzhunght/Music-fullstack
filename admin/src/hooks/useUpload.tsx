import { uploadImage } from "@/utils/upload"
import { useState } from "react"




const useUpload = () => {
    const [loading, setLoading] = useState(false)

    const uploadFile = async (file: File, path: string) => {
        try {
            setLoading(true)
            const url = await uploadImage(file, path)
            return url
        } catch (error) {
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        uploadFile
    }
}

export default useUpload