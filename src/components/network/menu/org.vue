<template>
	<div class="contextmenu">
		<ul>
			<li><a href="javascript:void(0);" @click="edit">Edit</a></li>
			<li><a href="javascript:void(0);" @click="remove">Delete</a></li>
			<li><a href="javascript:void(0);" @click="clone">Clone</a></li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'OrgContextMenu',
		data(){
			return {}
		},
		methods:{
			edit(){
				this.$emit('edit');
			},
			remove(){
				this.$emit('remove');
			},
			clone(){
				this.$emit('clone');
			}
		}
	}
</script>
<style scoped>
	.contextmenu {
		position: absolute;
		z-index: 1400;
	}
	.contextmenu ul {
		padding: 4px 0px;
		margin: 0px;
		list-style: none;
		border: solid 1px #c7c7c7;
		min-width: 160px;
		background-color: #efefef;
		border-radius: 4px;
		box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.3);
	}
	.contextmenu ul li{
		padding: 5px 15px;
		cursor: pointer;
	}
	.contextmenu ul li:hover,
	.contextmenu ul li:hover a{
		background-color: #0074D9;
		color: #FFF;
	}
	.contextmenu ul li a{
		text-decoration: none;
		color: #777;
	}
</style>