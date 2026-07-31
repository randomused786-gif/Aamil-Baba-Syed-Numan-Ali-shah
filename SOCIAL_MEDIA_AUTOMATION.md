# Social Media Automation – Setup & Usage Guide

Automated posting system for **Twitter/X**, **Facebook**, and **Instagram** using GitHub Actions and Python.

---

## Architecture

```
.github/workflows/
  social-media-post.yml   ← Main posting workflow (scheduled + manual)
  validate-config.yml     ← CI validation on push/PR

social_media_bot/
  __init__.py
  config.py               ← Credential & YAML config loader
  poster.py               ← CLI entry point & post dispatcher
  platforms/
    twitter.py            ← Twitter/X via Tweepy (API v2)
    facebook.py           ← Facebook Page via Graph API
    instagram.py          ← Instagram via Graph API

content/
  posts.yaml              ← Post definitions (text, media, schedule)
  media/                  ← Local media files (images, GIFs)
```

---

## 1. Configure API Credentials

All credentials are stored as **GitHub Repository Secrets** (Settings → Secrets and variables → Actions).

### Twitter/X

| Secret Name                    | Description                      |
|-------------------------------|----------------------------------|
| `TWITTER_API_KEY`             | Consumer / API key               |
| `TWITTER_API_SECRET`          | Consumer / API secret            |
| `TWITTER_ACCESS_TOKEN`        | OAuth 1.0a access token          |
| `TWITTER_ACCESS_TOKEN_SECRET` | OAuth 1.0a access token secret   |
| `TWITTER_BEARER_TOKEN`        | Bearer token for v2 endpoints    |

Get these from the [Twitter Developer Portal](https://developer.twitter.com/).

### Facebook

| Secret Name              | Description                        |
|-------------------------|------------------------------------|
| `FACEBOOK_PAGE_ID`      | Numeric Page ID                    |
| `FACEBOOK_ACCESS_TOKEN` | Page Access Token (long-lived)     |

Generate from [Meta for Developers](https://developers.facebook.com/).

### Instagram

| Secret Name               | Description                              |
|--------------------------|------------------------------------------|
| `INSTAGRAM_ACCOUNT_ID`   | Instagram Business/Creator Account ID    |
| `INSTAGRAM_ACCESS_TOKEN` | Access token via Facebook Graph API      |

Requires a linked Facebook Page. See [Instagram Graph API docs](https://developers.facebook.com/docs/instagram-api/).

---

## 2. Define Posts

Edit `content/posts.yaml`:

```yaml
posts:
  - id: my-post
    text: "Hello from our automated system! #hashtag"
    media:
      - banner.jpg          # file in content/media/
    instagram_image_url: "https://example.com/banner.jpg"  # required for Instagram
    scheduled_date: "2026-06-01"
    platforms:
      - twitter
      - facebook
      - instagram
```

### Fields

| Field                | Required | Description                                                |
|---------------------|----------|------------------------------------------------------------|
| `id`                | Yes      | Unique post identifier                                     |
| `text`              | Yes      | Post body (keep ≤280 chars for Twitter)                    |
| `media`             | No       | List of filenames in `content/media/` or public URLs       |
| `instagram_image_url` | No    | Public image URL (Instagram requirement)                   |
| `scheduled_date`    | No       | `YYYY-MM-DD` — auto-selected when the cron runs that day  |
| `platforms`         | No       | Default target platforms for this post                     |

### Supported Media Types

- **Text** — all platforms
- **Images** (JPEG, PNG) — Twitter, Facebook, Instagram
- **GIFs** — Twitter, Facebook

---

## 3. Triggers

### Automatic (Scheduled)

The `social-media-post.yml` workflow runs **daily at 09:00 UTC**. It selects the post whose `scheduled_date` matches the current date and posts it to the configured platforms.

Edit the cron expression to change the schedule:

```yaml
schedule:
  - cron: "0 9 * * *"   # daily at 09:00 UTC
```

### Manual (Workflow Dispatch)

Go to **Actions → Social Media Auto-Post → Run workflow** and fill in:

| Input        | Description                                           |
|-------------|-------------------------------------------------------|
| `platforms` | Comma-separated: `twitter`, `facebook`, `instagram`   |
| `post_id`   | Specific post ID from `posts.yaml` (optional)         |
| `dry_run`   | `true` to preview without posting                     |

---

## 4. Local Testing

```bash
# Install dependencies
pip install -r requirements.txt

# Dry run (no credentials needed)
python -m social_media_bot.poster --platforms twitter --dry-run

# Post to Twitter (credentials must be set as env vars)
export TWITTER_API_KEY="..."
export TWITTER_API_SECRET="..."
export TWITTER_ACCESS_TOKEN="..."
export TWITTER_ACCESS_TOKEN_SECRET="..."
export TWITTER_BEARER_TOKEN="..."
python -m social_media_bot.poster --platforms twitter --post-id welcome-post
```

---

## 5. CI Validation

The `validate-config.yml` workflow runs on every push/PR that modifies `content/`, `social_media_bot/`, or `requirements.txt`. It:

1. Validates the YAML configuration can be parsed
2. Runs a dry-run to confirm post selection logic works

---

## 6. Adding New Platforms

1. Create a new module in `social_media_bot/platforms/` (e.g., `linkedin.py`)
2. Implement a class with a `post(text, media_paths=None)` method
3. Register it in `social_media_bot/poster.py` → `PLATFORM_MAP`
4. Add the credential loader in `social_media_bot/config.py`
5. Add the corresponding secrets to GitHub

---

## Security

- API credentials are **never** stored in code — only in GitHub Secrets
- The workflow uses `permissions: contents: read` (least privilege)
- Secrets are injected as environment variables at runtime only
