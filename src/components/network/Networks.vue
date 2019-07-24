<template>
	<div>
		<section class="content-header">
	      <h1>
	        {{$t('network')}}
	      </h1>
	      <ol class="breadcrumb">
	        <li><a href="#"><i class="fa fa-dashboard"></i> {{$t('home')}}</a></li>
	        <li class="active">{{$t('network')}}</li>
	      </ol>
	    </section>
		<section class="content">
			<div class="row">
				<div class="col-md-3">
					<a href="#" class="btn btn-primary btn-block margin-bottom" @click="openNetworkEditor">{{$t('networks.new')}}</a>
					<div class="box box-solid">
			            <div class="box-header with-border">
			              	<h3 class="box-title">{{$t('filter')}}</h3>

			              	<div class="box-tools">
			                	<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
			                	</button>
			              	</div>
			            </div>
			            <div class="box-body std-padding" style="">
			            	<div class="row">
								<div class="col-md-12 std-margin-bottom">
									<input type="text" class="form-control" v-bind:placeholder="$t('networks.name')">
								</div>
								<div class="col-md-12 std-margin-bottom">
									<input type="text" class="form-control" placeholder="Network Name">
								</div>
								<div class="col-md-12 std-margin-bottom">
									<input type="text" class="form-control" placeholder="Network Name">
								</div>
								<div class="col-md-12">
									<div class="row">
										<div class="col-md-6">
											<button type="button" class="btn btn-default btn-md full-width"><i class="fa fa-eraser"></i> {{$t('reset')}}</button>
										</div>
										<div class="col-md-6">
											<button type="button" class="btn btn-primary btn-md full-width"><i class="fa fa-search"></i> {{$t('search')}}</button>
										</div>
									</div>
								</div>
							</div>
			            </div>
			        </div>
				</div>
				<div class="col-md-9">
					<div class="box box-primary">
						<div class="box-header with-order">
							<h3 class="box-title">{{$t('networks.list')}}</h3>
						</div>
						<div class="box-body no-padding">
							<div class="mailbox-controls">
				                <!-- Check all button -->
				                <button type="button" class="btn btn-default btn-sm checkbox-toggle"><i class="fa fa-square-o"></i>
				                </button>
				                <div class="btn-group">
				                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash-o"></i></button>
				                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-reply"></i></button>
				                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-share"></i></button>
				                </div>
				                <!-- /.btn-group -->
				                <button type="button" class="btn btn-default btn-sm"><i class="fa fa-refresh"></i></button>
				                <div class="pull-right">
				                    1-50/200
				                    <div class="btn-group">
				                      <button type="button" class="btn btn-default btn-sm"><i class="fa fa-chevron-left"></i></button>
				                      <button type="button" class="btn btn-default btn-sm"><i class="fa fa-chevron-right"></i></button>
				                    </div>
				                    <!-- /.btn-group -->
				                </div>
				                <!-- /.pull-right -->
				            </div>
				            <div class="table-responsive mailbox-messages">
								<div class="stdtbl striped network">
									<div class="thead">
										<div class="tr">
											<div class="td">网络名称</div>
											<div class="td">版本</div>
											<div class="td">状态</div>
											<div class="td">创建时间</div>
											<div class="td">操作</div>
										</div>
									</div>
									<div class="tbody">
										<div class="tr">
											<div class="td name">网络001</div>
											<div class="td version"><label class="caption">版本</label> 1.0.0</div>
											<div class="td status"><label class="caption">状态</label> 设计中</div>
											<div class="td created-at"><label class="caption">创建时间</label> 2018年12月20日</div>
											<div class="td tools">
												<button type="button" class="btn btn-sm btn-info" title="编辑"><i class="fa fa-edit"></i></button>
												<button type="button" class="btn btn-sm btn-danger" title="删除"><i class="fa fa-trash"></i></button>
												<button type="button" class="btn btn-sm btn-default" title="监控"><i class="fa fa-eye"></i></button>
												<button type="button" class="btn btn-sm btn-success" title="部署"><i class="fa fa-share-alt"></i></button>
											</div>
										</div>
										<div class="tr">
											<div class="td name">网络002</div>
											<div class="td version"><label class="caption">版本</label> 1.0.0</div>
											<div class="td status"><label class="caption">状态</label> 运行中</div>
											<div class="td created-at"><label class="caption">创建时间</label> 2018年12月20日</div>
											<div class="td tools">
												<button type="button" class="btn btn-sm btn-info" title="编辑"><i class="fa fa-edit"></i></button>
												<button type="button" class="btn btn-sm btn-danger" title="删除"><i class="fa fa-trash"></i></button>
												<button type="button" class="btn btn-sm btn-default" title="监控"><i class="fa fa-eye"></i></button>
												<button type="button" class="btn btn-sm btn-success" title="部署"><i class="fa fa-share-alt"></i></button>
											</div>
										</div>
										<div class="tr">
											<div class="td name">网络009</div>
											<div class="td version"><label class="caption">版本</label> 1.1.0</div>
											<div class="td status"><label class="caption">状态</label> 已发布</div>
											<div class="td created-at"><label class="caption">创建时间</label> 2018年12月20日</div>
											<div class="td tools">
												<button type="button" class="btn btn-sm btn-info" title="编辑"><i class="fa fa-edit"></i></button>
												<button type="button" class="btn btn-sm btn-danger" title="删除"><i class="fa fa-trash"></i></button>
												<button type="button" class="btn btn-sm btn-default" title="监控"><i class="fa fa-eye"></i></button>
												<button type="button" class="btn btn-sm btn-success" title="部署"><i class="fa fa-share-alt"></i></button>
											</div>
										</div>
										<div class="tr">
											<div class="td name">网络007</div>
											<div class="td version"><label class="caption">版本</label> 1.1.0</div>
											<div class="td status"><label class="caption">状态</label> 已发布</div>
											<div class="td created-at"><label class="caption">创建时间</label> 2018年12月20日</div>
											<div class="td tools">
												<button type="button" class="btn btn-sm btn-info" title="编辑"><i class="fa fa-edit"></i></button>
												<button type="button" class="btn btn-sm btn-danger" title="删除"><i class="fa fa-trash"></i></button>
												<button type="button" class="btn btn-sm btn-default" title="监控"><i class="fa fa-eye"></i></button>
												<button type="button" class="btn btn-sm btn-success" title="部署"><i class="fa fa-share-alt"></i></button>
											</div>
										</div>
										<div class="tr">
											<div class="td name">网络005</div>
											<div class="td version"><label class="caption">版本</label> 1.1.0</div>
											<div class="td status"><label class="caption">状态</label> 已发布</div>
											<div class="td created-at"><label class="caption">创建时间</label> 2018年12月20日</div>
											<div class="td tools">
												<button type="button" class="btn btn-sm btn-info" title="编辑"><i class="fa fa-edit"></i></button>
												<button type="button" class="btn btn-sm btn-danger" title="删除"><i class="fa fa-trash"></i></button>
												<button type="button" class="btn btn-sm btn-default" title="监控"><i class="fa fa-eye"></i></button>
												<button type="button" class="btn btn-sm btn-success" title="部署"><i class="fa fa-share-alt"></i></button>
											</div>
										</div>
										<div class="tr">
											<div class="td name">网络004</div>
											<div class="td version"><label class="caption">版本</label> 1.1.0</div>
											<div class="td status"><label class="caption">状态</label> 已发布</div>
											<div class="td created-at"><label class="caption">创建时间</label> 2018年12月20日</div>
											<div class="td tools">
												<button type="button" class="btn btn-sm btn-info" title="编辑"><i class="fa fa-edit"></i></button>
												<button type="button" class="btn btn-sm btn-danger" title="删除"><i class="fa fa-trash"></i></button>
												<button type="button" class="btn btn-sm btn-default" title="监控"><i class="fa fa-eye"></i></button>
												<button type="button" class="btn btn-sm btn-success" title="部署"><i class="fa fa-share-alt"></i></button>
											</div>
										</div>
										<div class="tr">
											<div class="td name">网络003</div>
											<div class="td version"><label class="caption">版本</label> 1.1.0</div>
											<div class="td status"><label class="caption">状态</label> 已发布</div>
											<div class="td created-at"><label class="caption">创建时间</label> 2018年12月20日</div>
											<div class="td tools">
												<button type="button" class="btn btn-sm btn-info" title="编辑"><i class="fa fa-edit"></i></button>
												<button type="button" class="btn btn-sm btn-danger" title="删除"><i class="fa fa-trash"></i></button>
												<button type="button" class="btn btn-sm btn-default" title="监控"><i class="fa fa-eye"></i></button>
												<button type="button" class="btn btn-sm btn-success" title="部署"><i class="fa fa-share-alt"></i></button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- Newwork Editor here -->
		<NetworkDesigner v-if="showNetworkEditor" @close="closeNetworkEditor"></NetworkDesigner>
	</div>
</template>

<script>
	import NetworkDesigner from '@/components/network/NetworkDesigner'

	export default {
		name: 'Networks',
		data(){
			return {
				networkList : [],
				showNetworkEditor:false
			}
		},
		methods:{
			closeNetworkEditor: function(){
				this.showNetworkEditor = false;
			},
			openNetworkEditor: function(){
				this.showNetworkEditor = true;
			}
		},
		components: {
			NetworkDesigner
		}
	}
</script>