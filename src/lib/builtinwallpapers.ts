// The wallpapers that come with Hearth (public/wallpapers, drawn from the sources in tools/wallpapers).
// They are part of the app, so the web view loads them directly: no shell, no saved copy. Each is a
// 1920x1080 JPEG of about 150-190 KB; only the one on screen is ever loaded.

export interface BuiltinWallpaper { id: string; label: string; detail: string; }

export const BUILTIN_WALLPAPERS: readonly BuiltinWallpaper[] = [
	{id: 'aurora', label: 'Aurora', detail: 'A green glow over a dark night sky'},
	{id: 'dunes', label: 'Dunes', detail: 'Warm sunset over soft dunes'},
	{id: 'tide', label: 'Tide', detail: 'Deep teal, layered waves'},
	{id: 'bloom', label: 'Bloom', detail: 'Soft blurred colour'},
	{id: 'horizon', label: 'Horizon', detail: 'A calm dark sky with a glowing horizon'}
];

export function builtinWallpaper (id: string): BuiltinWallpaper | undefined {
	return BUILTIN_WALLPAPERS.find((w) => w.id === id);
}

/** Where the picture is, relative to index.html. */
export function builtinWallpaperUrl (id: string): string {
	return `wallpapers/${id}.jpg`;
}
