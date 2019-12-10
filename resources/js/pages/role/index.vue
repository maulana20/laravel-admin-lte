<template>
	<div class="card card-default">
		<div class="card-header">
			Data Role
		</div>
		<div class="card-body">
			<table class="table">
				<thead>
					<tr>
						<th width="5%">No.</th>
						<th width="75%">Nama</th>
						<th width="20%" class="text-center"><button class="btn btn-primary btn-sm" id="show-modal" @click="openModal('add')">add</button></th>
						</tr>
				</thead>
				<tbody>
					<tr v-for="(data, index) in list.data">
						<td>#</td>
						<td>{{ data.name }}</td>
						<td class="text-center">
							<button class="btn btn-primary btn-sm" id="show-modal" @click="openModal('edit', data.id)">edit</button>&nbsp;
							<button class="btn btn-danger btn-sm" @click="del(data.id)">del</button>
						</td>
					</tr>
				</tbody>
			</table>
			<pagination :data="list" @pagination-change-page="getPage"></pagination>
			<modal v-if="show_modal" @close="show_modal = false">
				<h3 slot="header" id="modal_title">custom header</h3>
				<div slot="body">
					<validation-errors :errors="validation_errors" v-if="validation_errors"></validation-errors>
					<div class="form-group">
						<label>name</label>
						<input class="form-control" type="text" v-model="role.name">
					</div>
					<div v-html="group_bar" style="margin-left:2px;margin-right:2px;"></div>
				</div>
				<div slot="footer">
					<button class="btn btn-primary" @click="add()" v-if="session_active == 'add'">Simpan</button>
					<button class="btn btn-primary" @click="update(id)" v-if="session_active == 'edit'">Update</button>
					&nbsp;
					<button class="btn btn-secondary" @click="show_modal = false">Close</button>
				</div>
			</modal>
		</div>
	</div>
