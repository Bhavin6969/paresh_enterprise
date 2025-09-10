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

# CORS (replace "*" with allowed domains in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # e.g., ["https://pareshenterprises.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve built frontend files
# "html=True" ensures index.html is served at "/static"
app.mount("/static", StaticFiles(directory="app/static", html=True), name="static")

# API routes
app.include_router(contact_router, prefix="/api")

# Catch-all for React Router (only if request is not for /api or /static)
@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    index_path = os.path.join("app", "static", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "index.html not found"}