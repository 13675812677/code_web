//GENERATE_START
<template>
	<el-dialog :title="title" :visible.sync="visible">
		<el-form v-if="visible == true" ref="saveForm" :model="entity" status-icon label-width="120px">
			<el-form-item :label="$t('resourcecar.carId')">
			   <el-input v-if="!''" v-model.trim="entity.carId"></el-input>
			</el-form-item>
			<el-form-item :label="$t('resourcecar.carNo')">
			   <el-input v-if="!''" v-model.trim="entity.carNo"></el-input>
			</el-form-item>
			<el-form-item :label="$t('resourcecar.plateNum')">
			   <el-input v-if="!''" v-model.trim="entity.plateNum"></el-input>
			</el-form-item>
			<el-form-item :label="$t('resourcecar.carType')">
			   <el-input v-if="!''" v-model.trim="entity.carType"></el-input>
			</el-form-item>
			<el-form-item :label="$t('resourcecar.status')">
			   <el-input v-if="!''" v-model.trim="entity.status"></el-input>
			</el-form-item>
			<el-form-item :label="$t('resourcecar.carDesc')">
			   <el-input v-if="!''" v-model.trim="entity.carDesc"></el-input>
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
				if(this.entity.carId){
					this.mode = 'EDIT'
					this.title = this.$t('resourcecar.edit')
				}else{
					this.mode = 'NEW'
					this.title = this.$t('resourcecar.addnew')
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