from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="MVELO Trading Enterprise API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ===== Models =====
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class QuoteRequestCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=5, max_length=30)
    email: Optional[EmailStr] = None
    service: str = Field(min_length=1, max_length=120)
    location: Optional[str] = Field(default=None, max_length=200)
    message: Optional[str] = Field(default=None, max_length=2000)


class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    service: str
    location: Optional[str] = None
    message: Optional[str] = None
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: Optional[str] = Field(default=None, max_length=30)
    email: Optional[EmailStr] = None
    message: str = Field(min_length=1, max_length=2000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ===== Static business data =====
BUSINESS_INFO = {
    "name": "MVELO TRADING ENTERPRISE",
    "tagline": "Reliable. Affordable. High-Quality Workmanship.",
    "rating": 4.6,
    "reviews_count": 18,
    "address": "Mohlomi Street, Naledi, Soweto, 1865",
    "phone": "065 805 1448",
    "whatsapp": "+27658051448",
    "services": [
        "Floor fitting",
        "Flooring repairs",
        "TV mounting",
        "Tile installation",
        "Architectural plans",
        "Building design",
        "Building materials supply",
        "Construction projects",
        "Interior design & decoration",
        "Electrical installations & maintenance",
        "Electrical repairs",
        "Heating systems",
        "Home improvements",
        "House plans",
        "House renovations",
        "Painting services",
        "Paving work",
    ],
}


# ===== Helpers =====
def _serialize_doc(doc: dict) -> dict:
    """Ensure datetime fields are ISO strings for MongoDB storage."""
    out = {}
    for k, v in doc.items():
        if isinstance(v, datetime):
            out[k] = v.isoformat()
        else:
            out[k] = v
    return out


def _deserialize_doc(doc: dict) -> dict:
    if not doc:
        return doc
    if "created_at" in doc and isinstance(doc["created_at"], str):
        try:
            doc["created_at"] = datetime.fromisoformat(doc["created_at"])
        except ValueError:
            pass
    if "timestamp" in doc and isinstance(doc["timestamp"], str):
        try:
            doc["timestamp"] = datetime.fromisoformat(doc["timestamp"])
        except ValueError:
            pass
    return doc


# ===== Routes =====
@api_router.get("/")
async def root():
    return {"message": "MVELO Trading Enterprise API", "status": "ok"}


@api_router.get("/business")
async def get_business():
    return BUSINESS_INFO


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    await db.status_checks.insert_one(_serialize_doc(status_obj.model_dump()))
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return [_deserialize_doc(d) for d in docs]


@api_router.post("/quotes", response_model=QuoteRequest, status_code=201)
async def create_quote(payload: QuoteRequestCreate):
    if payload.service not in BUSINESS_INFO["services"]:
        # Allow free-text but normalize
        pass
    quote = QuoteRequest(**payload.model_dump())
    await db.quote_requests.insert_one(_serialize_doc(quote.model_dump()))
    return quote


@api_router.get("/quotes", response_model=List[QuoteRequest])
async def list_quotes():
    docs = await db.quote_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [_deserialize_doc(d) for d in docs]


@api_router.post("/contact", response_model=ContactMessage, status_code=201)
async def create_contact(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contact_messages.insert_one(_serialize_doc(msg.model_dump()))
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [_deserialize_doc(d) for d in docs]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
