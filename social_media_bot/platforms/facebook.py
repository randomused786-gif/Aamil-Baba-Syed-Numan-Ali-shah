"""
Facebook Page posting module using the Graph API.

Supports text posts and posts with images.
"""

import logging
from pathlib import Path

import requests

from social_media_bot.config import get_facebook_credentials

logger = logging.getLogger(__name__)

GRAPH_API_BASE = "https://graph.facebook.com/v19.0"


class FacebookPoster:
    """Post content to a Facebook Page via the Graph API."""

    def __init__(self):
        creds = get_facebook_credentials()
        self._validate_credentials(creds)
        self.page_id = creds["page_id"]
        self.access_token = creds["access_token"]

    @staticmethod
    def _validate_credentials(creds):
        missing = [k for k, v in creds.items() if not v]
        if missing:
            raise EnvironmentError(
                f"Missing Facebook credentials: {', '.join(missing)}. "
                "Set them as environment variables or GitHub Secrets."
            )

    def post(self, text, media_paths=None):
        """
        Publish a post to a Facebook Page.

        Args:
            text: The post message.
            media_paths: Optional list of image file paths. The first image
                         is posted; additional images are ignored by the
                         single-photo endpoint.

        Returns:
            The JSON response from the Graph API.
        """
        if media_paths:
            return self._post_with_photo(text, media_paths[0])
        return self._post_text(text)

    def _post_text(self, text):
        url = f"{GRAPH_API_BASE}/{self.page_id}/feed"
        payload = {"message": text, "access_token": self.access_token}
        logger.info("Posting text to Facebook Page %s", self.page_id)
        resp = requests.post(url, data=payload, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        logger.info("Facebook post created. ID: %s", data.get("id"))
        return data

    def _post_with_photo(self, text, image_path):
        path = Path(image_path)
        if not path.exists():
            raise FileNotFoundError(f"Image file not found: {image_path}")

        url = f"{GRAPH_API_BASE}/{self.page_id}/photos"
        payload = {"caption": text, "access_token": self.access_token}
        with open(path, "rb") as img:
            files = {"source": (path.name, img, "image/jpeg")}
            logger.info("Posting photo to Facebook Page %s", self.page_id)
            resp = requests.post(url, data=payload, files=files, timeout=60)

        resp.raise_for_status()
        data = resp.json()
        logger.info("Facebook photo post created. ID: %s", data.get("id"))
        return data
