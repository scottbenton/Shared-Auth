import Cookies from "js-cookie";

export function createCustomCookieStorage(domain: string | undefined) {
  return {
    getItem: (key: string) => {
      return Cookies.get(key) ?? null;
    },
    setItem: (key: string, value: string) => {
      // This is the magic part: the domain allows *.mydomain.com to see it
      Cookies.set(key, value, {
        domain,
        expires: 365, // or your preferred expiry
        sameSite: "Lax",
        secure: true,
      });
    },
    removeItem: (key: string) => {
      Cookies.remove(key, { domain });
    },
  };
}
