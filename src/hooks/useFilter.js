import { useState } from 'react'

export const useFilter = (data,callback) => {
    const [query,setQuery]=useState("")
    
    const filteredData = data.filter((curr)=>callback(curr).includes(query))

    return [filteredData,setQuery]
}

