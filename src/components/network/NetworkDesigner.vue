<template>
	<div class="stddlg network-designer">
		<div class="modal">
			<div class="header">
				<h3 class="">{{$t('networks.designer')}}</h3>
				<div class="pull-right dlgclose">
					<a href="javascript:void(0);" @click="close"><i class="fa fa-times"></i></a>
				</div>
			</div>
			<div class="body">
				<div class="tools">
					<a href="javascript:void(0);" class="button"><i class="fa fa-save"></i></a>
					<a href="javascript:void(0);" class="button"><i class="fa fa-trash"></i></a>
					<a href="javascript:void(0);" class="button"><i class="fa fa-times-circle"></i></a>
				</div>
				<div class="el-panel">
					<ul>
						<li>
							<div class="el-design" draggable="true" v-on:dragstart="onDrag($event, 'ORG')">
								<div class="el-shape org"></div>
								<div class="el-name">{{$t('networks.elOrg')}}</div>
							</div>
						</li>
						<li>
							<div class="el-design" draggable="true" v-on:dragstart="onDrag($event, 'PEER')">
								<div class="el-shape peer"></div>
								<div class="el-name">{{$t('networks.elPeer')}}</div>
							</div>
						</li>
						<li>
							<div class="el-design" draggable="true" v-on:dragstart="onDrag($event, 'ORDERER')">
								<div class="el-shape orderer"></div>
								<div class="el-name">{{$t('networks.elOrderer')}}</div>
							</div>
						</li>
						<li>
							<div class="el-design" v-bind:class="{chosen: isLineChosen}" @click="clickOnRelationShip">
								<div class="el-shape relationship"><div class="line"></div></div>
								<div class="el-name">{{$t('networks.elRelationShip')}}</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="paper-wrapper">
					<div id="myholder" v-on:drop="onDrop($event)" v-on:dragover="allowDrop($event)"></div>
				</div>
			</div>
		</div>
		<!-- context menus -->
		<OrgContextMenu id="orgContextMenu" v-if="contextMenu.org.show" v-bind:style="{left:contextMenu.org.x + 'px', top: contextMenu.org.y + 'px'}" @edit="editOrg" @remove="deleteOrg" @clone="cloneOrg"></OrgContextMenu>
		<!-- editors -->
		<OrgEditor v-if="editor.org.show" @close="closeOrgPropEditor" v-bind:data="curModelData"></OrgEditor>
		<PeerEditor v-if="editor.peer.show" @close="closePeerPropEditor" v-bind:data="curModelData"></PeerEditor>
		<OrdererEditor v-if="editor.orderer.show" @close="closeOrdererPropEditor" v-bind:data="curModelData"></OrdererEditor>
	</div>
