import { useTranslation } from "react-i18next";

interface SortSelectProps {
    searchParams: URLSearchParams;
    setSearchParams: (params: Record<string, string>) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ searchParams, setSearchParams }) => {
    const sortParam = searchParams.get("sort") || "";
    const { t } = useTranslation();

    const handleChange = (value: string) => {
        const newParams: Record<string, string> = { page: "1" } // sort değişince page'i 1 yap

        if (value !== "default")
            newParams["sort"] = value;      // değer default değilse newParams'a value değerini eklemek için

        setSearchParams(newParams);

    }

    return (
        <select
            value={sortParam}
            onChange={(e) => handleChange(e.target.value)}
            className="border px-4 py-2 rounded dark:bg-black dark:text-white"
        >
            <option value="default">{t("sortSelect.defaultOption")}</option>
            <option value="price-asc">{t("sortSelect.priceAsc")}</option>
            <option value="price-desc">{t("sortSelect.priceDesc")}</option>
        </select>
    );
};

export default SortSelect;
