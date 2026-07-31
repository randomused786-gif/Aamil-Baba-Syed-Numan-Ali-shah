"""
Twitter/X posting module using Tweepy (Twitter API v2).

Supports text posts, text with images, and text with GIFs.
"""

import logging
from pathlib import Path

import tweepy

from social_media_bot.config import get_twitter_credentials

logger = logging.getLogger(__name__)


class TwitterPoster:
    """Post content to Twitter/X using the v2 API."""

    def __init__(self):
        creds = get_twitter_credentials()
        self._validate_credentials(creds)

        self.auth = tweepy.OAuth1UserHandler(
            consumer_key=creds["api_key"],
            consumer_secret=creds["api_secret"],
            access_token=creds["access_token"],
            access_token_secret=creds["access_token_secret"],
        )
        self.api_v1 = tweepy.API(self.auth)
        self.client = tweepy.Client(
            bearer_token=creds["bearer_token"],
            consumer_key=creds["api_key"],
            consumer_secret=creds["api_secret"],
            access_token=creds["access_token"],
            access_token_secret=creds["access_token_secret"],
        )

    @staticmethod
    def _validate_credentials(creds):
        missing = [k for k, v in creds.items() if not v]
        if missing:
            raise EnvironmentError(
                f"Missing Twitter credentials: {', '.join(missing)}. "
                "Set them as environment variables or GitHub Secrets."
            )

    def _upload_media(self, media_path):
        """Upload an image or GIF and return the media_id."""
        path = Path(media_path)
        if not path.exists():
            raise FileNotFoundError(f"Media file not found: {media_path}")
        logger.info("Uploading media: %s", media_path)
        media = self.api_v1.media_upload(filename=str(path))
        return media.media_id

    def post(self, text, media_paths=None):
        """
        Publish a tweet.

        Args:
            text: The tweet text (max 280 characters).
            media_paths: Optional list of file paths to images/GIFs to attach.

        Returns:
            The response object from the Twitter API.
        """
        media_ids = []
        if media_paths:
            for mp in media_paths:
                media_ids.append(self._upload_media(mp))

        kwargs = {"text": text}
        if media_ids:
            kwargs["media_ids"] = media_ids

        logger.info("Posting tweet: %.80s...", text)
        response = self.client.create_tweet(**kwargs)
        logger.info("Tweet posted successfully. ID: %s", response.data["id"])
        return response
