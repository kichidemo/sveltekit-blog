<script>
    import { onMount } from 'svelte';
    // import { posts as initialPosts } from '$lib/posts';
    import { supabase } from '$lib/supabaseClient';

    // const { data, error } = await supabase
    //     .from('posts')
    //     .select('*');

    // console.log(data);

    let posts = [];
    let commentData = {};
    let search = '';
    let selectedTag ='';
    let sortOption = 'date-desc';

    $: filteredPosts = posts.filter(post => {
        const matchesSearch =
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.content.toLowerCase().includes(search.toLowerCase());

        const matchesTag =
            selectedTag === '' || post.tags.includes(selectedTag);

        return matchesSearch && matchesTag;

    }) 
    
    .sort((a, b) => {
        if(sortOption === 'date-desc') {
            return new Date(b.date) - new Date(a.date);
        } else if(sortOption === 'date-asc') {
            return new Date(a.date) - new Date(b.date);
        } else if(sortOption === 'likes-desc') {
            return (commentData[b.id]?.likes ?? 0) - (commentData[a.id]?.likes ?? 0);
        } else if(sortOption === 'likes-asc') {
            return (commentData[a.id]?.likes ?? 0) - (commentData[b.id]?.likes ?? 0);
    }});

    onMount(async () => {
        const {data, error} = await supabase
            .from('posts')
            .select('*');

        if (error) {
            console.error('Supabase error:', error);
            return;
        }

        posts = data;

        posts.forEach((post) => {
            const saved = localStorage.getItem(`comments-${post.id}`);
            if (saved) {
                const comments = JSON.parse(saved);
                const commentCount = comments.length;
                const totalLikes = comments.reduce((sum, comment) => sum + (comment.likes || 0), 0);

                commentData[post.id] = {
                    count: commentCount,
                    likes: totalLikes
                };
            } else {
                commentData[post.id] = {
                    count: 0,
                    likes: 0
                };
            } 
        });
    });
</script>

<div class="mb-4">
    <button on:click={() => selectedTag = ''} class="mr-2 bg-gray-300 px-2 py-1 rounded">
    すべて
    </button>
    <button on:click={() => selectedTag = 'Svelte'} class="mr-2 bg-blue-300 px-2 py-1 rounded">
    svelte
    </button>
    <button on:click={() => selectedTag = ''} class="mr-2 bg-green-300 px-2 py-1 rounded">
    sveltekit
    </button>
</div>


<h1>ブログ一覧 </h1>

<input
    type="text"
    bind:value={search}
    placeholder="検索"
    class="border p-2 mb-4 w-full rounded"
/>

<div class="mb-4">
    <label class="mr-2">並び順</label>
    <select bind:value={sortOption} class="border p-1 rounded">
        <option value="date-desc">新しい順</option>
        <option value="date-asc">古い順</option>
        <option value="likes-desc">いいね順（多い順）</option>
        <option value="likes-asc">いいね順（少ない順）</option>
    </select>
</div>

{#if filteredPosts.length === 0}
    <p class="text-gray-600">該当する記事がありません。</p>
{/if}


<ul>
    {#each filteredPosts as post}
        <li class="mb-6">

            {#if post.image}
                <img src={post.image} ale="アイキャッチ画像" class="w-full h-48 object-cover mb-2 rounded" />
            {/if}

            <a href={`/blog/${post.id}`} class="text-blue-600 hover:underline" sveltekit:prefetch>
                <strong>{post.title}</strong>
            </a>
            <div class="text-sm text-gray-500">
                投稿日：{new Date(post.date).toLocaleDateString('ja-JP')}
            </div>
            <div class="text-sm text-gray-700 mt-1">
                💬 コメント数：{commentData[post.id]?.count ?? 0}件
                ♥ いいね：{commentData[post.id]?.likes ?? 0}件
            </div>
        </li>
        
    {/each}
</ul>
