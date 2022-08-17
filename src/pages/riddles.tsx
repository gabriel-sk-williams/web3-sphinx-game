import React, { 
    useState, 
  } from 'react'
  import { 
    Input, 
    Stack, 
    HStack, 
    VStack,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    CircularProgress,
   } from '@chakra-ui/react'
  import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useContract,
    useSigner,
    useContractRead,
   } from 'wagmi';
  import { Heading, Flex, Text } from '@chakra-ui/layout'
  import { IoIosArrowDropleftCircle, IoMdCheckmarkCircle } from "react-icons/io";
  import type { NextPage } from 'next';
  import { ethers } from 'ethers';
  import sphinx from '../abi/sphinx.json';
  import { useRouter } from "next/router";
  import styles from '../styles/Home.module.css';
  
  const Riddles: NextPage = () => {
  
    //Router
    const router = useRouter()
  
    //State
    const [firstAnswer, setFirstAnswer] = useState('');
    const [secondAnswer, setSecondAnswer] = useState('');
    const [thirdAnswer, setThirdAnswer] = useState('');
    const [inputError, setInputError] = useState(false);
  
    const SphinxInterface = new ethers.utils.Interface(sphinx.abi);
  
    const { data: signData } = useSigner();
  
    const sphinxContract = useContract({
      addressOrName: '0x6a9735c754290b284234C941A15A8CeBeF733248', // replace with new addr
      contractInterface: SphinxInterface,
      signerOrProvider: signData,
    })

    const { config, error } = usePrepareContractWrite({
      addressOrName: '0x6a9735c754290b284234C941A15A8CeBeF733248',
      contractInterface: SphinxInterface,
      functionName: 'entry',
      args: [firstAnswer.trim().toLowerCase() + "dp1xYnb", secondAnswer.trim().toLowerCase() + "dp1xYnb", thirdAnswer.trim().toLowerCase() + "dp1xYnb"],
        overrides: { 
          value: ethers.utils.parseEther("0.01") 
        }
    })

    const { data: writeData, error: writeError, write } = useContractWrite(config);

    const { data: waitData, isLoading: waitLoading } = useWaitForTransaction({
      hash: writeData?.hash,
      onSuccess(data) {
        console.log('Success', data)
      },
    })

    const { data: readData, isLoading: readLoading } = useContractRead(
      {
        addressOrName: '0x6a9735c754290b284234C941A15A8CeBeF733248', // replace with new addr
        contractInterface: SphinxInterface,
        functionName: 'numEntries',
        cacheOnBlock: true,
      })
    
      
    const { data: winData } = useContractRead(
      {
        addressOrName: '0x6a9735c754290b284234C941A15A8CeBeF733248', // replace with new addr
        contractInterface: SphinxInterface,
        functionName: 'winner',
        cacheOnBlock: true,
      })

    async function handleSubmit() {
      if (firstAnswer.length == 0 || secondAnswer.length == 0 || thirdAnswer.length == 0) {
        setInputError(true);
      }
      else {
        setInputError(false);

        await write?.() // write
      }
    }
  
    if (waitLoading) {
      return (
        <div className={styles.container}>
          <main className={styles.main}>
            <Flex
            width="100%"
            height="90%"
            direction="column"
            alignItems="center"
            padding="2rem"
            >
              <div className={styles.buttonfont}>
                <Text fontSize={30} paddingBottom={5}> 
                 verifying your answers on-chain
                </Text>
              </div>
  
              <CircularProgress isIndeterminate color='purple.300' />
  
              <div className={styles.buttonfont}>
                <Text fontSize={30} paddingBottom={5} paddingTop={5}> 
                  dont leave this screen
                </Text>
              </div>
  
              <div className={styles.buttonfont}>
                <Text fontSize={18} paddingBottom={5}> 
                  this may take a few minutes
                </Text>
              </div>
          </Flex>
        </main>
      </div>
      )
    }
  
    if (waitData) {
      // console.log("waitData:", waitData)
      //@ts-ignore
      if (waitData?.logs[0].data.includes("4c6f7373")) { // Loss: 4c6f7373
        router.push({pathname: "/losescreen", query: {numEntries: parseInt(readData?._hex)} });
      }
      //@ts-ignore
      if (waitData?.logs[0].data.includes("57696e")) { // Win: 57696e
        router.push("/winscreen");
      }
    }
  
    if (winData) console.log("winData:", winData);
  
    return (
      
      <Flex
        height="90%"
        direction="column"
        alignItems="center"
        padding="2rem"
        gap="2rem"
      >
          { readLoading ? 
            <Heading as='h4' size='md'>
                loading prize data
            </Heading>
              :
            <Stack alignItems="center" >
              <div className={styles.buttonfont}>
                <Text fontSize={30} paddingBottom={5}> 
                {((parseInt(readData?._hex) * 0.01 * 0.69)).toFixed(3) } 
                ETH has been won by bgavran.eth! <br/>
                Round two complete. <br/>
                Answers:
                {/*{((parseInt(readData?._hex) * 0.01 * 0.69)).toFixed(3) } ETH to be won!*/}
                </Text>
              </div>
            </Stack>     
          }
        <div className={styles.game}>
        <Flex
          // width="50%"
          height="100%"
          direction="column"
          justifyContent="space-between"
          gap="3rem"
        >
              <Flex direction="column" >
                <Text> i am a series,  </Text>
                <Text> a collection of keys </Text>
                <Text> grouped together, </Text>
                <Text paddingBottom={3}>  scattering the map </Text>
                <Input 
                  value={firstAnswer}
                  onChange={(e) => setFirstAnswer(e.target.value)}
                  placeholder='archipelago' 
                  size='md' 
                  isRequired={true} 
                  variant='flushed'
                />
              </Flex>
              
              <Flex direction="column" >
                <Text> i am an inventory </Text>
                <Text> of all that is said </Text>
                <Text> a language, a list </Text>
                <Text paddingBottom={3}> branching thy knowledge</Text>
                <Input 
                  value={secondAnswer}
                  onChange={(e) => setSecondAnswer(e.target.value)}
                  placeholder='lexicon' 
                  size='md' 
                  isRequired={true}
                  variant='flushed'
                />
                </Flex>
              
              <Flex direction="column" >
                <Text> i am the corpus, </Text>
                <Text> a catalog, the context </Text>
                <Text> by which work </Text> 
                <Text paddingBottom={3}> is judged </Text>
                <Input 
                  value={thirdAnswer}
                  onChange={(e) => setThirdAnswer(e.target.value)}
                  placeholder='oeuvre' 
                  size='md' 
                  isRequired={true}
                  variant='flushed'
                />
              </Flex>

              <VStack>
                <HStack>
                <div className={styles.buttonfont}>
                  <Button
                      backgroundColor="#E3242B"
                      leftIcon={<IoIosArrowDropleftCircle />}
                      _hover={{bg: '#121212'}}
                      _active={{bg: '#121212'}}
                      onClick={() => {router.push("/");}}
                  >
                      BACK
                    </Button>
                  </div>
                  <div className={styles.buttonfont}>
                    {/*<Button
                      backgroundColor="#4bd166"
                      rightIcon={<IoMdCheckmarkCircle />}
                      _hover={{bg: '#121212'}}
                      _active={{bg: '#121212'}}
                      onClick={handleSubmit}
                    >
                        SUBMIT
                    </Button>*/}
                  </div>
                </HStack>
  
                { inputError ? 
                  <Stack>
                    <Alert colorScheme={"#8b0000"} status="error">
                      <AlertIcon />
                      <Box flex='1'>
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription display='block'>
                          One or more answers is missing
                        </AlertDescription>
                      </Box>
                    </Alert>
                  </Stack>
                  :
                  <Stack></Stack>
                }
  
                { writeError ? 
                  <Stack>
                    <Alert colorScheme={"#8b0000"} status="error">
                      <AlertIcon />
                      <Box flex='1'>
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription display='block'>
                          {writeError.message}
                        </AlertDescription>
                      </Box>
                    </Alert>
                  </Stack>
                  :
                  <Stack></Stack>
                }
  
              </VStack>
          </Flex>
          </div>
      </Flex>
    )
  }
  
  export default Riddles