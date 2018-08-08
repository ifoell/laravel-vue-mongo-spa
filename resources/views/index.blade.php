<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" value={{csrf_token()}} />
    <body>
        <div id="app"></div>
    </body>
    <script src="{{ mix('js/main.js') }}"></script>
</html>
