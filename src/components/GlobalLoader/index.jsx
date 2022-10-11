import styles from './GlobalLoader.module.scss'

const GlobalLoader = ({smalMode = false}) => {

    return (
    <div className={`${styles.globalOverlay} ${smalMode ? styles.smalSpiner : ''}`}>
        <div className={styles.loadingSpinner}></div>
    </div>
    )

}

export default GlobalLoader