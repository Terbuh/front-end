// nextjs/pages/api/users.js
export default async function handler(req, res) {
  const response = await fetch("http://localhost:7006/api/users");
  const data = await response.json();

  res.status(200).json(data);
}
