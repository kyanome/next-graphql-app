from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from strawberry.fastapi import GraphQLRouter

from .database.config import get_db
from .schemas.schema import schema


# コンテキストの構築
async def get_context(db: Session = Depends(get_db)):
    return {"db": db}


# GraphQLルーターの作成
graphql_router = GraphQLRouter(schema, context_getter=get_context)

# FastAPIアプリケーションの作成
app = FastAPI()

# CORSミドルウェア設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境では適切に制限すること
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GraphQLエンドポイントの追加
app.include_router(graphql_router, prefix="/graphql")


# ヘルスチェック用エンドポイント
@app.get("/")
def read_root():
    return {"status": "ok", "message": "GraphQL API is running"}
