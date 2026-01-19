export default function handler(req, res) {
  const { link } = req.query;

  if (!link) {
    return res.status(400).json({
      status: "error",
      message: "Link gönderilmedi",
    });
  }

  // Instagram linkinden kullanıcı adını ayıkla
  let username = "";

  try {
    const clean = link.split("?")[0];
    const parts = clean.split("/").filter(Boolean);
    username = parts[parts.length - 1];
  } catch (e) {
    return res.status(400).json({
      status: "error",
      message: "Geçersiz link",
    });
  }

  if (!username || username.length < 2) {
    return res.status(400).json({
      status: "error",
      message: "Kullanıcı adı bulunamadı",
    });
  }

  // Şimdilik sahte ama mantıklı bir analiz üretelim
  const fakeFollowers =
    Math.floor(Math.random() * 900000 + 10000).toLocaleString();

  return res.status(200).json({
    status: "ok",
    username,
    type: "instagram_profile",
    followers_estimate: fakeFollowers,
    risk: "Düşük",
    message: "Profil analize uygun",
  });
}