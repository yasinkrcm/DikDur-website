import { dbConnect } from "../../_db";
import Absenteeism from "../../_models/Absenteeism";
import User from "../../_models/User";
import { verifyJWT } from "../../_utils/auth";

export async function GET(req) {
  await dbConnect();
  const user = await verifyJWT(req);
  if (!user) return Response.json({ message: "Yetkisiz" }, { status: 401 });

  // Absenteeism kayıtlarını user ile join ederek departman ve aya göre grupla
  // Son 6 ayı döndür
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  // Tüm absenteeism kayıtlarını çek
  const records = await Absenteeism.find({ date: { $gte: sixMonthsAgo } }).populate("user");

  // Ay ve departman bazında grupla
  const trends = {};
  records.forEach(rec => {
    if (!rec.user || !rec.user.department) return;
    const month = rec.date.toLocaleString("default", { month: "short", year: "numeric" });
    if (!trends[month]) trends[month] = {};
    if (!trends[month][rec.user.department]) trends[month][rec.user.department] = 0;
    trends[month][rec.user.department] += rec.days || 0;
  });

  // Sonuçları diziye çevir
  const result = Object.entries(trends).map(([month, depts]) => ({
    month,
    departments: Object.entries(depts).map(([department, days]) => ({ department, days }))
  }));

  return Response.json(result);
} 