<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/nucleo-icons.css') }}">

    <script type='text/javascript'>
        window.Laravel = @php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); @endphp
    </script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    {{-- Replace this code with your own tracking code from google analytics --}}
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-145997622-1"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-145997622-1');
    </script>


</head>
<body>
    <div id="app">
        <router-view></router-view>       
    </div>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>
