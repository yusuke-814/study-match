＜STEP1＞

Git Bashでプロジェクトルートから、

cd ~/Documents/projects/study-match/frontend

そして現在のブランチを確認します。

git branch

現在 main なら、今回はホーム画面などのFrontend開発なので、

git switch -c feature/2-frontend-routing

とします。

今回、複数ページを作るのでReact Routerを使います。

npm install react-router-dom

これで、

/login
/register
/
/profile
/matches

などのURLをReact側で管理できます。

Viteが作った初期ファイルには、今回使わないものがあります。

frontend/src を見てください。

おそらく、

src/
├── assets/
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── ...

となっています。


不要な初期ファイルを整理

今回はまずシンプルにするため、

src/
├── App.tsx
├── App.css
├── index.css
└── main.tsx

を中心に使います。

assets は今のところ使わないので削除して構いません。

ディレクトリ構成を作る

ここからが重要です。

最終的に、

frontend/
└── src/
    ├── components/
    ├── pages/
    ├── data/
    ├── types/
    ├── App.tsx
    ├── App.css
    ├── index.css
    └── main.tsx

という構成にします。

それぞれ、

components

再利用する部品。

UserCard
Header
Button

など。

pages

画面そのもの。

LoginPage
RegisterPage
HomePage
ProfilePage

など。

data

モックデータ。

mockUsers.ts

など。

types

TypeScriptの型。

User
Match
Message

など。

Git Bashで、

mkdir src/components
mkdir src/pages
mkdir src/data
mkdir src/types

とします。

これで、

src/
├── components/
├── pages/
├── data/
├── types/
├── App.tsx
├── App.css
├── index.css
└── main.tsx

になります。

User型を作る
まずユーザー情報の形を決めます。

src/types/User.ts

を作ってください。

export type User = {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  avatarUrl: string;
  studyFields: string[];
  studyTime: string;
  goal: string;
};

例えば1人のユーザーは、

id
name
age
location
bio
avatarUrl
studyFields
studyTime
goal

を持つことになります。

なぜ最初に型を作るのか？

ここがTypeScriptの重要なところです。

例えば、

const user: User = {
  name: "Yamada",
  age: 25,
  ...
};

とすれば、

Userはこういうデータですよ

とReact全体で共通認識を持てます。

将来FastAPIから、

{
  "id": 1,
  "name": "Yamada",
  "age": 25
}

が返ってきても、基本的にはこの User 型に合わせればいいわけです。

STEP 8：Mock Userデータを作る

次に、

src/data/mockUsers.ts

を作ります。

import type { User } from "../types/User";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "山田太郎",
    age: 24,
    location: "東京",
    bio: "AWSとPythonを勉強しています。一緒に勉強できる方を探しています！",
    avatarUrl: "https://i.pravatar.cc/300?img=12",
    studyFields: ["AWS", "Python"],
    studyTime: "平日 20:00〜23:00",
    goal: "AWS SAA取得",
  },
  {
    id: 2,
    name: "佐藤花子",
    age: 23,
    location: "横浜",
    bio: "Reactを勉強中です。休日に一緒に勉強できる方を探しています。",
    avatarUrl: "https://i.pravatar.cc/300?img=47",
    studyFields: ["React", "TypeScript"],
    studyTime: "土日",
    goal: "Webエンジニア転職",
  },
  {
    id: 3,
    name: "鈴木健太",
    age: 26,
    location: "東京",
    bio: "資格取得に向けて毎日勉強しています。",
    avatarUrl: "https://i.pravatar.cc/300?img=33",
    studyFields: ["Java", "AWS"],
    studyTime: "平日 19:00〜22:00",
    goal: "資格取得",
  },
];

これは本物のAPIの代わりです。

今は、

FastAPI
   ↓
     ❌ まだ使わない

mockUsers
   ↓
React

とします。

HomePageを作る

まず一番重要な画面、

「勉強仲間を探す画面」

を作ります。

src/pages/HomePage.tsx

を作ってください。

import { mockUsers } from "../data/mockUsers";

