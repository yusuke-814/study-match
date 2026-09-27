import type { User } from '../types/User';

type UserCardProps = {
    user: User;
};

function UserCard({ user }: UserCardProps) {
    return (
        <div>
            <img
                src={user.avatarUrl}
                alt={`${user.name}のプロフィール画像`}
                width="100"
            />

            <h2>{user.name}</h2>

            <p>
                {user.age}歳 / {user.location}
            </p>

            <p>{user.bio}</p>

            <div>
                {user.studyFields.map((field) => (
                    <span key={field}>{field}</span>
                ))}
            </div>

            <p>勉強時間: {user.studyTime}</p>

            <p>目標: {user.goal}</p>

            <button>プロフィールを見る</button>
            <button>気になる</button>
        </div>
    );
}

export default UserCard;