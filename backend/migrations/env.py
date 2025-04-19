import os
import sys
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

# このスクリプトのディレクトリをパスに追加
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# モデル定義をインポート
from app.database.config import DATABASE_URL
from app.models.models import Base

# alembic設定を取得
config = context.config

# DATABASE_URLが正しいフォーマットであるか確認
# schemaパラメータを使わない正しいPostgreSQLフォーマットに変換
if "postgresql://" in DATABASE_URL:
    # URL形式をチェック、必要に応じて修正
    config.set_main_option("sqlalchemy.url", DATABASE_URL)
else:
    # 問題があるURLの場合、安全な値を使用
    config.set_main_option(
        "sqlalchemy.url", "postgresql://postgres:password@localhost:5432/postgres"
    )

# ログ設定
fileConfig(config.config_file_name)

# 対象となるメタデータ
target_metadata = Base.metadata


def run_migrations_offline():
    """オフラインモードでマイグレーションを実行。（URL直接使用）"""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """オンラインモードでマイグレーションを実行。（Engineを使用）"""
    # エンジン設定からschemaパラメータを除外
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


# マイグレーションの実行
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
