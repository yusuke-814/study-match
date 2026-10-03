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
                <Link to="/likes">いいね一覧</Link>
            </nav>
        </header>
    );
}

export default Header;