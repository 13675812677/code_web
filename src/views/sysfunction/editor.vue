<template>
	<el-dialog :title="title" :visible.sync="visible">
		<el-form v-if="visible == true" ref="saveForm" :model="entity" status-icon label-width="80px">
	        <el-form-item :label="$t('common.code')">
	          	<el-input v-if="!''" v-model.trim="entity.code"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('common.name')">
	          	<el-input v-if="!''" v-model.trim="entity.name"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('function.category')">
	          	<el-input v-if="!''" v-model.trim="entity.category"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('common.type')">
	          	<el-select v-model="entity.type" placeholder="请选择">
					<el-option :label="$t('function.type_BACKEND')" value="BACKEND"></el-option>
					<el-option :label="$t('function.type_MENU')" value="MENU"></el-option>
				</el-select>
	        </el-form-item>
			<el-form-item :label="$t('common.description')">
				<el-input
				  	type="textarea"
				  	:autosize="{ minRows: 3, maxRows: 10}"
				  	placeholder="请输入内容"
				  	v-model="entity.description">
				</el-input>
			</el-form-item>
		</el-form>
	    <span slot="footer" class="dialog-footer">
	      	<el-button @click="visible = false">{{$t('actions.cancel')}}</el-button>
	      	<el-button type="primary" @click="onOK">{{$t('actions.ok')}}</el-button>
	    </span>
	</el-dialog>
</template>
<script>
	export default {
		name: 'FunctionEditor',
		data() {
			return {
				title : 'Untitled',
				visible: false,
				entity: {},
				mode : null
			}
		},
		methods:{
			open(entity){
				this.visible = true
				this.entity = entity
				if(this.entity.code){
					this.mode = 'EDIT'
					this.title = this.$t('function.edit')
				}else{
					this.mode = 'NEW'
					this.title = this.$t('function.addnew')
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