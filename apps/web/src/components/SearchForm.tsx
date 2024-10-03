import { useState } from "react";

type SearchFormProps = {
    search: (term: string) => void
    currSearch: string
}

export default function SearchForm({ search, currSearch }: SearchFormProps) {

    const [formData, setFormData] = useState({ search: currSearch });

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        setFormData((currData) => {
            currData.search = evt.target.value;
            return { ...currData };
        });
    };

    function handleSearch() {
        search(formData.search);
    }

    return (
        <form>
            <input
                type="text"
                id="search"
                name="search"
                value={formData.search}
                onChange={handleChange}
            />
            <button
                className="btn btn-primary"
                onClick={handleSearch}
            >Search
            </button>
        </form>
    );
}