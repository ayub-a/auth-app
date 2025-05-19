import type { FC } from "react"
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { LuGlobe, LuSettings, LuMonitorSmartphone } from "react-icons/lu"

import type { ISessionParams } from "../api/sessionApi"
import { useDeleteSession } from "../hoooks/useDeleteSession"


interface ISessionCardProps {
    session: ISessionParams
}


export const SessionCard: FC<ISessionCardProps> = ({ session }) => {
    const { _id, isCurrent, userAgent, createdAt } = session

    const { deleteSession, isPending } = useDeleteSession(_id)

    return (
        <Flex p={3} borderWidth='1px' borderRadius='md' w='100%' bg={ isCurrent ? 'gray.700' : '' }>
            <Box flex={1}>
                <Flex gap='4px' fontWeight='bold' fontSize='md' mb={3}>
                    <Text>
                        { new Date(createdAt).toLocaleString('uz-UZ') }
                    </Text>
                    <Text>
                        { isCurrent && '(Current session)' }
                    </Text>
                </Flex>
                <Flex flexDir='row' gap='6px 14px' flexWrap='wrap'>
                    <Flex alignItems='center' gap='4px'>
                        <LuGlobe size={18}/>
                        <Text color='gray.500'>
                            { userAgent.browser?.name }/{ userAgent.browser?.version }
                        </Text>
                    </Flex>
                    <Flex alignItems='center' gap='4px'>
                        <LuSettings size={18}/>
                        <Text color='gray.500'>
                           { userAgent.os?.name }/{ userAgent.os?.version }
                        </Text>
                    </Flex>
                    <Flex alignItems='center' gap='4px'>
                        <LuMonitorSmartphone size={18}/>
                        <Text color='gray.500'>
                           { userAgent?.device?.model ||  userAgent?.device as string }
                        </Text>
                    </Flex>
                </Flex>
            </Box>
            {
                !isCurrent
                &&
                <Button
                    size='sm'
                    variant='ghost'
                    ml={4}
                    alignSelf='center'
                    fontSize='xl'
                    color='red.400'
                    title="Delete session"
                    onClick={() => deleteSession()}
                    isLoading={isPending}
                >
                    &times;
                </Button>
            }
        </Flex>
    )
}

