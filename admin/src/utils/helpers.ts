import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const setReleaseDate = (date: Date) => {
    const dateData = dayjs(date);
    const indochinaDate = dateData.utcOffset("+0700");
    return indochinaDate.format();
};

export function fileToBase64(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}
