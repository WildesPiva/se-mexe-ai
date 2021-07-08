import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { ChalengesProvider } from '../contexts/ChallengesContext'
import { Profile } from '../components/Profile'
import { NavBar } from '../components/NavBar'
import { validateLogin } from '../hooks/useAuth'

import styles from '../styles/Pages/Ranking.module.css'

// No caso com um unico user no ranking
interface RankingProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  username: string,
  theme: string
}

function Ranking(props: RankingProps) {

  return (
    <ChalengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Ranking | Se mexe ai</title>
        </Head>

        <NavBar />

        <section>
          <h1>Leaderboard</h1>
          <div>
            <table>
              <thead>
                <tr>
                  <td>Posição</td>
                  <td>Usuário</td>
                  <td>Desafios</td>
                  <td>Experiência</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><Profile /></td>
                  <td><b>{props.challengesCompleted}</b> completados</td>
                  <td><b>{props.currentExperience}</b> XP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </ChalengesProvider>
  )

}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { level, currentExperience, challengesCompleted, username, theme } = context.req.cookies;

  validateLogin(context)

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      username: username ? String(username) : '',
      theme: theme ? String(theme) : 'lightTheme'
    }
  }
}

export default Ranking