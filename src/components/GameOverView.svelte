<script>
    import { formatDollars } from 'davjhan-core/src/utils/strings'
    import { fly } from 'svelte/transition'
    import CheckoutOtherProjects from './CheckoutOtherProjects.svelte'

    export let score
    let cl
    export { cl as class }
    const github = 'https://github.com/davjhan/paper-trader-game'
</script>
<svelte:head>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
</svelte:head>
<div class="flex flex-col text-center  {cl} outline p-4" in:fly={{y:16}}>
    <h2 class='mb-4 '>Game Over</h2>
    <h2 class='text-4xl font-semibold rounded bg-gray-100 py-2 px-4 '>${formatDollars(score)}</h2>
    <button class='reg mt-4 ' on:click={()=>location.reload()}>New Game</button>
    <CheckoutOtherProjects class='mt-8 '/>
    <div class="inline-flex items-start self-center mt-4 self-end ">
        <a href={github} class='ml-1 mr-2 underline text-gray-dark text-sm'>Source Code (Github)</a>
        <!-- Place this tag where you want the button to render. -->
        <!-- Place this tag where you want the button to render. -->
        <a class="github-button" href={github}  data-show-count="true"
           aria-label="Star davjhan/guess-the-year-game on GitHub">Star</a>
    </div>
</div>