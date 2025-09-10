from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase, AsyncIOMotorCollection
from pymongo.errors import ConnectionFailure
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self):
        self.client: Optional[AsyncIOMotorClient] = None
        self.database: Optional[AsyncIOMotorDatabase] = None

    async def connect_to_database(self):
        try:
            from .config import settings

            self.client = AsyncIOMotorClient(settings.mongodb_url)
            self.database = self.client[settings.database_name]

            await self.client.admin.command('ismaster')
            logger.info(f"Connected to MongoDB: {settings.database_name}")

            await self._create_indexes()

        except ConnectionFailure as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise e

    async def close_database_connection(self):
        if self.client:
            self.client.close()
            logger.info("Closed database connection")

    async def _create_indexes(self):
        if self.database is None:
            return

        try:
            await self.database.users.create_index("email", unique=True)
            await self.database.users.create_index("username", unique=True)
            logger.info("Database indexes created successfully")
        except Exception as e:
            logger.error(f"Failed to create database indexes: {e}")

    def get_collection(self, collection_name: str) -> AsyncIOMotorCollection:
        if self.database is None:
            raise RuntimeError("Database not connected")
        return self.database[collection_name]

database = Database()

async def get_database() -> Database:
    return database

async def get_users_collection() -> AsyncIOMotorCollection:
    return database.get_collection("users")

async def check_database_health() -> bool:
    try:
        if database.client is None:
            return False
        await database.client.admin.command('ismaster')
        return True
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return False