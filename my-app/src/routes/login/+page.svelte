<script>
    import { supabase } from "$lib/supabaseClient";
    import { goto } from "$app/navigation";
	import { preventDefault } from "svelte/legacy";

    let email = '';
    let password = '';
    let isLoginMode = true;

    async function handleAuth() {
        let result;

        if (isLoginMode) {
            result = await supabase.auth.signInWithPassword({
                email,
                password
            });
        } else {
            result = await supabase.auth.signUp({
                email,
                password
            });
        }

    if (result.error) {
        alert('エラー：' + result.error.message);
    } else {
        alert('成功しました！');
        goto('/blog');
    }
}

    async function logout() {
        await supabase.auth.signOut();
        alert('ログアウトしました！');
        goto('/login')
    }
</script>

<h1>{isLoginMode ? 'ログイン' : '新規登録'}</h1>

<input bind:value={email} placeholder="メールアドレス" class="border p-2 mb-2 block w-full" />
<input type='password' bind:value={password} placeholder="パスワード" class="border p-2 mb-2 block w-full" />

<button on:click={handleAuth} class="bg-blue-500 text-white px-4 py-2 rounded">
    {isLoginMode ? 'ログイン' : '新規登録'}
</button>

<p class="mt-4 text-sm">
    {isLoginMode ? 'アカウントをお持ちでない場合' : 'すでにアカウントをお持ちの場合'}
    <a href="#" on:click|preventDefault={() => isLoginMode = !isLoginMode} class="text-blue-600 underline ml-1">
            {isLoginMode ? '新規登録' : 'ログイン'}
    </a>
</p>


<button on:click={logout} class="bg-red-500 text-white px-4 py-2 rounded mt-4">
    ログアウト
</button>

