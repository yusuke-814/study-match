from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()  # APIアプリケーションを作成

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # フロントエンドのURLからのリクエストを許可
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")  # GET /というURLへのリクエストに対する処理を定義
def read_root():
    return {"message": "Study Match API"}

@app.post("/likes")  # POST /likesというURLへのリクエストに対する処理を定義
def create_like(data: dict):  # dataにReactから送信されたJSONデータが格納される
    # ここでデータベースに保存する処理を行う
    return {
        "success": True,
        "message": "いいねしました",
        "fromUserId": data["fromUserId"],
        "toUserId": data["toUserId"],
    }