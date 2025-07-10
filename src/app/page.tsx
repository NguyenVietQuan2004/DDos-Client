// "use client";

// import { useState } from "react";
// import * as XLSX from "xlsx";

// export default function UploadPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<number[] | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [tableData, setTableData] = useState<any[] | null>(null);
//   const handleUpload = async () => {
//     if (!file) return;

//     setResult(null);
//     setTableData(null);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       // Đọc file Excel tại client
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const a = new Uint8Array(e.target!.result as ArrayBuffer);
//         const workbook = XLSX.read(a, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet);
//         setTableData(jsonData);

//         // Giả delay và gửi API
//         setIsLoading(true);

//         await new Promise((resolve) => setTimeout(resolve, 2500));

//         const res = await fetch("http://localhost:8000/predict", {
//           method: "POST",
//           body: formData,
//         });

//         const data = await res.json();
//         setResult(data.results);
//       };

//       reader.readAsArrayBuffer(file);
//     } catch (err) {
//       alert("Lỗi khi gửi file hoặc đọc Excel");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 pb-60 bg-gradient-to-b  from-red-300 to-white flex flex-col items-center justify-start px-4 py-10 gap-8 overflow-x-hidden">
//       <div className="text-3xl text-black font-semibold">DỰ ĐOÁN TẤN CÔNG DDOS</div>
//       <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
//         {/* Bên trái: Upload */}
//         <div className="bg-white overflow-hidden rounded-2xl h-[450px] shadow-xl p-8 w-full md:w-1/2 relative border-dashed border-2 border-gray-300">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/8293/8293446.png"
//             alt=""
//             className="w-[120px] mx-auto mb-4"
//           />
//           <div className="flex items-center gap-4 mb-4">
//             <img
//               src="https://images.icon-icons.com/1128/PNG/512/1486164734-123_79714.png"
//               alt="PDF Icon"
//               className="w-8 h-8"
//             />
//             <div>
//               <h2 className="text-lg font-semibold text-black">Dự đoán tấn công DDoS</h2>
//               <p className="text-gray-600 text-sm">Tải lên file Excel (.xlsx hoặc .csv) để kiểm tra</p>
//             </div>
//           </div>

//           <input
//             type="file"
//             accept=".xlsx,.csv"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 mb-4"
//           />

//           <button
//             onClick={handleUpload}
//             disabled={isLoading}
//             className={`w-full text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center gap-2 transition ${
//               isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {isLoading ? (
//               <>
//                 <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
//                 Đang gửi gói tin...
//               </>
//             ) : (
//               "Bắt đầu dự đoán"
//             )}
//           </button>

//           {/* Animation gói tin */}
//           {isLoading && (
//             <div className="relative mt-6 h-[60px] flex items-center z-50">
//               <div className="w-full h-2 bg-gray-200 rounded-full ">
//                 <div className="absolute left-[-40px] animate-slidePacket">
//                   <img src="https://cdn-icons-png.freepik.com/256/231/231138.png" className="w-[40px]" alt="packet" />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Slide animation */}
//           <style jsx>{`
//             @keyframes slidePacket {
//               0% {
//                 transform: translateX(0px);
//               }
//               100% {
//                 transform: translateX(450px);
//               }
//             }

//             .animate-slidePacket {
//               animation: slidePacket 2s linear infinite;
//             }
//           `}</style>
//         </div>

//         {/* Bên phải: Kết quả */}
//         <div className="bg-white rounded-2xl h-[450px] shadow-xl p-8 w-full md:w-1/2 border border-gray-200 overflow-y-auto">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Kết quả dự đoán:</h3>
//           {result ? (
//             <ul className="space-y-2 text-sm">
//               {result.map((item, i) => (
//                 <li
//                   key={i}
//                   className={`${item === 1 ? "text-red-600" : "text-green-600"} font-medium flex items-center gap-2`}
//                 >
//                   Dòng {i + 1}: {item === 1 ? "🚨 Tấn công DDoS" : "✅ Bình thường"}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500 italic">Chưa có dữ liệu. Hãy tải file và bắt đầu dự đoán.</p>
//           )}
//         </div>
//       </div>

