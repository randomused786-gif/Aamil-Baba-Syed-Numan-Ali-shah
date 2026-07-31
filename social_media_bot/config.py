"""
Configuration loader for the social media automation bot.

Reads content definitions from YAML files and environment-based credentials.
"""

import os
from pathlib import Path

import yaml


BASE_DIR = Path(__file__).resolve().parent.parent
CONTENT_DIR = BASE_DIR / "content"


def load_content(content_file="posts.yaml"):
    """Load scheduled post definitions from a YAML file."""
    path = CONTENT_DIR / content_file
    if not path.exists():
        raise FileNotFoundError(f"Content file not found: {path}")
    with open(path, "r", encoding="utf-8") as fh:
        return yaml.safe_load(fh)


def get_twitter_credentials():
    """Return Twitter/X API credentials from environment variables."""
    return {
        "api_key": os.environ.get("TWITTER_API_KEY", ""),
        "api_secret": os.environ.get("TWITTER_API_SECRET", ""),
        "access_token": os.environ.get("TWITTER_ACCESS_TOKEN", ""),
        "access_token_secret": os.environ.get("TWITTER_ACCESS_TOKEN_SECRET", ""),
        "bearer_token": os.environ.get("TWITTER_BEARER_TOKEN", ""),
    }


def get_facebook_credentials():
    """Return Facebook Page API credentials from environment variables."""
    return {
        "page_id": os.environ.get("FACEBOOK_PAGE_ID", ""),
        "access_token": os.environ.get("FACEBOOK_ACCESS_TOKEN", ""),
    }


def get_instagram_credentials():
    """Return Instagram Graph API credentials from environment variables."""
    return {
        "account_id": os.environ.get("INSTAGRAM_ACCOUNT_ID", ""),
        "access_token": os.environ.get("INSTAGRAM_ACCESS_TOKEN", ""),
    }
