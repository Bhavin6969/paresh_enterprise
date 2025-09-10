from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import logging, sys, os
from dotenv import load_dotenv

load_dotenv()

# ✅ Correct import
from app.contact_router import router as contact_router

app = FastAPI(
    title="Paresh Enterprises API",
    description="Backend API for Paresh Enterprises - Engineering Excellence",
    version="1.0.0"
)

FRONTEND_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health", tags=["Health Check"])
async def health_check():
    return {"status": "healthy", "version": "1.0.0", "message": "Backend is running"}

# ✅ include contact router
app.include_router(contact_router, prefix="/api")

# 📌 Serve React frontend
app.mount("/static", StaticFiles(directory="app/static"), name="static")

@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    index_path = os.path.join("app", "static", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "index.html not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
