import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: "com.techventures.fooddelivery",
    databaseId: "687e759c00396aebf023",
    bucketId: "68a967680015ec7073ff",
    userCollectionId: "687e75e600056bd4d4b9", 
    categoriesCollectionId: "68a95676003827420d43",
    menuCollectionId: "68a9587c00341356e400",
    customizationsCollectionId: "68a95cfe000d74857aef",
    menuCustomizationsCollectionId: "68a95f010021a809ffc6"
}

// Setting up appwrite client
const client = new Client();

client.setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform)

// Setting an account
export const account = new Account(client);

// Setting databases
export const databases = new Databases(client);

export const storage = new Storage(client);

const avatars = new Avatars(client);

export const createUser = async ({ name, email, password }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(! newAccount) {
            throw new Error("Error while creating new user account!");
        }

        // Automatically sign in user after user creation
        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);

        // Storing user data into DB
        return await databases.createDocument(appwriteConfig.databaseId, 
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                name,
                avatar: avatarUrl
            }
        )
    } catch(e: any) {
        throw new Error(e.message as string);
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        // Creating new sign in session
        const session = await account.createEmailPasswordSession(email, password);
    } catch(e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAcc = await account.get();
        if(! currentAcc) {
            throw new Error();
        }
        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
            Query.equal('accountId', currentAcc.$id)
        ]);

        if(! currentUser) {
            throw Error();
        }

        return currentUser.documents[0];
    } catch(err) {
        throw new Error(err as string);
    }
}

export const getMenu = async ({category, query}: GetMenuParams) => {

    try {
        console.log('### category from getMenu', category);
        console.log('### query from getMenu', query);

        const queries: string[] = [];
        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        let menus: any;

        if(category || query) {
            menus = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.menuCollectionId,
                queries,
            );
        } else {
            menus = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.menuCollectionId,
            );
        }

        return menus.documents;
        // if(queries.length > 0) {
        //     const menus = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.menuCollectionId, queries);
        //     return menus.documents;
        // } else {
        //     const menus = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.menuCollectionId);
        //     return menus.documents;
        // }
    } catch(e) {
        throw new Error(e as string);
    }
}

export const getAllCategories = async () => {
    try {
        const categories = await databases.listDocuments(appwriteConfig.databaseId, 
            appwriteConfig.categoriesCollectionId);

        return categories.documents;
    } catch(e) {
        throw new Error(e as string);
    }
}