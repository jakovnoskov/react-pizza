import React from 'react'
import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className={styles.footerBox}>
        <h1 className={styles.neon}>
          <span>
            Этот проект создан в качестве демонстрации кода, с использованием фреймворка React<br />
            Ссылки для связи с автором: <br />
          </span>
          🚀​​ ​<a href="mailto:jakovnoskov@hotmail.com" target="_blank">jakovnoskov@hotmail.com</a> ​✨ <a href="https://jakovnoskov.github.io/" target="_blank">jakovnoskov.github.io</a> 🙎 <a href="https://github.com/jakovnoskov/" target="_blank">github.com/jakovnoskov</a> 🌎 <br />
          🍕 <span>React Pizza {new Date().getFullYear()}</span>
        </h1>
      </div>
    </footer>
  )
}