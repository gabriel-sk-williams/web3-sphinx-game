/* eslint-disable react/no-unescaped-entities */
import { Button, Link, Image, Text, Flex, HStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Sphinx Game</title>
        <meta name="description" content="sphinx game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <Flex
          width="100%"
          height="100%"
          direction="column"
          alignItems="center"
          gap="2rem"
          padding="2rem"
        >

          <div className={styles.buttonfont}>
            <Text fontSize={25} paddingBottom={5}>round two: complete</Text>
          </div>

            <Image src='/Logo.png' alt='Sphinx Logo' width={'30%'} height={'30%'} />
            <HStack gap={"1rem"}>

          {<Link href='/riddles'>
            <Button
              backgroundColor="#92DFF3"
              _hover={{ bg: '#121212' }}
              _active={{ bg: '#121212' }}
            >
              RIDDLES
            </Button>
            </Link>}

          </HStack>

        </Flex>
      </main>
    </div>
  )
}

export default Home
