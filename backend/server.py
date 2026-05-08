from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
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

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "")

app = FastAPI(title="Ray Driving School API")
api_router = APIRouter(prefix="/api")


# ===== Models =====
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LessonBookingCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=5, max_length=30)
    email: Optional[EmailStr] = None
    licence_type: str = Field(min_length=1, max_length=80)
    preferred_days: Optional[str] = Field(default=None, max_length=200)
    experience_level: Optional[str] = Field(default=None, max_length=80)
    message: Optional[str] = Field(default=None, max_length=2000)


class LessonBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    licence_type: str
    preferred_days: Optional[str] = None
    experience_level: Optional[str] = None
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


class ReviewCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    location: Optional[str] = Field(default=None, max_length=120)
    rating: int = Field(ge=1, le=5)
    achievement: Optional[str] = Field(default=None, max_length=120)
    text: str = Field(min_length=10, max_length=1500)


class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: Optional[str] = None
    rating: int
    achievement: Optional[str] = None
    text: str
    approved: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ===== Static business data =====
BUSINESS_INFO = {
    "name": "Ray Driving School",
    "tagline": "Patient instruction. Confident drivers. Real results.",
    "address": "1 Goldman Street, Florida, Roodepoort, Gauteng, South Africa",
    "phone": "073 403 7108",
    "phone_tel": "+27734037108",
    "whatsapp": "+27734037108",
    "hours": [
        {"day": "Monday – Friday", "open": "08:00", "close": "17:00"},
        {"day": "Saturday", "open": "08:30", "close": "14:00"},
        {"day": "Sunday", "open": "Closed", "close": ""},
    ],
    "services": [
        "Learner's licence training",
        "Driver's licence lessons (Code 8)",
        "One-on-one instruction",
        "Defensive driving",
        "Road safety awareness",
        "Confidence building",
        "Licence test preparation",
        "Driving test booking assistance",
        "Vehicle rental for testing",
    ],
    "promises": [
        "Patient, experienced & professional instructors",
        "Dual-controlled vehicles for safe training",
        "Flexible weekday & Saturday scheduling",
        "Friendly, affordable & reliable service",
    ],
}


# ===== Helpers =====
def _serialize_doc(doc: dict) -> dict:
    out = {}
    for k, v in doc.items():
        out[k] = v.isoformat() if isinstance(v, datetime) else v
    return out


def _deserialize_doc(doc: dict) -> dict:
    if not doc:
        return doc
    for key in ("created_at", "timestamp"):
        if key in doc and isinstance(doc[key], str):
            try:
                doc[key] = datetime.fromisoformat(doc[key])
            except ValueError:
                pass
    return doc


def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    if not ADMIN_TOKEN:
        raise HTTPException(status_code=503, detail="Admin not configured")
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    return True


# ===== Public Routes =====
@api_router.get("/")
async def root():
    return {"message": "Ray Driving School API", "status": "ok"}


@api_router.get("/business")
async def get_business():
    return BUSINESS_INFO


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    obj = StatusCheck(**input.model_dump())
    await db.status_checks.insert_one(_serialize_doc(obj.model_dump()))
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return [_deserialize_doc(d) for d in docs]


@api_router.post("/lessons", response_model=LessonBooking, status_code=201)
async def create_lesson_booking(payload: LessonBookingCreate):
    booking = LessonBooking(**payload.model_dump())
    await db.lesson_bookings.insert_one(_serialize_doc(booking.model_dump()))
    return booking


@api_router.post("/contact", response_model=ContactMessage, status_code=201)
async def create_contact(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contact_messages.insert_one(_serialize_doc(msg.model_dump()))
    return msg


@api_router.post("/reviews", response_model=Review, status_code=201)
async def create_review(payload: ReviewCreate):
    review = Review(**payload.model_dump())
    await db.reviews.insert_one(_serialize_doc(review.model_dump()))
    return review


@api_router.get("/reviews", response_model=List[Review])
async def list_public_reviews():
    """Public: only approved reviews."""
    docs = await db.reviews.find({"approved": True}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [_deserialize_doc(d) for d in docs]


# ===== Admin routes (token-protected) =====
@api_router.get("/admin/lessons", response_model=List[LessonBooking])
async def admin_list_lessons(_: bool = Depends(require_admin)):
    docs = await db.lesson_bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [_deserialize_doc(d) for d in docs]


@api_router.get("/admin/contact", response_model=List[ContactMessage])
async def admin_list_contact(_: bool = Depends(require_admin)):
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [_deserialize_doc(d) for d in docs]


@api_router.get("/admin/reviews", response_model=List[Review])
async def admin_list_reviews(_: bool = Depends(require_admin)):
    docs = await db.reviews.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [_deserialize_doc(d) for d in docs]


@api_router.post("/admin/reviews/{review_id}/approve", response_model=Review)
async def admin_approve_review(review_id: str, _: bool = Depends(require_admin)):
    result = await db.reviews.find_one_and_update(
        {"id": review_id},
        {"$set": {"approved": True}},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Review not found")
    return _deserialize_doc(result)


@api_router.post("/admin/reviews/{review_id}/unapprove", response_model=Review)
async def admin_unapprove_review(review_id: str, _: bool = Depends(require_admin)):
    result = await db.reviews.find_one_and_update(
        {"id": review_id},
        {"$set": {"approved": False}},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Review not found")
    return _deserialize_doc(result)


@api_router.delete("/admin/reviews/{review_id}", status_code=204)
async def admin_delete_review(review_id: str, _: bool = Depends(require_admin)):
    result = await db.reviews.delete_one({"id": review_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    return None


@api_router.post("/admin/verify")
async def admin_verify(_: bool = Depends(require_admin)):
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
