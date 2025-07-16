import { useEffect, useState } from "react";

export default function DepartmentDetailsModal({ department, open, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!department || !open) return;
    setLoading(true);
    fetch(`/api/posture/department-details?department=${encodeURIComponent(department)}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [department, open]);

  if (!open) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        <h2 className="text-2xl font-bold mb-2 text-blue-800">{department} Department Details</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="animate-spin h-8 w-8 text-blue-500">⏳</span>
          </div>
        ) : !data ? (
          <div className="text-red-500">Veri yüklenemedi.</div>
        ) : (
          <div>
            {data.message && (
              <div className="bg-yellow-100 text-yellow-800 rounded px-4 py-2 mb-4 text-center">
                {data.message}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500">Çalışan Sayısı</div>
                <div className="text-xl font-semibold">{data.employeeCount ?? "-"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Ortalama Skor</div>
                <div className="text-xl font-semibold">{data.avgScore !== null ? data.avgScore.toFixed(1) : "-"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">En Yüksek Skor</div>
                <div className="text-xl font-semibold">{data.maxScore !== null ? data.maxScore : "-"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">En Düşük Skor</div>
                <div className="text-xl font-semibold">{data.minScore !== null ? data.minScore : "-"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Risk Seviyesi</div>
                <div className={`text-lg font-bold ${
                  data.riskLevel === "High" ? "text-red-600" :
                  data.riskLevel === "Medium" ? "text-yellow-600" :
                  data.riskLevel === "Low" ? "text-green-600" : "text-gray-500"
                }`}>
                  {data.riskLevel ?? "-"}
                </div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2 text-blue-700">Son 30 Gün Skorları</div>
              {(!data.scores || data.scores.length === 0) ? (
                <div className="text-gray-500">Bu departman için henüz skor verisi yok.</div>
              ) : (
                <ul className="divide-y divide-gray-200 max-h-40 overflow-y-auto">
                  {data.scores.map((s, i) => (
                    <li key={i} className="py-2 flex justify-between text-sm">
                      <span>{new Date(s.date).toLocaleDateString()}</span>
                      <span className="font-semibold">{s.score}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}