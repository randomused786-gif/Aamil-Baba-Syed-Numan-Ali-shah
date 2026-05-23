"""
Main entry point for the social media posting bot.

Reads content from the YAML configuration, selects the appropriate post
based on the current schedule or CLI arguments, and dispatches it to the
configured platforms.
"""

import argparse
import logging
import sys
from datetime import datetime, timezone
from pathlib import Path

from social_media_bot.config import CONTENT_DIR, load_content
from social_media_bot.platforms import TwitterPoster, FacebookPoster, InstagramPoster

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

PLATFORM_MAP = {
    "twitter": TwitterPoster,
    "facebook": FacebookPoster,
    "instagram": InstagramPoster,
}


def resolve_media_paths(media_list):
    """Convert relative media paths to absolute paths under content/media/."""
    if not media_list:
        return None
    resolved = []
    for item in media_list:
        if item.startswith("http://") or item.startswith("https://"):
            resolved.append(item)
        else:
            full_path = CONTENT_DIR / "media" / item
            if not full_path.exists():
                logger.warning("Media file not found: %s", full_path)
            resolved.append(str(full_path))
    return resolved


def select_post(posts, post_id=None):
    """
    Select a post to publish.

    If post_id is given, find that specific post. Otherwise, pick the first
    post whose scheduled_date matches today (UTC), or the first post if none
    match.
    """
    if post_id:
        for p in posts:
            if p.get("id") == post_id:
                return p
        logger.error("Post with id '%s' not found.", post_id)
        sys.exit(1)

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    for p in posts:
        if p.get("scheduled_date") == today:
            logger.info("Found post scheduled for today: %s", p.get("id"))
            return p

    logger.info("No post scheduled for today. Using the first available post.")
    return posts[0] if posts else None


def publish(post, platforms):
    """Publish a post to the specified platforms."""
    text = post["text"]
    media = resolve_media_paths(post.get("media"))
    results = {}

    for platform_name in platforms:
        platform_name = platform_name.strip().lower()
        poster_cls = PLATFORM_MAP.get(platform_name)
        if not poster_cls:
            logger.warning("Unknown platform: %s", platform_name)
            continue

        try:
            poster = poster_cls()
            if platform_name == "instagram":
                image_url = post.get("instagram_image_url")
                result = poster.post(text, media_paths=media, image_url=image_url)
            else:
                result = poster.post(text, media_paths=media)
            results[platform_name] = {"status": "success", "response": str(result)}
            logger.info("Successfully posted to %s", platform_name)
        except Exception as exc:
            results[platform_name] = {"status": "error", "error": str(exc)}
            logger.error("Failed to post to %s: %s", platform_name, exc)

    return results


def main():
    parser = argparse.ArgumentParser(description="Social Media Automation Bot")
    parser.add_argument(
        "--platforms",
        type=str,
        default="twitter",
        help="Comma-separated list of platforms (twitter, facebook, instagram)",
    )
    parser.add_argument(
        "--post-id",
        type=str,
        default=None,
        help="ID of a specific post to publish (from posts.yaml)",
    )
    parser.add_argument(
        "--content-file",
        type=str,
        default="posts.yaml",
        help="Name of the content YAML file in the content/ directory",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be posted without actually posting",
    )
    args = parser.parse_args()

    content = load_content(args.content_file)
    posts = content.get("posts", [])
    if not posts:
        logger.error("No posts defined in %s", args.content_file)
        sys.exit(1)

    post = select_post(posts, args.post_id)
    if not post:
        logger.error("No suitable post found.")
        sys.exit(1)

    platforms = [p.strip() for p in args.platforms.split(",")]

    if args.dry_run:
        logger.info("=== DRY RUN ===")
        logger.info("Text: %s", post["text"])
        logger.info("Media: %s", post.get("media", []))
        logger.info("Platforms: %s", platforms)
        logger.info("Instagram URL: %s", post.get("instagram_image_url", "N/A"))
        return

    results = publish(post, platforms)

    for platform, result in results.items():
        if result["status"] == "success":
            logger.info("[%s] OK", platform)
        else:
            logger.error("[%s] FAILED: %s", platform, result["error"])

    failed = [p for p, r in results.items() if r["status"] == "error"]
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
