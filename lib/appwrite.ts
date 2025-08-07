import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: "com.techventures.fooddelivery",
    databaseId: "687e759c00396aebf023",
    userCollectionId: "687e75e600056bd4d4b9" 
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