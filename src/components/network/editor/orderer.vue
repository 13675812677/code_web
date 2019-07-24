<template>
	<div class="prop-editor-wrapper">
		<div class="editor">
			<div class="header">{{$t('networks.ordererPropEditorTitle')}}
				<div class="pull-right close-button" @click="close"><i class="fa fa-times"></i></div>
			</div>
			<div class="body">
				<div class="">
					<label>{{$t('codeName')}}</label>
					<input type="text" class="form-control" placeholder="Ord001" v-model="data.codeName">
				</div>
				<div class="">
					<label>{{$t('businessName')}}</label>
					<input type="text" class="form-control" placeholder="业务名称" v-model="data.businessName">
				</div>
				<div class="">
					<label>{{$t('description')}}</label>
					<textarea class="form-control" rows="5" placeholder="具体描述您所要创建的排序服务节点" v-model="data.description"></textarea>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'OrdererEditor',
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