import subprocess

def search_username(username):
    command = ["sherlock", username]

    result = subprocess.run(
        command,
        capture_output=True,
        text=True
    )

    lines = result.stdout.split("\n")

    websites = []

    for line in lines:
        if "[+]" in line and "http" in line:
            try:
                site = line.split("[+]")[1].split(":")[0].strip()
                url = line.split("http", 1)[1]
                url = "http" + url

                websites.append({
                    "site": site,
                    "url": url
                })

            except:
                pass

    return websites