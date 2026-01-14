// import { useEffect, useState } from "react";
// import { getRatesFromUSD } from "../../../services/exchangeApi/exchangeService";

// const currencies = ["USD", "EUR", "GBP", "JPY", "AED"];

// const Exchange = () => {
//     const [amount, setAmount] = useState(1);
//     const [rates, setRates] = useState<Record<string, number>>({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         getRatesFromUSD()
//             .then(setRates)
//             .finally(() => setLoading(false));
//     }, []);

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="max-w-md mx-auto p-6 border rounded space-y-4">
//             <h2 className="text-xl font-bold">TL → Döviz</h2>

//             <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//                 className="w-full p-2 border rounded"
//                 placeholder="TL miktarı"
//             />

//             <ul className="space-y-2">
//                 {currencies.map((cur) => (
//                     <li key={cur} className="flex justify-between">
//                         <span>{cur}</span>
//                         <span className="font-semibold">
//                             {(amount * rates[cur]).toFixed(2)}
//                         </span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Exchange;
