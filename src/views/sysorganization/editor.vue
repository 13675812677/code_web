<template>
	<el-dialog :title="title" :visible.sync="visible">
		<el-form v-if="visible == true" ref="saveForm" :model="entity" status-icon label-width="160px">
	        <el-form-item :label="$t('common.code')">
	          	<el-input v-if="!''" v-model.trim="entity.code"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('common.name')">
	          	<el-input v-if="!''" v-model.trim="entity.name"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('organization.networkOrgName')">
	          	<el-input v-if="!''" v-model.trim="entity.networkOrgName"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('organization.sdkUrl')">
	          	<el-input v-if="!''" v-model.trim="entity.sdkUrl"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('organization.sdkAppId')">
	          	<el-input v-if="!''" v-model.trim="entity.sdkAppId"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('organization.sdkAppSecret')">
	          	<el-input v-if="!''" v-model.trim="entity.sdkAppSecret"></el-input>
	        </el-form-item>
	        <el-form-item :label="$t('organization.active')">
	            <template>
	              <el-switch
	                v-model="entity.active"
	                :active-value="1"
	                :inactive-value="0"
	                active-color="#13ce66"
	                inactive-color="#ff4949">
	              </el-switch>
	            </template>
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
		name: 'OrganizationEditor',
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
					this.title = this.$t('organization.edit')
				}else{
					this.mode = 'NEW'
					this.title = this.$t('organization.addnew')
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