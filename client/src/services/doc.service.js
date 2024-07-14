import { databases, DATABASE_ID } from "../config/appwrite";
import { ID, Query, Permission, Role } from "appwrite";

export const getDocuments = async (COLLECTION_ID, limit = 21, offset = 0) => {
    try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(limit),
            Query.offset(offset),
        ]);
        return res.documents;
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getDocument = async (COLLECTION_ID, DOCUMENT_ID) => {
    try {
        const res = await databases.getDocument(DATABASE_ID, COLLECTION_ID, DOCUMENT_ID);
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getDocumentByQuery = async (COLLECTION_ID, query, value) => {
    try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID,
            [Query.equal(query, value)]
        );
        return res.documents[0];
    } catch (error) {
        console.log(error.message);
    }
}



export const createUserDoc = async (COLLECTION_ID, data, user) => {
    const userExist = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('email', data.email)
    ])

    if (userExist.documents.length === 0) {
        try {
            const DOCUMENT_ID = ID.unique();
            const res = await databases.createDocument(DATABASE_ID, COLLECTION_ID, DOCUMENT_ID, data, [
                Permission.delete(Role.user(user.$id)),
                Permission.read(Role.any()),
                Permission.update(Role.user(user.$id)),
            ]);
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return userExist.documents[0] || null;
}

export const updateUserDoc = async (COLLECTION_ID, DOCUMENT_ID, data) => {
    try {
        const res = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, DOCUMENT_ID, data);
        return res;
    } catch (error) {
        throw new Error(error.message);
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
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};