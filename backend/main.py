from fastapi import FastAPI

app = FastAPI()  # APIアプリケーションを作成

@app.get("/")  # GET /というURLへのリクエストに対する処理を定義
def read_root():
    return {"message": "Study Match API"}