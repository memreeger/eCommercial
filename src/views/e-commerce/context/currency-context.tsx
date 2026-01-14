import { createContext, useEffect, useState, type ReactNode } from "react"
import { getRatesFromUSD } from "../../../services/exchangeApi/exchangeService"

type Currency = "USD" | "TRY" | "EUR" | "GBP"

interface CurrentCurrencyType {
    currency: Currency,
    setCurrency: (c: Currency) => void
    convertPrice: (price: number) => number
}

export const CurrencyContext = createContext<CurrentCurrencyType | null>(null)

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>("USD")
    const [rates, setRates] = useState<Record<string, number>>({})

    useEffect(() => {
        getRatesFromUSD().then(setRates)
    }, [])

    const convertPrice = (price: number) => {
        if (!rates[currency]) return price
        return price * rates[currency] 
    }

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyProvider
