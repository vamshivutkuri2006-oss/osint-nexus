from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.sherlock_service import search_username

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"project": "OSINT Nexus"}
@app.get("/search/{username}")
def search(username: str):
    results = search_username(username)

    return {
        "username": username,
        "count": len(results),
        "results": results
    }