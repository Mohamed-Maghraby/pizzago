import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function SearchOrder() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    function handleSubmit (e) {
        e.preventDefault()
        navigate(`/order/${query}`)
        setQuery("")
    }
  return (
   <form onSubmit={handleSubmit}>
        <input 
        type="search"
        placeholder='Search an order'
        value={query}
        onChange={(e)=>setQuery(e.target.value)} 
        />
   </form>
  )
}

export default SearchOrder