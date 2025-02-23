import React, {useState} from 'react';
import {Box, Button, Checkbox, FormControl, FormLabel, Input, useToast} from '@chakra-ui/react';
import SidebarWithHeader from "@/components/shared/SideBar.jsx";
import Editor from '@/components/shared/editor/Editor.jsx';
import {sendEmail} from '@/services/emailService';

export default function MailMarketing() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [sendToAll, setSendToAll] = useState(false);
    const [scheduleEmail, setScheduleEmail] = useState(false);
    const [sendTime, setSendTime] = useState('');
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailData = {
            title,
            content,
            recipientEmail: sendToAll ? null : recipientEmail,
            sendToAll,
            scheduleEmail,
            sendTime: scheduleEmail ? sendTime : null,
        };

        try {
            await sendEmail(emailData);
            toast({
                title: "Email enviado.",
                description: "O email foi enviado com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Erro ao enviar email.",
                description: "Ocorreu um erro ao enviar o email.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <h1>Enviar email</h1>
            <form onSubmit={handleSubmit}>
                <FormControl id="title" mb={4}>
                    <FormLabel>Título</FormLabel>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl id="recipientEmail" mb={4}>
                    <FormLabel>Email do Destinatário</FormLabel>
                    <Input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        disabled={sendToAll}
                    />
                </FormControl>
                <FormControl id="sendToAll" mb={4}>
                    <Checkbox
                        isChecked={sendToAll}
                        onChange={(e) => setSendToAll(e.target.checked)}
                    >
                        Enviar para todos os clientes
                    </Checkbox>
                </FormControl>
                <FormControl id="scheduleEmail" mb={4}>
                    <Checkbox
                        isChecked={scheduleEmail}
                        onChange={(e) => setScheduleEmail(e.target.checked)}
                    >
                        Agendar Email
                    </Checkbox>
                </FormControl>
                {scheduleEmail && (
                    <FormControl id="sendTime" mb={4}>
                        <FormLabel>Hora de Envio</FormLabel>
                        <Input
                            type="datetime-local"
                            value={sendTime}
                            onChange={(e) => setSendTime(e.target.value)}
                            required
                        />
                    </FormControl>
                )}
                <Box pb={4} mb={4} minH={"220px"} w={"90vw"} maxW={"900px"} borderWidth={"1px"}
                     className="editor-container">
                    <Box p={4}>
                        <Editor content={content} setContent={setContent}/>
                    </Box>
                </Box>
                <Button type="submit" colorScheme="teal" width="full">Enviar Email</Button>
            </form>
        </>
    );
}