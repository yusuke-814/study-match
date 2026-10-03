import { createContext, useContext, useState } from "react";

type LikeContextType = {
    likedUserIds: number[];
    toggleLike: (userId: number) => void;
};

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export function LikeProvider({ children }: { children: React.ReactNode}) {

    console.log("LikeProviderが作られました");
    
    const [likedUserIds, setLikedUserIds] = useState<number[]>([]);

    console.log("現在のいいね:", likedUserIds);

    const toggleLike = (userId: number) => {
        console.log("いいねを押しました: ", userId);
        setLikedUserIds((currentIds) => {
            if (currentIds.includes(userId)) {
                return currentIds.filter((id) => id !== userId);
            } else {
                return [...currentIds, userId];
            }
        });
    };

    return (
        <LikeContext.Provider value={{ likedUserIds, toggleLike }}>
            {children}
        </LikeContext.Provider>
    );
}

export function useLike() {
    const context = useContext(LikeContext);

    if(!context) {
        throw new Error("useLike must be used within LikeProvider");
    }

    return context;
}