</template>
<script>
	export default {
		data: function ()
		{
			return {
				list: {},
				permission: [],
				group_bar: '',
				
				id: '',
				access: {},
				
				role: {
					name: '',
					permission: []
				},
				show_modal: false,
				session_active: 'add',
				validation_errors: '',
			}
		},
		mounted: function ()
		{
			this.getPage()
		},
		methods: {
			init: function ()
			{
				this.role.name = this.id = this.validation_errors = ''
				this.role.permission = this.access = []
			},
			getPage: function (page)
			{
				if (typeof page === 'undefined') page = 1
				
				axios.get('/roles/page?page=' + page).then(response => {
					this.list = response.data
				}).catch(error => {
					alert(error.message)
				})
			},
			openModal: function(method, id)
			{
				this.session_active = method
				this.show_modal = true
				this.init()
				
				axios.get('/roles/permission').then(response => {
					this.permission = response.data
					$('#modal_title').html('ADD ROLE')
				}).catch(error => {
					alert(error.message)
				})
				
				var script = document.createElement('script')
				script.src = "/js/groupBar.js"
				document.head.appendChild(script)
				
				this.group_bar = this.groupBar({})
				if (method == 'add') {
					$('#modal_title').html('ADD ROLE')
				} else if (method == 'edit') {
					axios.get('/roles/edit/' + id).then(response => {
						this.role.name = response.data.role.name
						this.id = id
						
						this.group_bar = this.groupBar(response.data.access)
						
						$('#modal_title').html('EDIT ROLE')
					}).catch(error => {
						alert(error.message)
					})
				} else {
					alert('Method not found !')
				}
			},
			add: function ()
			{
				axios.post('roles/add', { name: this.role.name, permission: this.role.permission }, {credential: true}).then(response => {
					alert('berhasil di simpan')
					this.getPage()
					
					this.show_modal = false
				}).catch(error => {
					if (error.response.status == 422) {
						this.validation_errors = error.response.data.errors
					} else {
						alert('Connection error !')
					}
				})
			},
			update: function (id)
			{
				var form = document.form
				var permission = []
				for (var i = 0; i < form.length; i++) {
					if (form.elements[i].disabled) continue
					if (form.elements[i].type = 'checkbox') {
						if (form.elements[i].checked && form.elements[i].value != '') permission.push(form.elements[i].value)
					}
				}
				this.role.permission = permission
				
				axios.post('roles/update/' + id, { name: this.role.name, permission: this.role.permission }, {credential: true}).then(response => {
					alert('berhasil di update')
					this.getPage()
					
					this.show_modal = false
				}).catch(error => {
					if (error.response.status == 422) {
						this.validation_errors = error.response.data.errors
					} else {
						alert('Connection error !')
					}
				})
			},
			del: function(id)
			{
				axios.post('roles/delete/' + id, {}, {credential: true}).then(response => {
					alert('berhasil di delete')
					this.getPage()
				}).catch(error => {
					alert(error.message)
				})
			},
			getGrouping: function(menu)
			{
				var result = []
				
				Object.keys(menu).forEach(function (parent) {
					var mainmenu = menu[parent]
					var grouping = []
					
					grouping.push({ 'caption': parent, 'ref': 0, 'access': '', 'onClick': '', 'style': '' })
					
					if (mainmenu.length) {
						mainmenu.forEach(function (submenu) {
							var access = []
							var onclick = ''
							
							if (submenu.node && submenu.node.length) submenu.node.forEach(function (item) { access.push("'" + item + "'") })
							if (access.length > 0) onclick = "[" + access.join(",") + "]"
							
							grouping.push({ 'caption': submenu.name, 'ref': 1, 'access': submenu.access, 'onClick': onclick, 'style': 'padding-left:10px;' })
							
							if (submenu.node && submenu.node.length) {
								submenu.node.forEach(function (childmenu) {
									grouping.push({ 'caption': childmenu, 'ref': 2, 'access': childmenu, 'onClick': '', 'style': 'padding-left:20px;' })
								})
							}
						})
					}
					
					result.push(grouping)
				})
				
				return result
			},
			groupBar: function(access)
			{
				var max = 0
				var menu = this.$root.menu
				var permission = this.permission
				var grouping = this.getGrouping(menu)
				
				grouping.forEach(function (item, index) { max = Math.max(max, grouping[index].length) })
				
				var length_col = Math.floor(100 / menu.length)
				var form_html = '<form name="form" method="post" action="" onsubmit="return false;">' + '\n'
				form_html += '<table width="100%" border="1" bordercolor="#fafcf2" cellpadding="0" cellspacing="0">' + '\n'
				
				for (var i = 0; i < max; i++) {
					form_html += '<tr>' + '\n'
					Object.keys(menu).forEach(function (parent, index) {
						var color = (index % 2 != 0) ? '#A3C8AC' : '#A2D8A2'
						
						var group_list = grouping[index][i]
						if (group_list != undefined) {
							form_html += '<td height="21" width="' + length_col + '%" bgcolor="' + color + '" style="' + ( group_list.style != null && group_list.style != '' ? group_list.style : 'padding-left:5px;' ) + '">' + '\n'
							
							if (group_list.style != null && group_list.style != '') {
								var font_attr = 'style="font-size:12px;"'
								form_html += '<font color="' + ( group_list.ref == 1 ? '#000000' : '#0000FF' ) + '" size="-2">&#9654;</font>'
							} else {
								var font_attr = 'style="font-size:12px; font-weight:bold; padding-left:2px;"'
							}
							
							if (group_list.caption != null && group_list.caption != '') {
								if (group_list.onClick != null && group_list.onClick != '') {
									var attr = 'id="' + group_list.access + '" onclick="' + 'onClick(this,' + group_list.onClick + ')' + '"'
								} else {
									var attr = 'id="' + group_list.access + '"'
								}
								
								var data = permission.filter((item) => item.name == group_list.access).shift()
								if (group_list.ref != 0) form_html += '<input type="checkbox" id="' + group_list.access + '" value="' + ((data != undefined) ? data.id : '') + '" ' + ((data != undefined && access[data.id] != undefined) ? 'checked' : '') + ' ' + attr + ' >&nbsp;'
								
								form_html += '<label for="' + group_list.access + '"><font ' + font_attr + '>' + group_list.caption + '</font></label>'
							} else {
								form_html += '&nbsp;'
							}
							form_html += '</td>' + '\n'
						} else {
							form_html += '<td bgcolor="' + color + '">&nbsp;</td>' + '\n'
						}
					})
					form_html += '</tr>' + '\n'
				}
				form_html += '</table>' + '\n'
				form_html += '</form>' + '\n'
				
				return form_html
			}
		}
	}
</script>
