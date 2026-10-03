
import { useNavigate } from "react-router-dom";
import type { User } from '../types/User';
import "./UserCard.css";

type UserCardProps = {
    user: User;
    isLiked: boolean;
    onLike: (userId: number) => void;
};

function UserCard({ user, isLiked, onLike }: UserCardProps) {
    const navigate = useNavigate();

    const handleLike = async () => {
        const response = await fetch("http://127.0.0.1:8000/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // リクエストのContent-TypeをJSONに設定
            },
            body: JSON.stringify({
                fromUserId: 1,
                toUserId: user.id,
            }),
        });

        const data = await response.json();

        if (data.success) {
            // setIsLiked(true);
            onLike(user.id);
        }
    };

    return (
        <article className="user-card">
            <div className="user-card-header">
                <img
                    className="user-avatar"
                    src={user.avatarUrl}
                    alt={`${user.name}のプロフィール画像`}
                />

                <div className="user-basic-info">
                    <h2>{user.name}</h2>

                    <p>
                        {user.age}歳 ・ {user.location}
                    </p>
                </div>
            </div>

            <div className="user-tags">
                {user.studyFields.map((field) => (
                    <span className="study-tag" key={field}>
                        {field}
                    </span>
                ))}
            </div>

            <p className="user-bio">{user.bio} </p>

            <div className="user-details">
                <p>🕐 {user.studyTime}</p>
                <p>🎯 {user.goal}</p>
            </div>
            
            <div className="user-card-actions">
                <button 
                    className="profile-button"
                    onClick={() => navigate(`/users/${user.id}`)}
                >
                    プロフィールを見る
                </button>

                <button 
                    className="like-button"
                    onClick={handleLike}
                >
                    {isLiked ? "💖" : "🤍"}
                </button>
            </div>
        </article>
    );
}

export default UserCard;