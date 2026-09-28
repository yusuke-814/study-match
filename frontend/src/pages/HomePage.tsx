import { mockUsers } from '../data/mockUsers';
import UserCard from "../components/UserCard";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import { useState } from "react";

function HomePage() {
    const [searchKeyword, setSearchKeyword] = useState("");

    const filteredUsers = mockUsers.filter((user) => {  // filter: 配列の中の要素を条件に基づいてフィルタリングするメソッド
        if (searchKeyword === ""){
            return true; // 検索キーワードが空の場合は全てのユーザーを表示
        }
        
        return user.studyFields.some((field) =>  // some: 配列の中の要素が条件を満たすかどうかをチェックするメソッド
            field.toLowerCase().includes(searchKeyword.toLowerCase())  // includes: 文字列が特定の文字列を含むかどうかをチェックするメソッド
        );  // studyFieldsの中に検索キーワードが含まれていた場合にtrueを返す
    });

    return (
        <div>
            <Header />

            <h1>勉強仲間を探す</h1>

            <SearchForm onSearch={setSearchKeyword}/>  // SearchFormコンポーネントにonSearchプロパティとしてsetSearchKeyword関数を渡す

            {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}

export default HomePage;