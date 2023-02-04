import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import type { UseFormReturnType } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons";
import React from "react";
import type { RouterInputs } from "../utils/api";

type PropsedDatesInputProps = {
    form: UseFormReturnType<RouterInputs["event"]["create"]>;
};

const ProposedDatesInput: React.FC<PropsedDatesInputProps> = ({ form }) => {

    const addNewDate = () => {
        form.insertListItem('proposedDates', { date: new Date(), time: new Date() })
    }

    const removeDate = (index: number) => {
        form.removeListItem('proposedDates', index)
    }

    return (
        <div>
            <Text size="sm">Proposed Dates</Text>
            <Text size="xs" color="gray.6">
                Which dates are OK for you?
            </Text>
            <Stack my="xs">
                {form.values.proposedDates.map((item, i) => {
                    return (
                        <Group align="center" key={i} my='lg'>
                            <DatePicker placeholder="Today" label="Date" required {...form.getInputProps(`proposedDates.${i}.date`)} />
                            <TimeInput required label="Time" {...form.getInputProps(`proposedDates.${i}.time`)} />
                            <Group>
                            {form.values.proposedDates.length > 2 && (
                                <ActionIcon
                                    onClick={() => removeDate(i)}
                                    top={12}
                                    variant="outline"
                                    color="red"
                                >
                                    <IconTrash size={16} />
                                </ActionIcon>
                            )}
                            {i === form.values.proposedDates.length - 1 && (
                                <ActionIcon
                                    onClick={addNewDate}
                                    top={12}
                                    variant="filled"
                                    color="blue"
                                >
                                    <IconPlus size={16} />
                                </ActionIcon>
                            )}
                            </Group>
                        </Group>
                    );
                })}
            </Stack>
        </div>
    );
};

export default ProposedDatesInput;
