<nav class="bg-gray-100 p-4 flex gap-4 shadow-md">
	<a href="/">Home</a>
	<a href="/contact">contact</a>
	<a href="/blog">Blog</a>
	<a href="/settings">Settings</a>
</nav>


<script>
	// import { USERPROFILE } from "$env/static/private";
	import { supabase } from "$lib/supabaseClient";
	import { onMount } from "svelte";

	let user = null;

	onMount(async () => {
		const {data, error} =await supabase.auth.getUser();

		if(data.user) {
			user = data.user;
			console.log('ログイン中のユーザー：', user);
		}
	})
</script>

{#if user}
	<p class="text-sm text-gray-600">
		ログイン中：{user.email}
	</p>
{:else}
	<p class="text-sm text-gray-600">
		ゲスト
	</p>
{/if}

<slot />
