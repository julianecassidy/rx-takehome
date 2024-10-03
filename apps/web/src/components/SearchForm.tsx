import React, { useState } from "react";

type SearchFormProps = {
    search: (term: string) => void;
    currSearch: string;
};

export default function SearchForm({ search, currSearch }: SearchFormProps) {

    const [formData, setFormData] = useState({ search: currSearch });

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        setFormData((currData) => {
            currData.search = evt.target.value;
            return { ...currData };
        });
    };

    function handleSearch(evt: React.FormEvent) {
        evt.preventDefault();
        search(formData.search);
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Search Medications</h1>
            <form className="flex gap-4 ">
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        className="input max-w-xs"
                        value={formData.search}
                        onChange={handleChange}
                    />
                </label>
                <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                >Search
                </button>
            </form>
        </div>
    );
}