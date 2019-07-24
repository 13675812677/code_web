<template>
	<el-dialog :title="title" :visible.sync="visible">
		<el-form v-if="visible == true" ref="saveForm" :model="entity" status-icon label-width="120px">
	        <el-form-item :label="$t('common.name')">
	          	<el-input v-if="!''" v-model.trim="entity.name"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('common.alias')">
	          	<el-input v-if="!''" v-model.trim="entity.alias"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('cfgentity.chaincode')">
				<el-select v-model="entity.chaincode" placeholder="请选择">
				    <el-option
				      	v-for="item in chaincodeOptions"
				      	:key="item.id"
				      	:label="item.name"
				      	:value="item">
				    </el-option>
				</el-select>
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
		name: 'CFGEntityEditor',
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
			getJson('api/config/chaincode', {}, response => {
				this.chaincodeOptions = response.retObject
			})
		},
		methods:{
			open(entity){
				this.visible = true
				this.entity = entity
				if(this.entity.name){
					this.mode = 'EDIT'
					this.title = this.$t('cfgentity.edit')
				}else{
					this.mode = 'NEW'
					this.title = this.$t('cfgentity.addnew')
				}
			},
			getMode(){
				return this.mode
			},
			getEntity(){
				alert(JSON.stringify(this.entity))
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