</template>
<script>
	import OrgContextMenu from '@/components/network/menu/org'
	import OrgEditor from '@/components/network/editor/org'
	import PeerEditor from '@/components/network/editor/peer'
	import OrdererEditor from '@/components/network/editor/orderer'
	export default {
		name: 'NetworkEditor',
		data(){
			return {
				graph: null,
				paper: null,
				selected: null,
				isLineChosen: false,
				source: null,
				target: null,
				curModelData: null,
				contextMenu:{
					org: {show:false, x: 0, y: 0},
					peer: false,
					orderer: false
				},
				editor:{
					org: {show: false},
					peer: {show: false},
					orderer: {show: false}
				}
			}
		},
		watch:{
			'curModelData.businessName': function(value, oldV){
				if(this.selected){
					this.selected.model.attr('text/text', value);
				}
			}
		},
		methods:{
			init : function(){
				this.initCanvus();
				this.initMockNodes();
			},
			// Close the dialog
			close: function(){
				this.$emit('close');
			},
			// Initialize the canvus and actions on the element
			initCanvus: function(){
				var _this = this;
				this.graph = new joint.dia.Graph();
				this.paper = new joint.dia.Paper({
					el: document.getElementById('myholder'),
					width: 1024,
					height: 768,
					model: this.graph,
					linkPinning: false,
					highlighting: {
				        'default': {
				            name: 'stroke',
				            options: {
				                padding: 3
				            }
				        },
				        connecting: {
				            name: 'addClass',
				            options: {
				                className: 'highlight-connecting'
				            }
				        }
				    }
				});
				this.paper.on('blank:pointerdblclick',function(){
					//alert('double click on the blank');
				});
				this.paper.on('cell:contextmenu', function(cellView, event){
					//_this.selected = cellView;
					_this.choose(cellView);
					_this.onContextMenu(cellView, event);
				});
				this.paper.on('cell:pointerdown', function(cellView, event){
					//_this.selected = cellView;
					_this.choose(cellView);
					_this.recRelationshipSourceAndTarget(cellView);
					_this.singleClickOpenEditor(cellView);
				});
				this.paper.on('element:pointerdblclick', function(cellView, event){
					_this.doubleClickOpenEditor(cellView);
				});
			},
			choose: function(cellView){
				if(this.selected) this.selected.unhighlight();
				this.selected = cellView;
				this.selected.highlight();
			},
			recRelationshipSourceAndTarget: function(cellView){
				if(!this.isLineChosen) return;
				if(!cellView.model.isElement()) return;
				var ntype = cellView.model.get('data').ntype;
				if(ntype && ['ORG','PEER'].indexOf(ntype) > -1){
					if(!this.source){
						this.source = cellView;
					}else{
						// TODO Check the relationship between the source and target at first
						// Allow one org and one peer only
						// Peer can not have relationship with other org
						this.createLink(this.source.model, cellView.model);
						this.source = null;
						this.isLineChosen = false;
					}
				}
			},
			openEditor: function(cellView){
				var data = cellView.model.get('data');
				if(data && data.ntype == 'ORG'){
					this.curModelData = data;
					this.editor.org.show = true;
					this.editor.peer.show = false;
					this.editor.orderer.show = false;
				}else if(data && data.ntype == 'PEER'){
					this.curModelData = data;
					this.editor.org.show = false;
					this.editor.peer.show = true;
					this.editor.orderer.show = false;
				}else if(data && data.ntype == 'ORDERER'){
					this.curModelData = data;
					this.editor.org.show = false;
					this.editor.peer.show = false;
					this.editor.orderer.show = true;
				}else{
					this.curModelData = null;
					this.editor.org.show = false;
					this.editor.peer.show = false;
					this.editor.orderer.show = false;
				}
			},
			singleClickOpenEditor : function(cellView){
				var winWidth = this.getWindowWidth();
				if(winWidth > 768){
					this.openEditor(cellView);
				}
			},
			doubleClickOpenEditor : function(cellView){
				var winWidth = this.getWindowWidth();
				if(winWidth <= 768){
					this.openEditor(cellView);
				}
			},
			closeOrgPropEditor: function(){
				this.editor.org.show = false;
			},
			closePeerPropEditor: function(){
				this.editor.peer.show = false;
			},
			closeOrdererPropEditor: function(){
				this.editor.orderer.show = false;
			},
			onContextMenu:function(cellView, event){
				this.contextMenu.org.show = true;
				this.contextMenu.org.x = event.pageX - window.scrollX;
				this.contextMenu.org.y = event.pageY - window.scrollY;
				document.addEventListener('click', this.hideContextMenu);
				this.singleClickOpenEditor(cellView);
			},
			hideContextMenu: function(){
				this.contextMenu.org.show = false;
				document.removeEventListener('click', this.hideContextMenu);
			},
			createNode : function(data, point, circleColor){
				var attrs = {
					text: { fill: '#fff', style: { 'text-shadow': '1px 1px 1px #999', 'text-transform': 'capitalize' }},
			        circle: { fill: circleColor, stroke: 'white' }
				};
				var node = new joint.shapes.basic.Circle({
					id: data.id,
					data: data,
					position: {x: point.x, y: point.y},
					size: {width: 80, height: 80},
					attrs: attrs,
					label: {text: data.businessName }
				});
				node.addTo(this.graph);
				node.attr('text/text', data.businessName);
				return node;
			}, 
			createOrg: function(name, point){
				var data = {ntype: 'ORG', uuid: uuidv1(), codeName: null, businessName: name};
				return this.createNode(data, point, 'rgb(150, 135, 254)');
			},
			createPeer: function(name, point){
				var data = {ntype: 'PEER', uuid: uuidv1(), codeName: null, businessName: name};
				return this.createNode(data, point, '#feb663');
			},
			createOrderer: function(name, point){
				var data = {ntype: 'ORDERER', uuid: uuidv1(), codeName: null, businessName: name};
				return this.createNode(data, point, 'rgb(49, 208, 198)');
			},
			createLink: function(source, target){
				var link = new joint.shapes.standard.Link({
					id: uuidv1(),
					source: {id: source.id},
					target: {id: target.id},
					attrs : {'line': { stroke: '#6a6c8a', 'stroke-width': 1 }},
					markup: [
					            '<path class="connection" stroke="#cccccc" d="M 0 0 0 0"/>',
					            '<path class="connection-wrap" d="M 0 0 0 0"/>'
					        ].join('')
				});
				link.addTo(this.graph);
			},
			// Create mock nodes and relationships
			initMockNodes : function(){
				var nodes = [
					{name: '世纪集团', type:'ORG', point: {x: 500, y: 100}},
					{name: 'Peer1', type:'PEER', point: {x: 350, y: 300}},
					{name: 'Peer2', type:'PEER', point: {x: 500, y: 300}},
					{name: 'Peer3', type:'PEER', point: {x: 650, y: 300}},
					{name: 'Orderer', type:'ORDER', point: {x: 700, y: 150}}
				];
				var curOrg = null;
				var peers = [];
				for(var i=0;i<nodes.length;i++){
					if(nodes[i].type == 'ORG'){
						curOrg = this.createOrg(nodes[i].name, nodes[i].point);
					}else if(nodes[i].type == 'PEER'){
						peers[peers.length] = this.createPeer(nodes[i].name, nodes[i].point);
					}else{
						this.createOrderer(nodes[i].name, nodes[i].point);
					}
				}
				for(var i=0;i<peers.length;i++){
					this.createLink(curOrg, peers[i]);
				}
			},
			// Support drag & drop
			onDrag: function(event, type){
				event.dataTransfer.setData("text", type);
			},
			onDrop: function(event){
				event.preventDefault();
				var data = event.dataTransfer.getData("text");
				var target = event.currentTarget;
				var top = target.getBoundingClientRect().top + window.scrollY;
				var left = target.getBoundingClientRect().left + window.scrollX;
				var x = event.clientX - left*1 - 40;
				var y = event.clientY - top*1 - 40;
				var point = {x: x, y: y};
				var name = data + '_new';
				if(data == 'ORG'){
					this.createOrg(name, point);
				}else if(data == 'PEER'){
					this.createPeer(name, point);
				}else{
					this.createOrderer(name, point);
				}
			},
			allowDrop: function(event){
				event.preventDefault();
			},
			// Click on Org Context Menu
			editOrg: function(){
				
			},
			deleteOrg: function(){
				if(this.selected != null) {
					this.selected.model.remove();
					this.selected.remove();
					this.selected = null;
				}
			},
			cloneOrg: function(){
				
			},
			// Element panel click events
			clickOnRelationShip: function(){
				this.isLineChosen = !this.isLineChosen;
				if(!this.isLineChosen) this.source = null;
			},
			getWindowWidth : function(){
				return window.innerWidth
					|| document.documentElement.clientWidth
					|| document.body.clientWidth;
			}
		},
		mounted(){
			this.init();
		},
		components:{
			OrgContextMenu, OrgEditor, PeerEditor, OrdererEditor
		}
	}
