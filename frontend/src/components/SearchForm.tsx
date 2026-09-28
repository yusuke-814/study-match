import { useState } from "react";

type SearchFormProps = {
    onSearch: (keyword: string) => void;
};

function SearchForm({ onSearch }: SearchFormProps) {
    const [keyword, setKeyword] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  // フォームのデフォルトの送信動作を防ぐ

        onSearch(keyword);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="勉強したい分野を入力"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
            />

            <button type="submit">検索</button>
        </form>
    );
}

export default SearchForm;