#!/usr/bin/env python3
"""Collect published Agent Anatomy routes for the main site's sitemap.

The project is deployed independently, so use its deployed landing page as the
source of truth. If it is temporarily unavailable, retain the paths in the
currently deployed main-site sitemap. Never deploy an empty or unverified list.
"""

import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

ORIGIN = "https://wenhaoyu-bryan.github.io"
LANDING = "/agent-anatomy/"
EPISODE = re.compile(r"/agent-anatomy/episodes/[a-z0-9]+(?:-[a-z0-9]+)*/\Z")
TIMEOUT = 15


def fetch(url, method="GET"):
    request = Request(url, method=method, headers={"User-Agent": "Portfolio-Sitemap-Sync/1.0"})
    with urlopen(request, timeout=TIMEOUT) as response:
        if response.status != 200:
            raise ValueError(f"Unexpected HTTP status {response.status} for {url}")
        final = urlsplit(response.url)
        if (final.scheme, final.netloc, final.path) != (
            "https", "wenhaoyu-bryan.github.io", urlsplit(url).path
        ):
            raise ValueError(f"Unexpected redirect for {url}")
        return response.read(2_000_001) if method == "GET" else b""


def episode_path(href):
    url = urlsplit(urljoin(ORIGIN + LANDING, href))
    if (url.scheme, url.netloc) != ("https", "wenhaoyu-bryan.github.io"):
        return None
    if url.query or url.fragment or not EPISODE.fullmatch(url.path):
        return None
    return url.path


class EpisodeLinks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.paths = set()

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            href = dict(attrs).get("href")
            if href:
                path = episode_path(href)
                if path:
                    self.paths.add(path)


def discover(fetcher=fetch):
    body = fetcher(ORIGIN + LANDING)
    if len(body) > 2_000_000:
        raise ValueError("Agent Anatomy landing page is unexpectedly large")
    parser = EpisodeLinks()
    parser.feed(body.decode("utf-8"))
    if not parser.paths:
        raise ValueError("No published episode links found on the landing page")
    for path in sorted(parser.paths):
        fetcher(ORIGIN + path, method="HEAD")
    return [LANDING, *sorted(parser.paths)]


def previous_roster(fetcher=fetch):
    body = fetcher(ORIGIN + "/sitemap-0.xml")
    if len(body) > 2_000_000:
        raise ValueError("Published sitemap is unexpectedly large")
    root = ET.fromstring(body)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    if root.tag != "{http://www.sitemaps.org/schemas/sitemap/0.9}urlset":
        raise ValueError("Published sitemap is not a sitemap URL set")
    paths = {episode_path(node.text or "") for node in root.findall("s:url/s:loc", ns)}
    paths.discard(None)
    if not paths:
        raise ValueError("Published sitemap contains no valid episode paths")
    return [LANDING, *sorted(paths)]


def sync(fetcher=fetch):
    # Read the deployed roster first. Without it, an incomplete landing page
    # could silently remove URLs that were already published in the sitemap.
    try:
        previous = previous_roster(fetcher)
    except (HTTPError, URLError, OSError, TimeoutError, ValueError, ET.ParseError) as error:
        raise RuntimeError("Could not read the currently deployed sitemap roster") from error

    try:
        current = set(discover(fetcher))
        for path in set(previous) - current - {LANDING}:
            try:
                fetcher(ORIGIN + path, method="HEAD")
            except HTTPError as error:
                if error.code in (404, 410):
                    continue
                raise
            # The link may be temporarily missing from an incomplete landing
            # page. Keep a still-accessible URL until it is actually removed.
            print(f"Keeping previously published, still accessible path: {path}")
            current.add(path)
        return [LANDING, *sorted(current - {LANDING})], "published Agent Anatomy landing page"
    except (HTTPError, URLError, OSError, TimeoutError, ValueError, UnicodeError) as error:
        print(f"Could not safely refresh published episode roster: {error}")
        return previous, "previously deployed main-site sitemap"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    paths, source = sync()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(paths, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Using {len(paths)} Agent Anatomy routes from {source}")


if __name__ == "__main__":
    main()
