import datetime
from typing import List, Optional

import strawberry
from sqlalchemy.orm import Session

from ..models.models import Category as CategoryModel
from ..models.models import Post as PostModel


@strawberry.type
class Category:
    id: str
    name: str
    created_at: datetime.datetime
    updated_at: datetime.datetime


@strawberry.type
class Post:
    id: str
    title: str
    content: str
    published: bool
    published_at: datetime.datetime
    created_at: datetime.datetime
    updated_at: datetime.datetime
    categories: List[Category]


@strawberry.input
class CategoryInput:
    name: str


@strawberry.input
class PostInput:
    title: Optional[str] = None
    content: Optional[str] = None
    category_ids: Optional[List[str]] = None


def get_post_categories(post: PostModel, info) -> List[Category]:
    return [
        Category(
            id=category.id,
            name=category.name,
            created_at=category.created_at,
            updated_at=category.updated_at,
        )
        for category in post.categories
    ]


@strawberry.type
class Query:
    @strawberry.field
    def posts(self, info) -> List[Post]:
        db: Session = info.context["db"]
        posts = db.query(PostModel).all()

        return [
            Post(
                id=post.id,
                title=post.title,
                content=post.content,
                published=post.published,
                published_at=post.published_at,
                created_at=post.created_at,
                updated_at=post.updated_at,
                categories=get_post_categories(post, info),
            )
            for post in posts
        ]

    @strawberry.field
    def post(self, id: str, info) -> Optional[Post]:
        db: Session = info.context["db"]
        post = db.query(PostModel).filter(PostModel.id == id).first()

        if not post:
            return None

        return Post(
            id=post.id,
            title=post.title,
            content=post.content,
            published=post.published,
            published_at=post.published_at,
            created_at=post.created_at,
            updated_at=post.updated_at,
            categories=get_post_categories(post, info),
        )

    @strawberry.field
    def categories(self, info) -> List[Category]:
        db: Session = info.context["db"]
        categories = db.query(CategoryModel).all()

        return [
            Category(
                id=category.id,
                name=category.name,
                created_at=category.created_at,
                updated_at=category.updated_at,
            )
            for category in categories
        ]


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_post(self, post_input: PostInput, info) -> Post:
        db: Session = info.context["db"]

        new_post = PostModel(
            title=post_input.title or "New Post",
            content=post_input.content or "",
        )

        # カテゴリーが指定されている場合は関連付け
        if post_input.category_ids:
            categories = (
                db.query(CategoryModel)
                .filter(CategoryModel.id.in_(post_input.category_ids))
                .all()
            )
            new_post.categories = categories

        db.add(new_post)
        db.commit()
        db.refresh(new_post)

        return Post(
            id=new_post.id,
            title=new_post.title,
            content=new_post.content,
            published=new_post.published,
            published_at=new_post.published_at,
            created_at=new_post.created_at,
            updated_at=new_post.updated_at,
            categories=get_post_categories(new_post, info),
        )

    @strawberry.mutation
    def create_category(self, category_input: CategoryInput, info) -> Category:
        db: Session = info.context["db"]

        new_category = CategoryModel(
            name=category_input.name,
        )

        db.add(new_category)
        db.commit()
        db.refresh(new_category)

        return Category(
            id=new_category.id,
            name=new_category.name,
            created_at=new_category.created_at,
            updated_at=new_category.updated_at,
        )


schema = strawberry.Schema(query=Query, mutation=Mutation)
