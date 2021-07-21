<script>
    import { formatDollars } from 'davjhan-core/src/utils/strings'
    import { fly } from 'svelte/transition'
    import CheckoutOtherProjects from './CheckoutOtherProjects.svelte'

    export let score
    let cl
    export { cl as class }

</script>
<div class="flex flex-col text-center  {cl} outline p-4" in:fly={{y:16}}>
    <h2 class='mb-4 '>Game Over</h2>
    <h2 class='text-4xl font-semibold rounded bg-gray-100 py-2 px-4 '>${formatDollars(score)}</h2>
    <button class='reg mt-4 ' on:click={()=>location.reload()}>New Game</button>
    <CheckoutOtherProjects class='mt-8 '/>
</div>