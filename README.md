# GQ Party Streamliner 🧪

A Chrome extension that automatically fills Great Question participant forms for testing purposes.

## What it does

When you visit a GQ participant booking page, this extension will automatically:

1. **Fill in the name** with a random test name (e.g., "Test bright-falcon-42")
2. **Fill in the email** with a unique email address (e.g., "e4e+bright-falcon-42@greatquestion.co")
3. **Check all consent checkboxes**
4. **Optionally auto-submit** the form (disabled by default)

## Installation

### Step 1: Download the extension

Download this folder to your computer (or clone the repo).

### Step 2: Open Chrome Extensions

1. Open Chrome
2. Go to `chrome://extensions` (type this in the address bar)
3. Enable **Developer mode** (toggle in the top right corner)

### Step 3: Load the extension

1. Click **"Load unpacked"**
2. Select the `gq-party-streamliner` folder
3. The extension should now appear in your extensions list

### Step 4: Pin the extension (optional)

Click the puzzle piece icon in Chrome's toolbar and pin "GQ Party Streamliner" for easy access.

## Configuration

Click the extension icon to open settings:

| Setting | Default | Description |
|---------|---------|-------------|
| **Enabled** | On | Master on/off toggle |
| **Name Prefix** | `Test` | Prefix for generated names |
| **Base Email** | `e4e@greatquestion.co` | Email for receiving test submissions |
| **Auto-submit** | Off | Automatically submit forms after filling |
| **URL Patterns** | GQ booking URLs | Which pages to auto-fill |

## Default URL Patterns

The extension activates on these URL patterns by default:

- `*://greatquestion.co/*/*/direct*`
- `*://greatquestion.co/*/*/bookings/new*`
- `*://greatquestion.co/*/*/external/apply*`

You can add or modify patterns in the settings.

## How the names/emails work

- **Name**: `{prefix} {adjective}-{noun}-{number}`
  - Example: "Test sunny-tiger-42"
  
- **Email**: `{username}+{random}@{domain}`
  - Example: "e4e+sunny-tiger-42@greatquestion.co"
  - The `+` suffix ensures each submission has a unique email while all going to the same inbox

## Troubleshooting

**Extension not filling forms?**
- Make sure it's enabled (check the toggle in settings)
- Verify the URL matches one of your patterns
- Check that the page has loaded completely
- Look in Chrome DevTools console for `[GQ Party Streamliner]` messages

**Need to test without auto-fill?**
- Toggle the extension off in settings, or
- Use an incognito window (extensions are disabled by default)

## Updating

To update the extension after pulling new changes:
1. Go to `chrome://extensions`
2. Find "GQ Party Streamliner"
3. Click the refresh icon ↻
