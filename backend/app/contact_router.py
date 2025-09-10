from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
import os
import smtplib
from email.mime.text import MIMEText
import traceback

# ✅ Load env variables
MONGO_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DATABASE_NAME", "paresh_enterprises")
EMAIL_USER = os.getenv("EMAIL_USER", "pareshdwivedi9@gmail.com")
EMAIL_PASS = os.getenv("EMAIL_PASS", "your-app-password")
OWNER_EMAIL = os.getenv("OWNER_EMAIL", "paresh_udr@yahoo.in")

# ✅ MongoDB connection
client = MongoClient(MONGO_URL)
db = client[DB_NAME]
contacts_collection = db["contacts"]

# ✅ FastAPI Router
router = APIRouter()

# ✅ Expanded Request schema
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str | None = None
    message: str
    phone: str | None = None
    company: str | None = None

# ✅ Email sender function
def send_email(form: ContactForm):
    try:
        body = (
            f"📩 New Contact Submission:\n\n"
            f"👤 Name: {form.name}\n"
            f"📧 Email: {form.email}\n"
            f"🏢 Company: {form.company or 'N/A'}\n"
            f"📞 Phone: {form.phone or 'N/A'}\n"
            f"📝 Subject: {form.subject or 'N/A'}\n\n"
            f"💬 Message:\n{form.message}"
        )

        msg = MIMEText(body)
        msg["Subject"] = "New Contact Form Submission"
        msg["From"] = EMAIL_USER
        msg["To"] = OWNER_EMAIL

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)

        print("✅ Email sent successfully")
    except Exception as e:
        print("❌ Email sending failed:", e)
        traceback.print_exc()

# ✅ Route
@router.post("/contact")
async def submit_contact(form: ContactForm):
    try:
        # Save to DB
        contact_data = form.dict()
        result = contacts_collection.insert_one(contact_data)
        print(f"✅ Contact inserted into DB with id: {result.inserted_id}")

        # Send email (won’t block DB success)
        try:
            send_email(form)
        except Exception as e:
            print("⚠️ Warning: Email failed but DB insert succeeded.", e)

        return {"message": "Contact form submitted successfully!"}

    except Exception as e:
        print("❌ Critical error in submit_contact:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to process contact form")
