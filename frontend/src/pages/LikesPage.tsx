import { mockUsers } from "../data/mockUsers";
import UserCard from "../components/UserCard";
import Header from "../components/Header";
import { useLike } from "../context/LikeContext";

function LikesPage() {
    const { likedUserIds, toggleLike } = useLike();

    const likedUsers = likedUserIds
        .map((userId) =>
            mockUsers.find((user) => user.id === userId)
        )
        .filter((user) => user !== undefined);
    
    return (
        <div>
            <Header />

            <h1>いいね一覧</h1>

            <div className="user-list">
                {likedUsers.length > 0 ? (
                    likedUsers.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            isLiked={likedUserIds.includes(user.id)}
                            onLike={toggleLike}
                        />
                    ))
                ) : (
                    <p>いいねしたユーザーはいません。</p>
                )}
            </div>
        </div>
    );
}

export default LikesPage;