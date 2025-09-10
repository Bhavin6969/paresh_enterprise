#!/usr/bin/env python3
import sys
import uvicorn
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

def main():
    print("🚀 Starting Paresh Enterprises Backend...")
    print("📚 API Docs: http://localhost:8000/docs")
    print("💊 Health Check: http://localhost:8000/health")

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

if __name__ == "__main__":
    main()