import { mockUsers } from '../data/mockUsers';
import UserCard from "../components/UserCard";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import { useState } from "react";
import "./HomePage.css";

function HomePage() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchStudyField, setSearchStudyField] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [searchStudyTime, setSearchStudyTime] = useState("");
    const [likedUserIds, setLikedUserIds] = useState<number[]>([]);

    const handleSearch = (
        keyword: string,
        studyField: string,
        location: string,
        studyTime: string
    ) => {
        setSearchKeyword(keyword);
        setSearchStudyField(studyField);
        setSearchLocation(location);
        setSearchStudyTime(studyTime);
    };

    const filteredUsers = mockUsers.filter((user) => {  // filter: 配列の中の要素を条件に基づいてフィルタリングするメソッド
        const matchesKeyword = 
            searchKeyword === "" || 
            user.studyFields.some((field) =>
                field.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        
        const matchesStudyField =
            searchStudyField === "" ||
            user.studyFields.includes(searchStudyField);

        const matchesLocation =
            searchLocation === "" ||
            user.location === searchLocation;

        const matchesStudyTime =
            searchStudyTime === "" ||
            user.studyTime === searchStudyTime;
        
        return (
            matchesKeyword &&
            matchesStudyField &&
            matchesLocation &&
            matchesStudyTime
        );
    });

    const handleLike = (userId: number) => {
        setLikedUserIds((currentIds) => {
            if (currentIds.includes(userId)) {
                return currentIds.filter((id) => id !== userId);
            } else {
                return [...currentIds, userId];
            }
        });
    };

    return (
        <div>
            <Header />

            <h1>勉強仲間を探す</h1>

            <SearchForm onSearch={handleSearch} />

            <div className="user-list">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            isLiked={likedUserIds.includes(user.id)}
                            onLike={handleLike}
                        />
                    ))
                ) : (
                    <p>条件に一致するユーザーが見つかりませんでした。</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;