function HomePage() {
  return (
    <div>
      <h1>勉強仲間を探す</h1>

      {mockUsers.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.age}歳 / {user.location}</p>
          <p>{user.bio}</p>

          <div>
            {user.studyFields.map((field) => (
              <span key={field}>{field} </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;

App.tsxを変更

App.tsx を一旦シンプルにします。

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

動作確認

ブラウザ：

http://localhost:5173

を開きます。

すると、

勉強仲間を探す

山田太郎
24歳 / 東京
AWSとPythonを勉強しています...

AWS Python

佐藤花子
23歳 / 横浜
Reactを勉強中です...

React TypeScript

鈴木健太
26歳 / 東京
...

のような表示になるはずです。

＜STEP2＞
UserCard.tsxを作る

現在、

src/
└── components/

というフォルダを作ってあります。

ここに、

UserCard.tsx

を作ります。

VS Codeの左側から、

src
 ↓
components
 ↓
UserCard.tsx

を作ってください。

UserCardとは？

簡単にいうと、

「ユーザー1人分を表示する部品」

です。

例えば、

山田太郎
24歳 / 東京
AWSとPythonを勉強しています
[AWS] [Python]
平日20:00〜23:00
AWS SAA取得

これを1つの部品にしたわけです。

Propsという考え方

ここが今回一番重要です。

この部分です。

type UserCardProps = {
  user: User;
};

そして、

function UserCard({ user }: UserCardProps) {

となっています。

これは簡単に言うと、

「UserCardにはUser型のuserというデータを渡してください」

という意味です。

例えば将来的に、

<UserCard user={山田太郎} />

のようにデータを渡します。

するとUserCardの中では、

user.name

で

山田太郎

を取得できます。

同じように、

user.age

↓

24
user.location

↓

東京

となります。

今の HomePage.tsx では、

{mockUsers.map((user) => (
  <div>
    ...
  </div>
))}

の中にユーザー表示のコードが全部入っています。

これが大きなアプリになると、

HomePage.tsx
1000行
2000行
3000行

みたいになってしまいます。

そこで、

HomePage
   ↓
UserCard

と分けます。

つまり、

1つのコンポーネントには1つの役割を持たせる

という考え方です。

これは実際のReact開発でも非常に重要です。

HomePage.tsxを変更する
次に、

src/pages/HomePage.tsx

を開いてください。

いったん全部以下に置き換えてください。

import { mockUsers } from "../data/mockUsers";
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

keyって何？

ここも初心者には分かりにくいところです。

key={user.id}

は、

Reactが「この3つのUserCardはそれぞれ別のものだ」と識別するための番号

くらいに考えてください。

今回、

user.id = 1
user.id = 2
user.id = 3

なので、

key={1}
key={2}
key={3}

となります。

Reactでは、map()を使って複数の要素を表示するときに、基本的にこの key が必要です。

ブラウザで確認

保存したら、

http://localhost:5173

を開いてください。

＜STEP3＞
Header.tsxを作る

VS Codeで、

frontend
└── src
    └── components

を開いてください。

その中に、

Header.tsx

を作ります。

つまり、

src/
├── components/
│   ├── Header.tsx       ← 今回作る
│   └── UserCard.tsx
│
├── pages/
│   └── HomePage.tsx
│
├── data/
│   └── mockUsers.ts
│
└── types/
    └── User.ts

となります。

Header.tsxを書く

Header.tsx に以下を入れてください。

import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Study Match</h1>

      <nav>
        <Link to="/">探す</Link>
        <Link to="/matches">マッチング</Link>
        <Link to="/profile">プロフィール</Link>
      </nav>
    </header>
  );
}

export default Header;

Link
import { Link } from "react-router-dom";

これはReact Routerが提供している機能です。

例えば、

<Link to="/">探す</Link>

とすると、

探す

をクリックしたときに / に移動できます。

同様に、

<Link to="/matches">マッチング</Link>

なら、

マッチング

をクリックすると、

/matches

へ移動します。

HomePageにHeaderを追加する

次に、

src/pages/HomePage.tsx

を開きます。

ここにHeaderを追加します。

以下のようにしてください。

import { mockUsers } from "../data/mockUsers";
import UserCard from "../components/UserCard";
import Header from "../components/Header";

function HomePage() {
  return (
    <div>
      <Header />

      <h1>勉強仲間を探す</h1>

      {mockUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default HomePage;

重要なのは、

import Header from "../components/Header";

と、

<Header />

です。

ブラウザで確認

保存して、

http://localhost:5173

を開いてください。

CSS
今回は Header.css を作ります。
src/
└── components/
    ├── Header.tsx
    ├── Header.css
    └── UserCard.tsx
以下を入れます。

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 16px 32px;

    background-color: rgb(73, 141, 243);
    border-bottom: 1px solid #0848c7;
}

.logo {
    margin: 0;
    font-size: 24px;
}

.nav {
    display: flex;
    gap: 24px;
}

.nav a {
    color: #333;
    text-decoration: none;
}

.nav a:hover {
    color: #0a2a6e;
}

Header.tsxをCSS対応にする

Header.tsx の一番上に、

import "./Header.css";

を追加します。

そしてHTMLを少し変更します。

完成形はこれです。

import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">Study Match</h1>

      <nav className="nav">
        <Link to="/">探す</Link>
        <Link to="/matches">マッチング</Link>
        <Link to="/profile">プロフィール</Link>
      </nav>
    </header>
  );
}

export default Header;

<header className="header">

↓

.header {
  ...
}

という関係です。

＜STEP4＞
**ユーザー検索フォーム（SearchForm）**を作ります。

SearchForm.tsxを作る

VS Codeで、

src/
└── components/

を開いてください。

ここに、

SearchForm.tsx

を作ります。

SearchForm.tsx に以下を書いてください。

import { useState } from "react";

function SearchForm() {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("検索キーワード:", keyword);
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

まずはこれだけです。

SearchFormをHomePageに追加

次に、

src/pages/HomePage.tsx

を開きます。

現在、

import { mockUsers } from "../data/mockUsers";
import UserCard from "../components/UserCard";
import Header from "../components/Header";

となっていると思います。

ここに、

import SearchForm from "../components/SearchForm";

を追加します。

最終的に、

import { mockUsers } from "../data/mockUsers";
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

としてください。

保存して、

http://localhost:5173

を開き、動作確認をしてください。


＜STEP5＞
まず、

src/components/SearchForm.tsx

を開いてください。
親から関数を受け取る

まず、

type SearchFormProps = {
  onSearch: (keyword: string) => void;
};

を追加します。

そして、

function SearchForm({ onSearch }: SearchFormProps) {

に変更します。

完成形はこうです。

import { useState } from "react";

type SearchFormProps = {
  onSearch: (keyword: string) => void;
};

function SearchForm({ onSearch }: SearchFormProps) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

type SearchFormProps = {
  onSearch: (keyword: string) => void;
};

これは、

SearchFormは onSearch という関数を受け取ります

という意味です。

そして、

function SearchForm({ onSearch }: SearchFormProps) {

で、その関数を受け取っています。

HomePageに検索用stateを作る

次に、

src/pages/HomePage.tsx

を開きます。

現在は、

import { mockUsers } from "../data/mockUsers";
import UserCard from "../components/UserCard";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

となっています。

ここに、

import { useState } from "react";

を追加します。

そして、

const [searchKeyword, setSearchKeyword] = useState("");

を作ります。

検索結果を作る

次に、HomePageで、

const filteredUsers = mockUsers.filter((user) => {
  if (searchKeyword === "") {
    return true;
  }

  return user.studyFields.some((field) =>
    field.toLowerCase().includes(searchKeyword.toLowerCase())
  );
});

を追加します。

HomePageを完成させる

ここまでを全部組み合わせます。

HomePage.tsxを以下の状態にしてください。

import { useState } from "react";
import { mockUsers } from "../data/mockUsers";
import UserCard from "../components/UserCard";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredUsers = mockUsers.filter((user) => {
    if (searchKeyword === "") {
      return true;
    }

    return user.studyFields.some((field) =>
      field.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });

  return (
    <div>
      <Header />

      <h1>勉強仲間を探す</h1>

      <SearchForm onSearch={setSearchKeyword} />

      {filteredUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default HomePage;

＜STEP6＞
まず、

src/components/SearchForm.tsx

を開いてください。
まず、

const [keyword, setKeyword] = useState("");

に加えて、

const [studyField, setStudyField] = useState("");
const [location, setLocation] = useState("");
const [studyTime, setStudyTime] = useState("");

を追加します。

つまり、

const [keyword, setKeyword] = useState("");
const [studyField, setStudyField] = useState("");
const [location, setLocation] = useState("");
const [studyTime, setStudyTime] = useState("");

となります。

現在、

type SearchFormProps = {
  onSearch: (keyword: string) => void;
};

となっています。

これでは検索キーワードしか親に渡せません。

今回は4つの値を渡したいので、

type SearchFormProps = {
  onSearch: (
    keyword: string,
    studyField: string,
    location: string,
    studyTime: string
  ) => void;
};

に変更します。

現在、

onSearch(keyword);

となっています。

これを、

onSearch(keyword, studyField, location, studyTime);

に変更します。

次にフォームの画面を作ります。

今、

<input
  type="text"
  placeholder="勉強したい分野を入力"
  value={keyword}
  onChange={(event) => setKeyword(event.target.value)}
/>

があります。

その下に、勉強分野のselectを追加します。

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

次に地域です。

<select
  value={location}
  onChange={(event) => setLocation(event.target.value)}
>
  <option value="">すべての地域</option>
  <option value="東京">東京</option>
  <option value="横浜">横浜</option>
</select>

勉強時間selectを追加

同じように、

<select
  value={studyTime}
  onChange={(event) => setStudyTime(event.target.value)}
>
  <option value="">すべての時間帯</option>
  <option value="平日夜">平日夜</option>
  <option value="休日">休日</option>
</select>

とします。

mockUsers.tsを開き、

山田さん：

studyTime: "平日夜",

佐藤さん：

studyTime: "休日",

鈴木さん：

studyTime: "平日夜",

に変更してください。



次は親である、

src/pages/HomePage.tsx

です。

現在は、

const [searchKeyword, setSearchKeyword] = useState("");

があります。

これを、

const [searchKeyword, setSearchKeyword] = useState("");
const [searchStudyField, setSearchStudyField] = useState("");
const [searchLocation, setSearchLocation] = useState("");
const [searchStudyTime, setSearchStudyTime] = useState("");

にします。

今回は、

<SearchForm onSearch={setSearchKeyword} />

では対応できません。

4つの値を受け取る必要があるからです。

そこで、

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

という関数を作ります。

<SearchForm onSearch={setSearchKeyword} />

でしたが、

<SearchForm onSearch={handleSearch} />

に変更します。

今まで、

const filteredUsers = mockUsers.filter((user) => {
  if (searchKeyword === "") {
    return true;
  }

  return user.studyFields.some((field) =>
    field.toLowerCase().includes(searchKeyword.toLowerCase())
  );
});

でした。

これを複数条件に対応させます。

const filteredUsers = mockUsers.filter((user) => {
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

＜STEP７＞
UserCard.cssを作る

まず、

src/
└── components/
    ├── Header.tsx
    ├── Header.css
    ├── SearchForm.tsx
    ├── UserCard.tsx
    └── UserCard.css       ← これを作る

という状態にします。

VS Codeで、

src/components/UserCard.css

を作ってください。

まず一番上に、

import "./UserCard.css";

を追加します。

次に、UserCardを以下に置き換えてください。

import type { User } from "../types/User";
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
            {user.age}歳 · {user.location}
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

      <p className="user-bio">{user.bio}</p>

      <div className="user-details">
        <p>🕐 {user.studyTime}</p>
        <p>🎯 {user.goal}</p>
      </div>

      <div className="user-card-actions">
        <button className="profile-button">
          プロフィールを見る
        </button>

        <button className="like-button">
          ♡
        </button>
      </div>
    </article>
  );
}

export default UserCard;

UserCardの中を、

UserCard
│
├── user-card-header
│   ├── user-avatar
│   └── user-basic-info
│       ├── 名前
│       └── 年齢・地域
│
├── user-tags
│   ├── AWS
│   └── Python
│
├── user-bio
│
├── user-details
│   ├── 勉強時間
│   └── 目標
│
└── user-card-actions
    ├── プロフィールを見る
    └── ♡

    CSSは、この構造に対して、

.user-card
.user-card-header
.user-avatar
.user-basic-info
.user-tags
.study-tag
.user-bio
.user-details
.user-card-actions

それぞれにデザインを適用します。

では UserCard.css を開いてください。

まず、

.user-card {
  width: 100%;
  max-width: 500px;

  padding: 24px;
  margin-bottom: 20px;

  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;

  box-sizing: border-box;
}

とします。

次に、

.user-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

とします。

ここで初めて本格的に Flexbox を使います。

display: flex;

を指定すると、

画像   名前

と横方向に並べられます。

つまり、

.user-card-header {
  display: flex;
}

は、

この中の要素をFlexboxでレイアウトする

という意味です。