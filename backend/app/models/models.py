import datetime
from uuid import uuid4

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String, Table
from sqlalchemy.orm import relationship

from ..database.config import Base

# 中間テーブル定義（PostとCategoryの多対多関係）
post_category = Table(
    "post_category",
    Base.metadata,
    Column("post_id", String, ForeignKey("posts.id")),
    Column("category_id", String, ForeignKey("categories.id")),
)


class Post(Base):
    __tablename__ = "posts"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    published = Column(Boolean, default=False)
    title = Column(String, default="New Post")
    content = Column(String, default="")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(
        DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow
    )
    published_at = Column(DateTime, default=datetime.datetime.utcnow)

    # リレーションシップ
    categories = relationship(
        "Category", secondary=post_category, back_populates="posts"
    )


class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(
        DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow
    )

    # リレーションシップ
    posts = relationship("Post", secondary=post_category, back_populates="categories")