//       {/* Bảng dữ liệu gốc */}
//       {tableData && (
//         <div className="w-full overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-300 p-4 ">
//           <h3 className="text-lg font-semibold text-gray-700 mb-3">Dữ liệu chi tiết từ file:</h3>
//           <div className="w-[1500px] min-w-max">
//             <table className="table-auto w-full border border-collapse text-sm text-left">
//               <thead className="bg-blue-100 text-black sticky top-0 z-10">
//                 <tr>
//                   {Object.keys(tableData[0]).map((key, idx) => (
//                     <th key={idx} className="border px-2 py-1 whitespace-nowrap">
//                       {key}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="text-black">
//                 {tableData.map((row, idx) => (
//                   <tr key={idx} className="even:bg-gray-50">
//                     {Object.values(row).map((val: any, j) => (
//                       <td key={j} className="border px-2 py-1 whitespace-nowrap">
//                         {val.toString()}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<any[] | null>(null);

  const handleUpload = async (f: File) => {
    setFile(f);
    setResult(null);
    setTableData(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setTableData(jsonData);
    };
    reader.readAsArrayBuffer(f);
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await new Promise((r) => setTimeout(r, 2500)); // giả delay
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.results);
    } catch (err) {
      alert("Lỗi khi gửi file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-60 bg-gradient-to-l from-red-100 to-white flex flex-col items-center justify-start px-4 py-10 gap-8 overflow-x-hidden">
      <div className="text-3xl text-[#e8501f] font-semibold">DỰ ĐOÁN TẤN CÔNG DDOS</div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        {/* Bên trái: Upload */}
        <div className="bg-white overflow-hidden rounded-2xl h-[450px] shadow-sm p-8 w-full md:w-1/2 relative border-dashed border-2 border-gray-300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/8293/8293446.png"
            alt=""
            className="w-[120px] mx-auto mb-4"
          />
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://images.icon-icons.com/1128/PNG/512/1486164734-123_79714.png"
              alt="PDF Icon"
              className="w-8 h-8"
            />
            <div>
              <h2 className="text-lg font-semibold text-black">Dự đoán tấn công DDoS</h2>
              <p className="text-gray-600 text-sm">Tải lên file Excel (.xlsx hoặc .csv) để kiểm tra</p>
            </div>
          </div>

          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
            }}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading || !tableData}
            className={`w-full text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center gap-2 transition ${
              isLoading || !tableData ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
                Đang gửi gói tin...
              </>
            ) : (
              "Bắt đầu dự đoán"
            )}
          </button>

          {/* Gói tin animation */}
          {isLoading && (
            <div className="relative mt-6 h-[60px] flex items-center z-50">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="absolute left-[-40px] animate-slidePacket">
                  <img src="https://cdn-icons-png.freepik.com/256/231/231138.png" className="w-[40px]" alt="packet" />
                </div>
              </div>
            </div>
          )}

          <style jsx>{`
            @keyframes slidePacket {
              0% {
                transform: translateX(0px);
              }
              100% {
                transform: translateX(450px);
              }
            }

            .animate-slidePacket {
              animation: slidePacket 2s linear infinite;
            }
          `}</style>
        </div>

        {/* Bên phải: Kết quả */}
        <div className="bg-white rounded-2xl h-[450px] shadow-sm p-8 w-full md:w-1/2 border border-gray-200 overflow-y-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Kết quả dự đoán:</h3>
          {result ? (
            <ul className="space-y-2 text-sm">
              {result.map((item, i) => (
                <li
                  key={i}
                  className={`${item === 1 ? "text-red-600" : "text-green-600"} font-medium flex items-center gap-2`}
                >
                  Dòng {i + 1}: {item === 1 ? "🚨 Tấn công DDoS" : "✅ Bình thường"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Chưa có dữ liệu. Hãy tải file và bắt đầu dự đoán.</p>
          )}
        </div>
      </div>

      {/* Bảng dữ liệu gốc */}
      {tableData && (
        <div className="w-full overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-300 p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Dữ liệu chi tiết từ file:</h3>
          <div className="w-[1500px] min-w-max">
            <table className="table-auto w-full border border-collapse text-sm text-left">
              <thead className="bg-blue-100 text-black sticky top-0 z-10">
                <tr>
                  {Object.keys(tableData[0]).map((key, idx) => (
                    <th key={idx} className="border px-2 py-1 whitespace-nowrap">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-black">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="even:bg-gray-50">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="border px-2 py-1 whitespace-nowrap">
                        {val.toString()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
