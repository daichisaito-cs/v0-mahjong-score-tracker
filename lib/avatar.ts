export function getOptimizedAvatarUrl(
  avatarUrl: string | null | undefined,
  options?: { size?: number; quality?: number },
): string | undefined {
  if (!avatarUrl) return undefined
  if (avatarUrl.startsWith("data:")) return avatarUrl

  // Some environments return 403 for render/image endpoints.
  // Keep using the original public URL to avoid broken avatars.
  void options
  return avatarUrl
}
