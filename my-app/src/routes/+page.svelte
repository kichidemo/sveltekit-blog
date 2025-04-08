<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

<!-- <script>
    let name = "私";
</script>

<h1>Hello, {name}!</h1>
<p>SvelteKit始めました！</p> -->

<!-- <script>
    let count = 0;
    
    function increment() {
        count += 1;
    }
</script>

<h2>カウント： {count}</h2>
<button on:click={increment}>増やす</button> -->

<!-- <script>
    let items = ["りんご", "みかん", "バナナ"];
</script>

<ul>
    {#each items as item}
        <li>{item}</li>
    {/each}
</ul> -->

<!-- <script>
    let name = "";
</script>

<h1>こんにちは、{name ? name + "さん" : "ゲストさん"}！</h1>

<input
    type = "text"
    bind:value = {name}
    placeholder="名前を入力してください"
/> -->

<!-- <script>
    let task = "";
    let tasks = [];

    function addTask() {
        if (task.trim() === "") return;
        tasks = [...tasks, task];
        task = "";
    }

    function removeTask(index) {
        tasks = tasks.filter((_, i) => i !== index);
    }
</script>

<h1>ToDoリスト</h1>

<input bind:value={task} placeholder="やることを書く" />
<button on:click={addTask}>追加</button>

{#if tasks.length ===0}
    <p>まだタスクがありません</p>
{:else}
    <ul>
        {#each tasks as t, i}
            <li>
                {t}
                <button on:click={() => removeTask(i)} >削除</button>
            </li>
        {/each}
    </ul>
{/if} -->

<p>
    <a href="/about">→AboutページへGo！</a><br>
    <a href="/contact">→問い合わせページへGo！</a><br>
    <a href="/blog">→blogページへGo！</a><br>
    <a href="/settings">→設定ページへGo！</a><br>
</p>

<h2 class="text-xl font-bold mb-4">ラベルのサンプル</h2>

<span class="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 roundede-full shadow-sm">
    NEW
</span>