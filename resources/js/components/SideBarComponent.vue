<template>
	<aside class="main-sidebar sidebar-dark-primary elevation-4">
		<a href="index3.html" class="brand-link">
			<img src="lte/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
			<span class="brand-text font-weight-light">AdminLTE 3</span>
		</a>
		<div class="sidebar">
			<div class="user-panel mt-3 pb-3 mb-3 d-flex">
				<div class="image">
					<img src="lte/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
				</div>
				<div class="info">
					<router-link class="d-block" :to="{ name : 'dashboard' }">Alexander Pierce</router-link>
				</div>
			</div>
			<nav class="mt-2">
				<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
					<li class="nav-item has-treeview menu-open" v-if="$auth.check()" v-for="(menu, parent) in $root.menu">
						<a href="#" class="nav-link active">
							<i class="nav-icon fas fa-th"></i>
							<p>{{ parent }}<i class="right fas fa-angle-left"></i></p>
						</a>
						<ul class="nav nav-treeview">
							<li class="nav-item" v-for="(route, key) in menu" v-bind:key="route.path">
								<router-link class="nav-link" :to="{ name : route.path }" :key="key">
									<i class="far fa-circle nav-icon"></i>
									<p>{{ route.name }}</p>
								</router-link>
							</li>
						</ul>
					</li>
					<li class="nav-item" v-if="!$auth.check()">
						<router-link class="nav-link" to="login">
							<i class="far fa-circle nav-icon"></i>
							<p>Login</p>
						</router-link>
					</li>
					<li class="nav-item" v-if="$auth.check()">
						<a href="#" @click.prevent="$auth.logout()" class="nav-link">
							<i class="far fa-circle nav-icon"></i>
							<p>Logout</p>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</aside>
</template>
<script>
	export default {}
</script>
