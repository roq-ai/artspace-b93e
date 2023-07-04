const mapping: Record<string, string> = {
  galleries: 'gallery',
  images: 'image',
  subscribers: 'subscriber',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
