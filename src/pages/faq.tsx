import type { NextPage } from 'next'

import { Heading, Flex, Text } from '@chakra-ui/layout'
import { 
  Divider, 
  useDisclosure,
  Collapse
 } from '@chakra-ui/react'
// import { IoCaretDownCircleOutline } from "react-icons/io5";

const FAQ: NextPage = () => {

  const { isOpen: q1, onToggle: q1OT } = useDisclosure();
  const { isOpen: q2, onToggle: q2OT } = useDisclosure();
  const { isOpen: q3, onToggle: q3OT } = useDisclosure();
  const { isOpen: q4, onToggle: q4OT } = useDisclosure();
  const { isOpen: q5, onToggle: q5OT } = useDisclosure();
  const { isOpen: q6, onToggle: q6OT } = useDisclosure();

  return (
    <Flex
      width="100%"
      height="90%"
      direction="column"
      alignItems="center"
      padding="2rem"
    >
      <Flex
        width="66%"
        height="100%"
        direction="column"
        justifyContent="space-between"
        gap="2rem"
      >

          <Flex
            direction="column"
              gap="1rem"
          >
                <Heading onClick={q1OT}  as='h3' size='lg' cursor='pointer'>
                  what are the rules?  
                </Heading>

              <Collapse in={q1} animateOpacity>
                <Text>
                  You have unlimited attempts at answering 3 riddles. Each attempt costs 0.01 ETH to submit. 
                  The first person to answer all 3 riddles correctly will win 69% of all proceeds. 
                  All verification is done on chain. The game closes after 72 hours.
                  <br/><br/>
                  This game will close Saturday, August 20th at 12pm noon EST.
                </Text>
            </Collapse>

          </Flex>

          <Divider orientation='horizontal' />

          <Flex
            direction="column"
            gap="1rem"
          >

              <Heading onClick={q2OT} as='h3' size='lg' cursor='pointer'>
                what happens if i win?
              </Heading>

              <Collapse in={q2} animateOpacity>
                <Text>
                  If you guess all 3 riddles correctly before the game is over, the game will automatically close, 
                  and the winner will receive the prize pool within 12 hours.
                </Text>
            </Collapse>

          </Flex>

          <Divider orientation='horizontal' />

          <Flex
            direction="column"
            gap="1rem"
          >
              <Heading onClick={q3OT} as='h3' size='lg' cursor='pointer'>
                what if no one wins?
              </Heading>

              <Collapse in={q3} animateOpacity>
                <Text>
                  Get smarter for the next time.
                </Text>
            </Collapse>
            

          </Flex>

          <Divider orientation='horizontal' />

          <Flex
            direction="column"
            gap="1rem"
          >

              <Heading onClick={q4OT} as='h3' size='lg' cursor='pointer'>
                what steps have you taken to ensure trust?
              </Heading>

              <Collapse in={q4} animateOpacity>
                <Text>
                  We have encrypted the answers using a special formula™️  that one of our gigabrain engineers came up with. 
                  We will also reveal the hashes after the game is over.
                </Text>
              </Collapse>

          </Flex>

          <Divider orientation='horizontal' />

          <Flex
            direction="column"
            gap="1rem"
          >

            <Heading onClick={q5OT} as='h3' size='lg' cursor='pointer'>
              who is behind this project?
            </Heading>

            <Collapse in={q5} animateOpacity>
              <Text>
                Wordcel Labs was founded by some peeps that work in crypto at [redacted]. 
                We’re inspired by crosswords, Jeopardy!, Satoshi’s Treasure, Cicada 3301, and mythology.
              </Text>
            </Collapse>

          </Flex>

          <Divider orientation='horizontal' />

          <Flex
            direction="column"
            gap="1rem"
          >

            <Heading onClick={q6OT} as='h3' size='lg' cursor='pointer'>
              what is the roadmap?
            </Heading>

            <Collapse in={q6} animateOpacity>
              <Text>
              This is an experiment to test the viability of our broader vision. 
              If all goes well, we have ideas to set up recurring games [daily, weekly, monthly]. 
              In the short term, everyone who attempts to solve the riddles will be whitelisted for [redacted], coming soon™️
              </Text>
            </Collapse>

          </Flex>

      </Flex>
    </Flex>
  )
}

export default FAQ
