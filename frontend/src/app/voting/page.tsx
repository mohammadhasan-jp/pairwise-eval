"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type Employee = {
  id: number;
  name: string;
};

type Comparison = {
  winner_id: number;
  loser_id: number;
};

type RankingResult = {
  employee_id: number;
  score: number;
};

export default function VotingPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [voterIndex, setVoterIndex] = useState(0);
  const [pairs, setPairs] = useState<[Employee, Employee][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [finished, setFinished] = useState(false);
  const [rankings, setRankings] = useState<RankingResult[] | null>(null);
  const [loadingResult, setLoadingResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const emps = localStorage.getItem("employees");
    if (emps) {
      const list: string[] = JSON.parse(emps);
      const structured: Employee[] = list.map((name, idx) => ({
        id: idx,
        name,
      }));
      setEmployees(structured);

      const allPairs: [Employee, Employee][] = [];

      for (let voter = 0; voter < structured.length; voter++) {
        for (let i = 0; i < structured.length; i++) {
          for (let j = i + 1; j < structured.length; j++) {
            if (i !== voter && j !== voter) {
              allPairs.push([structured[i], structured[j]]);
            }
          }
        }
      }

      setPairs(allPairs);
    }
  }, []);

  const pairsPerVoter = () => {
    const n = employees.length;
    return ((n - 1) * (n - 2)) / 2;
  };

  const handleVote = (winner: Employee, loser: Employee) => {
    const newComparison = { winner_id: winner.id, loser_id: loser.id };
    const updated = [...comparisons, newComparison];

    if (currentIndex + 1 < pairsPerVoter()) {
      setComparisons(updated);
      setCurrentIndex(currentIndex + 1);
    } else if (voterIndex + 1 < employees.length) {
      setComparisons(updated);
      setVoterIndex(voterIndex + 1);
      setCurrentIndex(0);
    } else {
      setFinished(true);
      sendResultsToBackend(updated);
    }
  };

  const sendResultsToBackend = async (data: Comparison[]) => {
    setLoadingResult(true);
    setError(null);

    const rankingRequest = {
      employees,
      comparisons: data,
    };

    console.log("📤 Employees payload:", rankingRequest.employees);
    console.log("📤 Comparisons payload:", rankingRequest.comparisons);

    try {
      const res = await axios.post<RankingResult[]>(
        "https://pairwise-eval-backend.liara.run/rankings/bradley-terry/",
        rankingRequest
      );
      setRankings(res.data);
    } catch (err) {
      setError("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
      console.error(err);
    } finally {
      setLoadingResult(false);
    }
  };

  if (employees.length < 3) {
    return <p className="p-4 text-center">حداقل سه کارمند برای رأی‌گیری لازم است.</p>;
  }

  if (finished) {
    if (loadingResult) {
      return <p className="p-4 text-center text-blue-600">در حال دریافت نتایج...</p>;
    }
    if (error) {
      return <p className="p-4 text-center text-red-600">{error}</p>;
    }
    if (!rankings || rankings.length === 0) {
      return <p className="p-4 text-center">نتیجه‌ای برای نمایش وجود ندارد.</p>;
    }

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center text-black">
        <h2 className="text-xl font-bold mb-6 text-black">رتبه‌بندی کارکنان</h2>
        <ul>
          {rankings
            .slice()
            .sort((a, b) => b.score - a.score)
            .map((r, idx) => {
              const employee = employees.find((e) => e.id === r.employee_id);
              return (
                <li
                  key={`${r.employee_id}-${idx}`}
                  className={`mb-2 ${idx === 0 ? "font-bold text-green-600" : ""}`}
                >
                  {idx + 1}. {employee?.name || "نامشخص"} - امتیاز: {r.score.toFixed(4)}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  const totalPairs = pairsPerVoter();
  const voter = employees[voterIndex];
  const index = voterIndex * totalPairs + currentIndex;
  const [emp1, emp2] = pairs[index] || [];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <h2 className="text-xl font-bold mb-2">
        <span className="text-gray-700">در حال رأی‌گیری از طرف:</span>{" "}
        <span className="text-blue-600">{voter?.name}</span>
      </h2>
      <p className="mb-6 text-gray-500">کدام یک عملکرد بهتری دارد؟</p>
      <div className="flex justify-around gap-4">
        <button
          onClick={() => handleVote(emp1, emp2)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          {emp1?.name}
        </button>
        <span className="text-xl font-bold self-center text-black">یا</span>
        <button
          onClick={() => handleVote(emp2, emp1)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          {emp2?.name}
        </button>
      </div>
      <p className="mt-4 text-gray-600">
        رأی {currentIndex + 1} از {totalPairs} برای {voter?.name}
      </p>
    </div>
  );
}
