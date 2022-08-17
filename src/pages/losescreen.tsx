import { Button, Link, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { TwitterShareButton } from 'react-twitter-embed';
import { useRouter } from "next/router";


const Loss: NextPage = () => {

  const router = useRouter();
  const { numEntries } = router.query

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        
            <VStack
              gap="1rem"
            >

                <h2 className={styles.title}>
                    Ha, you lost!
                </h2>
                <Link href='/riddles'>
                    <Button
                    backgroundColor="#BB86FC"
                    _hover={{
                        bg: '#121212'
                    }}
                    _active={{
                        bg: '#121212'
                    }}
                    >
                    Try Again, Pleb
                    </Button>
                </Link>

                <TwitterShareButton
                    url={'https://sphinxgame.wtf'}
                    options={{ 
                        text: `just spent 0.1 ETH to be reminded im dumb. try yourself to win ${(parseInt(numEntries as string) * 0.01 * 0.69).toFixed(2) + 0.33} ETH at:`, 
                        via: 'wordcellabs',
                        size: "large"
                    }}
                />

            </VStack>
      </main>
    </div>
  )
}

export default Loss
