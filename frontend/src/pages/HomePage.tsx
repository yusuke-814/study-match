import { mockUsers } from '../data/mockUsers';
import UserCard from "../components/UserCard";

function HomePage() {
    return (
        <div>
            <h1>勉強仲間を探す</h1>

            {mockUsers.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}

export default HomePage;