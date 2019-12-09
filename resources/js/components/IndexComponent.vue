<template>
	<div class="wrapper">
		<header-template></header-template>
		<sidebar></sidebar>
		<div class="content-wrapper">
			<div class="content-header">
				<div class="container-fluid">
					<div class="row mb-2">
						<div class="col-sm-6">
							<h1 class="m-0 text-dark">Starter Page</h1>
						</div>
						<div class="col-sm-6">
							<ol class="breadcrumb float-sm-right" v-if="$route.name != undefined">
								<li class="breadcrumb-item" v-for="data in $route.name.split('-')">{{ data }}</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="container-fluid">
					<router-view></router-view>
				</div>
			</div>
		</div>
		<aside class="control-sidebar control-sidebar-dark">
			<!-- Control sidebar content goes here -->
			<div class="p-3">
				<h5>Title</h5>
				<p>Sidebar content</p>
			</div>
		</aside>
		<footer-template></footer-template>
	</div>
</template>
<script>
	export default {}
</script>
