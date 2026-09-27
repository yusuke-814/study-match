import { mockUsers } from '../data/mockUsers';
import UserCard from "../components/UserCard";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

function HomePage() {
    return (
        <div>
            <Header />

            <h1>勉強仲間を探す</h1>

            <SearchForm />

            {mockUsers.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}

export default HomePage;