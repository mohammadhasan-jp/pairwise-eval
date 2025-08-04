"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Ranking = {
  employee_id: string;
  score: number;
};

export default function RankingsPage() {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  axios
    .get<Ranking[]>("http://127.0.0.1:3000/rankings")
    .then((res) => {
      console.log("data from backend:", res.data);
      setRankings(res.data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">در حال بارگذاری...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">رتبه‌بندی کارمندان</h1>
      <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 border-b border-gray-300 text-left">رتبه</th>
            <th className="py-3 px-6 border-b border-gray-300 text-left">کد کارمند</th>
            <th className="py-3 px-6 border-b border-gray-300 text-left">امتیاز</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((r, idx) => (
            <tr
              key={r.employee_id}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="py-3 px-6 border-b border-gray-300">{idx + 1}</td>
              <td className="py-3 px-6 border-b border-gray-300">{r.employee_id}</td>
              <td className="py-3 px-6 border-b border-gray-300">{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
