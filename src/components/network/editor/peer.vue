<template>
	<div class="prop-editor-wrapper">
		<div class="editor">
			<div class="header">{{$t('networks.peerPropEditorTitle')}}
				<div class="pull-right close-button" @click="close"><i class="fa fa-times"></i></div>
			</div>
			<div class="body">
				<div class="">
					<label>编码名称</label>
					<input type="text" class="form-control" placeholder="Org001" v-model="data.codeName">
				</div>
				<div class="">
					<label>业务名称</label>
					<input type="text" class="form-control" placeholder="业务名称" v-model="data.businessName">
				</div>
				<div class="">
					<label>描述</label>
					<textarea class="form-control" rows="5" placeholder="具体描述您所要创建的Peer" v-model="data.description"></textarea>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'PeerEditor',
		props:['data'],
		data(){
			return {}
		},
		methods: {
			close: function(){
				this.$emit('close');
			}
		}
	}
</script>
<style scoped>
</style>