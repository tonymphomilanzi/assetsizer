export interface AssetSize {
  width: number;
  height: number;
  label: string;
  filename: string;
}

export interface Platform {
  id: string;
  name: string;
  folderName: string;
  sizes: AssetSize[];
}

export const platforms: Platform[] = [
  {
    id: "ios",
    name: "iOS App Icon",
    folderName: "ios",
    sizes: [
      { width: 1024, height: 1024, label: "App Store", filename: "icon-1024.png" },
      { width: 180, height: 180, label: "iPhone @3x", filename: "icon-180.png" },
      { width: 120, height: 120, label: "iPhone @2x", filename: "icon-120.png" },
      { width: 167, height: 167, label: "iPad Pro", filename: "icon-167.png" },
      { width: 152, height: 152, label: "iPad", filename: "icon-152.png" },
      { width: 87, height: 87, label: "Settings @3x", filename: "icon-87.png" },
      { width: 80, height: 80, label: "Spotlight @2x", filename: "icon-80.png" },
      { width: 58, height: 58, label: "Settings @2x", filename: "icon-58.png" },
      { width: 40, height: 40, label: "Spotlight", filename: "icon-40.png" },
      { width: 29, height: 29, label: "Settings", filename: "icon-29.png" },
      { width: 20, height: 20, label: "Notification", filename: "icon-20.png" },
    ],
  },
  {
    id: "android",
    name: "Android App Icon",
    folderName: "android",
    sizes: [
      { width: 512, height: 512, label: "Play Store", filename: "icon-512.png" },
      { width: 192, height: 192, label: "xxxhdpi", filename: "icon-192.png" },
      { width: 144, height: 144, label: "xxhdpi", filename: "icon-144.png" },
      { width: 96, height: 96, label: "xhdpi", filename: "icon-96.png" },
      { width: 72, height: 72, label: "hdpi", filename: "icon-72.png" },
      { width: 48, height: 48, label: "mdpi", filename: "icon-48.png" },
    ],
  },
  {
    id: "web",
    name: "Web / Favicon",
    folderName: "web",
    sizes: [
      { width: 512, height: 512, label: "PWA Large", filename: "pwa-512.png" },
      { width: 192, height: 192, label: "PWA Small", filename: "pwa-192.png" },
      { width: 180, height: 180, label: "Apple Touch", filename: "apple-touch.png" },
      { width: 32, height: 32, label: "Favicon 32", filename: "favicon-32.png" },
      { width: 16, height: 16, label: "Favicon 16", filename: "favicon-16.png" },
    ],
  },
  {
    id: "social",
    name: "Social Media",
    folderName: "social",
    sizes: [
      { width: 400, height: 400, label: "X Profile", filename: "x-profile.png" },
      { width: 1500, height: 500, label: "X Header", filename: "x-header.png" },
      { width: 170, height: 170, label: "Facebook Profile", filename: "fb-profile.png" },
      { width: 820, height: 312, label: "Facebook Cover", filename: "fb-cover.png" },
      { width: 1080, height: 1080, label: "Instagram Post", filename: "ig-post.png" },
      { width: 1080, height: 1920, label: "Instagram Story", filename: "ig-story.png" },
      { width: 800, height: 800, label: "LinkedIn Profile", filename: "li-profile.png" },
      { width: 1584, height: 396, label: "LinkedIn Banner", filename: "li-banner.png" },
      { width: 800, height: 800, label: "YouTube Profile", filename: "yt-profile.png" },
      { width: 2560, height: 1440, label: "YouTube Banner", filename: "yt-banner.png" },
      { width: 1200, height: 630, label: "OG Image", filename: "og-image.png" },
    ],
  },
];

export function getTotalSizeCount(platformIds: string[]): number {
  return platforms
    .filter((platform) => platformIds.includes(platform.id))
    .reduce((total, platform) => total + platform.sizes.length, 0);
}

export function getSelectedPlatforms(platformIds: string[]): Platform[] {
  return platforms.filter((platform) => platformIds.includes(platform.id));
}
