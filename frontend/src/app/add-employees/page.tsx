"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployees() {
  const [name, setName] = useState("");
  const [employees, setEmployees] = useState<string[]>([]);
  const router = useRouter();

  const addEmployee = () => {
    const trimmed = name.trim();
    if (trimmed && !employees.includes(trimmed)) {
      setEmployees([...employees, trimmed]);
      setName("");
    }
  };

  const removeEmployee = (index: number) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const startVoting = () => {
    if (employees.length < 2) return;
    localStorage.setItem("employees", JSON.stringify(employees));
    router.push("/voting");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">اضافه کردن کارمندها</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="نام کارمند"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-grow focus:outline-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") addEmployee();
          }}
        />
        <button
          onClick={addEmployee}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          اضافه کن
        </button>
      </div>

      {employees.length === 0 && (
        <p className="text-gray-500 mb-4 text-center">کارمندی اضافه نشده</p>
      )}

      <ul className="mb-6 max-h-48 overflow-auto border rounded p-2">
        {employees.map((emp, i) => (
          <li
            key={i}
            className="border-b py-1 last:border-b-0 flex justify-between items-center"
          >
            <span>{emp}</span>
            <button
              onClick={() => removeEmployee(i)}
              className="text-red-500 hover:text-red-700 font-bold"
              aria-label={`حذف ${emp}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <button
        disabled={employees.length < 2}
        onClick={startVoting}
        className={`w-full py-3 rounded text-white font-semibold ${
          employees.length < 2 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        شروع رای‌گیری
      </button>
    </div>
  );
}
