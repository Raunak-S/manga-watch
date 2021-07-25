import styles from './reader.module.css'


const Reader = props => {


	return (
		<div className={styles.reader}>
			{props.pages}
		</div>
	)
}


export default Reader