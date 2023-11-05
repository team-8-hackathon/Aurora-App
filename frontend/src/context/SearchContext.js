import React, { useContext, useState } from "react"
import Fuse from 'fuse.js'


const SearchContext = React.createContext();

export function SearchProvider({ children }) {
    const [searchData, setSearchData] = useState([])
    const [resultsFound, setResultsFound] = useState(true)
    const [searching, setSearching] = useState(false);

    const options = {
        keys: [{name: 'title', weight: 1}, {name: 'body', weight: 0.1}, {name: 'topic.topic', weight: 0.5}]
    }
    const searchBlogs = (data, query) => {
        if(!query || !query.length){
            console.log('here', data)
            // setSearchData(data)
            setSearching(false)
            return;
        }
        setSearching(true)
        const fuse = new Fuse(data, options);
        const result = fuse.search(query);
        const finalResult = [];
        if(result.length) {
            result.forEach(item => {
                finalResult.push(item.item)
            })
            setSearchData(finalResult)
            setResultsFound(true)
        } else {
            setSearchData([]);
            setResultsFound(false)
        }

    }
    const contextValue = {
        searchData,
        setSearchData,
        resultsFound,
        searchBlogs,
        searching
    }

    return (
        <>
            <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>
        </>
    )
}

export const useSearch = () => useContext(SearchContext)