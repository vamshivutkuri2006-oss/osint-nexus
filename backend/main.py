import socket
import ipaddress
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.sherlock_service import search_username


app = FastAPI(title="OSINT Nexus API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "project": "OSINT Nexus",
        "version": "1.1"
    }


@app.get("/search/{username}")
def full_search(username: str):
    results = search_username(username, mode="full")

    return {
        "mode": "full",
        "username": username,
        "count": len(results),
        "results": results
    }


@app.get("/search/quick/{username}")
def quick_search(username: str):
    results = search_username(username, mode="quick")

    return {
        "mode": "quick",
        "username": username,
        "count": len(results),
        "results": results
    }
import re


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
@app.get("/domain/{domain}")
def domain_lookup(domain: str):
    domain = domain.strip().lower()

    # Remove protocol if the user enters one
    domain = re.sub(r"^https?://", "", domain)
    domain = domain.split("/")[0]

    valid = bool(
        re.match(
            r"^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$",
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