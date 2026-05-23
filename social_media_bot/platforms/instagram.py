"""
Instagram posting module using the Instagram Graph API.

Instagram requires images to be publicly accessible URLs, so this module
uploads the image to a temporary hosting service or expects a public URL.
Supports image posts with captions.
"""

import logging
import time

import requests

from social_media_bot.config import get_instagram_credentials

logger = logging.getLogger(__name__)

GRAPH_API_BASE = "https://graph.facebook.com/v19.0"


class InstagramPoster:
    """Post content to Instagram via the Graph API (Business/Creator accounts)."""

    def __init__(self):
        creds = get_instagram_credentials()
        self._validate_credentials(creds)
        self.account_id = creds["account_id"]
        self.access_token = creds["access_token"]

    @staticmethod
    def _validate_credentials(creds):
        missing = [k for k, v in creds.items() if not v]
        if missing:
            raise EnvironmentError(
                f"Missing Instagram credentials: {', '.join(missing)}. "
                "Set them as environment variables or GitHub Secrets."
            )

    def post(self, text, media_paths=None, image_url=None):
        """
        Publish an Instagram post.

        The Instagram Graph API requires a publicly accessible image URL.
        Provide either `image_url` (a public URL) or `media_paths` where
        the first entry is treated as a public URL string.

        Args:
            text: The caption text.
            media_paths: Optional list; the first item should be a public
                         image URL string.
            image_url: A direct public URL to the image.

        Returns:
            The JSON response from the Graph API.
        """
        url = image_url
        if not url and media_paths:
            url = media_paths[0]

        if not url:
            raise ValueError(
                "Instagram requires a publicly accessible image URL. "
                "Provide image_url or media_paths with a URL string."
            )

        container_id = self._create_media_container(text, url)
        return self._publish_container(container_id)

    def _create_media_container(self, caption, image_url):
        url = f"{GRAPH_API_BASE}/{self.account_id}/media"
        payload = {
            "image_url": image_url,
            "caption": caption,
            "access_token": self.access_token,
        }
        logger.info("Creating Instagram media container")
        resp = requests.post(url, data=payload, timeout=30)
        resp.raise_for_status()
        container_id = resp.json()["id"]
        logger.info("Media container created: %s", container_id)
        return container_id

    def _publish_container(self, container_id, max_retries=5):
        url = f"{GRAPH_API_BASE}/{self.account_id}/media_publish"
        payload = {
            "creation_id": container_id,
            "access_token": self.access_token,
        }

        for attempt in range(max_retries):
            logger.info("Publishing Instagram post (attempt %d)", attempt + 1)
            resp = requests.post(url, data=payload, timeout=30)
            if resp.status_code == 200:
                data = resp.json()
                logger.info("Instagram post published. ID: %s", data.get("id"))
                return data
            logger.warning(
                "Publish attempt %d failed (%s), retrying...",
                attempt + 1,
                resp.status_code,
            )
            time.sleep(5)

        resp.raise_for_status()
        return resp.json()
