import axios from "axios"
import { useState } from "react"

const Manga = (props) => {

    const [input, setInput] = useState(null)
    const [mangas, setMangas] = useState(null)
    const [chapters, setChapters] = useState(null)

    const getChapters = async (id) => {
        const res = await axios.get(`https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=en&order[chapter]=asc`)
        const output = res.data.results.map(chapter => {
            return <li key={chapter.data.id}>{chapter.data.attributes.chapter}</li>
        })
                                    
        setChapters(output)
    }

    const getMangas = async (title) => {
        const res = await axios.get(`https://api.mangadex.org/manga?title=${title}`)
        const output = res.data.results.map(manga => {
            return <li key={manga.data.id} onClick={() => getChapters(manga.data.id)}>{manga.data.attributes.title.en}</li>
        })
                                    
        setMangas(output)
    }

    return (
        <div>
            <input type='text' onChange={e => {
                setInput(encodeURI(e.target.value))
            }} />
            <button onClick={() => getMangas(input)}>Submit</button>
            <div>{input}</div>
            { mangas !== null ? mangas : <div>No Mangas</div>}
            { chapters !== null ? chapters : <div>No Chapters</div> }
        </div>
    )
}

export default Manga