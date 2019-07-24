//GENERATE_START
<template>
	<el-dialog :title="title" :visible.sync="visible">
		<el-form v-if="visible == true" ref="saveForm" :model="entity" status-icon label-width="120px">
			<el-form-item :label="$t('resourcebox.boxId')">
			   <el-input v-if="!''" v-model.trim="entity.boxId"></el-input>
			</el-form-item>
			<el-form-item :label="$t('resourcebox.boxNo')">
			   <el-input v-if="!''" v-model.trim="entity.boxNo"></el-input>
			</el-form-item>
			<el-form-item :label="$t('resourcebox.boxVolume')">
			   <el-input v-if="!''" v-model.trim="entity.boxVolume"></el-input>
			</el-form-item>
			<el-form-item :label="$t('resourcebox.boxStatus')">
			   <el-input v-if="!''" v-model.trim="entity.boxStatus"></el-input>
			</el-form-item>
		</el-form>
	    <span slot="footer" class="dialog-footer">
	      	<el-button @click="visible = false">{{$t('actions.cancel')}}</el-button>
	      	<el-button type="primary" @click="onOK">{{$t('actions.ok')}}</el-button>
	    </span>
	</el-dialog>
</template>
<script>
	import { getJson }  from '@/utils/restapi'
	export default {
		name: 'ClsTestEditor',
		data() {
			return {
				title : 'Untitled',
				visible: false,
				entity: {},
				mode : null,
				chaincodeOptions: []
			}
		},
		mounted(){
			// Do nothing
		},
		methods:{
			open(entity){
				this.visible = true
				this.entity = entity
				if(this.entity.boxId){
					this.mode = 'EDIT'
					this.title = this.$t('resourcebox.edit')
				}else{
					this.mode = 'NEW'
					this.title = this.$t('resourcebox.addnew')
				}
			},
			getMode(){
				return this.mode
			},
			getEntity(){
				return this.entity
			},
			close(){
				this.visible = false
			},
			onOK(){
				this.$emit("onOK", this.entity)
			}
		}
	}
</script>
//GENERATE_END