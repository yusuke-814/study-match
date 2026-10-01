import { useState } from "react";

type SearchFormProps = {
    onSearch: (
        keyword: string,
        studyField: string,
        location: string,
        studyTime: string
    ) => void;
};

function SearchForm({ onSearch }: SearchFormProps) {
    const [keyword, setKeyword] = useState("");
    const [studyField, setStudyField] = useState("");
    const [location, setLocation] = useState("");
    const [studyTime, setStudyTime] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  // フォームのデフォルトの送信動作を防ぐ

        onSearch(keyword, studyField, location, studyTime);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="勉強したい分野を入力"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
            />

            <select
                value={studyField}
                onChange={(event) => setStudyField(event.target.value)}
            >
                <option value="">すべての分野</option>
                <option value="AWS">AWS</option>
                <option value="Python">Python</option>
                <option value="React">React</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Java">Java</option>
            </select>

            <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
            >
                <option value="">すべての場所</option>
                <option value="東京">東京</option>
                <option value="横浜">横浜</option>
            </select>

            <select
                value={studyTime}
                onChange={(event) => setStudyTime(event.target.value)}
            >
                <option value="">すべての時間帯</option>
                <option value="平日夜">平日夜</option>
                <option value="休日">休日</option>
            </select>

            <button type="submit">検索</button>
        </form>
    );
}

export default SearchForm;