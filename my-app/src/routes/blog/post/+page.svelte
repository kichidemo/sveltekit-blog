<script>
    import {goto} from '$app/navigation';
    import { supabase } from '$lib/supabaseClient';
    import { onMount } from 'svelte';

    let user = null;
    let title = '';
    let content = '';
    let date = '';
    let tags = '';
    let image = '';

    onMount(async () => {
        const {data, error} = await supabase.auth.getUser();

        if(error || !data.user) {
            alert('ログインが必要です。');
            goto('/login');
        } else {
            user = data.user;
            console.log('ログイン中のユーザー：', user);
        }
    });

async function submitPost() {
    if (title.trim() === '' || content.trim() === '' || date.trim() === '') {
        alert('タイトル、本文、日付は必須です。');
        return;
    }

    const newPost = {
        id: Date.now().toString(),
        title,
        content,
        date,
        tags: tags.split(',').map(tag => tag.trim()),
        image
    };

    const {data, error } = await supabase
        .from('posts')
        .insert([newPost]);

    if(error) {
        console.error('投稿エラー：', error);
        alert('投稿に失敗しました。');
        return;
    }

    alert('投稿が完了しました。');
    goto('/blog');
}

</script>

<h1>新しい記事を投稿</h1>

<input bind:value={title} placeholder="タイトル" class="border p-2 mb-2 block w-full" />
<textarea bind:value={content} placeholder="本文" class="border p-2 mb-2 block w-full h-40"></textarea>
<input type="date" bind:value={date} class="border p-2 mb-2 block w-full" />
<input bind:value={tags} placeholder="タグ（カンマ区切り）" class="border p-2 mb-2 block w-full" />

<input bind:value={image} placeholder="画像URL（アイキャッチ）" class="border p-2 mb-2 block w-full" />

<button on:click={submitPost} class="bg-blue-500 text-white px-4 py-2 rounded">
    投稿
</button>