import { execFileSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const REPO = 'YouMind-OpenLab/awesome-gemini-omni';
const VIDEO_URLS_FILE = path.resolve(ROOT, 'video-urls.json');
const GITHUB_ATTACHMENT_RE = /https:\/\/github\.com\/user-attachments\/assets\/[a-zA-Z0-9-]+/;

interface VideoUrlMap {
  [promptId: string]: string;
}

function loadVideoUrls(): VideoUrlMap {
  if (!existsSync(VIDEO_URLS_FILE)) return {};
  try {
    const data = JSON.parse(readFileSync(VIDEO_URLS_FILE, 'utf-8'));
    return data.prompts || data || {};
  } catch {
    return {};
  }
}

function saveVideoUrls(urls: VideoUrlMap): void {
  writeFileSync(VIDEO_URLS_FILE, JSON.stringify({ prompts: urls }, null, 2) + '\n');
}

function uploadToGitHubAttachment(filePath: string): string {
  const output = execFileSync('gh', ['image', '--repo', REPO, filePath], {
    cwd: ROOT,
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const match = output.match(GITHUB_ATTACHMENT_RE);
  if (!match) {
    throw new Error(`gh image did not return a GitHub user-attachment URL:\n${output}`);
  }

  return match[0];
}

export async function uploadVideos(videoFiles: Map<number, string>): Promise<VideoUrlMap> {
  const urls = loadVideoUrls();

  for (const [id, filePath] of videoFiles) {
    const idStr = String(id);
    if (urls[idStr]) {
      console.log(`  ⏭️ Skip ${id} — already uploaded`);
      continue;
    }

    try {
      urls[idStr] = uploadToGitHubAttachment(filePath);
      console.log(`  ✅ Uploaded ${id} → ${urls[idStr]}`);
    } catch (e) {
      console.error(`  ❌ Failed to upload ${id}:`, e);
    }
  }

  saveVideoUrls(urls);
  return urls;
}
