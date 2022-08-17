import { Button, Link, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { TwitterShareButton } from 'react-twitter-embed';

const Win: NextPage = () => {

  return (
    <div className={styles.container}>
      <main className={styles.main}>
            <VStack
              gap="1rem"
            >

                <h2 className={styles.title}>
                    Wow, you won!
                </h2>

                <Link href='/'>
                    <Button
                    backgroundColor="#BB86FC"
                    _hover={{
                        bg: '#121212'
                    }}
                    _active={{
                        bg: '#121212'
                    }}
                    >
                    Go Home
                    </Button>
                </Link>

                <TwitterShareButton
                    url={'https://sphinxgame.wtf'}
                    options={{ 
                        text: 'gigabrain chad alert. i just beat the sphinx!', 
                        via: 'wordcellabs',
                        size: "large"
                    }}
                />

            </VStack>
      </main>
    </div>
  )
}

export default Win