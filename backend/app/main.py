from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

from app.contact_router import router as contact_router

app = FastAPI(
    title="Paresh Enterprises API",
    description="Backend API for Paresh Enterprises - Engineering Excellence",
    version="1.0.0"
)

# CORS (in production, replace "*" with your actual domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static frontend files
app.mount("/static", StaticFiles(directory="app/static", html=True), name="static")

# API routes
app.include_router(contact_router, prefix="/api")

# React index.html handler (catch-all for React Router)
@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    index_path = os.path.join("app", "static", "index.html")
    return FileResponse(index_path)
