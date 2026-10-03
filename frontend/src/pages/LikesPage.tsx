import { mockLikes } from "../data/mockLikes";
import { mockUsers } from "../data/mockUsers";
import UserCard from "../components/UserCard";
import Header from "../components/Header";

function LikesPage() {
    const myUserId = 1;

    const likedUsers = mockLikes
        .filter((like) => like.fromUserId === myUserId)
        .map((like) =>
            mockUsers.find((user) => user.id === like.toUserId)
        )
        .filter((user) => user !== undefined);
    
    return (
        <div>
            <Header />

            <h1>いいね一覧</h1>

            <div className="user-list">
                {likedUsers.length > 0 ? (
                    likedUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))
                ) : (
                    <p>いいねしたユーザーはいません。</p>
                )}
            </div>
        </div>
    );
}

export default LikesPage;