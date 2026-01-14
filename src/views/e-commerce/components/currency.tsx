import { useCurrency } from "../hooks/useCurrency"

const CurrencySelect = () => {
    const { currency, setCurrency } = useCurrency()

    return (
        <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            className="bg-gray-800 text-white px-2 py-1 rounded"
        >
            <option value="USD">USD</option>
            <option value="TRY">TRY</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
        </select>
    )
}

export default CurrencySelect
