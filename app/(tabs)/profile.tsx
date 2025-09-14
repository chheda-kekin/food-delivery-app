import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { ProfileFieldProps } from "../../type";


const ProfileField = ({label, value, icon}: ProfileFieldProps) => {
    return (
        <View className="flex-row h-12 items-center">
            <View className="flex mr-[10px] bg-[#fff0e6] size-12 rounded-full items-center justify-center">
                <Image source={icon} resizeMode="contain" className="size-6" tintColor="#ffa64d" />
            </View>
            <View className="gap-[4px]">
                <Text className="text-sm font-medium  text-[#6A6A6A]">{ label }</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" className="text-base font-semibold">
                    { value.length > 35 ? `${value.substring(0, 35)}...` : value }
                </Text>
            </View>
        </View>
    );
}


const Profile = () => {

    const { user, setIsAuthenticated } = useAuthStore();

    const signOutHandler = async () => {
        await signOut();
        setIsAuthenticated(false);
        // return <Redirect href="/sign-in" />
        router.replace("/sign-in");
    }

    return (
        <SafeAreaView className="flex px-5 pt-5">
                {/* Profile picture ends */}
                <CustomHeader title="Profile" />
                <View className="flex items-center w-full rounded-full">
                    <Image className="size-[100px] rounded-full"
                        source={{uri: user!.avatar}}
                        resizeMode="contain" />
                </View>
                {/* User Info */}
                <View className="mt-5 rounded-[20px] bg-white px-[14px] py-[20px] gap-[25px]">
                    { user!.name && <ProfileField  label="Name" value={user!.name} icon={images.user} />}
                    { user!.email && <ProfileField  label="Email" value={user!.email} icon={images.envelope} />}
                    { user!.mobile && <ProfileField  label="Phone number" value={`+91-${user!.mobile}`} icon={images.phone} />}
                    { user!.address1 && <ProfileField  label="Address-1 (Home)" value={user!.address1} icon={images.location} />}
                    { user!.address2 && <ProfileField  label="Address-2 (Office)" value={user!.address2} icon={images.location} />}
                </View>
                {/* User Info ends */}

                {/* Profile Action Buttons */}
                <View className="gap-[8px] mt-7">
                    {/* <Pressable className="bg-[#fff0e6] py-[14px] px-[16px] border border-primary rounded-full flex-row justify-center">
                        <Text className="text-primary text-base font-bold">Edit Profile</Text>
                    </Pressable> */}
                    <Pressable className="bg-[#ffe6e6] py-[14px] px-[16px] border border-error rounded-full flex-row justify-center"
                        onPress={signOutHandler}>
                        <Text className="text-error text-base font-bold">Log out</Text>
                    </Pressable>
                </View>
                {/* Profile Action Buttons */}
        </SafeAreaView>
    )
}

export default Profile;