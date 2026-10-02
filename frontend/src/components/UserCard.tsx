import type { User } from '../types/User';
import "./UserCard.css";

type UserCardProps = {
    user: User;
};

function UserCard({ user }: UserCardProps) {
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
                <button className="profile-button">
                    プロフィールを見る
                </button>

                <button className="like-button">
                    ♥
                </button>
            </div>
        </article>
    );
}

export default UserCard;