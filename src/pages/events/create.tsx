import {
    Stack,
    TextInput,
    Title,
    Select,
    Button,
    Switch,
    Notification,
    Alert,
    Box,
    LoadingOverlay,
} from "@mantine/core";
import type { FormErrors } from '@mantine/form';
import { useForm } from '@mantine/form'
import { IconAlertCircle, IconMail } from "@tabler/icons";
import Head from "next/head";
import React from "react";
import { z } from "zod";
import EventRichTextEditor from "../../components/EventRichTextEditor";
import ProposedDatesInput from "../../components/ProposedDatesInput";
import type { RouterInputs } from "../../utils/api";
import { api } from "../../utils/api";
import { createEventInputSchema } from "../../utils/schemas";


const CreateEvent = () => {
    const mutation = api.event.create.useMutation()
    const form = useForm<RouterInputs['event']['create']>({
        initialValues: {
            title: '',
            description: '',
            email: '',
            durationMinutes: '30',
            proposedDates: [{ date: new Date(), time: new Date() }, { date: new Date(), time: new Date() }],
            allowNewDates: false
        },
        validate(values) {
            const parsed = createEventInputSchema.safeParse(values)
            if (parsed.success) {
                return {}
            } else {
                const errors = parsed.error.flatten().fieldErrors
                const parsedErrors: FormErrors = {}
                Object.entries(errors).map((key) => {
                    parsedErrors[key[0]] = key[1].join(',')
                })
                return parsedErrors
            }
        },
    })

    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault()
        console.log('wtf')
        form.onSubmit((values, event) => {
            console.log('here')
            mutation.mutate(values)
        }, errors => {
            console.log(errors)
        })
    }

    return (
        <>
            <Head>
                <title>Create new event - Eventi</title>
            </Head>

            <Box component="form" pos='relative' onSubmit={form.onSubmit((values) => {
                mutation.mutate(values)
            })}>
                <LoadingOverlay visible={mutation.isLoading} overlayBlur={2} />
                <Stack>
                    <Title>Create a new event</Title>
                    {mutation.isError && <Alert icon={<IconAlertCircle size={16} />} title="Oh no!" color="red" variant="filled">
                        {mutation.error?.message}
                    </Alert>}
                    <TextInput
                        name="title"
                        label="Title"
                        description="Give a title to your event"
                        required
                        {...form.getInputProps('title')}
                    />
                    <EventRichTextEditor setValue={(newValue: string) => form.setFieldValue('description', newValue)} {...form.getInputProps('description')} />
                    <TextInput
                        name='email'
                        type="email"
                        label="Email"
                        description="Don't worry, we won't show your email. This is just for you to update/cancel the event."
                        icon={<IconMail />}
                        placeholder='john.doe@mail.com'
                        required
                        {...form.getInputProps('email')}
                    />
                    <Select
                        name='durationMinutes'
                        label='Event Duration'
                        description='How long is this event of yours?'
                        data={new Array(12).fill('').map((_, i) => ({
                            value: String((i + 1) * 15),
                            label: String((i + 1) * 15),
                        }))}
                        defaultValue='30'
                        {...form.getInputProps('durationMinutes')}
                    />
                    <ProposedDatesInput form={form} />
                    <Switch label='Allow people to suggest new dates' {...form.getInputProps('allowNewDates')} />
                    <Button type='submit'>Create Event Poll</Button>
                </Stack>
            </Box>
        </>
    );
};

export default CreateEvent;
