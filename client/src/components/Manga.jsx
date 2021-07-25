import axios from "axios"
import { useState } from "react"
import Reader from "./Reader"

const Manga = (props) => {

	const [input, setInput] = useState(null)
	const [mangas, setMangas] = useState(null)
	const [chapters, setChapters] = useState(null)
	const [pages, setPages] = useState(null)

	const getChapters = async (id) => {
		const res = await axios.get(`https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=en&order[chapter]=asc`)
		const output = res.data.results.map(chapter => {
			return <li key={chapter.data.id} onClick={() => {getPages(chapter.data.id, 'data-saver', chapter.data.attributes.hash, chapter.data.attributes.dataSaver)}}>{chapter.data.attributes.chapter}</li>
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


	// qualityMode = {data, data-saver}
	// pageList = array of page strings
	const getPages = async (chapterId, qualityMode, chapterHash, pageList) => {
		const baseUrl = (await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`)).data.baseUrl
		const output = pageList.map((pageUrl, index) => {
			return <img key={index} alt='' src={ `${baseUrl}/${qualityMode}/${chapterHash}/${pageUrl}` } />
		})
									
		setPages(output)
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
			{ pages !== null ? <Reader pages={pages} /> : <div>No Pages</div> }
		</div>
	)
}

export default Manga