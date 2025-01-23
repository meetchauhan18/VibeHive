import datauri from "datauri/parser.js";
import path from "path";


export const getDataUri = (file) => {
    const parser = new datauri();
    const extName = path.extname(file.originalname).toString();
    const base64 = parser.format(extName, file.buffer);
    return base64;
};

export default getDataUri;