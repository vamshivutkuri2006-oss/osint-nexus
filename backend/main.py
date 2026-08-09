import socket
import ipaddress
import re

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.sherlock_service import search_username


# --------------------------------------------------
# FastAPI Application
# --------------------------------------------------

app = FastAPI(title="OSINT Nexus API", version="1.1")


# --------------------------------------------------
# CORS Configuration
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://osint-nexus-frontend.onrender.com",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Home / Health Check
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "project": "OSINT Nexus",
        "version": "1.1",
        "status": "online"
    }


# --------------------------------------------------
# Username Search - Full
# --------------------------------------------------

@app.get("/search/{username}")
def full_search(username: str):
    results = search_username(username, mode="full")

    return {
        "mode": "full",
        "username": username,
        "count": len(results),
        "results": results
    }


# --------------------------------------------------
# Username Search - Quick
# --------------------------------------------------

@app.get("/search/quick/{username}")
def quick_search(username: str):
    results = search_username(username, mode="quick")

    return {
        "mode": "quick",
        "username": username,
        "count": len(results),
        "results": results
    }


# --------------------------------------------------
# Email Lookup
# --------------------------------------------------

COMMON_PROVIDERS = {
    "gmail.com": "Gmail",
    "outlook.com": "Microsoft Outlook",
    "hotmail.com": "Microsoft Hotmail",
    "yahoo.com": "Yahoo",
    "proton.me": "Proton Mail",
    "protonmail.com": "Proton Mail",
    "icloud.com": "Apple iCloud",
}


DISPOSABLE_DOMAINS = {
    "mailinator.com",
    "10minutemail.com",
    "guerrillamail.com",
    "temp-mail.org",
    "yopmail.com",
}


@app.get("/email/{email}")
def email_lookup(email: str):

    email = email.strip().lower()

    pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

    valid_format = bool(re.match(pattern, email))

    domain = email.split("@", 1)[1] if "@" in email else ""

    provider = COMMON_PROVIDERS.get(
        domain,
        "Custom / Unknown"
    )

    disposable = domain in DISPOSABLE_DOMAINS

    return {
        "email": email,
        "valid_format": valid_format,
        "domain": domain,
        "provider": provider,
        "disposable": disposable,
    }


# --------------------------------------------------
# Domain Lookup
# --------------------------------------------------

@app.get("/domain/{domain}")
def domain_lookup(domain: str):

    domain = domain.strip().lower()

    # Remove protocol if user enters it
    domain = re.sub(r"^https?://", "", domain)

    # Remove path
    domain = domain.split("/")[0]

    valid = bool(
        re.match(
            r"^(?=.{1,253}$)"
            r"([a-zA-Z0-9]"
            r"(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+"
            r"[a-zA-Z]{2,}$",
            domain,
        )
    )

    if not valid:
        return {
            "domain": domain,
            "valid": False,
            "ip_address": None,
            "hostname": None,
            "status": "Invalid domain",
        }

    try:
        ip_address = socket.gethostbyname(domain)
        status = "Active"

    except socket.gaierror:
        ip_address = None
        status = "Unable to resolve"

    return {
        "domain": domain,
        "valid": True,
        "ip_address": ip_address,
        "hostname": domain,
        "status": status,
    }


# --------------------------------------------------
# IP Lookup
# --------------------------------------------------

@app.get("/ip/{ip}")
def ip_lookup(ip: str):

    ip = ip.strip()

    try:

        address = ipaddress.ip_address(ip)

        return {
            "ip": ip,
            "valid": True,
            "version": address.version,
            "private": address.is_private,
            "global": address.is_global,
            "loopback": address.is_loopback,
            "reserved": address.is_reserved,
        }

    except ValueError:

        return {
            "ip": ip,
            "valid": False,
            "version": None,
            "private": False,
            "global": False,
            "loopback": False,
            "reserved": False,
        }