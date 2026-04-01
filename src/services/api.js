const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
const FILE_STORAGE_URL = import.meta.env.VITE_FILE_STORAGE_URL;

export async function fetchWallet(userId) {
  const res = await fetch(`${CONVEX_URL}/getWallet?userId=${userId}`);
  return res.json();
}

export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${FILE_STORAGE_URL}/uploadAvatar`, {
    method: "POST",
    body: formData
  });
  return res.json();
}
