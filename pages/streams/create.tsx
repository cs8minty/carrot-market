import type { NextPage } from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';

interface CreateForm {
    name: string;
    price: string;
    description: string;
}

interface CreateResponse {
    ok: boolean;
    stream: Stream;
}

const Create: NextPage = () => {
    const router = useRouter();
    const [createStream, { loading, data }] = useMutation(`/api/streams`);
    const { register, handleSubmit } = useForm<CreateForm>();
    const onValid = (form: CreateForm) => {
        if (loading) return;
        createStream(form);
    };
    useEffect(() => {
        if (data && data.ok) {
            router.replace(`/streams/${data.streams.id}`);
        }
    }, [data, router]);
    return (
        <Layout canGoBack title="스트림 생성하기">
            <form
                onSubmit={handleSubmit(onValid)}
                className=" space-y-4 py-10 px-4"
            >
                <Input
                    register={register('name', {
                        required: true,
                    })}
                    required
                    label="제목"
                    name="name"
                    type="text"
                />
                <Input
                    register={register('price', {
                        required: true,
                        valueAsNumber: true,
                    })}
                    required
                    label="금액"
                    name="price"
                    type="text"
                    kind="price"
                />
                <TextArea
                    register={register('description', { required: true })}
                    name="description"
                    label="설명"
                />
                <Button text={loading ? '로딩중...' : '스트림 시작'} />
            </form>
        </Layout>
    );
};

export default Create;
