import { FormEventHandler, createRef, useState } from 'react';

import './SearchBox.css';

interface SearchBoxProps {
    runApiSearch: (city: string) => void;
}

export default function SearchBox({ runApiSearch }: SearchBoxProps) {
    const [searchText, setSearchText] = useState<string>('');
    return (
        <input
            id='search-box'
            name='city'
            value={searchText}
            placeholder='Search for a location'
            onChange={e => setSearchText(e.target.value || '')}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    if (searchText && searchText !== '') {
                        runApiSearch(searchText);
                        setSearchText('');
                    }
                }
            }}
        />
    );
}
