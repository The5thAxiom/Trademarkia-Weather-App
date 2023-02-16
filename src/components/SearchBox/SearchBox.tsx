import { FormEventHandler, useState } from 'react';

import './SearchBox.css';

interface SearchBoxProps {
    runApiSearch: (city: string) => void;
}

export default function SearchBox({ runApiSearch }: SearchBoxProps) {
    const [searchText, setSearchText] = useState<string>('');
    const handleForm: FormEventHandler = e => {
        e.preventDefault();
        if (searchText && searchText !== '') {
            runApiSearch(searchText);
        }
    };
    return (
        <form onSubmit={handleForm}>
            <input
                name='city'
                value={searchText}
                onChange={e => setSearchText(e.target.value || '')}
            />
            <button>Search</button>
        </form>
    );
}
