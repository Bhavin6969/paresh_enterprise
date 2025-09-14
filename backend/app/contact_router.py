from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
import os
import traceback
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# ✅ Load env variables
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "paresh_enterprises"
SENDGRID_API_KEY = "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"
OWNER_EMAIL = "bhavinjoshi817@gmail.com"
SENDER_EMAIL = "pareshdwivedi24@gmail.com"

# ✅ MongoDB connection
client = MongoClient(MONGO_URL)
db = client[DB_NAME]
contacts_collection = db["contacts"]

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str | None = None
    message: str
    phone: str | None = None
    company: str | None = None

# ✅ Email sender function (SendGrid)
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

        message = Mail(
            from_email=SENDER_EMAIL,
            to_emails=OWNER_EMAIL,
            subject="New Contact Form Submission",
            plain_text_content=body,
        )

        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)

        print("✅ Email sent successfully via SendGrid")
    except Exception as e:
        print("❌ Email sending failed:", e)
        traceback.print_exc()

@router.post("/contact")
async def submit_contact(form: ContactForm):
    try:
        contact_data = form.dict()
        try:
            result = contacts_collection.insert_one(contact_data)
            print(f"✅ Contact inserted into DB with id: {result.inserted_id}")
        except Exception as db_error:
            print("⚠️ Database unavailable, skipping DB save:", db_error)

        try:
            send_email(form)
        except Exception as e:
            print("⚠️ Warning: Email failed:", e)

        return {"message": "Contact form submitted successfully!"}

    except Exception as e:
        print("❌ Critical error in submit_contact:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to process contact form")
