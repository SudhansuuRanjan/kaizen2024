import { databases, DATABASE_ID } from "../config/appwrite";
import { ID, Query } from "appwrite";

export const getDocuments = async (COLLECTION_ID, limit = 21, offset = 0) => {
    try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(limit),
            Query.offset(offset),
        ]);
        console.log(res.documents)
        return res.documents;
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getDocument = async (COLLECTION_ID, DOCUMENT_ID) => {
    try {
        const res = await databases.getDocument(DATABASE_ID, COLLECTION_ID, DOCUMENT_ID);
        console.log(res)
        return res;
    } catch (error) {
        throw new Error(err.message);
    }
}


export const getEvents = async (collectionId, limit = 21, offset = 0, category = "All") => {
    try {
        const filters = [Query.limit(limit), Query.offset(offset)];
        if (category !== "All") {
            filters.push(Query.equal('category', category));
        }

        const res = await databases.listDocuments(DATABASE_ID, collectionId, filters);
        const data = {
            documents: res.documents,
            nextCursor: offset + limit < res.total ? offset + limit : undefined
        };

        console.log(data);
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};