</script>
<style scoped>
	.stddlg {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1030;
	}
	.stddlg .modal {
		background-color: #FFF;
		box-shadow: 2px 2px 20px 1px;
		overflow-x: auto;
		display: flex;
		flex-direction: column;
	}
	.stddlg .modal .header {
		display:block;
		background-color:#3c8dbc;
		color: #f6f6f6;
		height: 50px;
	}
	.stddlg .modal .header h3{
		display: inline-block;
		padding: 12px 12px;
		margin: 0px;
	}
	.stddlg .modal .header .dlgclose{
		padding: 15px;
	}
	.stddlg .modal .header .dlgclose:hover a{
		color: #000;
	}
	.stddlg .modal .body {
		position:relative;
	}
	
	.el-panel{
		overflow: auto;
		position: absolute;
		left: 0px;
		top: 46px;
		border: solid 1px #999c8a;
		border-bottom-right-radius: 4px;
		border-top: none;
		background-color: #ececec;
	}
	.el-panel ul {
		list-style:none;
		padding:0px;
		maring:0px;
		overflow: auto;
	}
	.el-panel ul li {
		padding: 10px;
	}
	
	.el-panel ul li .el-design{
		overflow: auto;
		border: solid 1px #ececec;
		padding: 5px 10px;
	}
	.el-panel ul li .el-design:hover{
		border: solid 1px #FFF;
		border-radius: 3px;
		cursor: pointer;
	}
	.el-panel ul li .el-design .el-shape{
		height: 56px;
		width: 56px;
		background-color: #DDD;
		border-radius: 50%;
	}
	.el-panel ul li .el-design.chosen{
		border: groove 1px #000;
	}
	.el-panel ul li .el-design .el-shape.org{
		background-color:rgb(150, 135, 254);
	}
	.el-panel ul li .el-design .el-shape.peer{
		background-color:#feb663;
	}
	.el-panel ul li .el-design .el-shape.orderer{
		background-color:rgb(49, 208, 198);
	}
	.el-panel ul li .el-design .el-shape.relationship{
		background-color: transparent;
		position: relative;
	}
	.el-panel ul li .el-design .el-shape.relationship .line{
		border-bottom: solid 1px #ccc;
		width: 56px;
		-webkit-transform: rotate(-45deg);
		transform: rotate(-38deg);
		position: absolute;
		top: 28px;
	}
	.el-panel ul li .el-design .el-name{
		text-align: center;
	}
	@media(max-width:768px){
		.el-panel{
			position: relative;
			border: none;
			top: 0px;
			box-shadow: 0 3px 2px -2px rgba(0,0,0,.1);
			-webkit-box-shadow: 0 3px 2px -2px rgba(0,0,0,.1);
		}
		.el-panel ul{
			margin: auto;
		}
		.el-panel ul li {
			float: left;
		}
		.el-panel ul li .el-design .el-shape{
			height: 56px;
			width: 56px;
		}
	}
	.stddlg.network-designer .body .tools {
		padding: 5px;
		background-color:#000;
		overflow: auto;
		height:46px;
	}
	.stddlg.network-designer .body .tools .button{
		font-size: 24px;
		color: #999;
		cursor: pointer;
		width: 42px;
		text-align: center;
		display: block;
		float: left;
	}
	.stddlg.network-designer .body .tools .button:hover{
		color: #FFF;
	}
	.network-designer .paper-wrapper {
		width: 100%;
		overflow: auto;
	}
	.connection, .connection-wrap {
		stroke: #ccc0ef;
	}
</style>