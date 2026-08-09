import subprocess
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed


QUICK_SITES = {
    "GitHub": "https://github.com/{username}",
    "Instagram": "https://www.instagram.com/{username}/",
    "Reddit": "https://www.reddit.com/user/{username}/",
    "X": "https://x.com/{username}",
    "Facebook": "https://www.facebook.com/{username}",
    "LinkedIn": "https://www.linkedin.com/in/{username}/",
    "TikTok": "https://www.tiktok.com/@{username}",
    "YouTube": "https://www.youtube.com/@{username}",
    "GitLab": "https://gitlab.com/{username}",
    "Pinterest": "https://www.pinterest.com/{username}/",
    "Medium": "https://medium.com/@{username}",
    "Twitch": "https://www.twitch.tv/{username}",
}


def check_profile(site, url):
    try:
        response = requests.get(
            url,
            timeout=5,
            allow_redirects=True,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )

        if 200 <= response.status_code < 400:
            return {
                "site": site,
                "url": url
            }

    except requests.RequestException:
        pass

    return None


def quick_search(username):
    results = []

    with ThreadPoolExecutor(max_workers=10) as executor:

        futures = {
            executor.submit(
                check_profile,
                site,
                url.format(username=username)
            ): site
            for site, url in QUICK_SITES.items()
        }

        for future in as_completed(futures):

            result = future.result()

            if result:
                results.append(result)

    return results


def full_search(username):
    command = ["sherlock", username]

    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=300
        )

    except subprocess.TimeoutExpired:
        return []

    websites = []

    for line in result.stdout.splitlines():

        if "[+]" in line and "http" in line:

            try:

                site = (
                    line.split("[+]")[1]
                    .split(":")[0]
                    .strip()
                )

                url = "http" + line.split("http", 1)[1]

                websites.append({
                    "site": site,
                    "url": url
                })

            except Exception:
                continue

    return websites


def search_username(username, mode="quick"):

    if mode == "quick":
        return quick_search(username)

    return full_search(username)