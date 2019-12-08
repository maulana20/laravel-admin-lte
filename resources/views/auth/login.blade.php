<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>{{ config('app.name', 'Laravel') }}</title>
	<script src="{{ asset('js/app.js') }}" defer></script>
	<link rel="dns-prefetch" href="//fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
	<link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
	<div id="app">
		<div id="main">
			<header id="header"></header>
			<div id="content">
				<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
					<navigation></navigation>
				</nav>
				<main class="py-3">
					<div class="container">
						<div class="row">
							<div class="col-md-12 col-md-offset-2">
								<div class="panel panel-default">
									<div class="panel-body">
										<login></login>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</div>
</body>
</html>
