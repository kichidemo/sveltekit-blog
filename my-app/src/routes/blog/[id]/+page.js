// // src/routes/blog/[id]/+page.js
// import { error } from '@sveltejs/kit';
// import { posts as initialPosts } from '$lib/posts';

// export function load({ params }) {
//     if (typeof localStorage !== 'undefined') {
//         const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');

//         const allPosts = [...initialPosts, ...savedPosts];
        
//         const post = allPosts.find((p) => String(p.id) === params.id);

//   if (!post) {
//     throw error(404, '記事が見つかりません');
//   }

//   return {
//     post
//   };
// }

// const post = initialPosts.find(p =>p.id ===params.id);

// if(!post) {
//     throw error(404, '記事が見つかりません。');
// }

// return {
//     post
// };
// }


import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data: posts, error} = await supabase
        .from('posts')
        .select('*');

    if (error) {
        console.error(error);
        return { posts: []};
    }

    return { posts };
}