

<script>
    import {onMount} from 'svelte';
    import { marked } from 'marked';
    export let data;

    let name = '';
    let newComment = '';
    let comments = [];

    let editingIndex = null;
    let editMessage = '';    
    
    onMount(() => {

        const key = `comments-${data?.post?.id}`;
        if(!data?.post?.id) return;

        const saved = localStorage.getItem(key);
        if (saved) {
            comments = JSON.parse(saved);
     }
    });
// ---------------------
// コメントの投稿・削除
// ---------------------

    function addComment() {
        if (name.trim() === '' || newComment.trim() === '') {
            alert('名前とコメントは必須です！');
            return;
        };

        const now = new Date();

        const timestamp = now.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month:'2-digit',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit'
    })
        comments = [...comments, {
            name,
            message: newComment,
            timestamp,
            likes: 0}];

        name = '';
        newComment = '';
        saveComments();
    }

    function removeComment(index) {
        comments = comments.filter((_, i) => i !== index);
        saveComments();
    }

    function saveComments(){
        if (!data?.post?.id) return;
        localStorage.setItem(`comments-${data.post.id}`, JSON.stringify(comments));
    }

// ---------------------
// コメントの編集
// ---------------------

    function startEdit(index) {
        editingIndex = index;
        editMessage = comments[index].message;
    }

    function cancelEdit() {
        editingIndex = null;
        editMessage = '';
    }

    function saveEdit(index) {
        if (editMessage.trim() === '') return;
        comments[index].message = editMessage;
        comments = [...comments];
        editingIndex = null;
        editMessage = '';
        saveComments();
    }

// ---------------------
// いいね機能
// ---------------------

    function likeComment(index) {
        comments[index].likes++;
        comments = [...comments]; 
        saveComments();
    }

</script>

<!-- // --------------------- -->
<!-- // ここからHTML -->
<!-- // --------------------- -->



<h1>{data.post.title}</h1>

{#if data.post.image}
<img src={data.post.image} alt="記事のアイキャッチ" class="w-full h-64 object-cover mb-4 rounded" />
{/if}


<p>{@html marked.parse(data.post.content)}</p>

<p class="text-sm text-gray-500">
    投稿日：{new Date(data.post.date).toLocaleDateString('ja-JP')}
</p>

<hr />

<h2>コメント一覧({comments.length}件)</h2>

{#if comments.length === 0}
    <p>まだコメントはありません。最初のコメントをどうぞ！</p>
{/if}

<ul>
    {#each comments as comment, index}
        <li class="mb-2">

            <strong>{comment.name}</strong>({comment.timestamp})<br>
            {comment.message}<br>

            <p class="text-sm text-gray-600">
                ♥ {comment.likes} 件
                <button on:click={() => likeComment(index)} class="ml-2 text-pink-500 underline">
                いいね
                </button>
            </p>

            {#if editingIndex === index}
                <textarea bind:value={editMessage} class='border p-1 w-full mb-1'></textarea>
                <button on:click={() => saveEdit(index)} class="text-green-600 underline">保存</button>
                <button on:click={() => cancelEdit()} class="text-gray-500 underline ml-2">キャンセル</button>
            {:else}
                <button on:click={() => startEdit(index)} class="text-blue-500 underline">編集</button>
                <button on:click={() => removeComment(index)} class="text-red-500 underline ml-2/">削除</button>
            {/if}
        </li>
    {/each}
</ul>


<h3 class="mt-4">コメント投稿</h3>

<input
    type="text"
    bind:value={name}
    placeholder="名前"
    class="border p-1 mb-2 block"
/>

<textarea
    bind:value={newComment}
    placeholder="コメントを入力"
    class="border p-1 mb-2 block w-full"
    on:keydown={(e) => {
        if(e.ctrlKey && e.key === 'Enter') {
            addComment();
        }
    }}
></textarea>


<button
    on:click={addComment}
    disabled={name.trim() === '' || newComment.trim() === ''}
    class="ml-2 bg-blue-500 text-white px-3 py-1 rounded">
投稿
</button>

