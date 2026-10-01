import { mockUsers } from '../data/mockUsers';
import UserCard from "../components/UserCard";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import { useState } from "react";

function HomePage() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchStudyField, setSearchStudyField] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [searchStudyTime, setSearchStudyTime] = useState("");

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

    return (
        <div>
            <Header />

            <h1>勉強仲間を探す</h1>

            <SearchForm onSearch={handleSearch} />

            {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))
            ) : (
                <p>条件に一致するユーザーが見つかりませんでした。</p>
            )}
        </div>
    );
}

export default HomePage;