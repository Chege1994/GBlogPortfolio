<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar class="mb-4 bg-gray-800 " let:hidden let:toggle>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold tracking-wider dark:text-white"
			>G-PORTFOLIO</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi class="tracking-wider text-white" href="/">მთავარი</NavLi>
		<NavLi class="tracking-wider text-white" href="/projects">პროექტები</NavLi>
		<NavLi class="tracking-wider text-white" href="/blog">ფორუმი</NavLi>
	</NavUl>
</Navbar>

<style>
	* {
		color: white;
	}
	/* .l-spacing-3 {
		letter-spacing: 6px;
	} */
</style>
